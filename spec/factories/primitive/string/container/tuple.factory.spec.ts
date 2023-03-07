import {Forger} from "../../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('String-tuple', () => {
    describe('create()', () => {
        describe('default settings', () => {
            it('correct type', () => {
                const element = Forger.create<[string]>()![0];
                //
                should().string(typeof element).equals('string');
            })
            it('not the same', () => {
                const elements = Forger.create<[string][]>({arrayLength: 10});
                //
                should().array(elements).uniq(e => e![0]);
            })
        });
        describe('custom settings', () => {
            it('correct length', () => {
                const length = 4;
                //
                const result = Forger.create<[string]>({stringLength: length});
                //
                should().array(result).containOnly(s => s!.length === length);
            })
            it('only numbers', () => {
                //
                const result = Forger.create<[string]>({stringSpecial: false, stringLowCase: false, stringUpCase: false});
                //
                expect(result![0].match(/^\d+$/gm)).toBeTruthy();
            })

            it('only low letters', () => {
                //
                const result = Forger.create<[string]>({stringSpecial: false, stringNumbers: false, stringUpCase: false});
                //
                expect(result![0].match(/^[a-z]+$/gm)).toBeTruthy();
            })

            it('only up letters', () => {
                //
                const result = Forger.create<[string]>({stringSpecial: false, stringNumbers: false, stringLowCase: false});
                //
                expect(result![0].match(/^[A-Z]+$/gm)).toBeTruthy();
            })

            it('only specials', () => {
                //
                const result = Forger.create<[string]>({stringLowCase: false, stringNumbers: false, stringUpCase: false});
                //
                expect(result![0].match(/^[^A-Za-z\d]+$/gm)).toBeTruthy();
            })
        });
    })
})




