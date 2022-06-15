import { ForgerElement } from '../models/forger-element.model';
import { ForgerType } from '../models/forger.type';
import { ITypeFactory } from './i-type.factory';
import { SpoofSettings } from '../models/spoof.settings';
import { MainFactory } from './main.factory';

export class FunctionFactory implements ITypeFactory {
  private static factory: FunctionFactory = new FunctionFactory();
  public static instance = () => this.factory;
  private constructor() {}

  public isApplicable(element: ForgerElement): boolean {
    return element.type === ForgerType.Function;
  }

  public produce(element: ForgerElement, settings: SpoofSettings): any {
    if (!element.children?.length) return () => null;
    return () => MainFactory.produce(element.children![0], settings);
  }
}
