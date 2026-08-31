# Architecture: remove global mutable statics

Status: proposed

## Problem

Compile-time state lives in two mutable singletons:

- `Checker.setChecker(...)` — static type checker, set once per file visit;
- `MainTransformer._circularDepth` — static depth (see also
  `004-circular-depth-state-leak.md`).

Runtime factories are clean, but the transformer pipeline is not reentrant: parallel
compilation (ts-jest workers share module state per process; multi-project builds) can
observe a checker/depth from another file's context. Statics also make unit-testing the
transformers harder (implicit setup order).

## Proposed solution

- Introduce a `TransformationContext` object `{ checker, circularDepth, counter, genericInfo,
  prohibitedProps }` created per `Forger.create` call site in `visitNode` and passed through
  `MainTransformer.create` (the `GenerationDataModel` already carries most of this — fold
  checker and depth into it and delete the statics).
- `Checker` class is deleted; transformers receive the checker via the data model.
- Migration is internal (no public API change); behavior specs must stay green untouched.

## Affected areas

`src/utils/checker.ts` (delete), `src/utils/transformer.ts`,
`src/utils/actors/type-factories/**` (signatures), `spec/` (no behavioral change expected).
