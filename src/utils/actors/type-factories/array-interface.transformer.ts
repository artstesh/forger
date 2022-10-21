import { ITypeTransformer } from './i-type.transformer';
import * as ts from 'typescript';
import { ForgerElement } from '../../../models/forger-element.model';
import { ForgerType } from '../../../models/forger.type';
import { MainTransformer } from './main.transformer';
import { GenerationDataModel } from '../../../models/generation-data.model';

export class ArrayInterfaceTransformer implements ITypeTransformer {
  private static factory = new ArrayInterfaceTransformer();
  public static instance = () => ArrayInterfaceTransformer.factory;

  public create(node: ts.Node, data: GenerationDataModel): ForgerElement {
    const arrNode = node as ts.TypeReferenceNode;

    if (arrNode.typeArguments?.length) {
      const innerNode = arrNode.typeArguments[0];
      return {
        type: ForgerType.Array,
        children: [ArrayInterfaceTransformer.createEntity(innerNode, data)],
      };
    }
    return { type: ForgerType.Null };
  }

  private static createEntity(arrNode: ts.Node, data: GenerationDataModel): ForgerElement {
    return MainTransformer.create(arrNode, data);
  }

  public isApplicable(node: ts.Node): boolean {
    if (!ts.isTypeReferenceNode(node)) return false;
    const typeName = (node as ts.TypeReferenceNode)?.typeName as ts.Identifier;
    if (!typeName) return false;
    return typeName?.escapedText === 'Array';
  }
}
