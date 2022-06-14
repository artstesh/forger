/**
 * Definition of settings for forgery.
 *
 * Allowed settings:
 *
 * {@link dateMax}, {@link dateMin}, {@link numberMin}, {@link numberMax}, {@link numberFloat},
 * {@link stringNumbers}, {@link stringLowCase}, {@link stringUpCase}, {@link stringSpecial}, {@link stringLength},
 * {@link arrayLength}
 */
export class SpoofSettings {
  /**
   * The maximum value of dates, inclusive
   *
   * Default is 1/1/4000
   */
  dateMax?: Date = new Date(4000, 0, 1);
  /**
   * The maximum value of dates, inclusive
   * Default is 1/1/2000
   */
  dateMin?: Date = new Date(2000, 0, 1);
  /**
   * The minimum value of numbers, inclusive
   *
   * Default is 1
   */
  numberMin?: number = 1;
  /**
   * The maximum value of numbers, inclusive
   *
   * Default is 1000
   */
  numberMax?: number = 1000;
  /**
   * Whether numbers are fractional
   *
   * Default is false
   */
  numberFloat?: boolean = false;
  /**
   * Whether to include numbers into strings
   *
   * Default is true
   */
  stringNumbers?: boolean = true;
  /**
   * Whether to include lowercase letters into strings
   *
   * Default is true
   */
  stringLowCase?: boolean = true;
  /**
   * Whether to include uppercase letters into strings
   *
   * Default is true
   */
  stringUpCase?: boolean = true;
  /**
   * Whether to include special symbols (#$%^&*...) into strings
   *
   * Default is true
   */
  stringSpecial?: boolean = true;
  /**
   * The length of strings
   *
   * Default is 10
   */
  stringLength?: number = 10;
  /**
   * The length of arrays
   *
   * Default is 3
   */
  arrayLength?: number = 3;
}
