import { ForgerElement } from '../../../models/forger-element.model';
import { ArrayTransformer } from './array.transformer';
import * as ts from 'typescript';
import { SyntaxKind } from 'typescript';
import { TupleTransformer } from './tuple.transformer';
import { FunctionTransformer } from './function.transformer';
import { ValueTypeTransformer } from './value-type.transformer';
import { DateTransformer } from './date.transformer';
import { EnumTransformer } from './enum.transformer';
import { PrimitiveTransformer } from './primitive.transformer';
import { ForgerType } from '../../../models/forger.type';
import { ArrayInterfaceTransformer } from './array-interface.transformer';

export class MainTransformer {
  public static _circularDepth = 1;

  public static get CircularDepth() {
    return MainTransformer._circularDepth;
  }

  public static setCircularDepth(depth?: string | number) {
    if (!depth) return;
    const newDepth = Number(depth);
    if (isNaN(newDepth)) return;
    MainTransformer._circularDepth = newDepth;
  }

  private static factories = [
    ArrayTransformer.instance(),
    ArrayInterfaceTransformer.instance(),
    TupleTransformer.instance(),
    FunctionTransformer.instance(),
    ValueTypeTransformer.instance(),
    DateTransformer.instance(),
    EnumTransformer.instance(),
    PrimitiveTransformer.instance(),
  ];

  public static create(node: ts.Node, counter: { [type: string]: number }): ForgerElement {
    if (ts.isParenthesizedTypeNode(node)) node = node.type;
    if (node.kind === SyntaxKind.UnionType) {
      node = (node as ts.UnionTypeNode).types.filter(
        (n) => !ts.isLiteralTypeNode(n) && n.kind !== SyntaxKind.UndefinedKeyword,
      )[0];
    }
    if (!node) return { type: ForgerType.Null };
    return (
      MainTransformer.factories.filter((f) => f.isApplicable(node))[0]?.create(node, counter) ?? {
        type: ForgerType.Null,
      }
    );
  }
}
