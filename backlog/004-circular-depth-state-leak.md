# Bug: circularDepth state leaks across call sites

Status: in-progress (branch `v2`)

## Problem

`MainTransformer.setCircularDepth` mutates a static and returns early when no depth is
passed (`if (!depth) return;`). `visitNode` calls it only for calls with two arguments, so
after:

```typescript
Forger.create<Node>({}, 5);  // depth := 5
Forger.create<OtherNode>();  // still 5 — never reset
```

every subsequent `create<T>()` in the same compilation uses depth 5. The injected
`circularArg` for calls without the argument is serialized from the already-mutated static,
so runtime and compile-time views agree, but the user-visible default (1) is silently
violated depending on compilation order.

## Proposed solution

Reset to the default when the argument is absent: change `visitNode` to pass the resolved
depth always (`node.arguments.length === 2 ? arguments[1].text : '1'`), or make
`setCircularDepth(undefined)` restore `1`. Add a spec with two sequential `create` calls in
one spec file asserting the second uses depth 1.

## Affected areas

`src/utils/transformer.ts`, `src/utils/actors/type-factories/main.transformer.ts`, `spec/`.
