import * as ts from 'typescript';
import { ArrayTypeNode } from 'typescript';
import { ITypeTransformer } from './i-type.transformer';
import { ForgerElement } from '../../../models/forger-element.model';
import { ForgerType } from '../../../models/forger.type';
import { MainTransformer } from './main.transformer';
import { GenerationDataModel } from '../../../models/generation-data.model';

export class ArrayTransformer implements ITypeTransformer {
  private static factory = new ArrayTransformer();
  public static instance = () => ArrayTransformer.factory;

  public create(node: ts.Node, data: GenerationDataModel): ForgerElement {
    const arrNode = node as ArrayTypeNode;

    if (ts.isArrayTypeNode(arrNode.elementType)) {
      const innerNode = arrNode.elementType.elementType;
      return {
        type: ForgerType.Array,
        children: [{ type: ForgerType.Array, children: [ArrayTransformer.createEntity(innerNode, data)] }],
      };
    }
    return { type: ForgerType.Array, children: [ArrayTransformer.createEntity(arrNode.elementType, data)] };
  }

  private static createEntity(arrNode: ts.Node, data: GenerationDataModel): ForgerElement {
    return MainTransformer.create(arrNode, data);
  }

  public isApplicable(node: ts.Node): boolean {
    return ts.isArrayTypeNode(node);
  }
}
