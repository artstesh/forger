import { ITypeTransformer } from './i-type.transformer';
import * as ts from 'typescript';
import { SyntaxKind } from 'typescript';
import { ForgerElement } from '../../../models/forger-element.model';
import { ForgerType } from '../../../models/forger.type';
import { GenerationDataModel } from '../../../models/generation-data.model';

export class ValueTypeTransformer implements ITypeTransformer {
  private static factory = new ValueTypeTransformer();
  public static instance = () => ValueTypeTransformer.factory;

  public create(node: ts.Node, data: GenerationDataModel): ForgerElement {
    const typeNode = node as ts.TypeNode;
    if (SyntaxKind.StringKeyword === typeNode.kind) return { type: ForgerType.String };
    if (SyntaxKind.NumberKeyword === typeNode.kind) return { type: ForgerType.Number };
    return { type: ForgerType.Bool };
  }

  public isApplicable(node: ts.Node): boolean {
    if (!ts.isTypeNode(node)) return false;
    return [SyntaxKind.StringKeyword, SyntaxKind.NumberKeyword, SyntaxKind.BooleanKeyword].includes(node.kind);
  }
}
