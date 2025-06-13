import 'reflect-metadata';

import { Transform, Type } from 'class-transformer';

import { Token } from '@/lib/entities/token.entity';
import { AppNumber } from '@/lib/providers/math/app-number.provider';

export class TokenBalance {
  @Type(() => Token)
  tokenInfo: Token;

  @Transform(({ value }) => new AppNumber(value), { toClassOnly: true })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true }) // Convert age to string during serialization
  balance: AppNumber;

  @Transform(({ value }) => new AppNumber(value), { toClassOnly: true })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true }) // Convert age to string during serialization
  rawBalance: AppNumber;

  @Transform(
    ({ value }) => {
      return Object.fromEntries(
        Object.entries(value).map(([key, val]) => [key, new AppNumber(Number(val))])
      );
    },
    { toClassOnly: true }
  )
  @Transform(
    ({ value }: { value: Record<string, AppNumber> }) => {
      return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, val.toString()]));
    },
    { toPlainOnly: true }
  )
  allowances: Record<string, AppNumber>;

  /**
   * @notice Create a new TokenBalance instance with zero balance.
   * @param tokenInfo The token info.
   * @returns The TokenBalance instance.
   */
  public static fromZeroBalance(tokenInfo: Token): TokenBalance {
    return Object.assign(new TokenBalance(), {
      tokenInfo: tokenInfo,
      balance: new AppNumber(0),
      rawBalance: new AppNumber(0),
      allowance: new AppNumber(0),
      farmingAllowance: new AppNumber(0),
      stakingAllowance: new AppNumber(0),
      flexibleStakingAllowance: new AppNumber(0),
    });
  }

  /**
   * @notice Create a new TokenBalance instance.
   * @param tokenInfo The token info.
   * @param balance The balance.
   * @param rawBalance The raw balance.
   * @param allowance The allowance.
   * @param stakingAllowance The staking allowance.
   * @param farmingAllowance The farming allowance.
   * @returns The TokenBalance instance.
   */
  public static from({
    balance,
    allowances,
    tokenInfo,
    rawBalance,
  }: Omit<TokenBalance, 'getBalanceAsCurrencyAmount'>): TokenBalance {
    return Object.assign(new TokenBalance(), {
      balance,
      tokenInfo,
      rawBalance,
      allowances,
    });
  }
}

export class TokenAmount {
  @Type(() => Token)
  tokenInfo: Token;

  @Transform(({ value }) => new AppNumber(value), { toClassOnly: true })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true }) // Convert age to string during serialization
  amount: AppNumber;

  @Transform(({ value }) => new AppNumber(value), { toClassOnly: true })
  @Transform(({ value }) => value.toString(), { toPlainOnly: true }) // Convert age to string during serialization
  rawAmount: AppNumber;

  public static from({
    tokenInfo,
    amount,
    rawAmount,
  }: Omit<TokenAmount, 'toCurrencyAmount'>): TokenAmount {
    return Object.assign(new TokenAmount(), {
      tokenInfo,
      amount,
      rawAmount,
    });
  }
}
