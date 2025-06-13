import { Token } from "@/lib/entities/token.entity";
import { ChainKey } from "@/lib/entities/chain.entity";

export const NATIVE_ADDRESS = "0x0000000000000000000000000000000000000000";

export const SEI = Token.fromRawEntity({
  chainKey: ChainKey.PACIFIC_1,
  name: "Sei",
  symbol: "SEI",
  decimals: 18,
  contractAddress: "0x0000000000000000000000000000000000000000",
  wrappedTokenAddress: "0x027D2E627209f1cebA52ADc8A5aFE9318459b44B",
  isGasToken: true,
  recommended: true,
  logo: "/icons/tokens/png/sei.png",
  unOfficial: false,
  defaultToken: true,
});

export const wSEI = Token.fromRawEntity({
  chainKey: ChainKey.PACIFIC_1,
  name: "Wrapped SEI",
  symbol: "WSEI",
  decimals: 18,
  contractAddress: "0x027D2E627209f1cebA52ADc8A5aFE9318459b44B",
  isGasToken: false,
  isWrappedToken: true,
  recommended: true,
  logo: "/icons/tokens/png/wsei.png",
  unOfficial: false,
  defaultToken: true,
});

export const pSEI = Token.fromRawEntity({
  chainKey: ChainKey.PACIFIC_1,
  name: "pISEI",
  symbol: "pISEI",
  decimals: 18,
  contractAddress: "0x000000000000000000000000000000000000000piiSEIii",
  isGasToken: false,
  recommended: true,
  logo: "/icons/tokens/png/psei.png",
  unOfficial: false,
  isPitToken: true,
});

export const ISEI = Token.fromRawEntity({
  chainKey: ChainKey.PACIFIC_1,
  name: "Silo Staked SEI",
  symbol: "iSEI",
  decimals: 18,
  contractAddress: "0x5Cf6826140C1C56Ff49C808A1A75407Cd1DF9423",
  recommended: true,
  logo: "/icons/tokens/png/isei.png",
  unOfficial: false,
  defaultToken: true,
});

export const pISEI = Token.fromRawEntity({
  chainKey: ChainKey.PACIFIC_1,
  name: "Pi Silo Staked SEI",
  symbol: "pISEI",
  decimals: 18,
  contractAddress: "0x5Cf6826140C1C56Ff49C808A1A75407Cd1DF9423PiISEI",
  recommended: true,
  logo: "/icons/tokens/png/piisei.png",
  unOfficial: false,
  isPitToken: true,
});

export const USDT = Token.fromRawEntity({
  chainKey: ChainKey.PACIFIC_1,
  name: "Tether",
  symbol: "USDT",
  decimals: 18,
  contractAddress: "0xB75D0B03c06A926e488e2659DF1A861F860bD3d1",
  recommended: true,
  logo: "/icons/tokens/png/usdt.png",
  unOfficial: false,
  defaultToken: true,
});

export const pUSDT = Token.fromRawEntity({
  chainKey: ChainKey.PACIFIC_1,
  name: "Pi Tether",
  symbol: "pUSDT",
  decimals: 18,
  contractAddress: "0xB75D0B03c06A926e488e2659DF1A861F860bD3d1iPiUSDT",
  recommended: true,
  logo: "/icons/tokens/png/pusdt.png",
  unOfficial: false,
  isPitToken: true,
});

export const USDC = Token.fromRawEntity({
  chainKey: ChainKey.PACIFIC_1,
  name: "USDC",
  symbol: "USDC",
  decimals: 18,
  contractAddress: "0x3894085Ef7Ff0f0aeDf52E2A2704928d1Ec074F2",
  recommended: true,
  logo: "/icons/tokens/png/usdc.png",
  unOfficial: false,
  defaultToken: true,
});

export const pUSDC = Token.fromRawEntity({
  chainKey: ChainKey.PACIFIC_1,
  name: "Pi USDC",
  symbol: "pUSDC",
  decimals: 18,
  contractAddress: "0x3894085Ef7Ff0f0aeDf52E2A2704928d1Ec074F2PiUSDC",
  recommended: true,
  logo: "/icons/tokens/png/pusdc.png",
  unOfficial: false,
  isPitToken: true,
});
