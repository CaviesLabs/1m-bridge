import { LanguageProvider } from '@/components/LanguageProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '1MBridge - DeFi Bridge',
  description:
    '1MBridge is a DeFi bridge that allows you to bridge your tokens between different chains.',
  icons: {
    icon: '/icons/logo.svg',
    apple: '/icons/logo.svg',
    other: {
      url: '/icons/logo.svg',
      type: 'image/svg+xml',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icons/logo.svg" />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
