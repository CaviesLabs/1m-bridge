import type { AutomatorFactory } from '@sofa/services/base-type';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type {
  AirdropRecord,
  AirdropRecordRequest,
  AutomatorInfoRequest,
  AutomatorListRequest,
  AutomatorPerformance,
  AutomatorPosition,
  AutomatorPositionsRequest,
  AutomatorTransaction,
  AutomatorTransactionsParams,
  AutomatorUserPnlRecord,
  AutomatorUserPnlRecordsParams,
  AutomatorUserPositionListRequest,
  AutomatorUserPositionRequest,
  HttpResponse,
  InterestRateResponse,
  LoginNonceRequest,
  LoginRequest,
  LoginResponse,
  OriginAutomatorDetail,
  OriginAutomatorInfo,
  OriginAutomatorUserPosition,
  OriginProductQuoteParams,
  OriginProductQuoteResult,
  PageParams,
  PageResult,
  ProductsDIYConfig,
  ProductsDIYConfigRequest,
  ProductsDIYRecommendRequest,
  ProductsRecommendRequest,
  WinningProbabilitiesParams,
  WinningProbabilitiesParamsForRequest,
  WinningProbabilitiesResult,
} from './sofa-api.types';

export interface AutomatorAumResponse {
  totalDepositAmount: string;
  crypto: string;
  fiat: string;
}

// Re-export types for backwards compatibility
export * from './sofa-api.types';

export class SofaApiService {
  private http: AxiosInstance;
  private chainId: number;

