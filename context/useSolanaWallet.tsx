import { useUnifiedWalletContext, useWallet } from '@jup-ag/wallet-adapter';
import { useCallback, useEffect, useState } from 'react';
import { useSolanaNetwork } from './SolanaWeb3Provider';

export const useSolana = () => {
  const { publicKey, disconnect: disconnectSolana, connected, signTransaction } = useWallet();
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { connection } = useSolanaNetwork();
  const { setShowModal } = useUnifiedWalletContext();

  const fetchBalance = useCallback(async () => {
    if (!publicKey) return;

    try {
      setIsLoading(true);
      const lamports = await connection.getBalance(publicKey);
      const solBalance = lamports / 10 ** 9;
      setBalance(solBalance);
    } catch (error) {
      console.warn('Failed to fetch balance:', error);
      setBalance(0);
    } finally {
      setIsLoading(false);
    }
  }, [connection, publicKey]);

  useEffect(() => {
    fetchBalance();
  }, [publicKey]);

  return {
    connected,
    balance,
    publicKey,
    isLoading,
    fetchBalance,
    disconnectSolana,
    signTransaction,
    connectSolana: async () => {
      try {
        setShowModal(true);
      } catch (err) {
        console.warn('Failed to connect to wallet:', err);
      }
    },
  };
};
