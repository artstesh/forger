import * as ts from 'typescript';
import { ITypeTransformer } from './i-type.transformer';
import { ForgerElement } from '../../../models/forger-element.model';
import { ForgerType } from '../../../models/forger.type';
import { MainTransformer } from './main.transformer';

export class TupleTransformer implements ITypeTransformer {
  private static factory = new TupleTransformer();
  public static instance = () => this.factory;

  public create(node: ts.Node, counter: { [type: string]: number }): ForgerElement {
    const result: ForgerElement = { type: ForgerType.Tuple, children: [] };
    (node as ts.TupleTypeNode).elements.forEach((i) => result.children!.push(MainTransformer.create(i, counter)));
    return result;
  }

  public isApplicable(node: ts.Node): boolean {
    return ts.isTupleTypeNode(node);
  }
}
