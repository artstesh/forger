/**
 * Helper for setting specific values of fields of forgeries.
 * Points of interest are {@link CreateWithModel.result} and
 * {@link CreateWithModel.with}
 */
export class CreateWithModel<T> {
  private readonly _result?: T;

  constructor(initial: T) {
    this._result = initial;
  }

  /**
   * The method should be called after all(!) {@link CreateWithModel.with} to
   * build an object of the requested type T.
   *
   * Example: this.with(p => p.field1 = 1).result();
   *
   * @returns an object of type T
   */
  public result = (): T | undefined => this._result;

  /**
   * Set a specific value for a concrete field.
   *
   * One value - one call of the method(!).
   *
   * Example: .with(p => p.field1 = 1).with(p => p.field2 = 2);
   * @param expr
   */
  public with(expr: (prop: T) => void): CreateWithModel<T> {
    if (!!this._result) expr(this._result);
    return this;
  }
}
