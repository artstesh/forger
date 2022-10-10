import { ForgerElement } from '../../../../models/forger-element.model';
import { MainTransformer } from '../main.transformer';
import * as ts from 'typescript';

export class GenericParsingHelper {
  public static tryParse(
    refNode: ts.TypeReferenceNode,
    type: ts.Type,
    counter: { [type: string]: number },
  ): Map<string, ForgerElement> | null {
    const genericArguments = new Map<string, ForgerElement>();
    if (!!refNode?.typeArguments?.length && !!type.symbol?.members?.size) {
      let index = 0;
      type.symbol.members.forEach((v, k) => {
        if (!refNode.typeArguments?.[index] || !v.name) return;
        genericArguments.set(v.name, MainTransformer.create(refNode.typeArguments[index++], counter));
      });
    }
    return !!genericArguments.size ? genericArguments : null;
  }
}
