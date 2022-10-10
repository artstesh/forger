import { NumberFactory } from './number.factory';
import { SpoofSettings } from '../models/spoof.settings';
import { ForgerElement } from '../models/forger-element.model';
import { ITypeFactory } from './i-type.factory';
import { ForgerType } from '../models/forger.type';

// noinspection SuspiciousTypeOfGuard
export class DateFactory implements ITypeFactory {
  private static factory: DateFactory = new DateFactory();
  public static instance = () => DateFactory.factory;

  public isApplicable(element: ForgerElement): boolean {
    return element.type === ForgerType.Date;
  }

  public produce(element: ForgerElement, settings: SpoofSettings): any {
    if (typeof settings.dateMin === 'string') settings.dateMin = new Date(settings.dateMin);
    if (typeof settings.dateMax === 'string') settings.dateMax = new Date(settings.dateMax);
    if (settings.dateMin! > settings.dateMax!)
      settings.dateMax = new Date(settings.dateMin!.getTime() + 1000 * 60 * 60 * 24);
    return new Date(
      NumberFactory.get({ numberMin: settings.dateMin!.getTime(), numberMax: settings.dateMax!.getTime() }),
    );
  }
}