  constructor(baseURL: string, chainId: number = 1) {
    this.http = axios.create({
      baseURL,
      timeout: 30000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.chainId = chainId;

    // Config slug for request url
    // this.http.interceptors.request.use(config => {
    //   config.url = `/direct-vault-api${config.url}`;
    //   return config;
    // });

    // Response interceptor to handle standard response format
    this.http.interceptors.response.use(
      response => {
        const data = response.data;
        if (data && 'code' in data && data.code === 0) {
          return response;
        }
        return Promise.reject(new Error(data?.message || 'Unknown error'));
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  // Add authorization token
  setAuthToken(token: string): void {
    this.http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Remove authorization token
  removeAuthToken(): void {
    delete this.http.defaults.headers.common['Authorization'];
  }

  // Get current chain ID
  getChainId(): number {
    return this.chainId;
  }

  // Set chain ID
  setChainId(chainId: number): void {
    this.chainId = chainId;
  }

  // Authentication APIs
  async getLoginNonce(params: LoginNonceRequest): Promise<string> {
    const response = await this.http.get<HttpResponse<string>>(
      `user/login-nonce?wallet=${encodeURIComponent(params.wallet)}`
    );
    return response.data.value;
  }

  async login(params: LoginRequest): Promise<LoginResponse> {
    const response = await this.http.post<HttpResponse<LoginResponse>>('user/login', {
      message: params.message,
      signature: params.signature,
    });
    return response.data.value;
  }

  async logout(): Promise<void> {
    await this.http.post<HttpResponse<void>>('user/logout', {});
  }

  // Market APIs
  async getInterestRate(): Promise<InterestRateResponse> {
    const response = await this.http.get<HttpResponse<InterestRateResponse>>(
      'market/interest-rate',
      {
        params: { chainId: this.chainId },
      }
    );
    return response.data.value;
  }

  // DIY Products APIs
  async getDIYConfig(params: ProductsDIYConfigRequest): Promise<ProductsDIYConfig[]> {
    const response = await this.http.get<HttpResponse<ProductsDIYConfig[]>>(
      '/rfq/diy/configuration',
      {
        params,
      }
    );
    return response.data.value;
  }

  async getDIYRecommendedList(
    params: ProductsDIYRecommendRequest
  ): Promise<OriginProductQuoteResult[]> {
    const response = await this.http.get<HttpResponse<OriginProductQuoteResult[]>>(
      '/rfq/diy/recommended-list',
      {
        params,
      }
    );
    return response.data.value;
  }

  async getDualDIYRecommendedList(
    params: ProductsDIYRecommendRequest
  ): Promise<OriginProductQuoteResult[]> {
    const response = await this.http.get<HttpResponse<OriginProductQuoteResult[]>>(
      '/rfq/dual/diy/recommended-list',
      {
        params,
      }
    );
    return response.data.value;
  }

  async getDNTDIYRecommendedList(
    params: ProductsDIYRecommendRequest
  ): Promise<OriginProductQuoteResult[]> {
    const response = await this.http.get<HttpResponse<OriginProductQuoteResult[]>>(
      '/rfq/diy/dnt/recommended-list',
      {
        params,
      }
    );
    return response.data.value;
  }

  async getSmartTrendDIYRecommendedList(
    params: ProductsDIYRecommendRequest
  ): Promise<OriginProductQuoteResult[]> {
    const response = await this.http.get<HttpResponse<OriginProductQuoteResult[]>>(
      '/rfq/diy/smart-trend/recommended-list',
      {
        params,
      }
    );
    return response.data.value;
  }

  // Product APIs
  async getDNTRecommendedList(
    params: ProductsRecommendRequest
  ): Promise<OriginProductQuoteResult[]> {
    const response = await this.http.get<HttpResponse<OriginProductQuoteResult[]>>(
      '/rfq/dnt/recommended-list',
      {
        params,
      }
    );
    return response.data.value;
  }

  async getSmartTrendRecommendedList(
    params: ProductsRecommendRequest
  ): Promise<OriginProductQuoteResult[]> {
    const response = await this.http.get<HttpResponse<OriginProductQuoteResult[]>>(
      '/rfq/smart-trend/recommended-list',
      {
        params,
      }
    );
    return response.data.value;
  }

  async getDualRecommendedList(
    params: ProductsRecommendRequest
  ): Promise<OriginProductQuoteResult[]> {
    const response = await this.http.get<HttpResponse<OriginProductQuoteResult[]>>(
      '/rfq/dual/recommended-list',
      {
        params,
      }
    );
    return response.data.value;
  }

  async getDNTQuote(params: OriginProductQuoteParams): Promise<OriginProductQuoteResult> {
    const response = await this.http.get<HttpResponse<OriginProductQuoteResult>>('/rfq/dnt/quote', {
      params,
    });
    return response.data.value;
  }

  async getSmartTrendQuote(params: OriginProductQuoteParams): Promise<OriginProductQuoteResult> {
    const response = await this.http.get<HttpResponse<OriginProductQuoteResult>>(
      '/rfq/smart-trend/quote',
      {
        params,
      }
    );
    return response.data.value;
  }

  async getDualQuote(params: OriginProductQuoteParams): Promise<OriginProductQuoteResult> {
    const response = await this.http.get<HttpResponse<OriginProductQuoteResult>>(
      '/rfq/dual/quote',
      {
        params,
      }
    );
    return response.data.value;
  }

  async getDNTWinningProbabilities(
    params: WinningProbabilitiesParams
  ): Promise<WinningProbabilitiesResult> {
    const requestParams: WinningProbabilitiesParamsForRequest = {
      ...params,
      lowerBarrier: params.anchorPrices[0],
      upperBarrier: params.anchorPrices[1],
      lowerStrike: params.anchorPrices[0],
      upperStrike: params.anchorPrices[1],
      anchorPrices: undefined,
    };

    const response = await this.http.get<HttpResponse<WinningProbabilitiesResult>>(
      '/rfq/dnt/winning-probabilities',
      {
        params: requestParams,
      }
    );
    return response.data.value;
  }

  async getSmartTrendWinningProbabilities(
    params: WinningProbabilitiesParams
  ): Promise<WinningProbabilitiesResult> {
    const requestParams: WinningProbabilitiesParamsForRequest = {
      ...params,
      lowerBarrier: params.anchorPrices[0],
      upperBarrier: params.anchorPrices[1],
      lowerStrike: params.anchorPrices[0],
      upperStrike: params.anchorPrices[1],
      anchorPrices: undefined,
    };

    const response = await this.http.get<HttpResponse<WinningProbabilitiesResult>>(
      '/rfq/smart-trend/winning-probabilities',
      {
        params: requestParams,
      }
    );
    return response.data.value;
  }

  async getAutomatorAum(): Promise<AutomatorAumResponse> {
    const response = await this.http.get<HttpResponse<AutomatorAumResponse>>('/automator/aum', {});
    return response.data.value;
  }

  // Automator APIs
  async getAutomatorList(params: AutomatorListRequest): Promise<OriginAutomatorInfo[]> {
    const response = await this.http.get<HttpResponse<OriginAutomatorInfo[]>>('/automator/list', {
      params,
    });

    return response.data.value;
  }

  async getAutomatorInfo(params: AutomatorInfoRequest): Promise<OriginAutomatorDetail> {
    const response = await this.http.get<HttpResponse<OriginAutomatorDetail>>('/automator/info', {
      params,
    });
    return response.data.value;
  }

  async getAutomatorPositions(params: AutomatorPositionsRequest): Promise<AutomatorPosition[]> {
    const response = await this.http.get<HttpResponse<AutomatorPosition[]>>(
      '/automator/position/list',
      {
        params,
      }
    );
    return response.data.value;
  }

  async getAutomatorPerformance(params: AutomatorInfoRequest): Promise<AutomatorPerformance[]> {
    const response = await this.http.get<HttpResponse<AutomatorPerformance[]>>(
      '/automator/performance',
      {
        params,
      }
    );
    return response.data.value;
  }

  async getAutomatorTransactions(
    automatorVault: string,
    params: AutomatorTransactionsParams,
    extraParams?: PageParams<'cursor', 'dateTime'>
  ): Promise<PageResult<AutomatorTransaction>> {
    const requestParams = {
      chainId: this.chainId,
      automatorVault,
      ...params,
      endDateTime: extraParams?.cursor,
      limit: extraParams?.limit ?? 20,
    };

    const response = await this.http.get<HttpResponse<AutomatorTransaction[]>>(
      '/optivisors/automator/transaction/list',
      { params: requestParams }
    );

    const transactions = response.data.value;
    return {
      cursor: transactions.length > 0 ? transactions[transactions.length - 1]?.dateTime : undefined,
      limit: extraParams?.limit ?? 20,
      list: transactions,
      hasMore: transactions.length >= (extraParams?.limit ?? 20),
    };
  }

  // Automator User APIs
  async getUserAutomatorPosition(
    params: AutomatorUserPositionRequest
  ): Promise<OriginAutomatorUserPosition> {
    const response = await this.http.get<HttpResponse<OriginAutomatorUserPosition>>(
      '/users/automator/detail',
      {
        params,
      }
    );
    return response.data.value;
  }

  async getUserAutomatorPositionList(
    params: AutomatorUserPositionListRequest
  ): Promise<OriginAutomatorUserPosition[]> {
    const response = await this.http.get<HttpResponse<OriginAutomatorUserPosition[]>>(
      '/users/automator/list',
      {
        params,
      }
    );
    return response.data.value;
  }

  async getUserAutomatorTransactions(
    automatorVault: string,
    params: AutomatorTransactionsParams,
    extraParams?: PageParams<'cursor', 'dateTime'>
  ): Promise<PageResult<AutomatorTransaction>> {
    const requestParams = {
      chainId: this.chainId,
      automatorVault,
      ...params,
      endDateTime: extraParams?.cursor,
      limit: extraParams?.limit ?? 20,
    };

    const response = await this.http.get<HttpResponse<AutomatorTransaction[]>>(
      '/users/automator/transaction/list',
      { params: requestParams }
    );

    const transactions = response.data.value;
    return {
      cursor: transactions.length > 0 ? transactions[transactions.length - 1]?.dateTime : undefined,
      limit: extraParams?.limit ?? 20,
      list: transactions,
      hasMore: transactions.length >= (extraParams?.limit ?? 20),
    };
  }

  async getUserAutomatorPnlRecords(
    automatorVault: string,
    params: AutomatorUserPnlRecordsParams,
    extraParams?: PageParams<'cursor', 'dateTime'>
  ): Promise<PageResult<AutomatorUserPnlRecord>> {
    const requestParams = {
      chainId: this.chainId,
      automatorVault,
      ...params,
      endDateTime: extraParams?.cursor,
      limit: extraParams?.limit ?? 20,
    };

    const response = await this.http.get<HttpResponse<AutomatorUserPnlRecord[]>>(
      '/users/automator/pnl/list',
      {
        params: requestParams,
      }
    );

    const records = response.data.value;
    return {
      cursor: records.length > 0 ? records[records.length - 1]?.dateTime : undefined,
      limit: extraParams?.limit ?? 20,
      list: records,
      hasMore: records.length >= (extraParams?.limit ?? 20),
    };
  }

  // RCH (Token Services)
  async getAirdropRecord(params: AirdropRecordRequest): Promise<AirdropRecord[]> {
    const response = await this.http.get<HttpResponse<AirdropRecord[]>>('/rch/airdrop-record', {
      params,
    });
    return response.data.value;
  }

  // Automator Creator
  async getAutomatorFactories(): Promise<AutomatorFactory[]> {
    const response = await this.http.get<HttpResponse<AutomatorFactory[]>>(
      '/automator-creator/factories',
      {
        params: { chainId: this.chainId },
      }
    );
    return response.data.value;
  }

  async hasAutomatorBeenCreated(factory: string): Promise<boolean> {
    const response = await this.http.get<HttpResponse<boolean>>(
      '/automator-creator/has-automator-been-created',
      {
        params: { factory },
      }
    );
    return response.data.value;
  }

  async hasBurned(factory: string): Promise<boolean> {
    const response = await this.http.get<HttpResponse<boolean>>('/automator-creator/has-burned', {
      params: { factory },
    });
    return response.data.value;
  }

  async hasCredits(factory: string): Promise<boolean> {
    const response = await this.http.get<HttpResponse<boolean>>('/automator-creator/has-credits', {
      params: { factory },
    });
    return response.data.value;
  }

  static create(chainId: number = 1): SofaApiService {
    return new SofaApiService(
      [process.env.NEXT_PUBLIC_VITE_BACKEND, '/'].join('///').replace(/\/{3,}/, '/'),
      chainId
    );
  }
}

// Default instance with Ethereum mainnet (chainId = 1)
export default SofaApiService.create();

// Helper function to create service with specific chainId
export const createSofaService = (chainId: number) => SofaApiService.create(chainId);
