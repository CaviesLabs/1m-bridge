import type { Chain } from "viem/chains";
import { ChainConfig, ChainKey } from "@/lib/entities/chain.entity";
import * as atlantic2Tokens from "@/lib/constants/token/atlantic-2";
import * as pacific1Tokens from "@/lib/constants/token/pacific-1";
import * as arctic1Tokens from "@/lib/constants/token/arctic-1";

export const META_DATA_MODAL = {};

export const RPC_URLS: Record<ChainKey, string> = {
  [ChainKey.ARCTIC_1]: "https://evm-rpc-arctic-1.sei-apis.com",
  [ChainKey.ATLANTIC_2]: "https://evm-rpc-testnet.sei-apis.com",
  [ChainKey.PACIFIC_1]: "https://evm-rpc.sei-apis.com",
};

const NATIVE_CURRENCY = { name: "SEI", symbol: "SEI", decimals: 18 };

const BLOCK_EXPLORERS: { default: Record<string, string> } = {
  default: { name: "Seitrace", url: "https://seitrace.com" },
};

export const PACIFIC_1_CONFIG = {
  id: 1329,
  name: "SEI",
  nativeCurrency: NATIVE_CURRENCY,
  rpcUrls: {
    default: { http: [RPC_URLS["pacific-1"]] },
    public: { http: [RPC_URLS["pacific-1"]] },
  },
  blockExplorers: BLOCK_EXPLORERS,
} as unknown as Chain;

export const PACIFIC_1_CHAIN = ChainConfig.fromEntity({
  chainId: 1329,
  disabled: false,
  chainName: "pacific-1 (mainnet)",
  chainKey: ChainKey.PACIFIC_1,
  config: PACIFIC_1_CONFIG,
  rpcUrl: RPC_URLS[ChainKey.PACIFIC_1],
  blockExplorer: BLOCK_EXPLORERS.default as any,
  nativeToken: pacific1Tokens.SEI,
  wrappedNativeToken: pacific1Tokens.wSEI,
  whiteListedTokens: [
    pacific1Tokens.SEI,
    pacific1Tokens.wSEI,
    pacific1Tokens.pSEI,
    pacific1Tokens.ISEI,
    pacific1Tokens.pISEI,
    pacific1Tokens.USDC,
    pacific1Tokens.pUSDC,
    pacific1Tokens.USDT,
    pacific1Tokens.pUSDT,
  ],
});

export const ARCTIC_1_CONFIG = {
  id: 713715,
  name: "SEI DevNet",
  nativeCurrency: NATIVE_CURRENCY,
  rpcUrls: {
    default: { http: [RPC_URLS["arctic-1"]] },
    public: { http: [RPC_URLS["arctic-1"]] },
  },
  blockExplorers: BLOCK_EXPLORERS,
} as unknown as Chain;

export const ARCTIC_1_CHAIN = ChainConfig.fromEntity({
  chainId: 713715,
  disabled: false,
  chainName: "arctic-1 (devnet)",
  chainKey: ChainKey.ARCTIC_1,
  config: ARCTIC_1_CONFIG,
  rpcUrl: RPC_URLS[ChainKey.ARCTIC_1],
  blockExplorer: BLOCK_EXPLORERS.default as any,
  nativeToken: arctic1Tokens.SEI,
  wrappedNativeToken: arctic1Tokens.wSEI,
  whiteListedTokens: [
    arctic1Tokens.SEI,
    arctic1Tokens.wSEI,
    arctic1Tokens.pSEI,
    arctic1Tokens.ISEI,
    arctic1Tokens.pISEI,
    arctic1Tokens.USDC,
    arctic1Tokens.pUSDC,
    arctic1Tokens.USDT,
    arctic1Tokens.pUSDT,
  ],
});

export const ATLANTIC_2_CONFIG = {
  id: 1328,
  name: "SEI Testnet",
  nativeCurrency: NATIVE_CURRENCY,
  rpcUrls: {
    default: { http: [RPC_URLS["atlantic-2"]] },
    public: { http: [RPC_URLS["atlantic-2"]] },
  },
  blockExplorers: BLOCK_EXPLORERS,
} as unknown as Chain;

export const ATLANTIC_2_CHAIN = ChainConfig.fromEntity({
  chainId: 1328,
  disabled: false,
  chainName: "atlantic-2 (testnet)",
  chainKey: ChainKey.ATLANTIC_2,
  config: ATLANTIC_2_CONFIG,
  rpcUrl: RPC_URLS[ChainKey.ATLANTIC_2],
  blockExplorer: BLOCK_EXPLORERS.default as any,
  nativeToken: atlantic2Tokens.SEI,
  wrappedNativeToken: atlantic2Tokens.wSEI,
  whiteListedTokens: [
    atlantic2Tokens.SEI,
    atlantic2Tokens.wSEI,
    atlantic2Tokens.pSEI,
    atlantic2Tokens.ISEI,
    atlantic2Tokens.pISEI,
    atlantic2Tokens.USDC,
    atlantic2Tokens.pUSDC,
    atlantic2Tokens.USDT,
    atlantic2Tokens.pUSDT,
    atlantic2Tokens.MOCK_TOKEN,
  ],
});
