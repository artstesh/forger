import * as ts from 'typescript';

export class Checker {
  private static _typeChecker: ts.TypeChecker;
  public static get Checker() {
    return this._typeChecker;
  }

  public static setChecker(checker: ts.TypeChecker): void {
    this._typeChecker = checker;
  }
}
