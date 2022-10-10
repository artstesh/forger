import * as ts from 'typescript';
import { ArrayTypeNode } from 'typescript';
import { ITypeTransformer } from './i-type.transformer';
import { ForgerElement } from '../../../models/forger-element.model';
import { ForgerType } from '../../../models/forger.type';
import { MainTransformer } from './main.transformer';

export class ArrayTransformer implements ITypeTransformer {
  private static factory = new ArrayTransformer();
  public static instance = () => ArrayTransformer.factory;

  public create(node: ts.Node, counter: { [type: string]: number }): ForgerElement {
    const arrNode = node as ArrayTypeNode;

    if (ts.isArrayTypeNode(arrNode.elementType)) {
      const innerNode = arrNode.elementType.elementType;
      return {
        type: ForgerType.Array,
        children: [{ type: ForgerType.Array, children: [ArrayTransformer.createEntity(innerNode, counter)] }],
      };
    }
    return { type: ForgerType.Array, children: [ArrayTransformer.createEntity(arrNode.elementType, counter)] };
  }

  private static createEntity(arrNode: ts.Node, counter: { [type: string]: number }): ForgerElement {
    return MainTransformer.create(arrNode, counter);
  }

  public isApplicable(node: ts.Node): boolean {
    return ts.isArrayTypeNode(node);
  }
}
