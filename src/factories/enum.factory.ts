import { ForgerElement } from '../models/forger-element.model';
import { ForgerType } from '../models/forger.type';
import { ITypeFactory } from './i-type.factory';

export class EnumFactory implements ITypeFactory {
  private static factory: EnumFactory = new EnumFactory();
  public static instance = () => EnumFactory.factory;

  public isApplicable(element: ForgerElement): boolean {
    return element.type === ForgerType.Enum;
  }

  public produce(element: ForgerElement): any {
    const possible = element.restrictions || [];
    if (!possible.length) return 0;
    return possible[Math.floor(Math.random() * possible.length)];
  }
}
