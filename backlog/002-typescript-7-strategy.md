# TypeScript 7 (tsgo) strategy

Status: proposed

## Problem

TypeScript 7 is the native Go compiler (tsgo), currently stable (`typescript@7.0.2`). It does
not include the JavaScript Compiler API, so JS-based custom transformers — the mechanism
Forger is built on — cannot run under it. ts-jest also stops below 7 (`typescript >=4.3 <7`).
A future v3 line would need a different type-capture mechanism, so the decision must be
explicit and evidence-based, not reactive.

## Landscape (as of 2026-08)

- TS 6.0 is the last JS-based major; deprecated compiler options there are removed in 7.
- The TypeScript team plans a plugin API for the native line (7.1+); until it ships, the
  ecosystem consensus is that transformer-based tooling stays on the TS 5–6 line.
- Community bridge (e.g. TTSC) exists but is not a foundation for a library line.

## Proposed solution

Do not start v3 yet. Instead:

1. Track the tsgo plugin API (7.1+ releases / `@typescript/native-preview`).
2. Keep v2 healthy on the TS 5–6 line (see `001-typescript-6-support.md`).
3. Revisit when either (a) the official tsgo plugin API ships, or (b) consumer demand for
   TS 7 projects becomes real. Candidate v3 mechanisms to evaluate then: official tsgo
   plugin API, a babel-plugin-based capture, or an explicit schema API.

## Affected areas

Potentially the whole architecture; no code changes now.
