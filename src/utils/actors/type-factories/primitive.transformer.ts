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
    const typeName = PrimitiveTransformer.getTypeName(type);
    counter = PrimitiveTransformer.addTypeToCounter(typeName, counter);
    if (counter[typeName] > MainTransformer.CircularDepth) return { type: ForgerType.Null };
    const result: ForgerElement = { type: ForgerType.Object, children: [] };
    type.symbol.members?.forEach((m) => {
      if (!m.valueDeclaration) return;
      const propType = Checker.Checker.getTypeAtLocation(m.valueDeclaration);
      const propNode = (m.valueDeclaration as ts.PropertyDeclaration | ts.SignatureDeclaration)?.type;
      result.children?.push(this.extractForgerElement(propType, m.name, { ...counter }, propNode));
    });
    return result;
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

  private fillObject(type: ts.Type, counter: { [type: string]: number }): ForgerElement {
    const typeDeclaration = PrimitiveTransformer.getTypeDeclaration(type) as
      | ts.ClassDeclaration
      | ts.InterfaceDeclaration;
    const typeName = PrimitiveTransformer.getTypeName(type);
    counter = PrimitiveTransformer.addTypeToCounter(typeName, counter);
    if (counter[typeName] > MainTransformer.CircularDepth) return { type: ForgerType.Null };
    const result: ForgerElement = { type: ForgerType.Object, children: [] };
    typeDeclaration.members.forEach((m) => {
      if (!m.name) return;
      const propType = Checker.Checker.getTypeAtLocation(m.name);
      const propNode = (m as ts.PropertyDeclaration | ts.SignatureDeclaration)?.type;
      result.children?.push(this.extractForgerElement(propType, m.name.getText(), { ...counter }, propNode));
    });
    return result;
  }

  private extractForgerElement(
    propType: ts.Type,
    propName: string,
    counter: { [type: string]: number },
    propNode?: ts.TypeNode,
  ): ForgerElement {
    if (!propNode) return { name: propName, type: ForgerType.Null };
    const value = PrimitiveTransformer.isInnerObject(propType)
      ? this.fillObject(propType, counter)
      : MainTransformer.create(propNode, counter);
    return { name: propName, ...value };
  }

  public isApplicable(node: ts.Node): boolean {
    return ts.isTypeReferenceNode(node);
  }
}
