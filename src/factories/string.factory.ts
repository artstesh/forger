import {SpoofSettings} from '../models/spoof.settings';
import {ForgerElement} from '../models/forger-element.model';
import {ITypeFactory} from './i-type.factory';
import {ForgerType} from '../models/forger.type';

export class StringFactory implements ITypeFactory {
  private static factory: StringFactory = new StringFactory();
  public static instance = () => this.factory;
  private constructor() {}

  private static getAppropriateSet(settings: SpoofSettings) {
    const set: string[] = [];
    if (settings.stringNumbers) set.push(...StringFactory.collections.numbers);
    if (settings.stringLowCase) set.push(...StringFactory.collections.lowCase);
    if (settings.stringUpCase) set.push(...StringFactory.collections.upCase);
    if (settings.stringSpecial) set.push(...StringFactory.collections.special);
    return set;
  }

  // noinspection SpellCheckingInspection
  private static collections = {
    numbers: '0123456789'.split(''),
    lowCase: 'abcdefghiklmnopqrstuvwxyz'.split(''),
    upCase: 'ABCDEFGHIJKLMNOPQRSTUVWXTZ'.split(''),
    special: '~!@#$%^&*()_+-=[]\\{}|;:\'",./<>?'.split(''),
  };

  public isApplicable(element: ForgerElement): boolean {
    return element.type === ForgerType.String;
  }

  public produce(element: ForgerElement, settings: SpoofSettings): any {
    settings = settings ? { ...new SpoofSettings(), ...settings } : new SpoofSettings();
    const set = StringFactory.getAppropriateSet(settings);
    while (set.length < settings.stringLength!) {
      set.push(...StringFactory.getAppropriateSet(settings));
    }
    return set
      .sort(() => 0.5 - Math.random())
      .slice(0, settings.stringLength)
      .join('');
  }
}
