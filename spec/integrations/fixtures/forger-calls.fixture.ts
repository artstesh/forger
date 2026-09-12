/**
 * Fixture exercised by forger-vitest.plugin.spec.ts through the plugin's transform
 * hook. `Forger` is only declared so the file typechecks on its own: the transformer
 * rewrites the calls below purely by syntax, no import resolution involved.
 */

interface FixtureModel {
  name: string;
  count: number;
  tags: string[];
}

declare const Forger: {
  create<T>(settings?: object, circularDepth?: number, ...args: object[]): T | undefined;
};

export function forgeModel() {
  return Forger.create<FixtureModel>();
}

export function forgeAlignment() {
  return Forger.create<'start' | 'center' | 'end'>();
}
