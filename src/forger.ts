import { SpoofSettings } from './models/spoof.settings';
import { ForgerElement } from './models/forger-element.model';
import { MainFactory } from './factories/main.factory';
import { CreateWithModel } from './models/create-with.model';

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
      return undefined;
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
    return new CreateWithModel<T>(MainFactory.produce(args[0], settings) as T);
  }
}

export default Forger;
