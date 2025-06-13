import Decimal from 'decimal.js';
import bigDecimal from 'js-big-decimal';
import { UtilsProvider } from '../utils.provider';

export const ROUND_DECIMAL_PLACES = 5;

export const LARGE_NUMBER = {
  k: 1e3,
  kk: 1e4,
  kkk: 1e5,
  m: 1e6,
  mm: 1e7,
  mmm: 1e8,
  b: 1e9,
  bb: 1e10,
  bbb: 1e11,
  bbbb: 1e12,
  bbbbb: 1e13,
  bbbbbb: 1e14,
  bbbbbbb: 1e15,
  bbbbbbbb: 1e16,
  bbbbbbbbb: 1e17,
  bbbbbbbbbb: 1e18,
};

/**
 * @notice AppNumber instance represents logic handler for all numbers in the app
 * @private value - represents the value of the number
 * @public getValue() - returns the value of the number
 * @public add(value) - adds the value to the number
 * @public subtract(value) - subtracts the value from the number
 * @public multiply(value) - multiplies the number by the value
 * @public divide(value) - divides the number by the value
 * @public pow(value) - raises the number to the power of the value
 * @public toNumber() - returns the number as a number
 * @public getDisplayedString() - returns the number as a string
 * @public toString() - returns the number as a string
 * @public equals(value) - returns true if the value is equal to the number
 * @public toJSON() - returns the number as a string
 * @public toHex() - returns the number as a string
 */
export class AppNumber {
  /**
   * @dev value - represents the value of the number
   * @private
   */
  private readonly value: Decimal;
  static LARGE_NUMBER: any;

  /**
   * @notice constructors initializes AppNumber instance
   * @param value
   */
  constructor(value: string | bigint | number) {
    this.value = new Decimal(value.toString());
  }

  /**
   * @notice from(value) - creates a new AppNumber instance from primitive value
   * @param value
   */
  public static from(value: string | bigint | number) {
    return new AppNumber(value);
  }

  /**
   * @notice getValue() - returns the value of the number
   */
  public getValue(): Decimal {
    return this.value;
  }

  private shorterNumber(longNum: number) {
    const num = Number(longNum.toString().replace(/[^0-9.]/g, ''));
    if (num < 1000) {
      return num;
    }
    const si = [
      { v: 1e3, s: 'K' },
      { v: 1e6, s: 'M' },
      { v: 1e9, s: 'B' },
      { v: 1e12, s: 'T' },
      { v: 1e15, s: 'P' },
      { v: 1e18, s: 'E' },
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
        break;
      }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[index].s;
  }

  /**
   * @notice getDisplayedString() - returns the number as a string
   */
  public getDisplayedString(
    minimumToFormat = LARGE_NUMBER.kk,
    precisionRound = ROUND_DECIMAL_PLACES,
    formatLargeDecimals = false
  ): string {
    if (this.value.toNumber() < minimumToFormat) {
      const round = this.roundDecimalPlaces(precisionRound);
      if (this.value.toNumber() % 1 === 0) {
        return parseFloat(round).toLocaleString();
      }

      if (formatLargeDecimals) {
        return new UtilsProvider().getDisplayedDecimals(
          this.value.toNumber()
          // precisionRound
        );
      }

      return parseFloat(round).toLocaleString();
    }

    if (this.value.toNumber() >= LARGE_NUMBER.kk && this.value.toNumber() < LARGE_NUMBER.m) {
      return Math.round(this.value.toNumber()).toLocaleString('en-US');
    }

    return this.shorterNumber(this.value.toNumber()).toString();
  }

  public roundDecimalPlaces(precisionRound = ROUND_DECIMAL_PLACES): string {
    const factor = Math.pow(10, precisionRound); // Shift decimal point
    return (Math.floor(this.value.toNumber() * factor) / factor).toString(); // Truncate without rounding
    // return Number(this.value.toString()).toFixed(precisionRound);
  }

  public equals(value: AppNumber) {
    return this.value.equals(value.getValue());
  }

  /**
   * @notice add(value) - adds the value to the number
   * @param value
   */
  public add(value: AppNumber) {
    return new AppNumber(this.value.plus(value.getValue().toNumber()).toNumber());
  }

  /**
   * @notice subtract(value) - subtracts the value from the number
   * @param value
   */
  public subtract(value: AppNumber) {
    return new AppNumber(this.value.minus(value.getValue().toNumber()).toNumber());
  }

  /**
   * @notice multiply(value) - multiplies the number by the value
   * @param value
   */
  public multiply(value: AppNumber) {
    return new AppNumber(
      new bigDecimal(this.value.toString())
        .multiply(new bigDecimal(value.toString()))
        .getValue()
        .toString()
    );
  }

  /**
   * @notice divide(value) - divides the number by the value
   * @param value
   */
  public divide(value: AppNumber, precision = 18) {
    // Check if the value is zero
    if (value.getValue().toNumber() === 0) {
      return new AppNumber(0);
    }

    return new AppNumber(
      new bigDecimal(this.value.toString())
        .divide(new bigDecimal(value.toString()), precision)
        .getValue()
        .toString()
    );
  }

  /**
   * @notice pow(value) - raises the number to the power of the value
   * @param value
   */
  public pow(value: AppNumber) {
    return new AppNumber(this.value.pow(value.getValue().toNumber()).toNumber());
  }

  /**
   * @notice gt(other) - check if the number is greater than other.
   * @param other
   */
  public gt(other: AppNumber): boolean {
    return this.value.greaterThan(other.getValue());
  }

  /**
   * @notice gt(other) - check if the number is greater than or equals to other.
   * @param other
   */
  public gte(other: AppNumber): boolean {
    return this.value.greaterThanOrEqualTo(other.getValue());
  }

  /**
   * @notice gt(other) - check if the number is equals to other.
   * @param other
   */
  public eq(other: AppNumber): boolean {
    return this.value.eq(other.getValue());
  }

  /**
   * @notice gt(other) - check if the number is less than or equal to other.
   * @param other
   */
  public lte(other: AppNumber): boolean {
    return this.value.lessThanOrEqualTo(other.getValue());
  }

  /**
   * @notice gt(other) - check if the number is less than other.
   * @param other
   */
  public lt(other: AppNumber): boolean {
    return this.value.lessThan(other.getValue());
  }

  /**
   * @notice toNumber() - returns the number as a number
   */
  public toNumber() {
    return this.value.toNumber();
  }

  /**
   * @notice toBigNumber() - returns the number as a number
   */
  public toBigNumber() {
    return BigInt(this.value.toFixed(0));
  }

  /**
   * @notice toString() - returns the number as a string
   */
  public toString(): string {
    return this.value.toString();
  }

  /**
   * @notice toIntegerString() - returns the number as a string
   */
  public toIntegerString(): string {
    return this.value.toFixed(0);
  }

  /**
   * @notice toJSON() - returns the number as a string
   */
  public toJSON(): string {
    return this.value.toString();
  }

  /**
   * @notice toHex() - returns the number as a string
   */
  public toHex(): string {
    return this.value.toHex();
  }

  /**
   * @notice getRealTokenAmount(decimals) - returns the real token amount
   * @param decimals
   */
  public getRealTokenAmount(decimals = 18): AppNumber {
    return this.divide(AppNumber.from(10 ** decimals), decimals);
  }

  /**
   * @notice getRealTokenAmountWithDecimals(decimals) - returns the real token amount with decimals
   * @param decimals
   */
  public getRealTokenAmountWithDecimals(decimals = 18): AppNumber {
    return this.multiply(AppNumber.from(10 ** decimals));
  }
}
