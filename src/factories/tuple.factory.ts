import {ITypeFactory} from './i-type.factory';
import {ForgerElement} from '../models/forger-element.model';
import {ForgerType} from '../models/forger.type';
import {SpoofSettings} from '../models/spoof.settings';
import {MainFactory} from './main.factory';

export class TupleFactory implements ITypeFactory {
  private static factory: TupleFactory = new TupleFactory();
  public static instance = () => this.factory;
  private constructor() {}

  public isApplicable(element: ForgerElement): boolean {
    return element.type === ForgerType.Tuple;
  }

  public produce(element: ForgerElement, settings: SpoofSettings): any {
    if (!element.children?.length) return;
    return element.children.map((c) => MainFactory.produce(c, settings));
  }
}
