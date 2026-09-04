# Type coverage fixes: enums, literals, methods, built-in collections

Status: in-progress

> Item 1 (enum pipeline) is implemented and verified — see the implementation log. Remaining:
> items 2–5 (standalone literals, methods as functions, built-in collections).

## Problem

Four verified gaps where forged values do not match the declared type:

1. **String enums yield `0`.** `EnumTransformer.getEnumValues` filters `!!e` (drops falsy
   values, keeps strings) but `EnumFactory.produce` maps everything through `Number()` and
   filters `!isNaN` — string members vanish, factory returns `0`.
2. **The `0`-valued enum member is unreachable.** Same falsy filter in
   `getEnumValues`: `enum Flag { Off, On }` can only produce `On`.
3. **Standalone literal types yield `null`.** `Forger.create<'fixed'>()` — no transformer
   handles `LiteralTypeNode` outside unions.
4. **Class methods are forged as data.** A method declaration becomes a property holding a
   forged return value; calling it fails.
5. **`Map`/`Set`/`Promise` are forged structurally** — members become garbage data
   properties; the result type-checks but does not behave.

## Proposed solution

- Fix enum pipeline: keep raw values (filter `!== undefined` instead of `!!e`), let
  `EnumFactory` pick any member type directly; specs for string enums, zero members, mixed.
- Add `LiteralTransformer` for standalone `LiteralTypeNode` (constant → single-element
  restrictions); register in `MainTransformer`.
- In `CustomTypeTransformer`/`PrimitiveTransformer`, detect method signatures
  (`ts.isMethodSignature`/`MethodDeclaration`) and emit a Function element of the return
  type instead of a data element.
- Detect built-in references in `PrimitiveTransformer` by symbol name (`Map`, `Set`,
  `Promise`) and emit dedicated factory types producing real instances (`new Map()` with
  forged entries, resolved `Promise<T>`).
- Update `../forger-faq`: Enums, Literals, Objects, Functions, Supported-Types, Caveats,
  and `AI_SKILL.md` (quirk rows become supported behavior).

## Affected areas

`src/utils/actors/type-factories/` (enum, literal, primitive, custom-type),
`src/factories/` (enum, literal, new map/set/promise factories), `src/models/forger.type.ts`
(new ForgerType entries), `spec/`, docs.

## Implementation log

- **Item 1 — enum pipeline (2026-09-04).** `EnumTransformer.getEnumValues`: filter is now
  `!== undefined && !== null` (was truthiness — dropped `0` and `''`); single-member enums
  no longer fall through — when the type has no `.types` union, it is used directly if it
  carries an enum flag (`TypeFlags.EnumLiteral | TypeFlags.Enum`). `EnumFactory.produce`
  picks the raw member by random index (was `Number()` + `isNaN` filter, which destroyed
  string members, plus a biased shuffle). Specs added: string enum (top-level and in array),
  zero-member reachability over 30 rolls, zero-only enum. Full suite: 72 suites / 320 tests
  green. Docs updated: `Enums.md` (rewritten — string enums and zero members supported),
  `Supported-Types.md`, `Caveats.md` (two rows removed), `Literals.md` (comparison table),
  `AI_SKILL.md` (behavior and troubleshooting rows).
