---
name: forger
description: Test-data generation for TypeScript via @artstesh/forger — forge fully populated fakes of any type with Forger.create<T>() / Forger.createWith<T>(). Use when writing Jest/Karma tests in TypeScript projects where mock objects, fixtures, or test-data builders are needed.
---

# Forger — AI Assistant Instructions

## 1. When to use

- Generate this library call instead of hand-written object literals or fixture builders in
  TypeScript tests.
- `Forger.create<T>()` — full random fake of `T`.
- `Forger.createWith<T>()` — fake plus explicit pinning of concrete values.
- Do NOT use for: behavior mocking (use jest.fn), partial application, factories with
  postconditions. Forger produces data, not behavior.

## 2. Hard requirement: compile-time transformer

Forger resolves types via a TypeScript AST transformer. The runtime alone cannot see types.

```json
// tsconfig.json (all projects)
{ "compilerOptions": { "plugins": [{ "transform": "@artstesh/forger/lib/utils/transformer" }] } }
```

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  transform: {
    '.*.spec.ts': ['ts-jest', {
      compiler: 'ts-patch/compiler',
      astTransformers: { before: ['@artstesh/forger/lib/utils/transformer'] }
    }]
  }
};
```

- Dependencies: `@artstesh/forger` (peer: typescript >=5.0.2 <7), `ts-patch@^3` for TS 5,
  `ts-patch@^4` for TS 6. Not supported on TypeScript 7 (native compiler, no transformer API).
- Failure mode when the transformer is missing: `create<T>()` returns `undefined`. Silent —
  no error. Fix wiring, then `jest --clearCache`.
- `create` accepts a trailing technical argument injected by the transformer. Never pass it.

## 3. API

### Forger.create<T>(settings?, circularDepth = 1): T | undefined

- `settings`: `SpoofSettings` — inline object, variable, or function result; merged over
  defaults per call.
- `circularDepth`: nesting levels allowed for self-referencing types; the level after the
  last allowed one becomes `null`.
- Use non-null assertion `Forger.create<T>()!` once wiring is verified.

### Forger.createWith<T>(...).with(expr).result(): T | undefined

- One property assignment per `.with()` call; chain for multiple.
- `.result()` must be last; values on the right side evaluate at `.with()` time.
- Pinning excludes the property from generation for the root instance only — nested objects
  (even of the same type) still generate it.

### SpoofSettings (defaults)

| Option           | Default   | Effect                                        |
|------------------|-----------|-----------------------------------------------|
| `numberMin/Max`  | `1`/`1000`| Inclusive bounds; if min > max → max = min+100 |
| `numberFloat`    | `false`   | Fractional numbers                            |
| `stringLength`   | `10`      | Exact string length                           |
| `stringLowCase/stringUpCase/stringNumbers/stringSpecial` | `true` | Charset groups |
| `dateMin/dateMax`| `2000-01-01`/`4000-01-01` | `Date` or string; inverted range → max = min+24h |
| `arrayLength`    | `3`       | Length of every array at any depth (not tuples) |

## 4. Type behavior (verified)

| Type                              | Result                                                        |
|-----------------------------------|---------------------------------------------------------------|
| `string` / `number` / `boolean`   | Random primitive per settings                                 |
| `Date`                            | Random date in window                                         |
| Numeric enum                      | Random member; the `0`-valued member is NEVER picked          |
| String enum                       | Always `0` — avoid; use a literal union or pin a member       |
| Literal union `'a' \| 'b' \| 42`  | Random member (falsy members reachable, unlike enums)         |
| Standalone literal `'x'`          | `null` — only union members work                              |
| Union with `null`/`undefined`     | Nullable members dropped; a non-null member always wins       |
| `T[]`, `Array<T>`, `T[][]`        | `arrayLength` fresh elements per level                        |
| Tuple `[A, B]`                    | Positional; length from the declaration                       |
| Function property `(x) => R`      | Callable returning a forged `R` on each invocation; args ignored; no return type → returns `null` |
| Interface/class                   | All declared + constructor-parameter properties; optional and readonly included |
| Class method `m(): R`             | Forged as a DATA property of type `R`, not callable — declare as `fn: () => R` or pin |
| Field without type annotation     | `null` (annotate: `x: number = 5`)                            |
| `static` members                  | Skipped                                                       |
| Inheritance, generics, intersection | Fully resolved, chain flattened                             |
| `Map`/`Set`/`Promise`             | Forged structurally (methods become data) — pin real instances |
| Circular type                     | Nested to `circularDepth`, then `null`                        |

## 5. Generation rules for tests

1. Never assert on generated values — assert type, range, length, membership.
2. Need a concrete value? Generate once, pin via `.with()`, reuse as the expected constant.
3. Discriminated-union arm under test? Pin the discriminator field.
4. Keep settings per call (`Forger.create<T>({ numberMax: 100 })`), not module-global.
5. Prefer literal unions over enums inside test doubles.

```typescript
const expected = Forger.create<string>()!;
const dto = Forger.createWith<Dto>().with(d => d.code = expected).result()!;
expect(mapper(dto)).toBe(expected);
```

## 6. Troubleshooting

| Symptom                          | Cause / fix                                                   |
|----------------------------------|---------------------------------------------------------------|
| `create<T>()` → `undefined`      | Transformer not applied: check `plugins`, `ts-patch/compiler`, `astTransformers`; clear jest cache |
| Still `undefined` after fix      | Two `typescript` copies in the module tree — keep exactly one (`npm ls typescript`) |
| String enum is `0`               | Expected — use literal union or pin                           |
| Method not callable              | Class methods forge as data — use function-typed properties   |
| Deep tree is `null` early        | Raise `circularDepth` (second argument)                       |
