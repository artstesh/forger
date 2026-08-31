# Testing overhaul

Status: proposed

## Problem

- 72 spec files, 54 of them container-matrix duplicates (primitive × array/tuple/function ×
  nested container) — adding one type kind today means touching dozens of near-identical
  files; the combinatorics are maintained by hand.
- All tests run through ts-jest only; the `tspc`/program-emit path (the one CLI builds use)
  has no suite — this is exactly why the TS 6 language-service divergence
  (see `001-typescript-6-support.md`) surfaced only by manual verification.
- No CI matrix across TypeScript versions, no coverage gate.

## Proposed solution

1. **Consolidate the container matrix with `describe.each`/`test.each`:** one parameterized
   spec per primitive enumerating container shapes (array, nested array, tuple position,
   function return) — target: ≤ 15 spec files covering the same cases.
2. **E2E compile suite:** a small script/CI job that compiles fixture files with `tspc`
   (plugins entry) and asserts on the emitted JS + runtime output; catches program-emit
   regressions and TS-major divergences early.
3. **CI matrix:** node × typescript {5.x, 6.x} on the v2 branch; block merges on red.
4. **Property-based invariants** (fast-check): string length/charset, number bounds, array
   length, enum membership hold for N random settings objects.
5. Coverage threshold in jest config once the matrix consolidation lands.

## Affected areas

`spec/**` (restructure), new `spec/e2e/` + build script, CI config, `jest.config.js`.
