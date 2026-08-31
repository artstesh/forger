# TypeScript 6 support (v2.1)

Status: in-progress

> Implementation complete (2026-08-31), verified on TS 5 (full suite: 72 suites / 316 tests)
> and TS 6.0.3 (ts-jest and tspc routes, packed tarball install). Remaining: commit, release
> as 2.0.1/2.1, optionally add the CI job from the proposed solution.

## Problem

Forger 2 declares `peerDependencies: { typescript: "^5.0.2" }`, which blocks installation in
TypeScript 6 projects (npm treats the peer as unsatisfied). TypeScript 6.0 — the last
JS-based major — was verified empirically (temp project: TS 6.0.3 + ts-jest 29.4.12 +
ts-patch 4.0.1 + a packed forger 2.0.0 tarball), and the transformer architecture works on
it, but three concrete issues must ship before TS 6 can be declared supported.

## Verified findings (2026-08-30)

1. **ts-patch route works as-is.** `tspc` (ts-patch 4.0.1, program emit) rewrites
   `Forger.create<T>()` call sites correctly and the runtime produces valid fakes.
2. **ts-jest route needs one guard.** In the ts-jest language-service emit path under TS 6,
   `typeArgument.getText()` in `src/utils/transformer.ts` throws ("Cannot read properties of
   undefined (reading 'text')" inside `NodeObject.getText`) because the type node can be
   detached from its source file. Fix: wrap in try/catch and fall back to
   `checker.typeToString(checker.getTypeFromTypeNode(typeArgument))` — the value is only used
   as the `prohibitedProps` key. Verified: with the guard, the full suite passes on TS 6.
3. **Latent v2 bug (reproducible on TS 5 too):** `Forger.createWith<T>()` does not merge
   default `SpoofSettings` (unlike `create`), so a `Date` property crashes in
   `DateFactory.produce` (`settings.dateMin.getTime` of undefined) when no settings object is
   passed. Fix: apply the same `{ ...new SpoofSettings(), ...settings }` merge in
   `createWith` (or merge inside `DateFactory` like `NumberFactory`/`StringFactory` do).
4. **Tooling matrix:** ts-patch 4.x requires TS >= 6 (TS 5 stays on ts-patch 3.x);
   ts-jest 29.4.x accepts `typescript >=4.3 <7`.

## Proposed solution

- Fix items 2 and 3 in `src/`, with specs reproducing both (a ts-jest-only failure mode for
  item 2 is hard to spec in-repo — cover the `createWith` + `Date` case for item 3, and keep
  a manual TS 6 verification note in this file).
- Widen peers to `"typescript": ">=5.0.2 <7"` in `package.json`.
- Document the ts-patch major matrix in `../forger-faq` (done: Installation.md, Versions.md).
- Optional: CI job building/running the spec suite against typescript@6.

## Implementation log

- `src/utils/transformer.ts`: `typeText()` helper — `getText()` with a
  `checker.typeToString` fallback for detached nodes; used as the prohibited-props key.
- `src/forger.ts`: `createWith` now merges defaults (`{ ...new SpoofSettings(), ...settings }`),
  same as `create`.
- `package.json`: peer range widened to `>=5.0.2 <7`.
- `spec/factories/create-with.spec.ts`: two new specs (Date without explicit settings;
  partial settings merged with defaults).
- Docs updated: `Versions.md`, `Installation.md` (earlier), `AI_SKILL.md` (workaround rows
  removed), `forger/AGENTS.md`.

## Affected areas

`src/forger.ts` (createWith merge), `src/utils/transformer.ts` (getText guard),
`spec/` (new cases), `package.json` (peer range), `../forger-faq` (Versions/Installation —
already updated), this backlog (status updates).
