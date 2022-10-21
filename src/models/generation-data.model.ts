import { ForgerElement } from './forger-element.model';

export interface GenerationDataModel {
  counter: { [type: string]: number };
  genericInfo: Map<string, ForgerElement> | null;
}
