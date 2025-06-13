import type { Token } from '@/lib/entities/token.entity';
import { useCallback } from 'react';
import { useWalletClient } from 'wagmi';

export const useAddWatchAssets = () => {
  const { data: walletClient } = useWalletClient();

  const addWatchAssets = useCallback(
    async (token: Token) => {
      return await walletClient.watchAsset({
        type: 'ERC20',
        options: {
          symbol: token.symbol,
          decimals: token.decimals,
          address: token.contractAddress,
          image: token.logo,
        },
      });
    },
    [walletClient]
  );

  return { addWatchAssets };
};
