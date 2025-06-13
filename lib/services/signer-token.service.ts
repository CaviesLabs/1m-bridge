import type { Token } from "../entities/token.entity";
import { AppNumber } from "../providers/math/app-number.provider";

export class SignerTokenService {
  constructor(private readonly whitelistedTokens: Token[]) { }

  public getTokenEntity(contractAddress: string): Token {
    return this.whitelistedTokens.find(
      (token) => token.contractAddress === contractAddress
    );
  }

  public async getRealTokenAmount(
    tokenAddress: string,
    amount: bigint | string
  ): Promise<AppNumber> {
    const tokenInfo = await this.getTokenEntity(tokenAddress);
    return new AppNumber(amount).divide(
      new AppNumber(10).pow(new AppNumber(Number(tokenInfo.decimals)))
    );
  }
}
