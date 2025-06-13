/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ProductType } from '@sofa/services/base-type';

// Define enum types locally
export enum AutomatorDepositStatus {
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
}

export enum AutomatorTransactionStatus {
  PENDING = 'PENDING',
  COMPLETE = 'COMPLETE',
  FAILED = 'FAILED',
}

/**
 * Base HTTP response interface from backend
 */
export interface HttpResponse<T = any> {
  code: number;
  message?: string;
  value: T;
  status?: number;
}

/**
 * Pagination parameters
 */
export interface PageParams<C = 'cursor', F = string> {
  cursor?: F;
  limit?: number;
  offset?: number;
}

/**
 * Pagination result
 */
export interface PageResult<T, E = Record<string, any>, C = 'cursor'> {
  list: T[];
  total?: number;
  limit: number;
  offset?: number;
  cursor?: any;
  hasMore?: boolean;
}

/**
 * Authentication
 */
export interface LoginNonceRequest {
  wallet: string;
}

export interface LoginRequest {
  wallet: string;
  message: string;
  signature: string;
}

export interface LoginResponse {
  uid: number;
  token: string;
  lastLoginTimestamp: number;
}

/**
 * Market
 */
export interface InterestRateResponse {
  [currency: string]: {
    apyDisplay: number;
    apyUsed: number;
  };
}

/**
 * DIY Products
 */
export interface ProductsDIYConfigRequest {
  chainId: number;
}

export interface ProductsDIYConfig {
  chainId: number;
  vault: string;
  expiryDateTimes: number[]; // Recommended expiry dates in seconds
}

export interface ProductsDIYRecommendRequest {
  chainId: number;
  vaults: string; // Comma separated vault addresses
  expiryDateTime: number; // Selected expiry date in seconds
}

/**
 * Product Quote
 */
export enum ApyDefinition {
  OptimusDefaultAPY = 'OptimusDefaultAPY',
  BinanceDntAPY = 'BinanceDntAPY',
  AaveLendingAPR = 'AaveLendingAPR',
  AaveLendingAPY = 'AaveLendingAPY',
}

export interface OriginProductQuoteParams {
  vault: string;
  chainId: number;
  expiry: number;
  lowerBarrier: string | number;
  upperBarrier: string | number;
  lowerStrike: string | number;
  upperStrike: string | number;
  depositAmount: string | number;
  inputApyDefinition: string;
  protectedApy?: string | number;
  fundingApy?: string | number;
  takerWallet?: string;
}

export interface QuoteInfo {
  quoteId?: string | number;
  anchorPrices: string[];
  makerCollateral: string;
  totalCollateral: string;
  collateralAtRisk?: string;
  deadline: number;
  makerWallet?: string;
  signature?: string;
}

export interface CalculatedInfo {
  amounts: {
    counterparty: string | number;
    own: string | number;
    premium: string | number;
    forRchAirdrop: string | number;
    rchAirdrop: string | number;
    totalInterest: string | number;
    minRedeemable: string | number;
    minRedeemableOfLinkedCcy: string | number;
    maxRedeemable: string | number;
    maxRedeemableOfLinkedCcy: string | number;
    redeemable?: string | number;
    redeemableOfLinkedCcy?: string | number;
    tradingFee: string | number;
    tradingFeeOfLinkedCcy: string | number;
    settlementFee: string | number;
    settlementFeeOfLinkedCcy: string | number;
    maxSettlementFee: string | number;
    maxSettlementFeeOfLinkedCcy: string | number;
    borrow: string | number;
    borrowCost: string | number;
    spreadCost: string | number;
  };
  feeRate: { trading: string | number; settlement: string | number };
  leverageInfo: {
    borrowApr: string | number;
    spreadApr: string | number;
    leverage: string | number;
  };
  apyInfo?: {
    outputApyDefinition: ApyDefinition;
    interest: string | number;
    rch: string | number;
    min: string | number;
    max: string | number;
  };
  oddsInfo?: {
    rch: string | number;
    min: string | number;
    max: string | number;
  };
  relevantDollarPrices: { ccy: string; price: string | number }[];
}

export interface OriginProductQuoteResult extends CalculatedInfo {
  rfqId: string;
  vault: string;
  chainId: number;
  expiry: number;
  depositAmount: string | number;
  minStepSize: string | number;
  timestamp: number;
  observationStart: number;
  quote: QuoteInfo & { quoteId: string | number };
}

export interface ProductsRecommendRequest {
  productType: ProductType;
  riskType: string;
  chainId: number;
  vault: string;
}

/**
 * Winning Probabilities
 */
export interface WinningProbabilitiesParams {
  forCcy: string;
  expiry: number;
  anchorPrices: (string | number)[];
}

export interface WinningProbabilities {
  probDntStayInRange?: number;
  probBullTrendItmLowerStrike?: number;
  probBullTrendItmUpperStrike?: number;
  probBearTrendItmLowerStrike?: number;
  probBearTrendItmUpperStrike?: number;
}

export interface WinningProbabilitiesResult {
  spotPrice: string | number;
  timestamp: number;
  probabilities: WinningProbabilities;
}

/**
 * Request parameters for winning probabilities with transformed fields
 */
