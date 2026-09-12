import { SpoofSettings } from './models/spoof.settings';
import { ForgerElement } from './models/forger-element.model';
import { MainFactory } from './factories/main.factory';
import { CreateWithModel } from './models/create-with.model';

/**
 * Thrown by {@link Forger.create} and {@link Forger.createWith} when a call reaches
 * runtime without the type element injected by the compile-time transformer — i.e. the
 * code was built or tested through a pipeline that does not apply the transformer
 * (bare tsc, an esbuild-based builder, jest without astTransformers, ...).
 */
export const transformerNotAppliedMessage =
  'Forger.create<T>() reached runtime unrewritten: the Forger TypeScript transformer was not applied ' +
  'by the build pipeline. Check the transformer wiring for your runner (ts-jest astTransformers, ' +
  'ts-patch plugins, webpack customWebpackConfig, or the Forger vitest plugin). See https://forger.artstesh.ru';

/**
 * The entry point for creating fakes
 */
export class Forger {
  /**
   * Creation of a forgery
   * @param settings The {@link SpoofSettings}
   * @param circularDepth The allowed depth of circular dependencies, by default 1
   * @param args Technical element, do not add any arguments here!
   * @returns object/primitive of T
   */
  static create<T>(settings: SpoofSettings = {}, circularDepth = 1, ...args: ForgerElement[]): T | undefined {
    if (!args[0]) {
      throw new Error(transformerNotAppliedMessage);
    }
    settings = settings ? { ...new SpoofSettings(), ...settings } : new SpoofSettings();
    return MainFactory.produce(args[0], settings) as T;
  }

  /**
   * Creation of a forgery with ability of excluding specific properties.
   * See {@link CreateWithModel} for more details
   * @param settings The {@link SpoofSettings}
   * @param circularDepth The allowed depth of circular dependencies, by default 1
   * @param args Technical element, do not add any arguments here!
   * @returns {@link CreateWithModel}
   */
  static createWith<T>(settings: SpoofSettings = {}, circularDepth = 1, ...args: ForgerElement[]): CreateWithModel<T> {
    if (!args[0]) {
      throw new Error(transformerNotAppliedMessage);
    }
    settings = settings ? { ...new SpoofSettings(), ...settings } : new SpoofSettings();
    return new CreateWithModel<T>(MainFactory.produce(args[0], settings) as T);
  }
}

export default Forger;
