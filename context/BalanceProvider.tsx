import { ERC20_ABI } from '@/lib/constants/web3';
import { TokenBalance } from '@/lib/entities/balance.entity';
import { AppNumber } from '@/lib/providers/math/app-number.provider';
import {
  getSingleTokenBalanceQuery,
  getTokenBalanceQuery,
  updateMultipleTokenBalances,
} from '@/redux/balance.state';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getWhitelistedTokens } from '@/redux/whitelisted-token.state';
import type { JsonRpcProvider } from 'ethers';
import { ethers } from 'ethers';
import type { FC, ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSigner } from './SignerProvider';

import * as SeiTokens from '@/lib/constants/token/pacific-1';

export const BalanceContext = createContext<{
  balances: Record<string, TokenBalance>;
  isFetching: boolean;
  getBalances(force?: boolean): void;
}>(null);

export const BalanceProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();

  const balances = useSelector(getTokenBalanceQuery);
  const {
    rpcSigner,
    rpcProvider,
    service: { signerTokenService },
  } = useSigner();
  const whitelistedTokens = useAppSelector(getWhitelistedTokens);

  const [isFetching, setIsFetching] = useState(false);

  const fetchAllowanceFromContract = async (
    provider: JsonRpcProvider,
    walletAddress: string,
    tokenAddress: string,
    contractAddress: string
  ) => {
    try {
      return await new ethers.Contract(tokenAddress, ERC20_ABI, provider).allowance(
        walletAddress,
        contractAddress
      );
    } catch {
      return 0;
    }
  };

  const fetchBalanceFromContract = useCallback(
    async (provider: JsonRpcProvider, contractAddress: string) => {
      try {
        return await new ethers.Contract(contractAddress, ERC20_ABI, provider).balanceOf(
          rpcSigner.address
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        return 0;
      }
    },
    [rpcSigner]
  );

  const getBalances = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (force = false) => {
      setIsFetching(true);
      Promise.all(
        [SeiTokens.SEI, SeiTokens.USDC, SeiTokens.USDT]
          .filter(token => token.chain === 'evm')
          .map(async token => {
            console.log('token', token);
            const tokenInfo = signerTokenService.getTokenEntity(token.contractAddress);

            if (!rpcProvider || !rpcSigner || !rpcSigner?.address) {
              return TokenBalance.from({
                allowances: {},
                balance: new AppNumber(0),
                rawBalance: new AppNumber(0),
                tokenInfo,
              });
            }

            if (token.isGasToken) {
              const rawNativeBalance = AppNumber.from(
                (await rpcProvider.getBalance(rpcSigner.address)) ?? 0
              );
              return TokenBalance.from({
                allowances: {},
                rawBalance: rawNativeBalance,
                balance: await rawNativeBalance.getRealTokenAmount(token.decimals),
                tokenInfo,
              });
            }

            const balance = await fetchBalanceFromContract(rpcProvider, token.contractAddress);

            return TokenBalance.from({
              allowances: {},
              balance: AppNumber.from(balance).getRealTokenAmount(token.decimals),
              rawBalance: new AppNumber(balance),
              tokenInfo,
            });
          })
      )
        .then(balances => {
          // balances.map((balance) => console.log("Token: ", balance.tokenInfo.symbol, "allowances: ", Object.keys(balance.allowances).map((key) => balance.allowances[key].toString())));
          dispatch(updateMultipleTokenBalances(balances));
        })
        .catch(error => {
          console.error('Error fetching balances', error);
        })
        .finally(() => setIsFetching(false));
    },
    [
      whitelistedTokens,
      signerTokenService,
      rpcProvider,
      rpcSigner,
      fetchBalanceFromContract,
      dispatch,
    ]
  );

  useEffect(() => {
    getBalances();
  }, [rpcSigner, rpcProvider, signerTokenService, whitelistedTokens, setIsFetching, getBalances]);

  return (
    <BalanceContext.Provider value={{ balances, isFetching, getBalances }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalances = () => {
  const context = useContext(BalanceContext);
  if (!context) throw new Error('Must be in provider');
  return context;
};

export const useGetBalances = () => {
  const context = useContext(BalanceContext);
  if (!context) throw new Error('Must be in provider');
  return context;
};

export const useSingleBalance = (address: string) => {
  return useSelector(state => getSingleTokenBalanceQuery(state, address));
};

export const useSingleBalanceBySymbol = (symbol: string) => {
  const balances = useAppSelector(getWhitelistedTokens);
  const balance = Object.values(balances).find(
    token => token.symbol.toLowerCase() === symbol.toLowerCase()
  );

  const tokenBalance = useSelector(state =>
    getSingleTokenBalanceQuery(state, balance?.contractAddress)
  );

  if (!tokenBalance && balance) {
    return TokenBalance.from({
      allowances: {},
      balance: new AppNumber(0),
      rawBalance: new AppNumber(0),
      tokenInfo: balance,
    });
  }

  return tokenBalance;
};
