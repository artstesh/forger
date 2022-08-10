import {ForgerElement} from '../../../models/forger-element.model';
import {ArrayTransformer} from './array.transformer';
import * as ts from 'typescript';
import {TupleTransformer} from './tuple.transformer';
import {FunctionTransformer} from './function.transformer';
import {ValueTypeTransformer} from './value-type.transformer';
import {DateTransformer} from './date.transformer';
import {EnumTransformer} from './enum.transformer';
import {PrimitiveTransformer} from './primitive.transformer';
import {ForgerType} from '../../../models/forger.type';
import {ArrayInterfaceTransformer} from './array-interface.transformer';
import {UnionTransformer} from './union.transformer';

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
    UnionTransformer.instance(),
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
    if (!node) return { type: ForgerType.Null };
    if (ts.isParenthesizedTypeNode(node)) node = node.type;
    if (!node) return { type: ForgerType.Null };
    return (
      MainTransformer.factories.filter((f) => f.isApplicable(node))[0]?.create(node, counter) ?? {
        type: ForgerType.Null,
      }
    );
  }
}
