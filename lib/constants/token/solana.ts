import { ChainKey } from '@/lib/entities/chain.entity';
import type { Token } from '@/lib/entities/token.entity';

export const SOLANA_TOKEN_USDC: Token = {
  chain: 'solana',
  contractAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  symbol: 'USDC',
  name: 'USDC',
  decimals: 6,
  chainKey: ChainKey.SOLANA,
  logo: 'https://raw.githubusercontent.com/Seitrace/sei-assetlist/main/images/USDCoin.svg',
  info: {
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    symbol: 'USDC',
    name: 'USDC',
    decimals: 6,
  },
};

export const SOLANA_TOKEN_USDT: Token = {
  chain: 'solana',
  contractAddress: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  symbol: 'USDT',
  name: 'USDT',
  decimals: 6,
  chainKey: ChainKey.SOLANA,
  logo: '/icons/usdt.svg',
  info: {
    address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    symbol: 'USDT',
    name: 'USDT',
    decimals: 6,
  },
};

export const SOLANA_TOKEN_WTC: Token = {
  chain: 'solana',
  contractAddress: '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E',
  symbol: 'BTC',
  name: 'BTC',
  decimals: 6,
  chainKey: ChainKey.SOLANA,
  logo: '/icons/btc.svg',
  info: {
    address: '9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E',
    symbol: 'BTC',
    name: 'BTC',
    decimals: 6,
  },
};
