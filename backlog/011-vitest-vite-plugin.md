# Vite plugin for Vitest / esbuild pipelines

Status: in-progress (implemented on the working tree; move to `done` at release)

## Problem

Vitest and the esbuild-based Angular builders (`@angular/build:karma`, `unit-test`,
`application`) never run `tsconfig` `plugins` transformers and expose no hook for them —
every Forger call reached runtime unrewritten (silently `undefined` before backlog/010).
Extracted from 009 (its item 3).

## Proposed solution

`defineForgerVitestPlugin(options)` in `src/integrations/forger-vitest.plugin.ts`, exported
from the package root:

- a `pre` vite plugin: for every `.ts`/`.tsx` file containing `Forger.create` /
  `Forger.createWith` calls, applies the existing `transformer(program)` and returns the
  rewritten source (printed with the TypeScript printer);
- the ts.Program is created from the consumer tsconfig (default `tsconfig.spec.json`) and
  cached; files missing from the config are added on first sight;
- source texts are taken from a snapshot map fed by vite's `code` through a custom
  `CompilerHost.getSourceFile` — the transformed file always belongs to the program (the type
  checker resolves symbols only for program-owned files), the rewrite never runs against
  stale disk content, and a text change rebuilds the program without the incremental cache;
- no `vite` dependency: the returned object is structurally assignable to vite's `Plugin`;
  `typescript` remains the only peer.

Known limitation: no source map is returned; stack traces of rewritten lines may be slightly
offset. Specs: `spec/integrations/forger-vitest.plugin.spec.ts` (+ fixtures).

## Affected areas

`src/integrations/forger-vitest.plugin.ts`, `src/index.ts`, `spec/integrations/**`,
`README.md`, `AI_SKILL.md`, `../forger-faq` (Integration-Vitest (new, registered in
`f.tree`), Integration-Angular, Installation, Caveats, Versions), `AGENTS.md`.
