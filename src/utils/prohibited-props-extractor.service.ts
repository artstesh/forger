import * as ts from 'typescript';

export class ProhibitedPropsExtractorService {
  public static extract(node: ts.Node): string[] {
    const prohibitedProps: string[] = [];
    if (!ts.isCallExpression(node)) {
      return prohibitedProps;
    }
    if ((node.expression as ts.PropertyAccessExpression).name.text === 'createWith') {
      let parent = node.parent;
      while (!!parent && !ts.isExpressionStatement(parent)) {
        const callExpression = parent as ts.CallExpression;
        const expName = (callExpression
          ?.expression as ts.PropertyAccessExpression)
          ?.name?.getText();
        if (expName === 'with') {
          const excludedName = (((callExpression.arguments?.[0] as ts.ArrowFunction)
            ?.body as ts.BinaryExpression)
            ?.left as ts.PropertyAccessExpression)?.name?.escapedText;
          if (!!excludedName)
            prohibitedProps.push(excludedName);
        }
        if (expName === 'result') {
          break;
        }
        parent = parent.parent;
      }
    }
    return prohibitedProps;
  }
}
