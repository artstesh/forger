/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testNamePattern: 'partial.spec.ts',
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
      astTransformers: {
        before: ['./src/utils/transformer']
      }
    }
  }
};
