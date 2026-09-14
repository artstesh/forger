import { execFileSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const PROJECT_ROOT = join(__dirname, '..');

const nodeResolve = (request: string): string =>
  execFileSync(
    process.execPath,
    ['-e', `process.stdout.write(require.resolve(${JSON.stringify(request)}))`],
    { cwd: PROJECT_ROOT },
  ).toString();

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

  it('maps deep imports onto the compiled .js files', () => {
    const pkg = JSON.parse(readFileSync(join(PROJECT_ROOT, 'package.json'), 'utf8'));

    // Node applies no extension search to exports targets: the extensionless
    // pattern must append .js itself, while the .js pattern keeps explicit
    // requests working (both forms are documented for transformer wiring).
    expect(pkg.exports['./*']).toEqual('./*.js');
    expect(pkg.exports['./*.js']).toEqual('./*.js');
    expect(pkg.exports['./package.json']).toEqual('./package.json');
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

    it('resolves the extensionless transformer deep require', () => {
      if (!existsSync(libEntry)) return;

      expect(nodeResolve('@artstesh/forger/lib/utils/transformer').replace(/\\/g, '/')).toContain(
        'lib/utils/transformer.js',
      );
    });

    it('resolves the .js-suffixed transformer deep require to the same file', () => {
      if (!existsSync(libEntry)) return;

      expect(nodeResolve('@artstesh/forger/lib/utils/transformer.js')).toEqual(
        nodeResolve('@artstesh/forger/lib/utils/transformer'),
      );
    });

    it('keeps the vitest subpath and package.json resolvable', () => {
      if (!existsSync(libEntry)) return;

      expect(nodeResolve('@artstesh/forger/vitest').replace(/\\/g, '/')).toContain(
        'lib/integrations/forger-vitest.plugin.js',
      );
      expect(nodeResolve('@artstesh/forger/package.json').replace(/\\/g, '/')).toContain('package.json');
    });
  });
});