export interface WinningProbabilitiesParamsForRequest {
  forCcy: string;
  expiry: number;
  anchorPrices?: (string | number)[];
  lowerBarrier: string | number;
  upperBarrier: string | number;
  lowerStrike: string | number;
  upperStrike: string | number;
}

/**
 * Automator
 */
export interface AutomatorListRequest {
  chainId: number;
}

export interface OriginAutomatorInfo {
  chainId: number;
  automatorName: string;
  automatorDescription?: string;
  automatorVault: string;
  participantNum: number;
  currentParticipantNum: number;
  aumByVaultDepositCcy: number | string;
  aumByClientDepositCcy: number | string;
  aumBySharesToken: number | string;
  creatorAmountByVaultDepositCcy: number | string;
  creatorAmountByClientDepositCcy: number | string;
  nav: number | string;
  dateTime: number;
  yieldPercentage: number | string;
  creator: string;
  createTime: number;
  vaultDepositCcy: string;
  clientDepositCcy: string;
  sharesToken: string;
  redemptionPeriodDay: number | string;
  riskExposure: number | string;
}

export interface OriginAutomatorDetail extends OriginAutomatorInfo {
  feeRate: number | string;
  totalTradingPnlByClientDepositCcy: number | string;
  totalInterestPnlByClientDepositCcy: number | string;
  totalPnlByClientDepositCcy: number | string;
  totalRchPnlByClientDepositCcy: number | string;
  totalRchAmount: number | string;
  totalPnlWithRchByClientDepositCcy: number | string;
  pnlPercentage: number | string;
  totalOptivisorProfitByVaultDepositCcy: number | string;
  unExpiredAmountByVaultDepositCcy: number | string;
  unclaimedAmountByVaultDepositCcy: number | string;
  redeemedAmountByVaultDepositCcy: number | string;
  availableAmountByVaultDepositCcy: number | string;
  redemptionPeriodDay: number;
  positionSize?: number | string;
  pastAvailableBalanceExcludingPrincipal: number | string;
  historicalInterestPlusNetPnL: number | string;
  lockedByUnclaimedPosition: number | string;
  estimatedFutureInterestByVaultCcy: number | string;
  estimatedTenorInDays: number | string;
  poolSizeForFutureInterestByVaultCcy: number | string;
  estimatedFundingApyPercentage: number | string;
}

export interface AutomatorPosition {
  vault: string;
  chainId: number;
  direction: string;
  forCcy: string;
  domCcy: string;
  depositCcy: string;
  lowerStrike: number | string;
  upperStrike: number | string;
  side: string;
  depositPercentage: number | string;
  expiry: number;
}

export interface AutomatorPerformance {
  dateTime: number;
  aumByVaultDepositCcy: number | string;
  aumByClientDepositCcy: number | string;
  incrRchAmount: number | string;
  incrTradingPnlByClientDepositCcy: number | string;
  incrInterestPnlByClientDepositCcy: number | string;
  incrPnlByClientDepositCcy: number | string;
  incrRchPnlByClientDepositCcy: number | string;
  incrPnlWithRchByClientDepositCcy: number | string;
}

export interface AutomatorTransactionsParams {
  wallet: string;
  startDateTime?: number;
}

export interface AutomatorTransaction {
  amountByVaultDepositCcy: number | string;
  amountByClientDepositCcy: number | string;
  wallet?: string;
  share: number | string;
  status: AutomatorTransactionStatus;
  action: string;
  dateTime: number;
}

export interface AutomatorInfoRequest {
  chainId: number;
  automatorVault: string;
}

export interface AutomatorPositionsRequest {
  chainId: number;
  automatorVault: string;
}

/**
 * Automator User
 */
export interface OriginAutomatorUserPosition {
  chainId: number;
  automatorName: string;
  automatorVault: string;
  wallet: string;
  amountByVaultDepositCcy: number | string;
  amountByClientDepositCcy: number | string;
  share: number | string;
  totalTradingPnlByClientDepositCcy: number | string;
  totalInterestPnlByClientDepositCcy: number | string;
  totalPnlByClientDepositCcy: number | string;
  totalRchPnlByClientDepositCcy: number | string;
  totalRchAmount: number | string;
  status: string;
  pnlPercentage: number | string;
  vaultDepositCcy: string;
  clientDepositCcy: string;
  sharesToken: string;
  redemptionPeriodDay: number;
}

export interface AutomatorUserPositionListRequest {
  chainId: number;
  wallet: string;
  status: AutomatorDepositStatus;
}

export interface AutomatorUserPositionRequest {
  chainId: number;
  automatorVault: string;
  wallet: string;
}

export interface AutomatorUserPnlRecordsParams {
  wallet: string;
}

export interface AutomatorUserPnlRecord {
  dateTime: number;
  pnlByClientDepositCcy: number | string;
  rchAmount: number | string;
}

/**
 * RCH (Token Services)
 */
export interface AirdropRecordRequest {
  wallet: string;
  chainId: number;
}

export interface AirdropRecord {
  id: number;
  wallet: string;
  chainId: number;
  amount: string;
  claimableAmount: string;
  status: string;
  createTime: number;
  updateTime: number;
}

export interface AutomatorAumResponse {
  totalDepositAmount: string;
  crypto: string;
  fiat: string;
}
