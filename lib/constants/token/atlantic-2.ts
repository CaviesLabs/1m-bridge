import { Token } from "@/lib/entities/token.entity";
import * as Tokens from "./base";
import { ChainKey } from "@/lib/entities/chain.entity";

const parser = Token.getChainFromParser(ChainKey.ATLANTIC_2);

export const MOCK_TOKEN = Token.fromEntity(
  ChainKey.ATLANTIC_2,
  {
    name: "WSEI",
    symbol: "WSEI",
    logo: "/icons/tokens/ft_shield.svg",
  },
  {
    contractAddress: "0x556a91f510f1c97a849103bd308b1d47c57f8db5",
  }
);

export const SEI = parser(Tokens.SEI, {
  contractAddress: Tokens.NATIVE_ADDRESS,
  wrappedTokenAddress: "0x027D2E627209f1cebA52ADc8A5aFE9318459b44B",
});

export const wSEI = parser(Tokens.wSEI, {
  contractAddress: "0x027D2E627209f1cebA52ADc8A5aFE9318459b44B",
});

export const pSEI = parser(Tokens.pSEI, {
  contractAddress: "0xPSEI",
});

export const ISEI = parser(Tokens.ISEI, {
  contractAddress: "0xISEI",
});

export const pISEI = parser(Tokens.pISEI, {
  contractAddress: "0xPISEI",
});

export const USDT = parser(Tokens.USDT, {
  contractAddress: "0xUSDT",
});

export const pUSDT = parser(Tokens.pUSDT, {
  contractAddress: "0xPUSDT",
});

export const USDC = parser(Tokens.USDC, {
  contractAddress: "0xUSDC",
});

export const pUSDC = parser(Tokens.pUSDC, {
  contractAddress: "0xPUSDC",
});
