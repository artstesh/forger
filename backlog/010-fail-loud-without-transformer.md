# Fail loudly when the transformer was not applied

Status: in-progress (implemented on the working tree; move to `done` at release)

## Problem

`Forger.create<T>()` / `Forger.createWith<T>()` called from code compiled without the
transformer used to return `undefined` (create) or crash with an opaque `TypeError`
(createWith). A misconfigured pipeline therefore looked like flaky test data — the exact
failure mode reported by @artstesh/charts when evaluating esbuild-based test builders.

## Proposed solution

Throw a descriptive error when the injected type element is missing:

- exported constant `transformerNotAppliedMessage` in `src/forger.ts`, thrown by both
  `create` and `createWith`;
- the message lists the wiring knobs per pipeline (ts-jest `astTransformers`, ts-patch
  `plugins`, webpack `customWebpackConfig`, the Vitest plugin) and points to
  https://forger.artstesh.ru.

Behavior change: the silent `undefined` path is gone; the `T | undefined` signature is kept
(produce can still return `null` for some elements). Specs: `spec/forger.spec.ts`.

## Affected areas

`src/forger.ts`, `src/index.ts` (re-export via `./forger`), `spec/forger.spec.ts`,
`AI_SKILL.md`, `../forger-faq` (Caveats, Installation, How-It-Works, API-Reference-Forger,
Versions), `AGENTS.md`.
