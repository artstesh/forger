import * as ts from 'typescript';
import { ITypeTransformer } from './i-type.transformer';
import { Checker } from '../../checker';
import { ForgerElement } from '../../../models/forger-element.model';
import { MainTransformer } from './main.transformer';
import { ForgerType } from '../../../models/forger.type';
import { GenericParsingHelper } from './helpers/generic-parsing.helper';
import { GenerationDataModel } from "../../../models/generation-data.model";

export class PrimitiveTransformer implements ITypeTransformer {
  private static factory = new PrimitiveTransformer();
  public static instance = () => PrimitiveTransformer.factory;

  public create(node: ts.Node, data: GenerationDataModel): ForgerElement {
    const refNode = node as ts.TypeReferenceNode;
    const type = Checker.Checker.getTypeFromTypeNode(refNode);
    return this.generateSpoofByType(refNode, type, data);
  }

  private generateSpoofByType(
    refNode: ts.TypeReferenceNode,
    type: ts.Type,
    data: GenerationDataModel
  ): ForgerElement {
    data = GenericParsingHelper.tryParse(refNode, type, data);
    const typeName = PrimitiveTransformer.getTypeName(type);
    data = PrimitiveTransformer.addTypeToCounter(typeName, data);
    if (data.counter[typeName] > MainTransformer.CircularDepth) return { type: ForgerType.Null };
    const result: ForgerElement = { type: ForgerType.Object, children: [] };
    this.getMembersFromType(type).forEach((table) => {
      table?.forEach((m) => {
        if (!m.valueDeclaration) return;
        const propNode = (m.valueDeclaration as ts.PropertyDeclaration | ts.SignatureDeclaration)?.type;
        const generic = data.genericInfo?.get(propNode?.getText() ?? '-1')!;
        if (!!data.genericInfo?.has(propNode?.getText() ?? '-1')) {
          generic.name = m.getEscapedName()?.toString() || 'error';
          result.children?.push(generic);
        } else {
          result.children?.push(this.extractForgerElement(m.name, {...data, counter: { ...data.counter }}, propNode));
        }
      });
    });
    return result;
  }

  private getMembersFromType(type: ts.Type): (ts.SymbolTable | undefined)[] {
    const members: (ts.SymbolTable | undefined)[] = [];
    type.symbol?.getDeclarations()?.forEach((d) => {
      if (!ts.isClassDeclaration(d) && !ts.isInterfaceDeclaration(d)) return;
      (d as ts.ClassDeclaration | ts.InterfaceDeclaration).heritageClauses?.forEach((hc) => {
        hc.types.forEach((t) => {
          const heritageType = Checker.Checker.getTypeFromTypeNode(t);
          members.push(...this.getMembersFromType(heritageType));
          members.push(heritageType.symbol.members);
        });
      });
    });
    const result = !!type.symbol?.members ? [type.symbol.members] : [];
    return [...members, ...result];
  }

  private static getTypeName(type: ts.Type): string {
    return type.symbol?.getName() || '';
  }

  private static addTypeToCounter(typeName: string, data: GenerationDataModel): GenerationDataModel {
    if (typeof data.counter[typeName] !== 'undefined') data.counter[typeName] = data.counter[typeName] + 1;
    else data.counter[typeName] = 0;
    return data;
  }

  private extractForgerElement(
    propName: string,
    data: GenerationDataModel,
    propNode?: ts.TypeNode,
  ): ForgerElement {
    if (!propNode) return { name: propName, type: ForgerType.Null };
    return { name: propName, ...MainTransformer.create(propNode, data) };
  }

  public isApplicable(node: ts.Node): boolean {
    return ts.isTypeReferenceNode(node) || ts.isTypeLiteralNode(node);
  }
}
