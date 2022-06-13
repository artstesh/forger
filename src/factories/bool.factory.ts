import {ForgerElement} from '../models/forger-element.model';
import {ForgerType} from '../models/forger.type';
import {ITypeFactory} from './i-type.factory';
import {SpoofSettings} from '../models/spoof.settings';

export class BoolFactory implements ITypeFactory {
  private static factory: BoolFactory = new BoolFactory();
  public static instance = () => this.factory;
  private constructor() {}

  public isApplicable(element: ForgerElement): boolean {
    return element.type === ForgerType.Bool;
  }

  public produce(element: ForgerElement, settings: SpoofSettings): any {
    return Math.floor(new Date().getTime() * Math.random()) % 2 === 0;
  }
}
