// noinspection JSUnusedGlobalSymbols

import * as ts from 'typescript';
import { Checker } from './checker';
import { MainTransformer } from './actors/type-factories/main.transformer';
import { Forger } from '../forger';
import { ProhibitedPropsExtractorService } from './prohibited-props-extractor.service';

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
export const transformer = (
  program: ts.Program | { getTypeChecker(): ts.TypeChecker },
): ts.TransformerFactory<ts.SourceFile> => {
  return (context) => {
    return (file) => {
      Checker.setChecker(program.getTypeChecker());
      return ts.visitNode(file, visitNode(context, program.getTypeChecker())) as any;
    };
  };
};

const isTargetExpression = (target: ts.CallExpression) =>
  ts.isPropertyAccessExpression(target.expression) &&
  ts.isIdentifier(target.expression.expression) &&
  (target.expression.name.text === 'create' || target.expression.name.text === 'createWith') &&
  target.expression.expression.text === 'Forger';

/**
 * Text of a type node, used as the prohibited-props key.
 * In the language-service emit path a node can be detached from its source file,
 * making getText() throw — fall back to the checker representation.
 * @param node Type node
 * @param checker Type checker
 */
const typeText = (node: ts.TypeNode, checker: ts.TypeChecker): string => {
  try {
    return node.getText();
  } catch (e) {
    return checker.typeToString(checker.getTypeFromTypeNode(node));
  }
};

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
    const [typeArgument] = node.typeArguments;
    // The depth static is shared by all call sites, so resolve it from this call's
    // own argument (or the default) before building the tree and the injected argument.
    MainTransformer.setCircularDepth(
      node.arguments.length === 2 ? (node.arguments[1] as ts.NumericLiteral).text : 1,
    );
    const circularArg =
      node.arguments.length === 2
        ? node.arguments[1]
        : ts.factory.createRegularExpressionLiteral(JSON.stringify(MainTransformer.CircularDepth));
    const forgerElement = MainTransformer.create(typeArgument, {
      counter: {},
      genericInfo: null,
      prohibitedProps: { [typeText(typeArgument, checker)]: ProhibitedPropsExtractorService.extract(node) },
    });
    return ts.factory.updateCallExpression(node, node.expression, node.typeArguments, [
      settingsArg,
      circularArg,
      ts.factory.createRegularExpressionLiteral(JSON.stringify(forgerElement)),
    ]);
  };

export default transformer;
