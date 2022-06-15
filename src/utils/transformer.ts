// noinspection JSUnusedGlobalSymbols

import * as ts from 'typescript';
import { Checker } from './checker';
import { MainTransformer } from './actors/type-factories/main.transformer';
import { Forger } from '../forger';

export const version = 1;
export const name = 'forgerTransformer';

export function factory(compilerInstance: any): ts.TransformerFactory<ts.SourceFile> {
  if (!compilerInstance?.program) throw new Error('Program is undefined!');
  return transformer(compilerInstance.program);
}

/**
 * Typescript transformer factory
 * @param program Program
 */
export const transformer =
  (program: ts.Program | { getTypeChecker(): ts.TypeChecker }): ts.TransformerFactory<ts.SourceFile> =>
  (context) => {
    return (file) => {
      Checker.setChecker(program.getTypeChecker());
      return ts.visitNode(file, visitNode(context, program.getTypeChecker()));
    };
  };

const isTargetExpression = (target: ts.CallExpression) =>
  ts.isPropertyAccessExpression(target.expression) &&
  ts.isIdentifier(target.expression.expression) &&
  target.expression.name.text === 'create' &&
  target.expression.expression.text === 'Forger';

/**
 * Typescript AST Node visitor
 * @param context Transformation context
 * @param checker Type checker
 */
const visitNode =
  (context: ts.TransformationContext, checker: ts.TypeChecker): ts.Visitor =>
  (node) => {
    node = ts.visitEachChild(node, visitNode(context, checker), context);

    if (!ts.isCallExpression(node) || !isTargetExpression(node) || !node.typeArguments) {
      return node;
    }
    const settingsArg = !!node.arguments.length
      ? node.arguments[0]
      : ts.factory.createRegularExpressionLiteral(JSON.stringify({}));
    const circularArg =
      node.arguments?.length === 2
        ? node.arguments[1]
        : ts.factory.createRegularExpressionLiteral(JSON.stringify(MainTransformer.CircularDepth));
    const [typeArgument] = node.typeArguments;
    MainTransformer.setCircularDepth((node.arguments[1] as ts.NumericLiteral)?.text);
    const forgerElement = MainTransformer.create(typeArgument, {});
    return ts.factory.updateCallExpression(node, node.expression, node.typeArguments, [
      settingsArg,
      circularArg,
      ts.factory.createRegularExpressionLiteral(JSON.stringify(forgerElement)),
    ]);
  };

export default transformer;
