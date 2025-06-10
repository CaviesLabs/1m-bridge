'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface WalletContextType {
  isConnected: boolean;
  isConnecting: boolean;
  walletAddress: string | null;
  shortAddress: string | null;
  balance: string;
  avatar: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Generate random wallet address
const generateWalletAddress = (): string => {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
};

// Generate random balance
const generateBalance = (): string => {
  const balance = (Math.random() * 100 + 1).toFixed(3);
  return `${balance} ETH`;
};

// Generate random avatar URL from DiceBear
const generateAvatar = (): string => {
  const styles = ['avataaars', 'big-smile', 'bottts', 'identicon', 'initials', 'pixel-art'];
  const style = styles[Math.floor(Math.random() * styles.length)];
  const seed = Math.random().toString(36).substring(7);
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}&backgroundColor=random`;
};

// Shorten wallet address
const shortenAddress = (address: string): string => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [shortAddress, setShortAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState('0.000 ETH');
  const [avatar, setAvatar] = useState('');

  const connectWallet = async (): Promise<void> => {
    if (isConnected || isConnecting) return;

    setIsConnecting(true);

    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate wallet data
    const address = generateWalletAddress();
    const shortAddr = shortenAddress(address);
    const walletBalance = generateBalance();
    const avatarUrl = generateAvatar();

    setWalletAddress(address);
    setShortAddress(shortAddr);
    setBalance(walletBalance);
    setAvatar(avatarUrl);
    setIsConnected(true);
    setIsConnecting(false);
  };

  const disconnectWallet = (): void => {
    setIsConnected(false);
    setIsConnecting(false);
    setWalletAddress(null);
    setShortAddress(null);
    setBalance('0.000 ETH');
    setAvatar('');
  };

  const value: WalletContextType = {
    isConnected,
    isConnecting,
    walletAddress,
    shortAddress,
    balance,
    avatar,
    connectWallet,
    disconnectWallet,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet(): WalletContextType {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
