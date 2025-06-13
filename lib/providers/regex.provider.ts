export class RegexProvider {
  /**
   * @dev Generate regex value to test if number is positive or not.
   * @returns {RegExp} Regex string.
   */
  public static get positiveNumber(): RegExp {
    return /^-?[0-9]+(?:\.[0-9]+)?$/;
  }

  /**
   * @dev Generate regex value to test if number is negative or not.
   * @returns {RegExp} Regex string.
   */
  public static get negativeNumber(): RegExp {
    return /^-?\d{2}(\.\d+)?$/;
  }

  /**
   * @dev The function validate value based on regexs.
   * @param {value} value The value want to validate.
   * @param regs
   * @returns {boolean}
   */
  public validate(value: string, regs: RegExp[]): boolean {
    if (!regs) return true;
    return regs.every((t) => t.test(value));
  }
}
