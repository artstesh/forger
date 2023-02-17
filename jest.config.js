/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  transform: {
    ".*.spec.ts": ["ts-jest", {
      compiler: "ttypescript",
      astTransformers: {
        before: ["./src/utils/transformer"]
      }
    }]
  }
};
