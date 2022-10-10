/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  cache: false,
  globals: {
    'ts-jest': {
      compiler: 'ttypescript',
      astTransformers: {
        before: ['./src/utils/transformer']
      }
    }
  }
};
