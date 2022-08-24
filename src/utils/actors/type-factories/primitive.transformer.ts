import * as ts from 'typescript';
import { ITypeTransformer } from './i-type.transformer';
import { Checker } from '../../checker';
import { ForgerElement } from '../../../models/forger-element.model';
import { MainTransformer } from './main.transformer';
import { ForgerType } from '../../../models/forger.type';

export class PrimitiveTransformer implements ITypeTransformer {
  private static factory = new PrimitiveTransformer();
  public static instance = () => this.factory;

  public create(node: ts.Node, counter: { [type: string]: number }): ForgerElement {
    const refNode = node as ts.TypeReferenceNode;
    const type = Checker.Checker.getTypeFromTypeNode(refNode);
    return this.generateSpoofByType(type, counter);
  }

  private generateSpoofByType(type: ts.Type, counter: { [type: string]: number }): ForgerElement {
    const typeName = PrimitiveTransformer.getTypeName(type);
    counter = PrimitiveTransformer.addTypeToCounter(typeName, counter);
    if (counter[typeName] > MainTransformer.CircularDepth) return { type: ForgerType.Null };
    const result: ForgerElement = { type: ForgerType.Object, children: [] };
    this.getMembersFromType(type).forEach((table) => {
      table?.forEach((m) => {
        if (!m.valueDeclaration) return;
        const propType = Checker.Checker.getTypeAtLocation(m.valueDeclaration);
        const propNode = (m.valueDeclaration as ts.PropertyDeclaration | ts.SignatureDeclaration)?.type;
        result.children?.push(this.extractForgerElement(propType, m.name, { ...counter }, propNode));
      });
    });
    return result;
  }

  private getMembersFromType(type: ts.Type): (ts.SymbolTable | undefined)[] {
    const members: (ts.SymbolTable | undefined)[] = [];
    type.symbol.getDeclarations()?.forEach((d) => {
      if (!ts.isClassDeclaration(d) && !ts.isInterfaceDeclaration(d)) return;
      (d as ts.ClassDeclaration | ts.InterfaceDeclaration).heritageClauses?.forEach((hc) => {
        hc.types.forEach((t) => {
          const heritageType = Checker.Checker.getTypeFromTypeNode(t);
          members.push(...this.getMembersFromType(heritageType));
          members.push(heritageType.symbol.members);
        });
      });
    });
    return [...members, type.symbol.members];
  }

  private static isInnerObject(type: ts.Type): boolean {
    const declaration = PrimitiveTransformer.getTypeDeclaration(type);
    if (!declaration) return false;
    return ts.isClassDeclaration(declaration) || ts.isInterfaceDeclaration(declaration);
  }

  private static getTypeDeclaration(type: ts.Type): ts.Declaration | undefined {
    return type?.symbol?.valueDeclaration || (!!type?.symbol?.declarations ? type.symbol.declarations[0] : undefined);
  }

  private static getTypeName(type: ts.Type): string {
    return type.symbol.getName();
  }

  private static addTypeToCounter(typeName: string, counter: { [type: string]: number }): { [type: string]: number } {
    if (typeof counter[typeName] !== 'undefined') counter[typeName] = counter[typeName] + 1;
    else counter[typeName] = 0;
    return counter;
  }

  private extractForgerElement(
    propType: ts.Type,
    propName: string,
    counter: { [type: string]: number },
    propNode?: ts.TypeNode,
  ): ForgerElement {
    if (!propNode) return { name: propName, type: ForgerType.Null };
    const value = PrimitiveTransformer.isInnerObject(propType)
      ? this.generateSpoofByType(propType, counter)
      : MainTransformer.create(propNode, counter);
    return { name: propName, ...value };
  }

  public isApplicable(node: ts.Node): boolean {
    return ts.isTypeReferenceNode(node) || ts.isTypeLiteralNode(node);
  }
}
