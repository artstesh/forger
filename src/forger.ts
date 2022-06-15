import {SpoofSettings} from './models/spoof.settings';
import {ForgerElement} from './models/forger-element.model';
import {MainFactory} from './factories/main.factory';

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
}

export default Forger;
