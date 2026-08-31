# Deterministic mode: injectable seeded RNG

Status: proposed

## Problem

All randomness goes through `Math.random()` (plus two biased shuffle hacks:
`sort(() => 0.5 - Math.random())` in Enum/Union/Literal/String factories, and
`BoolFactory` deriving from `new Date().getTime() * Math.random()` with modulo bias).
Consequences:

- failures involving generated data cannot be reproduced;
- shuffles are not uniformly distributed (documented-quiet behavior skew);
- `BoolFactory` ties results to wall-clock time for no reason.

## Proposed solution

- Introduce an internal `RngService` (seeded PRNG, e.g. mulberry32) used by all factories;
  remove the shuffle hacks and time-based bool.
- Public opt-in determinism: `Forger.create<T>({ seed: 42 })` or a separate
  `Forger.createSeeded<T>(seed, settings?)`. Decision point: extend `SpoofSettings` with
  `seed?: number` (simplest, flows everywhere) vs a second entry point (clearer).
  Recommendation: `seed` in `SpoofSettings`, consumed once at `MainFactory.produce` entry.
- Document reproducibility guarantees (same seed + same element tree + same settings ⇒ same
  value) and add a spec asserting them.

## Affected areas

`src/factories/*` (all), new `src/utils/rng.service.ts`, `src/models/spoof.settings.ts`,
`spec/`, `../forger-faq` (Settings-Overview, new Determinism section), `AI_SKILL.md`.
