import { useWallet } from '@jup-ag/wallet-adapter';
import type { TransactionInstruction } from '@solana/web3.js';
import { Transaction } from '@solana/web3.js';
import type { Network, UnsignedTransaction } from '@wormhole-foundation/sdk-connect';
import type { FC, ReactNode } from 'react';
import { createContext, useCallback, useContext } from 'react';
import type { SolanaChains } from '../lib/wormhole/types';
import {
  isVersionedTransaction,
  type SolanaUnsignedTransaction,
} from '../lib/wormhole/unsignedTransaction';
import { useSolanaWeb3 } from './SolanaWeb3Provider';

export type SolanaSigner = {
  signAndSendTransaction(instructions: TransactionInstruction[]): Promise<string>;
  signAndSendWormholeEntity(tx: UnsignedTransaction[]): Promise<any[]>;
};

export const SolanaSignerContext = createContext<SolanaSigner>(null);
export const useSolanaSigner = () => {
  const context = useContext(SolanaSignerContext);
  if (!context) {
    throw new Error('useSolanaSigner must be used within a SolanaSignerContext');
  }

  return context;
};

export const SolanaSignerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { connection } = useSolanaWeb3();
  const { publicKey, signTransaction } = useWallet();

  const signAndSendTransaction = useCallback(
    async (instructions: TransactionInstruction[]): Promise<string> => {
      const transaction = new Transaction();
      transaction.add(...instructions);

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signedTransaction = await signTransaction(transaction);

      const rawTransaction = signedTransaction.serialize();
      const signature = await connection.sendRawTransaction(rawTransaction);

      console.log(`Transaction sent: ${signature}`);
      console.log(`Transaction signature: ${signature}`);

      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: signature,
      });
      console.log(`Transaction confirmed: ${signature}`);
      return signature;
    },
    [connection, publicKey, signTransaction]
  );

  const signAndSendWormholeEntity = async (tx: UnsignedTransaction[]): Promise<any[]> => {
    if (!publicKey) {
      throw new Error('Wallet not connected');
    }

    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    const txids: string[] = [];

    for (const txn of tx) {
      const {
        transaction: { transaction, signers },
      } = txn as SolanaUnsignedTransaction<Network, SolanaChains>;

      if (!transaction) {
        throw new Error('Invalid transaction format: missing transaction object');
      }

      try {
        let signedTransaction;

        if (isVersionedTransaction(transaction)) {
          // For versioned transactions, preserve the original structure
          transaction.message.recentBlockhash = blockhash;
          console.log('Signing versioned transaction...');
          signedTransaction = await signTransaction(transaction);
        } else {
          // For legacy transactions, preserve the original structure
          (transaction as Transaction).recentBlockhash = blockhash;
          (transaction as Transaction).lastValidBlockHeight = lastValidBlockHeight;
          (transaction as Transaction).feePayer = publicKey;
          console.log('Signing legacy transaction...');

          // First sign with your wallet
          signedTransaction = await signTransaction(transaction);

          // Then add any additional signers signature if needed
          // In this case, the signers are the wormhole entities (PDA programs)
          if (signers && signers.length > 0) {
            console.log({ signers });
            console.log('Adding additional signers...');
            (signedTransaction as Transaction).partialSign(...signers);
          }
        }

        if (!signedTransaction) {
          throw new Error('Failed to sign transaction');
        }

        const rawTransaction = signedTransaction.serialize();
        console.log('Serialized transaction length:', rawTransaction.length);

        const signature = await connection.sendRawTransaction(rawTransaction, {
          skipPreflight: false,
          preflightCommitment: 'confirmed',
        });

        console.log('Transaction sent:', signature);
        txids.push(signature);

        // Wait for confirmation
        const confirmation = await connection.confirmTransaction({
          signature,
          blockhash,
          lastValidBlockHeight,
        });

        if (confirmation.value.err) {
          console.error('Transaction confirmation error:', confirmation.value.err);
          throw new Error(`Transaction failed: ${confirmation.value.err}`);
        }

        console.log('Transaction confirmed successfully');
      } catch (error) {
        console.error('Transaction signing error:', error);
        throw error;
      }
    }

    console.log('txids', txids);
    return txids;
  };

  return (
    <SolanaSignerContext.Provider
      value={{
        signAndSendTransaction,
        signAndSendWormholeEntity,
      }}
    >
      {children}
    </SolanaSignerContext.Provider>
  );
};
