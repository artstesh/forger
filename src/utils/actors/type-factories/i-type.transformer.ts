import * as ts from 'typescript';
import {Node} from 'typescript';
import {ForgerElement} from '../../../models/forger-element.model';

export interface ITypeTransformer {
  create(node: Node, counter: { [type: string]: number }): ForgerElement;
  isApplicable(node: ts.Node): boolean;
}
