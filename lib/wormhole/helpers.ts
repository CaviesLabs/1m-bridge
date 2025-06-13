import type {
  Chain,
  ChainAddress,
  ChainContext,
  Network,
  Signer,
  TokenId,
  UnsignedTransaction,
} from '@wormhole-foundation/sdk';
import { Wormhole, isTokenId } from '@wormhole-foundation/sdk';
import { config } from 'dotenv';
import type { UsePublicClientReturnType, UseWalletClientReturnType } from 'wagmi';
import type { SolanaSigner } from '../../context/useSolanaSigner';
config();

export const GAS_LIMIT = 500_000n;
export const GAS_PRICE = 100_000_000_000n; // 100gwei
export const MAX_FEE_PER_GAS = 1_500_000_000n; // 1.5gwei
export const MAX_PRIORITY_FEE_PER_GAS = 100_000_000n; // 0.1gwei

export const SOLANA_MINT = 'So11111111111111111111111111111111111111112';

export interface SignerStuff<N extends Network, C extends Chain> {
  chain: ChainContext<N, C>;
  signer: Signer<N, C>;
  address: ChainAddress<C>;
}

export async function getSigner<N extends Network, C extends Chain>(
  chain: ChainContext<N, C>,
  address: string,
  signTransaction: (tx: any) => Promise<any>
): Promise<{ chain: ChainContext<N, C>; signer: Signer<N, C>; address: ChainAddress<C> }> {
  return {
    chain,
    address: Wormhole.chainAddress(chain.chain, address),
    signer: {
      chain: () => chain.chain,
      address: () => address,
      signAndSend: async (tx: any) => {
        try {
          const signedTx = await signTransaction(tx);
          if (!signedTx) {
            throw new Error('Failed to sign transaction');
          }

          // For Solana transactions, ensure we have a valid signature
          if (chain.platform.utils()._platform === 'Solana') {
            if (signedTx.signatures && signedTx.signatures.length === 0) {
              throw new Error('Transaction not signed');
            }
          }

          return signedTx;
        } catch (error) {
          console.info('Transaction signing error:', error);
          throw error;
        }
      },
    },
  };
}

export async function getTokenDecimals<N extends 'Mainnet' | 'Testnet' | 'Devnet'>(
  wh: Wormhole<N>,
  token: TokenId,
  sendChain: ChainContext<N, any>
): Promise<number> {
  return isTokenId(token)
    ? Number(await wh.getDecimals(token.chain, token.address))
    : sendChain.config.nativeTokenDecimals;
}

export const getSolanaSignerExecuter =
  (signer: SolanaSigner) => async (txs: Array<UnsignedTransaction<Network, 'Solana'>>) => {
    try {
      return await signer.signAndSendWormholeEntity(txs);
    } catch (error) {
      console.error('Transaction signing error:', error);
      throw error;
    }
  };

export const getEvmSignerExecuter =
  (signer: UseWalletClientReturnType, publicClient: UsePublicClientReturnType) =>
  async (txs: Array<UnsignedTransaction<Network, 'Seievm'>>) => {
    const hashes = [];
    for (const tx of txs) {
      try {
        if (!signer.data) throw new Error('Wallet not connected');

        const hash = await signer.data.sendTransaction({
          to: tx.transaction.to,
          data: tx.transaction.data,
          gasLimit: GAS_LIMIT,
          maxFeePerGas: MAX_FEE_PER_GAS,
          maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
        } as any);

        // Wait for transaction to be mined
        const receipt = await publicClient.waitForTransactionReceipt({ hash });

        hashes.push(receipt);
      } catch (error) {
        console.log('Error getting transaction hash:', error);
        return null;
      }
    }

    return hashes.filter(Boolean).map(hash => hash?.transactionHash);
  };
