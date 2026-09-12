# Toolchain modernization and build integrations

Status: proposed

## Problem

Tooling debt and missing integration targets:

1. `tslint` is deprecated (archived) and enforces nothing the compiler/prettier do not;
   `ts-transformer-keys` is an unused devDependency (verified: no imports in `src/`).
2. Angular's default since v17 is the **esbuild-based application builder**; the shipped
   webpack patch only hooks `AngularWebpackPlugin` (webpack builds) — esbuild consumers
   have no supported route.
3. No Vitest/Vite story: `astTransformers` is a ts-jest concept; Vitest projects need a
   different hook.
4. The transformer exports no TypeScript types/plugin-config typings for consumers; the
   programmatic `transformer(program)` API is usable but undocumented.

## Proposed solution

1. Migrate tslint → eslint (@typescript-eslint, prettier config), drop
   `ts-transformer-keys` and `tslint-config-prettier`; keep `npm run lint` script name.
2. Angular esbuild (application builder): investigate a postprocess plugin for the application
   builder (`"plugins"` in `angular.json` executes after esbuild; feasibility spike required —
   may need to hook esbuild's `onLoad` for `.ts` via a custom builder). Document the
   supported matrix explicitly (webpack ✓ / vitest+vite plugin ✓ — see 011 /
   esbuild application builder — status). Note: esbuild plugin hooks do not exist for the
   *test* builders (`@angular/build:karma` accepts no plugins); the test-target route is
   Vitest + the plugin from 011, not an esbuild plugin.
3. ~~Vitest: publish a thin `defineForgerVitestPlugin()`~~ — done via
   [011-vitest-vite-plugin.md](011-vitest-vite-plugin.md).
4. Export and document typings: `ForgerPluginConfig`, re-export `transformer` type from the
   package root (the root export already exists; documenting it in README is still open).

## Affected areas

`package.json`, `.eslintrc` (new), `tslint.json` (delete), `src/webpack.config.ts` (keep),
new integration modules, `../forger-faq` (Integration-*, Installation), `AI_SKILL.md`.
