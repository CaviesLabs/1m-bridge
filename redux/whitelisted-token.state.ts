import { Token } from '@/lib/entities/token.entity';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import type { RootState } from './store';

export class WhitelistedToken {
  tokens: Record<string, Record<string, any>>;
}

/**
 * @notice Define Balances slice.
 */
const whitelistedTokenSlice = createSlice({
  name: 'whitelistedToken',
  initialState: {
    tokens: {},
  } as WhitelistedToken,
  reducers: {
    updateSingleToken: (state, action: PayloadAction<Token>) => {
      const tokens = {
        ...state.tokens,
        [action.payload.contractAddress]: instanceToPlain(action.payload),
      };

      return {
        ...state,
        tokens,
      };
    },

    updateMultipleTokens: (state, action: PayloadAction<Token[]>) => {
      const aggregated = action.payload.reduce((acc, elm) => {
        if (!elm) return acc;
        return {
          ...acc,
          [elm.contractAddress]: instanceToPlain(elm),
        };
      }, {});

      return {
        ...state,
        tokens: {
          ...state.tokens,
          ...aggregated,
        },
      };
    },
  },
});

export const { updateMultipleTokens, updateSingleToken } = whitelistedTokenSlice.actions;
export default whitelistedTokenSlice.reducer;

const query = (state: RootState) => state.whitelistedTokens.tokens;
type QueryInter = Record<string, Token>;

export const getWhitelistedTokens = createSelector([query], tokenBalances => {
  return Object.values(tokenBalances).reduce((accum, token) => {
    return {
      ...accum,
      [token.contractAddress]: plainToInstance(Token, token),
    };
  }, {} as QueryInter) as QueryInter;
});

export const getWhitelistedTokensByChain = (chain: 'evm' | 'solana') =>
  createSelector(
    [query],
    tokenBalances =>
      Object.values(tokenBalances).reduce((accum, token) => {
        if (token.chain !== chain) return accum;

        return {
          ...accum,
          [token.contractAddress]: plainToInstance(Token, token),
        };
      }, {} as QueryInter) as QueryInter
  );

export const getSingleWhitelistedToken = createSelector(
  [query, (_, address: string) => address],
  (tokens, address) => {
    return plainToInstance(Token, tokens[address]);
  }
);
