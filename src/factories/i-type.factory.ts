import { ForgerElement } from '../models/forger-element.model';
import { SpoofSettings } from '../models/spoof.settings';

export interface ITypeFactory {
  produce(element: ForgerElement, settings: SpoofSettings): any;
  isApplicable(element: ForgerElement): boolean;
}
