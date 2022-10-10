import { ITypeTransformer } from './i-type.transformer';
import * as ts from 'typescript';
import { SyntaxKind } from 'typescript';
import { ForgerElement } from '../../../models/forger-element.model';
import { ForgerType } from '../../../models/forger.type';
import { MainTransformer } from './main.transformer';

export class FunctionTransformer implements ITypeTransformer {
  private static factory = new FunctionTransformer();
  public static instance = () => FunctionTransformer.factory;

  public create(node: ts.Node, counter: { [type: string]: number }): ForgerElement {
    const methodNode = node as ts.FunctionTypeNode;
    const returnValue: ForgerElement =
      !!methodNode.type && methodNode.type.kind !== SyntaxKind.VoidKeyword
        ? MainTransformer.create(methodNode.type, counter)
        : { type: ForgerType.Null };
    return { type: ForgerType.Function, children: [returnValue] };
  }

  public isApplicable(node: ts.Node): boolean {
    return ts.isFunctionTypeNode(node);
  }
}
