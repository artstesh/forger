# createWith/create DX improvements

Status: proposed

## Problem

Client-side ergonomics gaps (all verified against the current API):

1. One assignment per `.with()` — pinning three fields takes three chained calls;
   the transformer already walks the chain, so multiple assignments per lambda are
   mechanically possible.
2. No array shortcut: `createMany<T>(n)` is a frequent client need; today it is
   `create<T[]>({ arrayLength: n })` — discoverable only from docs.
3. `createWith` cannot start from a partial object (`createWith<T>({ known: 1 })`).

## Proposed solution

1. `ProhibitedPropsExtractorService`: collect all assignment expressions inside the
   arrow-function body (walk `BinaryExpression` with `=` token), not only one.
   Backward compatible — one-assignment chains keep working.
2. `static createMany<T>(count: number, settings?, circularDepth?): T[]` delegating to the
   element pipeline with `arrayLength` semantics but explicit count.
3. Defer: partial-object seeding changes the transformer contract (needs a runtime merge
   step); evaluate after items 1–2. Record the decision here if rejected.

Add specs for multi-assignment `with()`, `createMany`, and same-named nested props
(regression risk in prohibited-props extraction).

## Affected areas

`src/forger.ts`, `src/utils/prohibited-props-extractor.service.ts`,
`src/utils/transformer.ts` (createMany rewrite), `spec/`, `../forger-faq`
(CreateWith-Overview, Create-Overview, API-Reference-Forger), `AI_SKILL.md`.
