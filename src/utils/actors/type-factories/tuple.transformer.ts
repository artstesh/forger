import * as ts from 'typescript';
import { ITypeTransformer } from './i-type.transformer';
import { ForgerElement } from '../../../models/forger-element.model';
import { ForgerType } from '../../../models/forger.type';
import { MainTransformer } from './main.transformer';
import { GenerationDataModel } from "../../../models/generation-data.model";

export class TupleTransformer implements ITypeTransformer {
  private static factory = new TupleTransformer();
  public static instance = () => TupleTransformer.factory;

  public create(node: ts.Node, data: GenerationDataModel): ForgerElement {
    const result: ForgerElement = { type: ForgerType.Tuple, children: [] };
    (node as ts.TupleTypeNode).elements.forEach((i) => result.children!.push(MainTransformer.create(i, data)));
    return result;
  }

  public isApplicable(node: ts.Node): boolean {
    return ts.isTupleTypeNode(node);
  }
}
