interface Token {
  address: string;
  underlyingTokensAddresses: string[];
  name: string;
  symbol: string;
  type: string;
  display_name: string;
  display_symbol: string;
  description: string;
  icon: string;
  decimals: number;
}

interface TVL {
  totalAssets: string;
  tvl: number;
  price: number;
}

interface Fees {
  performance: number;
  management: number;
}

interface APRPoints {
  weekAgo: number;
  monthAgo: number;
  inception: number;
}

interface ExtraAPR {
  stakingRewardsAPR: number | null;
  gammaRewardAPR: number | null;
}

interface CompositeAPR {
  boost: number | null;
  poolAPY: number | null;
  boostedAPR: number | null;
  baseAPR: number | null;
  cvxAPR: number | null;
  rewardsAPR: number | null;
  v3OracleCurrentAPR: number;
  v3OracleStratRatioAPR: number;
  v3OracleCurrentAPY: number;
  v3OracleStratRatioAPY: number;
}

interface ForwardAPR {
  type: string;
  netAPR: number;
  composite: CompositeAPR;
}

interface APR {
  type: string;
  netAPR: number;
  fees: Fees;
  points: APRPoints;
  extra: ExtraAPR;
  forwardAPR: ForwardAPR;
}

interface VaultDetails {
  isRetired: boolean;
  isHidden: boolean;
  isAggregator: boolean;
  isBoosted: boolean;
  isAutomated: boolean;
  isHighlighted: boolean;
  isPool: boolean;
  stability: string;
  category: string;
}

interface Migration {
  available: boolean;
  address: string;
  contract: string;
}

interface Staking {
  address: string;
  available: boolean;
  source: string;
  rewards: any;
}

interface Info {
  riskLevel: number;
  isRetired: boolean;
  isBoosted: boolean;
  isHighlighted: boolean;
  riskScore: number[];
}

export interface VaultInfoEntity {
  wethGatewayAddress: string;
  isDummyData?: boolean;
  address: string;
  type: string;
  kind: string;
  symbol: string;
  display_symbol: string;
  formated_symbol: string;
  name: string;
  display_name: string;
  formated_name: string;
  icon: string;
  version: string;
  category: string;
  decimals: number;
  chainID: number;
  endorsed: boolean;
  boosted: boolean;
  emergency_shutdown: boolean;
  strategies: any[];
  featuringScore: number;
  pricePerShare: string;

  tvl: TVL;
  apr: APR;
  info: Info;
  token: Token;
  staking: Staking;
  details: VaultDetails;
  migration: Migration;
  description: string;
}

export class VaultInfo implements VaultInfoEntity {
  isDummyData?: boolean;
  wethGatewayAddress: string;
  address: string;
  type: string;
  kind: string;
  symbol: string;
  display_symbol: string;
  formated_symbol: string;
  name: string;
  display_name: string;
  formated_name: string;
  icon: string;
  version: string;
  category: string;
  decimals: number;
  chainID: number;
  endorsed: boolean;
  boosted: boolean;
  emergency_shutdown: boolean;
  strategies: any[];
  featuringScore: number;
  pricePerShare: string;
  tvl: TVL;
  apr: APR;
  info: Info;
  token: Token;
  staking: Staking;
  details: VaultDetails;
  migration: Migration;
  description: string;

  public static fromEntity(entity: VaultInfoEntity): VaultInfo {
    return Object.assign(new VaultInfo(), entity);
  }
}
