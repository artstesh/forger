import {SpoofSettings} from '../models/spoof.settings';
import {ForgerElement} from '../models/forger-element.model';
import {ForgerType} from '../models/forger.type';
import {ITypeFactory} from './i-type.factory';

export class NumberFactory implements ITypeFactory {
  private static factory: NumberFactory = new NumberFactory();
  public static instance = () => this.factory;
  private constructor() {}

  public static get(settings?: SpoofSettings): number {
    settings = settings ? { ...new SpoofSettings(), ...settings } : new SpoofSettings();
    if (settings.numberMin! > settings.numberMax!) settings.numberMax = settings.numberMin! + 100;
    const generated = Math.random() * (settings.numberMax! - settings.numberMin! + 1) + settings.numberMin!;
    return settings.numberFloat ? generated : Math.floor(generated);
  }

  public isApplicable(element: ForgerElement): boolean {
    return element.type === ForgerType.Number;
  }

  public produce(element: ForgerElement, settings: SpoofSettings): any {
    return NumberFactory.get(settings);
  }
}
