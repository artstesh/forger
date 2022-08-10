import { ITypeFactory } from './i-type.factory';
import { ForgerElement } from '../models/forger-element.model';
import { ForgerType } from '../models/forger.type';

export class LiteralFactory implements ITypeFactory {
  private static factory: LiteralFactory = new LiteralFactory();
  public static instance = () => this.factory;
  private constructor() {}

  public isApplicable(element: ForgerElement): boolean {
    return element.type === ForgerType.Literal;
  }

  public produce(element: ForgerElement): any {
    return element.restrictions?.length
      ? element.restrictions[Math.floor(Math.random() * element.restrictions.length)]
      : undefined;
  }
}
