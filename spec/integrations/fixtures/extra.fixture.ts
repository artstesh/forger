/**
 * Not listed in ./tsconfig.json on purpose: covers the plugin's path of adding a
 * Forger-calling file to the cached program on first sight.
 */

interface ExtraModel {
  id: number;
}

declare const Forger: {
  create<T>(settings?: object, circularDepth?: number, ...args: object[]): T | undefined;
};

export function forgeExtra() {
  return Forger.create<ExtraModel>();
}
