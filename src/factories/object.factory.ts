import { ITypeFactory } from './i-type.factory';
import { ForgerElement } from '../models/forger-element.model';
import { ForgerType } from '../models/forger.type';
import { SpoofSettings } from '../models/spoof.settings';
import { MainFactory } from './main.factory';

export class ObjectFactory implements ITypeFactory {
  private static factory: ObjectFactory = new ObjectFactory();
  public static instance = () => ObjectFactory.factory;
  private constructor() {}

  public isApplicable(element: ForgerElement): boolean {
    return element.type === ForgerType.Object;
  }

  public produce(element: ForgerElement, settings: SpoofSettings): any {
    const result: { [name: string]: any } = {};
    element.children
      ?.filter((c) => !!c.name)
      .forEach((c) => {
        result[c.name!] = MainFactory.produce(c, settings);
      });
    return result;
  }
}
