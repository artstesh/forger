import {StringFactory} from './string.factory';
import {NumberFactory} from './number.factory';
import {DateFactory} from './date.factory';
import {SpoofSettings} from '../models/spoof.settings';
import {ForgerElement} from '../models/forger-element.model';
import {BoolFactory} from './bool.factory';
import {EnumFactory} from './enum.factory';
import {FunctionFactory} from './function.factory';
import {TupleFactory} from './tuple.factory';
import {ArrayFactory} from './array.factory';
import {ObjectFactory} from './object.factory';

export class MainFactory {
  private static factories = [
    ObjectFactory.instance(),
    ArrayFactory.instance(),
    TupleFactory.instance(),
    StringFactory.instance(),
    NumberFactory.instance(),
    BoolFactory.instance(),
    DateFactory.instance(),
    EnumFactory.instance(),
    FunctionFactory.instance(),
  ];

  public static produce(element: ForgerElement, settings: SpoofSettings): any {
    return MainFactory.factories.filter((f) => f.isApplicable(element))[0]?.produce(element, settings) ?? null;
  }
}
