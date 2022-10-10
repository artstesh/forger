import { ITypeFactory } from './i-type.factory';
import { ForgerElement } from '../models/forger-element.model';
import { ForgerType } from '../models/forger.type';
import { MainFactory } from './main.factory';
import SpoofSettings from '../models/spoof.settings';

export class UnionFactory implements ITypeFactory {
  private static factory: UnionFactory = new UnionFactory();
  public static instance = () => UnionFactory.factory;
  private constructor() {}

  public isApplicable(element: ForgerElement): boolean {
    return element.type === ForgerType.Union;
  }

  public produce(element: ForgerElement, settings: SpoofSettings): any {
    if (!element.restrictions?.length) return undefined;
    const randomType = element.restrictions[Math.floor(Math.random() * element.restrictions.length)];
    return MainFactory.produce(randomType, settings);
  }
}
