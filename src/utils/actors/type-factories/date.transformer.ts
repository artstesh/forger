import { ITypeTransformer } from './i-type.transformer';
import * as ts from 'typescript';
import { ForgerElement } from '../../../models/forger-element.model';
import { ForgerType } from '../../../models/forger.type';
import { GenerationDataModel } from "../../../models/generation-data.model";

export class DateTransformer implements ITypeTransformer {
  private static factory = new DateTransformer();
  public static instance = () => DateTransformer.factory;

  // noinspection JSUnusedLocalSymbols
  public create = (node: ts.Node, data: GenerationDataModel): ForgerElement => ({ type: ForgerType.Date });

  public isApplicable(node: ts.Node): boolean {
    return ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName) && node.typeName.text === 'Date';
  }
}
