/* eslint-disable max-len */
import { useWrappedReownAdapter } from '@jup-ag/jup-mobile-adapter';
import type { Adapter, WalletName } from '@jup-ag/wallet-adapter';
import { UnifiedWalletProvider } from '@jup-ag/wallet-adapter';
import type { IWalletNotification } from '@jup-ag/wallet-adapter/dist/types/contexts/WalletConnectionProvider';
import {
  BitgetWalletAdapter,
  Coin98WalletAdapter,
  CoinbaseWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TrezorWalletAdapter,
  TrustWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import type { FC, ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

export const HARDCODED_WALLET_STANDARDS: {
  id: string;
  name: WalletName;
  url: string;
  icon: string;
}[] = [
  {
    id: 'Backpack',
    name: 'Backpack' as WalletName,
    url: 'https://www.backpack.app/',
    icon: 'data:image/png;base64,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',
  },
  {
    id: 'Magic Eden',
    name: 'Magic Eden' as WalletName,
    url: 'https://wallet.magiceden.io/',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iMTEzLjc3OCIgZmlsbD0iIzFDMTMyNiIvPgo8cGF0aCBkPSJNMzI2LjYyMyAyMDcuMDA2TDM0Ni4xMjcgMjI5LjkyM0MzNDguMzYgMjMyLjQ5NyAzNTAuMzQgMjM0LjYxNCAzNTEuMTQgMjM1LjgxOEMzNTYuOTczIDI0MS42MTUgMzYwLjI0NCAyNDkuNDUgMzYwLjIzOSAyNTcuNjE0QzM1OS42OTIgMjY3LjI0NSAzNTMuNDE1IDI3My44MDUgMzQ3LjYwMSAyODAuODIxTDMzMy45NTMgMjk2Ljg0NkwzMjYuODMzIDMwNS4xNDlDMzI2LjU3OCAzMDUuNDM1IDMyNi40MTMgMzA1Ljc4OSAzMjYuMzYgMzA2LjE2N0MzMjYuMzA2IDMwNi41NDQgMzI2LjM2NiAzMDYuOTI5IDMyNi41MzEgMzA3LjI3M0MzMjYuNjk3IDMwNy42MTggMzI2Ljk2MiAzMDcuOTA3IDMyNy4yOTIgMzA4LjEwNUMzMjcuNjIzIDMwOC4zMDMgMzI4LjAwNSAzMDguNDAxIDMyOC4zOTIgMzA4LjM4N0gzOTkuNTQzQzQxMC40MTEgMzA4LjM4NyA0MjQuMTAyIDMxNy41MiA0MjMuMzAyIDMzMS4zODdDNDIzLjI4IDMzNy42ODkgNDIwLjcyOSAzNDMuNzI3IDQxNi4yMDcgMzQ4LjE4M0M0MTEuNjg1IDM1Mi42NCA0MDUuNTU5IDM1NS4xNTMgMzk5LjE2NCAzNTUuMTc1SDI4Ny43NEMyODAuNDEgMzU1LjE3NSAyNjAuNjk1IDM1NS45NjQgMjU1LjE3NyAzMzkuMTVDMjU0LjAwMyAzMzUuNjM3IDI1My44NDMgMzMxLjg3MSAyNTQuNzE0IDMyOC4yNzNDMjU2LjMxOCAzMjIuOTUyIDI1OC44NTUgMzE3Ljk1IDI2Mi4yMTIgMzEzLjQ5M0MyNjcuODE1IDMwNS4xOSAyNzMuODgxIDI5Ni44ODcgMjc5Ljg2MyAyODguODMzQzI4Ny41NzIgMjc4LjI4OCAyOTUuNDkyIDI2OC4wNzUgMzAzLjI4NSAyNTcuMzIzQzMwMy41NjIgMjU2Ljk3MyAzMDMuNzEyIDI1Ni41NDIgMzAzLjcxMiAyNTYuMDk4QzMwMy43MTIgMjU1LjY1NSAzMDMuNTYyIDI1NS4yMjQgMzAzLjI4NSAyNTQuODc0TDI3NC45NzYgMjIxLjY2MUMyNzQuNzkyIDIyMS40MiAyNzQuNTUzIDIyMS4yMjUgMjc0LjI3OSAyMjEuMDkxQzI3NC4wMDUgMjIwLjk1NiAyNzMuNzAzIDIyMC44ODYgMjczLjM5NiAyMjAuODg2QzI3My4wOSAyMjAuODg2IDI3Mi43ODggMjIwLjk1NiAyNzIuNTE0IDIyMS4wOTFDMjcyLjI0IDIyMS4yMjUgMjcyLjAwMSAyMjEuNDIgMjcxLjgxNyAyMjEuNjYxQzI2NC4yMzQgMjMxLjc0OSAyMzEuMDM5IDI3Ni40MiAyMjMuOTYyIDI4NS40N0MyMTYuODg0IDI5NC41MjEgMTk5LjQ0NCAyOTUuMDE5IDE4OS43OTcgMjg1LjQ3TDE0NS41MjMgMjQxLjY3MkMxNDUuMjQgMjQxLjM5MiAxNDQuODc5IDI0MS4yMDEgMTQ0LjQ4NyAyNDEuMTI0QzE0NC4wOTQgMjQxLjA0NyAxNDMuNjg2IDI0MS4wODYgMTQzLjMxNiAyNDEuMjM4QzE0Mi45NDYgMjQxLjM4OSAxNDIuNjMgMjQxLjY0NSAxNDIuNDA4IDI0MS45NzRDMTQyLjE4NiAyNDIuMzAyIDE0Mi4wNjggMjQyLjY4OCAxNDIuMDY5IDI0My4wODNWMzI3LjMxOEMxNDIuMTczIDMzMy4yOTYgMTQwLjM3NyAzMzkuMTU2IDEzNi45MzIgMzQ0LjA3N0MxMzMuNDg3IDM0OC45OTggMTI4LjU2NiAzNTIuNzMzIDEyMi44NTkgMzU0Ljc2QzExOS4yMTIgMzU2LjAxMSAxMTUuMzE1IDM1Ni4zODQgMTExLjQ5MiAzNTUuODQ5QzEwNy42NjkgMzU1LjMxNCAxMDQuMDMxIDM1My44ODYgMTAwLjg4MiAzNTEuNjg0Qzk3LjczMjggMzQ5LjQ4MyA5NS4xNjMyIDM0Ni41NzEgOTMuMzg3NyAzNDMuMTkxQzkxLjYxMjEgMzM5LjgxMiA5MC42ODIxIDMzNi4wNjQgOTAuNjc1IDMzMi4yNThWMTgwLjgxQzkwLjkyODggMTc1LjM1MiA5Mi45MjE1IDE3MC4xMTIgOTYuMzcgMTY1LjgzNEM5OS44MTg1IDE2MS41NTYgMTA0LjU0NyAxNTguNDU4IDEwOS44ODQgMTU2Ljk4QzExNC40NjMgMTU1Ljc3OCAxMTkuMjgyIDE1NS43OSAxMjMuODU0IDE1Ny4wMTVDMTI4LjQyNiAxNTguMjQgMTMyLjU4OCAxNjAuNjM0IDEzNS45MTggMTYzLjk1NUwyMDMuOTk0IDIzMS4xMjdDMjA0LjE5OCAyMzEuMzMxIDIwNC40NDQgMjMxLjQ4OCAyMDQuNzE3IDIzMS41ODhDMjA0Ljk4OSAyMzEuNjg3IDIwNS4yOCAyMzEuNzI3IDIwNS41NyAyMzEuNzAzQzIwNS44NTkgMjMxLjY3OSAyMDYuMTQgMjMxLjU5MyAyMDYuMzkyIDIzMS40NUMyMDYuNjQzIDIzMS4zMDggMjA2Ljg2IDIzMS4xMTIgMjA3LjAyNyAyMzAuODc4TDI1NS4zODggMTY0LjkxQzI1Ny42MjIgMTYyLjIzMiAyNjAuNDI0IDE2MC4wNjcgMjYzLjU5NyAxNTguNTY5QzI2Ni43NyAxNTcuMDcgMjcwLjIzNiAxNTYuMjczIDI3My43NTUgMTU2LjIzM0gzOTkuNTQzQzQwMi45ODUgMTU2LjIzOCA0MDYuMzg3IDE1Ni45NjggNDA5LjUyIDE1OC4zNzRDNDEyLjY1MyAxNTkuNzc5IDQxNS40NDYgMTYxLjgyOCA0MTcuNzExIDE2NC4zODJDNDE5Ljk3NiAxNjYuOTM3IDQyMS42NjIgMTY5LjkzOSA0MjIuNjU1IDE3My4xODdDNDIzLjY0OCAxNzYuNDM1IDQyMy45MjYgMTc5Ljg1NSA0MjMuNDcgMTgzLjIxOEM0MjIuNTg0IDE4OS4wNTEgNDE5LjU4MSAxOTQuMzcgNDE1LjAxOCAxOTguMTg3QzQxMC40NTUgMjAyLjAwNCA0MDQuNjQzIDIwNC4wNjEgMzk4LjY1OCAyMDMuOTc2SDMyOC4yMjNDMzI3Ljg2OSAyMDMuOTg0IDMyNy41MjQgMjA0LjA4NiAzMjcuMjI0IDIwNC4yNzFDMzI2LjkyNCAyMDQuNDU1IDMyNi42NzkgMjA0LjcxNiAzMjYuNTE1IDIwNS4wMjVDMzI2LjM1MiAyMDUuMzM1IDMyNi4yNzYgMjA1LjY4MiAzMjYuMjk0IDIwNi4wM0MzMjYuMzEzIDIwNi4zNzkgMzI2LjQyNyAyMDYuNzE2IDMyNi42MjMgMjA3LjAwNloiIGZpbGw9InVybCgjcGFpbnQwX3JhZGlhbF80MDJfMTQ1KSIvPgo8ZGVmcz4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDBfcmFkaWFsXzQwMl8xNDUiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoOTEuNjQyOCAxNTYuMDg3KSByb3RhdGUoMzEuODUyNikgc2NhbGUoMzkzLjE4NyAzMjAuOTA5KSI+CjxzdG9wIHN0b3AtY29sb3I9IiM3NTAwRUIiLz4KPHN0b3Agb2Zmc2V0PSIwLjQ4NjQyIiBzdG9wLWNvbG9yPSIjRTQyNTc1Ii8+CjxzdG9wIG9mZnNldD0iMC43OTE2NjciIHN0b3AtY29sb3I9IiNFNDI1NzUiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY2OTE0Ii8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==',
  },
  {
    id: 'OKX Wallet',
    name: 'OKX Wallet' as WalletName,
    url: 'https://www.okx.com/web3',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJDSURBVHgB7Zq9jtpAEMfHlhEgQLiioXEkoAGECwoKxMcTRHmC5E3IoyRPkPAEkI7unJYmTgEFTYwA8a3NTKScLnCHN6c9r1e3P2llWQy7M/s1Gv1twCP0ej37dDq9x+Zut1t3t9vZjDEHIiSRSPg4ZpDL5fxkMvn1cDh8m0wmfugfO53OoFQq/crn8wxfY9EymQyrVCqMfHvScZx1p9ls3pFxXBy/bKlUipGPrVbLuQqAfsCliq3zl0H84zwtjQrOw4Mt1W63P5LvBm2d+Xz+YzqdgkqUy+WgWCy+Mc/nc282m4FqLBYL+3g8fjDxenq72WxANZbLJeA13zDX67UDioL5ybXwafMYu64Ltn3bdDweQ5R97fd7GyhBQMipx4POeEDHIu2LfDdBIGGz+hJ9CQ1ABjoA2egAZPM6AgiCAEQhsi/C4jHyPA/6/f5NG3Ks2+3CYDC4aTccDrn6ojG54MnEvG00GoVmWLIRNZ7wTCwDHYBsdACy0QHIhiuRETxlICWpMMhGZHmqS8qH6JLyGegAZKMDkI0uKf8X4SWlaZo+Pp1bRrwlJU8ZKLIvUjKh0WiQ3sRUbNVq9c5Ebew7KEo2m/1p4jJ4qAmDaqDQBzj5XyiAT4VCQezJigAU+IDU+z8vJFnGWeC+bKQV/5VZ71FV6L7PA3gg3tXrdQ+DgLhC+75Wq3no69P3MC0NFQpx2lL04Ql9gHK1bRDjsSBIvScBnDTk1WrlGIZBorIDEYJj+rhdgnQ67VmWRe0zlplXl81vcyEt0rSoYDUAAAAASUVORK5CYII=',
  },
  {
    id: 'Glow',
    name: 'Glow' as WalletName,
    url: 'https://glow.app',
    icon: 'https://glow.app/landing/app-icons/barney.png',
  },
];

type SolanaJupiterProviderContextType = {
  wallets: Adapter[];
};

export const SolanaJupiterProviderContext = createContext<SolanaJupiterProviderContextType>(null);
export const useJupiterContext = () => {
  const context = useContext(SolanaJupiterProviderContext);
  if (!context) {
    throw new Error('useJupiterContext must be used within a SolanaJupiterProvider');
  }

  return context;
};

export const SolanaJupiterProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { reownAdapter } = useWrappedReownAdapter({
    appKitOptions: {
      metadata: {
        name: 'Solana Web3',
        description: 'Solana Web3',
        url: 'https://solana.com',
        icons: ['https://solana.com/favicon.ico'],
      },
      projectId: '4f7010b1102d4ef8cfa1f7f34eaf6aaf',
    },
  });

  const wallets: Adapter[] = useMemo(() => {
    const allAdapters = [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new TrustWalletAdapter(),
      reownAdapter,
      new Coin98WalletAdapter(),
      new LedgerWalletAdapter(),
      new TrezorWalletAdapter(),
      new BitgetWalletAdapter(),
    ].filter(item => !!item) as Adapter[];

    return allAdapters.filter(item => !!item) as Adapter[];
  }, [reownAdapter]);

  return (
    <SolanaJupiterProviderContext.Provider value={{ wallets }}>
      <UnifiedWalletProvider
        wallets={wallets}
        config={{
          env: 'mainnet-beta',
          autoConnect: true,
          metadata: {
            name: 'Solana Web3',
            url: 'https://solana.com',
            description: 'Solana Web3',
            iconUrls: ['https://solana.com/favicon.ico'],
          },
          hardcodedWallets: HARDCODED_WALLET_STANDARDS,
          walletPrecedence: [
            'Phantom' as WalletName,
            'Solflare' as WalletName,
            'Coinbase Wallet' as WalletName,
            'Trust' as WalletName,
            'Backpack' as WalletName,
            'WalletConnect/Reown' as WalletName,
            'Magic Eden' as WalletName,
          ],
          notificationCallback: {
            onConnect: (props: IWalletNotification) => {
              console.log('onConnect', props);
            },
            onConnecting: (props: IWalletNotification) => {
              console.log('onConnecting', props);
            },
            onDisconnect: (props: IWalletNotification) => {
              console.log('onDisconnect', props);
            },
            onNotInstalled: (props: IWalletNotification) => {
              console.log('onNotInstalled', props);
            },
          },
          theme: 'dark',
          lang: 'en',
        }}
      >
        {children}
      </UnifiedWalletProvider>
    </SolanaJupiterProviderContext.Provider>
  );
};
