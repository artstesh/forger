import { ITypeFactory } from './i-type.factory';
import { ForgerElement } from '../models/forger-element.model';
import { ForgerType } from '../models/forger.type';
import { SpoofSettings } from '../models/spoof.settings';
import { MainFactory } from './main.factory';

export class ArrayFactory implements ITypeFactory {
  private static factory: ArrayFactory = new ArrayFactory();
  public static instance = () => ArrayFactory.factory;
  private constructor() {}

  public isApplicable(element: ForgerElement): boolean {
    return element.type === ForgerType.Array;
  }

  public produce(element: ForgerElement, settings: SpoofSettings): any {
    if (!element.children?.length) return [];
    return Array.from({ length: settings.arrayLength! }).map(() => MainFactory.produce(element.children![0], settings));
  }
}
