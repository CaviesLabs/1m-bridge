import type { TokenBalanceResponse } from '@/lib/providers/solscan/types';
import axios from 'axios';

/**
 * @dev Solscan provider handles solscan api requests.
 */
export class SolScanProvider {
  private baseUrl: string = 'https://api-v2.solscan.io/v2';

  public async getTokenBalances(walletAddress: string): Promise<TokenBalanceResponse> {
    const response = await axios.get<TokenBalanceResponse>(
      `${this.baseUrl}/account/tokens?address=${walletAddress}`,
      {
        headers: {
          origin: 'https://solscan.io',
        },
      }
    );

    return response.data;
  }
}
