import { ITypeTransformer } from './i-type.transformer';
import * as ts from 'typescript';
import { SyntaxKind } from 'typescript';
import { ForgerElement } from '../../../models/forger-element.model';
import { ForgerType } from '../../../models/forger.type';
import { MainTransformer } from './main.transformer';
import { GenerationDataModel } from '../../../models/generation-data.model';

export class UnionTransformer implements ITypeTransformer {
  private static factory = new UnionTransformer();
  public static instance = () => UnionTransformer.factory;

  public create(node: ts.Node, data: GenerationDataModel): ForgerElement {
    const innerNodes = UnionTransformer.filterAllowedNodes(node as ts.UnionTypeNode);
    if (!innerNodes?.length) return { type: ForgerType.Null };
    const result: ForgerElement = { type: ForgerType.Union, restrictions: [] };
    innerNodes.forEach((n) => {
      if (ts.isLiteralTypeNode(n))
        result.restrictions?.push({
          type: ForgerType.Literal,
          restrictions: [UnionTransformer.getLiteralValue(n as ts.LiteralTypeNode)],
        });
      else result.restrictions?.push(MainTransformer.create(n, data));
    });
    return result;
  }

  private static filterAllowedNodes(node: ts.UnionTypeNode): ts.TypeNode[] {
    return (
      node?.types.filter(
        (n) =>
          (!ts.isLiteralTypeNode(n) || UnionTransformer.isAllowedLiteral(n)) && n.kind !== SyntaxKind.UndefinedKeyword,
      ) ?? []
    );
  }

  private static isAllowedLiteral(node: ts.LiteralTypeNode): boolean {
    return (
      node.literal.kind === SyntaxKind.StringLiteral ||
      node.literal.kind === SyntaxKind.TrueKeyword ||
      node.literal.kind === SyntaxKind.FalseKeyword ||
      node.literal.kind === SyntaxKind.NumericLiteral
    );
  }

  private static getLiteralValue(node: ts.LiteralTypeNode): any {
    switch (node.literal?.kind) {
      case SyntaxKind.StringLiteral:
        return node.literal.text;
      case SyntaxKind.NumericLiteral:
        return Number(node.literal.text);
      case SyntaxKind.TrueKeyword:
        return true;
      case SyntaxKind.FalseKeyword:
        return false;
      default:
        return 0;
    }
  }

  public isApplicable(node: ts.Node): boolean {
    return node.kind === SyntaxKind.UnionType;
  }
}
