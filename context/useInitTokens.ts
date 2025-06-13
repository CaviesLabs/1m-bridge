import * as SolanaTokens from '@/lib/constants/token/solana';
import { Token } from '@/lib/entities/token.entity';
import { useAppDispatch } from '@/redux/store';
import { updateMultipleTokens } from '@/redux/whitelisted-token.state';
import { useCallback } from 'react';

import * as SeiTokens from '@/lib/constants/token/pacific-1';
import { ChainKey } from '@/lib/entities/chain.entity';
import { uniqBy } from 'lodash';

export const useInitTokens = () => {
  const dispatch = useAppDispatch();

  const updateTokens = useCallback(() => {
    // Update tokens in redux
    dispatch(
      updateMultipleTokens(
        uniqBy(
          [...Object.values(SolanaTokens), SeiTokens.USDC, SeiTokens.USDT, SeiTokens.SEI].filter(
            Boolean
          ),
          'contractAddress'
        )
      )
    );
  }, []);

  return { updateTokens };
};

export const useUpdateSofaDepositCCyTokens = () => {
  const dispatch = useAppDispatch();

  const injectCollateral = useCallback(
    (data: { symbol: string; address: string | null }) => {
      return Token.fromEntity(
        ChainKey.PACIFIC_1,
        { name: data.symbol, symbol: data.symbol },
        { contractAddress: data.address }
      );
    },
    [dispatch]
  );

  return injectCollateral;
};
