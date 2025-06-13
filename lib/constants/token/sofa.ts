import { ChainKey } from '@/lib/entities/chain.entity';
import type { Token } from '@/lib/entities/token.entity';

export const SOFA_TOKEN_USDC: Token = {
  contractAddress: '0x3894085Ef7Ff0f0aeDf52E2A2704928d1Ec074F1',
  symbol: 'USDC',
  name: 'USDC',
  decimals: 6,
  chainKey: ChainKey.PACIFIC_1,
  logo: 'https://raw.githubusercontent.com/Seitrace/sei-assetlist/main/images/USDCoin.svg',
  info: {
    address: '0x3894085Ef7Ff0f0aeDf52E2A2704928d1Ec074F1',
    symbol: 'USDC',
    name: 'USDC',
    decimals: 6,
  },
};

export const SOFA_TOKEN_USDA: Token = {
  contractAddress: '0x6aB5d5E96aC59f66baB57450275cc16961219796',
  symbol: 'sUSDa',
  name: 'USDa saving token',
  chainKey: ChainKey.PACIFIC_1,
  logo: 'https://assets.coingecko.com/coins/images/51821/standard/USDA.png?1732035172',
  info: {
    address: '0x6aB5d5E96aC59f66baB57450275cc16961219796',
    symbol: 'sUSDa',
    name: 'USDa saving token',
    decimals: 6,
  },
};
