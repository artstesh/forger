import { ForgerElement } from '../../../../models/forger-element.model';
import { MainTransformer } from '../main.transformer';
import * as ts from 'typescript';
import { GenerationDataModel } from '../../../../models/generation-data.model';

export class GenericParsingHelper {
  public static tryParse(refNode: ts.TypeReferenceNode, type: ts.Type, data: GenerationDataModel): GenerationDataModel {
    const genericArguments = new Map<string, ForgerElement>();
    if (!!refNode?.typeArguments?.length && !!type.symbol?.members?.size) {
      let index = 0;
      type.symbol.members.forEach((v) => {
        if (!refNode.typeArguments?.[index] || !v.name) return;
        const typeName = data.genericInfo?.get(refNode.typeArguments[index]?.getText() ?? '-1');
        if (typeName) genericArguments.set(v.name, typeName);
        else genericArguments.set(v.name, MainTransformer.create(refNode.typeArguments[index++], data));
      });
    }
    data.genericInfo = !!genericArguments.size ? genericArguments : null;
    return data;
  }
}
