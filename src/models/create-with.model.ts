export class CreateWithModel<T> {
  private _result?: T;

  constructor(initial: T) {
    this._result = initial;
  }

  public result(): T | undefined {
    return this._result;
  }

  public with(e: (prop: T) => void): CreateWithModel<T> {
    if (!!this._result) e(this._result);
    return this;
  }
}
