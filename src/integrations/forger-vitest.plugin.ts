import * as path from 'path';
import * as ts from 'typescript';
import { transformer } from '../utils/transformer';

/**
 * Options of {@link defineForgerVitestPlugin}
 */
export interface IForgerVitestPluginOptions {
  /**
   * Path to the tsconfig that covers the files calling Forger.create<T>() /
   * Forger.createWith<T>(). Resolved against the current working directory.
   * Files missing from the config are added to the program on first sight, but
   * keeping the include list complete is faster.
   */
  tsconfig?: string;
}

/**
 * Structural shape of a vite plugin produced by {@link defineForgerVitestPlugin}.
 * It is assignable to vite's Plugin type without depending on vite itself.
 */
export interface IForgerVitePlugin {
  name: string;
  enforce: 'pre';
  transform(code: string, id: string): { code: string; map: null } | null;
}

const pluginName = 'forger-transformer';
const defaultTsconfig = 'tsconfig.spec.json';
// Cheap pre-filter: the transformer only rewrites `<Forger identifier>.create/.createWith`,
// so files without this pattern are passed through untouched.
const forgerCallPattern = /Forger\s*\.\s*create/;
const sourceFilePattern = /\.tsx?$/i;
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed, removeComments: false });

const normalizeFileName = (fileName: string) => fileName.replace(/\\/g, '/');

/**
 * A vite plugin that applies the Forger TypeScript transformer in vite-based
 * pipelines (vitest first of all), where ts-patch/ts-jest/webpack hooks do not run.
 *
 * The project is compiled once with the TypeScript compiler, the program is cached,
 * and every Forger.create<T>() / Forger.createWith<T>() call is rewritten exactly
 * like in the ts-jest/webpack integrations. The transformed file is always taken
 * from the program itself — the type checker resolves symbols only for files the
 * program owns — and is parsed from the text vite handed over, so the rewrite can
 * never run against stale disk content.
 *
 * Usage (vitest.config.ts):
 * ```typescript
 * import { defineConfig } from 'vitest/config';
 * import { defineForgerVitestPlugin } from '@artstesh/forger';
 *
 * export default defineConfig({
 *   plugins: [defineForgerVitestPlugin({ tsconfig: 'tsconfig.spec.json' })],
 * });
 * ```
 *
 * Notes:
 * - the rewritten code is returned without a source map, so stack traces of
 *   rewritten lines may point at slightly offset positions.
 */
export function defineForgerVitestPlugin(options: IForgerVitestPluginOptions = {}): IForgerVitePlugin {
  const configPath = path.resolve(process.cwd(), options.tsconfig || defaultTsconfig);
  /** Latest vite text per normalized file name — the single source of truth for rewriting. */
  const snapshots = new Map<string, string>();
  let program: ts.Program | undefined;

  const getParsedConfig = (): ts.ParsedCommandLine => {
    if (!ts.sys.fileExists(configPath)) {
      throw new Error(`${pluginName}: tsconfig not found at ${configPath}`);
    }
    const parsed = ts.getParsedCommandLineOfConfigFile(
      configPath,
      {},
      {
        ...ts.sys,
        onUnRecoverableConfigFileDiagnostic: (diagnostic) => {
          throw new Error(
            `${pluginName}: cannot parse ${configPath}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`,
          );
        },
      },
    );
    if (!parsed || !parsed.fileNames.length) {
      throw new Error(`${pluginName}: ${configPath} does not include any files`);
    }
    return parsed;
  };

  const createSnapshotHost = (options: ts.CompilerOptions): ts.CompilerHost => {
    const host = ts.createCompilerHost(options);
    // Case-insensitive view: vite ids and tsconfig file names may differ in drive-letter case.
    const lowered = new Map([...snapshots.entries()].map(([name, text]) => [name.toLowerCase(), text]));
    const baseGetSourceFile = host.getSourceFile.bind(host);
    host.getSourceFile = (fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile) => {
      const snapshot = lowered.get(normalizeFileName(fileName).toLowerCase());
      if (snapshot !== undefined) {
        return ts.createSourceFile(fileName, snapshot, languageVersionOrOptions, true);
      }
      return baseGetSourceFile(fileName, languageVersionOrOptions, onError, shouldCreateNewSourceFile);
    };
    return host;
  };

  const rebuildProgram = (reusePrevious: boolean): ts.Program => {
    const parsed = getParsedConfig();
    const rootNames = [...new Set([...parsed.fileNames, ...snapshots.keys()])];
    program = ts.createProgram({
      rootNames,
      options: parsed.options,
      host: createSnapshotHost(parsed.options),
      oldProgram: reusePrevious ? program : undefined,
    });
    return program;
  };

  // Rebuilding on a text change invalidates the incremental cache: the checker may
  // have memoized symbols of the previous version of the file.
  const getProgramFor = (fileName: string, code: string): ts.Program => {
    const known = snapshots.get(fileName);
    const textChanged = known !== undefined && known !== code;
    if (!textChanged && known === code && program && findSourceFile(program, fileName)) {
      return program;
    }
    snapshots.set(fileName, code);
    return rebuildProgram(!textChanged && !!program);
  };

  const findSourceFile = (target: ts.Program, fileName: string): ts.SourceFile | undefined =>
    target.getSourceFile(fileName) ??
    target.getSourceFiles().find((f) => f.fileName.toLowerCase() === fileName.toLowerCase());

  return {
    name: pluginName,
    enforce: 'pre',
    transform(code: string, id: string): { code: string; map: null } | null {
      // vite ids are absolute posix-style paths; Windows programs key their source
      // files with forward slashes as well — only the query suffix needs to go
      const fileName = normalizeFileName(id.split('?', 2)[0]);
      if (!sourceFilePattern.test(fileName) || fileName.endsWith('.d.ts') || fileName.includes('node_modules')) {
        return null;
      }
      if (!forgerCallPattern.test(code)) {
        return null;
      }
      const currentProgram = getProgramFor(fileName, code);
      const sourceFile = findSourceFile(currentProgram, fileName);
      if (!sourceFile) {
        return null;
      }
      const result = ts.transform(sourceFile, [transformer(currentProgram)], currentProgram.getCompilerOptions());
      try {
        const [transformed] = result.transformed;
        if (!transformed) {
          return null;
        }
        return { code: printer.printNode(ts.EmitHint.Unspecified, transformed, transformed), map: null };
      } finally {
        result.dispose();
      }
    },
  };
}
