'use client';

import type { FC, ReactNode } from 'react';
import { createContext, useMemo } from 'react';

import { createWeb3Modal } from '@web3modal/wagmi/react';
import { createPublicClient, http } from 'viem';
import type { CreateConnectorFn, State } from 'wagmi';
import { cookieStorage, createConfig, createStorage, WagmiProvider } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';

import { useTheme } from '@/components/ThemeProvider';
import * as CHAIN_CONFIGS from '@/lib/constants/chain';
import { type ChainConfig } from '@/lib/entities/chain.entity';
import { getCookie } from '@/utils/dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
type IProviderContext = {
  desiredChain: ChainConfig;
};
export const ProviderContext = createContext<IProviderContext>(null);
export const Web3ModalProvider: FC<{
  children: ReactNode;
  initialState?: State;
}> = ({ children, initialState }) => {
  const themeMode = useTheme();

  const { desiredChain } = useChain();

  const metadata = {
    name: '1Matrix Bridge',
    description: '1Matrix Bridge',
    icons: ['/logo.png'],
    url: 'https://1matrix.io',
  };

  const connectors: CreateConnectorFn[] = [
    walletConnect({
      projectId: 'a0b21857a52bec2d082e67d6b7d029ce',
      metadata,
      showQrModal: false,
    }),
    injected({ shimDisconnect: true }),
  ];

  const config = desiredChain?.config;
  const wagmiConfig = useMemo(() => {
    return createConfig({
      chains: [config],
      connectors: connectors,
      transports: config?.id ? { [config?.id]: http(config?.rpcUrls.default.http[0]) } : {},
      ssr: true,
      storage: createStorage({
        storage: cookieStorage,
      }),
    });
  }, [config]);

  createWeb3Modal({
    wagmiConfig,
    projectId: 'a0b21857a52bec2d082e67d6b7d029ce',
    themeMode: themeMode,
    includeWalletIds: [
      'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // metamask
      '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709', // okx
      '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4', // binance
    ],
  });

  return (
    <ProviderContext.Provider value={{ desiredChain }}>
      <WagmiProvider config={wagmiConfig} initialState={initialState}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </WagmiProvider>
    </ProviderContext.Provider>
  );
};

export const usePublicClient = () => {
  const { desiredChain } = useChain();
  return createPublicClient({
    chain: desiredChain?.config,
    transport: http(),
  });
};

const chainList = [
  CHAIN_CONFIGS.PACIFIC_1_CHAIN,
  CHAIN_CONFIGS.ARCTIC_1_CHAIN,
  CHAIN_CONFIGS.ATLANTIC_2_CHAIN,
];

export const useChain = () => {
  const chain = chainList.find(chain => chain.chainId === 1329);

  let desiredChain = chain;

  if (!chain) {
    desiredChain = chainList.find(
      chain =>
        chain.chainId ===
        (getCookie('CHAIN_ID')
          ? Number(getCookie('CHAIN_ID'))
          : CHAIN_CONFIGS.PACIFIC_1_CHAIN.chainId)
    );
  }

  return {
    desiredChain,
  };
};
