import {ForgerElement} from '../models/forger-element.model';
import {ForgerType} from '../models/forger.type';
import {ITypeFactory} from './i-type.factory';
import {SpoofSettings} from '../models/spoof.settings';

export class EnumFactory implements ITypeFactory {
  private static factory: EnumFactory = new EnumFactory();
  public static instance = () => this.factory;
  private constructor() {}

  public isApplicable(element: ForgerElement): boolean {
    return element.type === ForgerType.Enum;
  }

  public produce(element: ForgerElement, settings: SpoofSettings): any {
    const possible = element.restrictions?.map((r) => Number(r)).filter((r) => !isNaN(r)) || [];
    if (!possible.length) return 0;
    return possible.sort(() => 0.5 - Math.random())[0];
  }
}
