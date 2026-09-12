import { readFileSync } from 'fs';
import { join } from 'path';
import { defineForgerVitestPlugin, IForgerVitePlugin } from '../../src/integrations/forger-vitest.plugin';
import { ForgerElement } from '../../src/models/forger-element.model';
import { ForgerType } from '../../src/models/forger.type';

const FIXTURE_DIR = join(__dirname, 'fixtures');
const FORGER_CALL_LINE = /Forger\.create<[^\n]*>\(\{\}, 1, (\{[^\n]*\})\)/;

const readFixture = (name: string) => readFileSync(join(FIXTURE_DIR, name), 'utf8');

/**
 * Extracts the ForgerElement JSON injected by the transformer into the first
 * matching Forger.create<T>() call of the transformed code.
 */
const injectedElement = (code: string): ForgerElement => {
  const match = code.match(FORGER_CALL_LINE);
  if (!match) {
    throw new Error(`No injected ForgerElement found in:\n${code}`);
  }
  return JSON.parse(match[1]) as ForgerElement;
};

describe('defineForgerVitestPlugin', () => {
  const plugin: IForgerVitePlugin = defineForgerVitestPlugin({ tsconfig: join(FIXTURE_DIR, 'tsconfig.json') });

  it('is a pre-transform plugin', () => {
    expect(plugin.name).toEqual('forger-transformer');
    expect(plugin.enforce).toEqual('pre');
  });

  it('ignores files the transformer must not touch', () => {
    const code = 'export const x = Forger.create<number>();';
    expect(plugin.transform(code, '/project/node_modules/lib/a.ts')).toBeNull();
    expect(plugin.transform(code, '/project/src/a.d.ts')).toBeNull();
    expect(plugin.transform(code, '/project/src/a.js')).toBeNull();
    expect(plugin.transform('export const x = 1;', '/project/src/a.ts')).toBeNull();
    expect(plugin.transform('export const x = 1;', '/project/src/a.component.html')).toBeNull();
  });

  it('strips vite query suffixes from the file id', () => {
    const fileName = join(FIXTURE_DIR, 'forger-calls.fixture.ts');
    const result = plugin.transform(readFixture('forger-calls.fixture.ts'), `${fileName}?t=1737062400000`);

    expect(result).not.toBeNull();
  });

  it('rewrites Forger.create<T>() with the serialized type element', () => {
    const fileName = join(FIXTURE_DIR, 'forger-calls.fixture.ts');
    const result = plugin.transform(readFixture('forger-calls.fixture.ts'), fileName);

    expect(result).not.toBeNull();
    const element = injectedElement(result!.code);
    expect(element.type).toEqual(ForgerType.Object);
    const names = element.children!.map((child) => child.name);
    expect(names).toEqual(['name', 'count', 'tags']);
    expect(element.children![0].type).toEqual(ForgerType.String);
    expect(element.children![1].type).toEqual(ForgerType.Number);
    expect(element.children![2].type).toEqual(ForgerType.Array);
  });

  it('rewrites literal union type arguments', () => {
    const fileName = join(FIXTURE_DIR, 'forger-calls.fixture.ts');
    const code = readFixture('forger-calls.fixture.ts');
    const result = plugin.transform(code, fileName)!;
    const element = JSON.parse(
      result.code.split('\n').filter((line) => line.includes("create<'start'"))[0].match(FORGER_CALL_LINE)![1],
    ) as ForgerElement;
    expect(element.type).toEqual(ForgerType.Union);
    expect(element.restrictions!.map((restriction) => restriction.restrictions[0])).toEqual([
      'start',
      'center',
      'end',
    ]);
  });

  it('adds files missing from the tsconfig to the cached program', () => {
    const fileName = join(FIXTURE_DIR, 'extra.fixture.ts');
    const result = plugin.transform(readFixture('extra.fixture.ts'), fileName);

    expect(result).not.toBeNull();
    const element = injectedElement(result!.code);
    expect(element.type).toEqual(ForgerType.Object);
    expect(element.children!.map((child) => child.name)).toEqual(['id']);
  });

  it('reuses the cached program for repeated transforms', () => {
    const fileName = join(FIXTURE_DIR, 'forger-calls.fixture.ts');
    const first = plugin.transform(readFixture('forger-calls.fixture.ts'), fileName);
    const second = plugin.transform(readFixture('forger-calls.fixture.ts'), fileName);

    expect(second).not.toBeNull();
    expect(second!.code).toEqual(first!.code);
  });

  it('rebuilds the program when the file text changes', () => {
    const fileName = join(FIXTURE_DIR, 'forger-calls.fixture.ts');
    const changed = readFixture('forger-calls.fixture.ts') + '\nexport const tail = 1;\n';
    const result = plugin.transform(changed, fileName);

    expect(result).not.toBeNull();
    expect(injectedElement(result!.code).type).toEqual(ForgerType.Object);
    expect(result!.code).toContain('export const tail = 1;');
  });

  it('fails with a clear error when the tsconfig does not exist', () => {
    const broken = defineForgerVitestPlugin({ tsconfig: join(FIXTURE_DIR, 'no-such-tsconfig.json') });
    expect(() => broken.transform('export const x = Forger.create<number>();', '/project/src/a.ts')).toThrow(
      'tsconfig not found',
    );
  });
});
