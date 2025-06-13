import { VaultInfo } from "@/lib/entities/vault.entity";

// import { ChainKey } from "@/lib/entities/chain.entity";

// import * as arctic_1 from "./arctic-1";
// import * as pacific_1 from "./pacific-1";
// import * as atlantic_2 from "./atlantic-2";

// export const VAULTS = {
//   [ChainKey.ARCTIC_1]: Object.values(arctic_1),
//   [ChainKey.ATLANTIC_2]: Object.values(atlantic_2),
//   [ChainKey.PACIFIC_1]: Object.values(pacific_1),
// };

export const DUMMY_VAULT = VaultInfo.fromEntity({
  isDummyData: true,
  address: "0x1234567890abcdef1234567890abcdef12345678",
  type: "vault",
  kind: "single-asset",
  symbol: "vETH",
  display_symbol: "vETH",
  formated_symbol: "vETH",
  name: "Vault Ethereum",
  display_name: "Vault Ethereum",
  formated_name: "Vault Ethereum",
  icon: "https://dummyurl.com/icon.png",
  version: "v2",
  category: "yield",
  decimals: 18,
  chainID: 1,
  endorsed: true,
  boosted: false,
  emergency_shutdown: false,
  strategies: [],
  featuringScore: 85,
  pricePerShare: "1.05",

  tvl: {
    totalAssets: "1000000",
    tvl: 1050000,
    price: 1.05,
  },

  apr: {
    type: "annual",
    netAPR: 5.5,
    fees: {
      performance: 20,
      management: 2,
    },
    points: {
      weekAgo: 5.4,
      monthAgo: 5.2,
      inception: 4.8,
    },
    extra: {
      stakingRewardsAPR: 1.2,
      gammaRewardAPR: null,
    },
    forwardAPR: {
      type: "projected",
      netAPR: 6.0,
      compositxe: {
        boost: null,
        poolAPY: null,
        boostedAPR: null,
        baseAPR: 5.0,
        cvxAPR: null,
        rewardsAPR: 1.0,
        v3OracleCurrentAPR: 5.5,
        v3OracleStratRatioAPR: 0.5,
        v3OracleStratRatioAPY: 5.5,
      },
    },
  },

  info: {
    riskLevel: 3,
    isRetired: false,
    isBoosted: false,
    isHighlighted: true,
    riskScore: [2, 3, 3, 4, 2],
  },

  token: {
    address: "0xabcdefabcdefabcdefabcdefabcdefabcdef",
    underlyingTokensAddresses: [
      "0x1111111111111111111111111111111111111111",
      "0x2222222222222222222222222222222222222222",
    ],
    name: "Ethereum",
    symbol: "ETH",
    type: "ERC20",
    display_name: "Ethereum",
    display_symbol: "ETH",
    description: "The native cryptocurrency of the Ethereum blockchain.",
    icon: "https://dummyurl.com/eth-icon.png",
    decimals: 18,
  },

  staking: {
    address: "0xstakingaddressabcdef1234567890abcdef",
    available: true,
    source: "Staking Pool",
    rewards: {
      rewardToken: "vETH",
      rewardAmount: 100,
    },
  },

  details: {
    isRetired: false,
    isHidden: false,
    isAggregator: false,
    isBoosted: false,
    isAutomated: true,
    isHighlighted: true,
    isPool: true,
    stability: "stable",
    category: "yield",
  },

  migration: {
    available: false,
    address: "",
    contract: "",
  },
} as any);

export const DUMMY_VAULTS: any = [
  { ...DUMMY_VAULT, address: "1" },
  { ...DUMMY_VAULT, address: "2" },
  { ...DUMMY_VAULT, address: "3" },
  { ...DUMMY_VAULT, address: "4" },
  { ...DUMMY_VAULT, address: "5" },
];
