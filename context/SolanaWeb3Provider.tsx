import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  WalletConnectWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import type { FC, ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

export const SOLANA_ENDPOINT =
  'https://misty-still-dinghy.solana-mainnet.quiknode.pro/c8b395132a92ffea0d68af69bf206a24585de00a/';
// 'https://virulent-attentive-bush.solana-mainnet.quiknode.pro/e51acf8020b699cdb7e5f2ab798224378710e2ed';

export const solana_connection = new Connection(SOLANA_ENDPOINT, 'confirmed');

type SolanaConnectProviderProps = { network: string; connection: Connection };

export const SolanaWeb3Context = createContext<SolanaConnectProviderProps>(null);
export const SolanaConnectProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const network = clusterApiUrl(WalletAdapterNetwork.Mainnet);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new WalletConnectWalletAdapter({
        network: WalletAdapterNetwork.Mainnet,
        options: {
          projectId: '3ab5de1807b141cc1972fe8125ba600f',
        },
      }),
    ],
    []
  );

  return (
    <SolanaWeb3Context.Provider value={{ network, connection: solana_connection }}>
      <ConnectionProvider endpoint={SOLANA_ENDPOINT}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </SolanaWeb3Context.Provider>
  );
};

export const useSolanaWeb3 = () => {
  const context = useContext(SolanaWeb3Context);
  if (!context) {
    throw new Error('useSolanaWeb3 must be used within a SolanaConnectProvider');
  }

  return context;
};

export const useSolanaNetwork = () => {
  const network = clusterApiUrl(WalletAdapterNetwork.Mainnet);
  const connection = new Connection(SOLANA_ENDPOINT);
  return { network, connection };
};
