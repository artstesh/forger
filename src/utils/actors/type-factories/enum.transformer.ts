import { ITypeTransformer } from './i-type.transformer';
import * as ts from 'typescript';
import { ForgerElement } from '../../../models/forger-element.model';
import { ForgerType } from '../../../models/forger.type';
import { Checker } from '../../checker';
import { GenerationDataModel } from '../../../models/generation-data.model';

export class EnumTransformer implements ITypeTransformer {
  private static factory = new EnumTransformer();
  public static instance = () => EnumTransformer.factory;

  public create(node: ts.Node, data: GenerationDataModel): ForgerElement {
    const type = Checker.Checker.getTypeFromTypeNode(node as ts.TypeNode);
    return { type: ForgerType.Enum, restrictions: this.getEnumValues(type) };
  }

  private getEnumValues(type: ts.Type): (string | number | ts.PseudoBigInt)[] {
    return (type as ts.IntersectionType).types?.map((n) => (n as ts.LiteralType).value) || [];
  }

  public isApplicable(node: ts.Node): boolean {
    return ts.isTypeNode(node) && !!this.getEnumValues(Checker.Checker.getTypeFromTypeNode(node as ts.TypeNode)).length;
  }
}
