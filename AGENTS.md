# AGENTS.md — @artstesh/forger

`@artstesh/forger` is a test-data generator for TypeScript: `Forger.create<T>()` returns a
fully populated fake of any type, so tests contain only the data that really matters.
Workspace-wide rules (English-only docs, backlog, docs sync) live in the root `../AGENTS.md`
and apply here as well.

## Version lines and branches

| Line | Branch | TypeScript | Notes                                            |
|------|--------|------------|--------------------------------------------------|
| v2   | `v2`   | 5.x / 6.x  | Current line; peer `>=5.0.2 <7`. TS 6 support implemented and verified (see `backlog/001`). |
| v1   | `v1`   | 4.x        | Legacy line; critical fixes only.                |

- The working branch is `v2`; `main` mirrors the current line. Never mix changes for
  different lines in one commit/PR.
- The v1 toolchain runs only on older Node: `ttypescript` patches Node's `Module` and fails
  to load from Node 18.18 on (`Cannot set property constructor … which has only a getter`),
  before any compilation starts. Verified working on Node 18.10. When running v1 tests,
  point PATH at an nvm-installed Node ≤ 18.10; the v2 line (`ts-patch`) is unaffected.
- TypeScript 6 compatibility was verified end to end (ts-patch 4 + `tspc`, ts-jest 29.4):
  the transformer architecture works; pending fixes are tracked in `backlog/`.
- TypeScript 7 (tsgo, the native compiler) has no JS Compiler API and cannot run custom
  transformers — no Forger line targets it; strategy is tracked in `backlog/`.
- Documentation (`../forger-faq`) describes the v2 line only.

## How it works

Forger is a **compile-time AST transformer plus a runtime factory pipeline**:

1. **Compile time.** The custom transformer (`src/utils/transformer.ts`) is applied via
   ts-patch (`tspc`), ts-jest (`astTransformers`, see `jest.config.js`), the shipped Angular
   webpack patch (`src/webpack.config.ts`), or the shipped Vite plugin
   (`src/integrations/forger-vitest.plugin.ts`). It finds every
   `Forger.create<T>(...)` / `Forger.createWith<T>(...)` call, converts the type argument into
   a serialized `ForgerElement` tree (`MainTransformer` in `src/utils/actors/type-factories/`),
   and injects that tree as an extra trailing argument of the call.
2. **Runtime.** `Forger.create` passes the element to `MainFactory.produce()`
   (`src/factories/main.factory.ts`), which picks the first factory whose `isApplicable()`
   matches and calls its `produce()` to build the value. Primitive shape is tuned through
   `SpoofSettings`.

Key consequence: **code compiled without the transformer makes `Forger.create<T>()` throw the
exported `transformerNotAppliedMessage` error** (a loud failure by design — it used to return
`undefined` silently). Always build and test through the project's configured pipeline — never
with a bare `tsc`/`jest` invocation.

## Layout

| Path                                     | Purpose                                                                   |
|------------------------------------------|---------------------------------------------------------------------------|
| `src/forger.ts`                          | Public API: `Forger.create`, `Forger.createWith`, `transformerNotAppliedMessage`. |
| `AI_SKILL.md`                            | Machine-oriented instructions for AI assistants; ships in the npm package (`files`). Must stay in sync with behavior — update together with the matching docs topics. |
| `src/index.ts`                           | Package exports.                                                           |
| `src/integrations/forger-vitest.plugin.ts` | Vite plugin (`defineForgerVitestPlugin`) for Vitest/esbuild pipelines.   |
| `src/factories/`                         | Runtime factories, one per type kind; `MainFactory` dispatches to the first applicable. |
| `src/factories/i-type.factory.ts`        | The factory contract: `isApplicable()` / `produce()`.                      |
| `src/utils/transformer.ts`               | Compile-time transformer entry point.                                      |
| `src/utils/actors/type-factories/`       | TS type node → `ForgerElement` transformers; `MainTransformer` dispatches. |
| `src/models/`                            | `ForgerElement`, `ForgerType`, `SpoofSettings`, `CreateWithModel`, `GenerationData`. |
| `spec/`                                  | Jest specs, mirroring the `src/` structure.                                |
| `backlog/`                               | Features to implement — one Markdown file per feature (see `backlog/README.md`). |
| `lib/`, `src/**/*.js|*.d.ts|*.map`       | Build artifacts, gitignored — never edit or commit manually.               |

## Commands (run inside `forger/`)

| Command            | Action                                                              |
|--------------------|---------------------------------------------------------------------|
| `npm test`         | Build with ts-patch, then run jest with the transformer applied.     |
| `npm run build`    | Compile the package into `lib/` (also runs on `npm install` via `prepare`). |
| `npm run lint`     | tslint (specs are excluded).                                         |
| `npm run format`   | prettier over `src/**/*.ts`.                                         |

Releasing: `npm version` drives the flow (`preversion` → lint, `version` → format + stage,
`postversion` → push with tags). `prepublishOnly` runs tests and lint.

## Testing conventions

- Specs live in `spec/` and mirror the source layout: factory behavior in `spec/factories/`,
  with per-primitive and per-container subfolders following the existing pattern.
- File names are `*.spec.ts`.
- Assertions use `@artstesh/it-should` (`should().number(x).greaterOrEqual(n)`); plain `expect`
  also occurs — follow the style of the neighboring specs.
- Specs exercise types, not concrete values: assert on the generated value's type/shape and on
  the restrictions from `SpoofSettings`, not on random data itself.

## Change rules

1. **Comments and JSDoc in English.**
2. **Keep this file current.** A change that alters architecture, public API, commands, or
   conventions updates this `AGENTS.md` in the same change. The same applies to
   `AI_SKILL.md`: any behavior change shipped to consumers updates it too.
3. **Docs sync.** A change affecting observable behavior updates the matching topic in
   `../forger-faq/forger-site/Writerside/topics/` in the same change (the area-to-topic map
   lives in `../forger-faq/AGENTS.md`).
4. **Backlog.** New feature ideas and postponed work go to `backlog/` as separate files.
5. **New type support** follows the existing pattern twice: a transformer in
   `src/utils/actors/type-factories/` (registered in `MainTransformer`) and a factory in
   `src/factories/` (registered in `MainFactory`), plus specs in `spec/factories/`.
