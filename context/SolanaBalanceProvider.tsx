import { TokenBalance } from '@/lib/entities/balance.entity';
import { AppNumber } from '@/lib/providers/math/app-number.provider';
import { updateMultipleTokenBalances } from '@/redux/balance.state';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getWhitelistedTokensByChain } from '@/redux/whitelisted-token.state';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import React, { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { SOLANA_MINT } from '../lib/wormhole/helpers';
import { useSolanaNetwork } from './SolanaWeb3Provider';
import { useSolana } from './useSolanaWallet';

interface SolanaBalancesContextType {
  refetchBalances(): Promise<any>;
}

const SolanaBalancesContext = createContext<SolanaBalancesContextType | null>(null);

export const useSolanaBalances = () => {
  const context = useContext(SolanaBalancesContext);
  if (!context) {
    throw new Error('useSolanaBalances must be used within SolanaBalancesProvider');
  }
  return context;
};

export const SolanaBalancesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(getWhitelistedTokensByChain('solana'));
  const hasFetchedBalances = useRef(false);
  const { publicKey } = useSolana();
  const { connection } = useSolanaNetwork();

  const getBalances = useCallback(async () => {
    if (Object.keys(tokens).length === 0 || hasFetchedBalances.current) {
      return;
    }

    if (!publicKey) {
      const zeroBalances = updateMultipleTokenBalances(
        Object.values(tokens).map(token => TokenBalance.fromZeroBalance(token))
      );

      dispatch(zeroBalances);
      return;
    }

    try {
      hasFetchedBalances.current = true;
      // Get all token accounts owned by the wallet
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
        programId: TOKEN_PROGRAM_ID,
      });

      // Get SOL balance
      const solBalance = await connection.getBalance(publicKey);
      const solDecimals = 9; // SOL has 9 decimals

      // Process token accounts
      const tokenBalances = tokenAccounts.value.map(account => {
        const parsedInfo = account.account.data.parsed.info;
        return {
          mint: parsedInfo.mint,
          amount: Number(parsedInfo.tokenAmount.amount),
          decimals: parsedInfo.tokenAmount.decimals,
          uiAmount: Number(parsedInfo.tokenAmount.uiAmount),
        };
      });

      // Add SOL balance
      const allBalances = [
        {
          mint: SOLANA_MINT,
          amount: solBalance,
          decimals: solDecimals,
          uiAmount: solBalance / Math.pow(10, solDecimals),
        },
        ...tokenBalances,
      ];

      const balances = allBalances
        .map(balance => {
          const token = tokens[balance.mint];
          if (!token) return null;

          return TokenBalance.from({
            allowances: {},
            balance: AppNumber.from(balance.amount).divide(
              AppNumber.from(Math.pow(10, token.decimals))
            ),
            rawBalance: AppNumber.from(balance.amount),
            tokenInfo: token,
          });
        })
        .filter(Boolean);

      // Add zero balance tokens that are not in the balances
      const notHoldingTokensWithBalance = Object.values(tokens)
        .filter(
          token =>
            !balances.some(balance => balance?.tokenInfo?.contractAddress === token.contractAddress)
        )
        .map(token => TokenBalance.fromZeroBalance(token));

      dispatch(updateMultipleTokenBalances([...balances, ...notHoldingTokensWithBalance]));

      return balances;
    } catch (err) {
      console.log(err instanceof Error ? err : new Error('Failed to fetch balances'));
      console.error('Error fetching balances:', err);
      hasFetchedBalances.current = false; // Reset on error to allow retry
    }
  }, [connection, publicKey, tokens]);

  useEffect(() => {
    getBalances();
  }, [getBalances, tokens]);

  return (
    <SolanaBalancesContext.Provider
      value={{
        refetchBalances: getBalances,
      }}
    >
      {children}
    </SolanaBalancesContext.Provider>
  );
};
