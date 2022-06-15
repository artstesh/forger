import { ForgerType } from './forger.type';

export class ForgerElement {
  name?: string;
  type: ForgerType = ForgerType.Null;
  children?: ForgerElement[];
  restrictions?: any[];
}
