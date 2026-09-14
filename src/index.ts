export * from './forger';
export * from './models/spoof.settings';
export * from './utils/transformer';
export {} from './webpack.config';
// The vitest integration is NOT re-exported here on purpose: it imports `path` and
// `typescript` at module load, so the package entry must stay free of it to remain
// browser-safe (Karma/webpack bundles crash with `process is not defined` otherwise).
// Import it from the dedicated subpath instead: `@artstesh/forger/vitest`.
