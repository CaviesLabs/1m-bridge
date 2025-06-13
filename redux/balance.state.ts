import { TokenBalance } from '@/lib/entities/balance.entity';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import type { RootState } from './store';

export class Balance {
  walletAddress: string;
  nativeBalance: Record<string, any>;
  tokenBalances: Record<string, Record<string, any>>;
  stakingBalances: Record<string, string>;
}

/**
 * @notice Define Balances slice.
 */
const balancesSlice = createSlice({
  name: 'balance',
  initialState: {
    walletAddress: '',
    nativeBalance: {},
    tokenBalances: {},
    stakingBalances: {},
  } as Balance,
  reducers: {
    /**
     * @dev This function is used to update app settings.
     * @param state The app settings entity.
     * @param action The payload action.
     * @returns The app settings entity.
     */
    updateSingleTokenBalance: (state, action: PayloadAction<TokenBalance>) => {
      return {
        ...state,
        tokenBalances: {
          ...state.tokenBalances,
          [action.payload.tokenInfo.contractAddress]: instanceToPlain(action.payload),
        },
      };
    },

    /**
     * @dev This function is used to update wallet address.
     * @param state The app settings entity.
     * @param action The payload action.
     * @returns The app settings entity.
     */
    updateWalletAddress: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        walletAddress: action.payload,
      };
    },

    /**
     * @dev This function is used to update native balance.
     * @param state The app settings entity.
     * @param action The payload action.
     * @returns The app settings entity.
     */
    updateNativeBalance: (state, action: PayloadAction<TokenBalance>) => {
      return {
        ...state,
        nativeBalance: instanceToPlain(action.payload),
      };
    },

    /**
     * @dev This function is used to update multiple token balances.
     * @param state The app settings entity.
     * @param action The payload action.
     * @returns The app settings entity.
     */
    updateMultipleTokenBalances: (state, action: PayloadAction<TokenBalance[]>) => {
      const aggregatedBalance = action.payload.reduce((acc, elm) => {
        if (!elm) return acc;
        return {
          ...acc,
          [elm.tokenInfo.contractAddress]: instanceToPlain(elm),
        };
      }, {});

      return {
        ...state,
        tokenBalances: {
          ...state.tokenBalances,
          ...aggregatedBalance,
        },
      };
    },
  },
});

export const {
  updateWalletAddress,
  updateNativeBalance,
  updateSingleTokenBalance,
  updateMultipleTokenBalances,
} = balancesSlice.actions;
export default balancesSlice.reducer;

const _getTokenBalanceQuery = (state: RootState) => state.balances.tokenBalances;

/** Selector queries declaration **/
export const getTokenBalanceQuery = createSelector([_getTokenBalanceQuery], tokenBalances => {
  return Object.values(tokenBalances).reduce((accum, tokenBalance) => {
    return {
      ...accum,
      [tokenBalance.tokenInfo.contractAddress]: plainToInstance(TokenBalance, tokenBalance),
    };
  }, {} as Record<string, TokenBalance>) as Record<string, TokenBalance>;
});

export const getSingleTokenBalanceQuery = createSelector(
  [_getTokenBalanceQuery, (_, address: string) => address],
  (tokenBalances, address) => {
    return plainToInstance(TokenBalance, tokenBalances[address]);
  }
);

export const getNativeTokenBalance = createSelector(
  [(state: RootState) => state.balances.nativeBalance],
  nativeBalance => {
    return plainToInstance(TokenBalance, nativeBalance);
  }
);

export const getWalletAddressQuery = (state: RootState) => state.balances.walletAddress;
