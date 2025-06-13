import type { FC } from 'react';
import { useEffect } from 'react';

import { useInitTokens } from '@/context/useInitTokens';
export const OnLoadModule: FC = () => {
  const { updateTokens } = useInitTokens();

  useEffect(() => {
    updateTokens();
  }, []);

  return <></>;
};
