import * as SeiTokens from '@/lib/constants/token/pacific-1';
import { SignerTokenService } from '@/lib/services/signer-token.service';
import { useAppSelector } from '@/redux/store';
import { getWhitelistedTokens } from '@/redux/whitelisted-token.state';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import type { JsonRpcProvider } from 'ethers';
import * as ethers from 'ethers';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import type { FC, ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo } from 'react';
import type { Connector } from 'wagmi';
import { useAccount, useDisconnect, useWalletClient } from 'wagmi';
import { useChain } from './Web3ModalProvider';

const walletClientToSigner = (client: any) => {
  const { account, chain, transport } = client;
  const providerConfig: any = {
    chainId: chain.id,
    name: chain.name,
  };

  // Only add ENS address for Ethereum mainnet (chainId: 1)
  if (chain.id === 1) {
    providerConfig.ensAddress = chain.contracts?.ensRegistry?.address;
  }

  const provider = new BrowserProvider(transport as any, providerConfig);

  return new JsonRpcSigner(provider, account.address);
};

export const WalletContext = createContext<{
  rpcSigner: JsonRpcSigner;
  signer: JsonRpcSigner;
  rpcProvider: JsonRpcProvider;
  service: {
    signerTokenService: SignerTokenService;
  };

  isConnected: boolean;
  isDisconnected: boolean;
  connector: Connector;

  connect: () => Promise<void>;
  disconnect: () => Promise<void>;

  signAndSendTransaction: (unsignedTx: any) => Promise<any>;
}>(null);

export const SignerProvider: FC<{ children: ReactNode }> = props => {
  const client = useWalletClient();
  const { desiredChain } = useChain();
  const { connector, isConnected, isDisconnected } = useAccount();
  const whitelistedTokens = useAppSelector(getWhitelistedTokens);

  const { open: openWeb3Modal } = useWeb3Modal();
  const { disconnect } = useDisconnect();

  const rpcSigner = useMemo(() => {
    if (!isConnected) return null;
    return client?.data ? walletClientToSigner(client.data) : null;
  }, [client, isConnected]);

  const rpcProvider = useMemo(() => {
    if (!desiredChain) return undefined;

    // Get fallback RPC URLs from ChainMap
    const rpcUrls = [desiredChain.rpcUrl];

    // Create provider with primary RPC URL
    const provider = new ethers.JsonRpcProvider(desiredChain.rpcUrl, {
      chainId: desiredChain.chainId,
      name: desiredChain.chainName,
    });

    // Add fallback mechanism
    provider.on('error', async () => {
      // Try fallback RPCs
      for (const fallbackUrl of rpcUrls) {
        if (fallbackUrl === desiredChain.rpcUrl) continue;

        try {
          const fallbackProvider = new ethers.JsonRpcProvider(fallbackUrl, {
            chainId: desiredChain.chainId,
            name: desiredChain.chainName,
          });

          // Test the fallback RPC
          await fallbackProvider.getNetwork();

          // If successful, create a new provider with the fallback URL
          const newProvider = new ethers.JsonRpcProvider(fallbackUrl, {
            chainId: desiredChain.chainId,
            name: desiredChain.chainName,
          });

          // Replace the old provider's methods with the new one's
          Object.assign(provider, newProvider);
          console.info('Switched to fallback RPC:', fallbackUrl);
          break;
        } catch (e) {
          console.warn('Fallback RPC failed:', fallbackUrl, e);
        }
      }
    });

    return provider;
  }, [desiredChain]);

  const signAndSendTransaction = useCallback(
    async (unsignedTx: any) => {
      if (!rpcSigner) return null;
      const signedTx = await rpcSigner.signTransaction(unsignedTx);
      console.log({ signedTx });
      const txHash = await rpcSigner.sendTransaction(unsignedTx);
      console.log({ txHash });
      return txHash as any;
    },
    [rpcSigner]
  );

  return (
    <WalletContext.Provider
      value={{
        connector,
        isConnected,
        isDisconnected,
        rpcSigner: rpcSigner ? rpcSigner : ({ address: '' } as any),
        signer: rpcSigner ? rpcSigner : ({ address: '' } as any),
        rpcProvider,
        signAndSendTransaction,
        service: {
          signerTokenService: new SignerTokenService([
            SeiTokens.SEI,
            SeiTokens.USDC,
            SeiTokens.USDT,
          ]),
        },

        connect: async () => openWeb3Modal(),
        disconnect: async () => {
          disconnect();
        },
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};

export const useSigner = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('Must be in provider');
  }
  return context;
};
