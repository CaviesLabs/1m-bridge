import { ChainKey } from '@/lib/entities/chain.entity';
import { Token } from '@/lib/entities/token.entity';
import * as Tokens from './base';

const parser = Token.getChainFromParser(ChainKey.PACIFIC_1);

export const MOCK_TOKEN = Token.fromEntity(
  ChainKey.ATLANTIC_2,
  {
    name: 'WSEI',
    symbol: 'WSEI',
    logo: '/icons/tokens/ft_shield.svg',
  },
  {
    contractAddress: '0x556a91f510f1c97a849103bd308b1d47c57f8db5',
  }
);

export const SEI = parser(Tokens.SEI, {
  contractAddress: Tokens.NATIVE_ADDRESS,
  wrappedTokenAddress: '0xE30feDd158A2e3b13e9badaeABaFc5516e95e8C7',
});

export const wSEI = parser(Tokens.wSEI, {
  contractAddress: '0xE30feDd158A2e3b13e9badaeABaFc5516e95e8C7',
});

export const pSEI = parser(Tokens.pSEI, {
  contractAddress: '0xPSEI',
});

export const ISEI = parser(Tokens.ISEI, {
  contractAddress: '0xISEI',
});

export const pISEI = parser(Tokens.pISEI, {
  contractAddress: '0xPISEI',
});

export const USDT = parser(
  {
    chainKey: ChainKey.PACIFIC_1,
    logo: 'https://pit.finance/icons/tokens/png/usdt.png',
    decimals: 6,
    name: 'USDT',
    symbol: 'USDT',
    defaultToken: true,
    usdValue: 1,
  },
  {
    contractAddress: '0xB75D0B03c06A926e488e2659DF1A861F860bD3d1',
  }
);

export const pUSDT = parser(Tokens.pUSDT, {
  contractAddress: '0xPUSDT',
});

export const USDC = parser(
  {
    chainKey: ChainKey.PACIFIC_1,
    logo: 'https://pit.finance/icons/tokens/png/usdc.png',
    decimals: 6,
    name: 'USDC',
    symbol: 'USDC',
    defaultToken: true,
    usdValue: 0.999801,
  },
  {
    contractAddress: '0x3894085Ef7Ff0f0aeDf52E2A2704928d1Ec074F1',
  }
);

export const pUSDC = parser(Tokens.pUSDC, {
  contractAddress: '0xPUSDC',
});
