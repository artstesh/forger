import * as ts from 'typescript';
import { Node } from 'typescript';
import { ForgerElement } from '../../../models/forger-element.model';
import { GenerationDataModel } from "../../../models/generation-data.model";

export interface ITypeTransformer {
  create(node: Node, data: GenerationDataModel): ForgerElement;
  isApplicable(node: ts.Node): boolean;
}
