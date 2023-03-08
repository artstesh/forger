import { ITypeTransformer } from './i-type.transformer';
import * as ts from 'typescript';
import { GenerationDataModel } from '../../../models/generation-data.model';
import { ForgerElement } from '../../../models/forger-element.model';
import { Checker } from '../../checker';
import { ForgerType } from '../../../models/forger.type';
import { MainTransformer } from './main.transformer';

export class CustomTypeTransformer implements ITypeTransformer {
  private static factory = new CustomTypeTransformer();
  public static instance = () => CustomTypeTransformer.factory;

  public create(node: ts.Node, data: GenerationDataModel): ForgerElement {
    const type = Checker.Checker.getTypeFromTypeNode(node as ts.TypeNode);
    const result: ForgerElement = { type: ForgerType.Object, children: [] };
    this.getInnerTypes(type).forEach((d) => {
      if (ts.isTypeLiteralNode(d)) {
        const forgerElement = MainTransformer.create(d, data);
        if (!!forgerElement?.children?.length) result.children?.push(...forgerElement.children);
        return;
      }
      if (!ts.isClassDeclaration(d) && !ts.isInterfaceDeclaration(d)) return;
      (d as ts.ClassDeclaration | ts.InterfaceDeclaration).members?.forEach((m) => {
        const propNode = (m as ts.PropertyDeclaration | ts.SignatureDeclaration)?.type;
        const generic = data.genericInfo?.get(propNode?.getText() ?? '-1')!;
        const name = (m.name as ts.Identifier).escapedText?.toString() ?? 'error';
        if (!!data.genericInfo?.has(propNode?.getText() ?? '-1')) {
          result.children?.push({ ...generic, name });
        } else if (!data.prohibitedProps[name]?.find((e) => e === m.name?.toString())) {
          result.children?.push(
            !propNode ? { name, type: ForgerType.Null } : { name, ...MainTransformer.create(propNode, data) },
          );
        }
      });
    });
    return result;
  }

  private getInnerTypes(type: ts.Type): ts.Declaration[] {
    return (
      (type as ts.IntersectionType).types
        ?.map((n) => (n as ts.LiteralType)?.symbol?.declarations?.[0])
        ?.filter((e) => !!e)
        ?.map((e) => e!) || []
    );
  }

  public isApplicable(node: ts.Node): boolean {
    return ts.isTypeNode(node) && !!this.getInnerTypes(Checker.Checker.getTypeFromTypeNode(node as ts.TypeNode)).length;
  }
}
