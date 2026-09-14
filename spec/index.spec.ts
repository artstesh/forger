import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const PROJECT_ROOT = join(__dirname, '..');

describe('package entry', () => {
  it('does not re-export the vitest integration', () => {
    const entry = readFileSync(join(PROJECT_ROOT, 'src', 'index.ts'), 'utf8');

    expect(entry).not.toMatch(/integrations/);
    expect(entry).not.toMatch(/forger-vitest/);
  });

  it('exposes the vitest plugin through the ./vitest subpath only', () => {
    const pkg = JSON.parse(readFileSync(join(PROJECT_ROOT, 'package.json'), 'utf8'));
    const subpath = pkg.exports['./vitest'];

    expect(subpath.types).toEqual('./lib/integrations/forger-vitest.plugin.d.ts');
    expect(subpath.default).toEqual('./lib/integrations/forger-vitest.plugin.js');
  });

  describe('built artifacts (after npm run build)', () => {
    const libEntry = join(PROJECT_ROOT, 'lib', 'index.js');

    beforeAll(() => {
      if (!existsSync(libEntry)) {
        console.warn('lib/index.js is missing — run `npm run build` for full entry coverage');
      }
    });

    it('keeps the compiled entry free of the integration require', () => {
      if (!existsSync(libEntry)) return;
      const entry = readFileSync(libEntry, 'utf8');

      expect(entry).not.toMatch(/require\("\.\/integrations/);
      expect(entry).not.toMatch(/require\('\.\/integrations/);
    });

    it('ships the integration at its subpath location', () => {
      if (!existsSync(libEntry)) return;

      expect(existsSync(join(PROJECT_ROOT, 'lib', 'integrations', 'forger-vitest.plugin.js'))).toBe(true);
      expect(existsSync(join(PROJECT_ROOT, 'lib', 'integrations', 'forger-vitest.plugin.d.ts'))).toBe(true);
    });
  });
});
