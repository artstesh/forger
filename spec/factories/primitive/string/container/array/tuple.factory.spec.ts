import {Forger} from "../../../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('String-array-tuple', () => {
    describe('arrays', () => {
        describe('default settings', () => {
            it('string, correct type', () => {
                const elements = Forger.create<[string][]>();
                //
                should().string(typeof elements![0][0]).equals('string');
            })

            it('string, not the same', () => {
                const elements = Forger.create<[string][]>()!.map(e => e[0]);
                //
                should().array(elements).uniq();
            })
        });

        describe('custom settings', () => {
            it('correct length', () => {
                const length = 4;
                //
                const result = Forger.create<[string][]>({stringLength: length});
                //
                expect(result![0][0].length).toEqual(length);
            })
            it('only numbers', () => {
                //
                const result = Forger.create<[string][]>({stringSpecial: false, stringLowCase: false, stringUpCase: false});
                //
                expect(result![0][0].match(/^\d+$/gm)).toBeTruthy();
            })

            it('only low letters', () => {
                //
                const result = Forger.create<[string][]>({stringSpecial: false, stringNumbers: false, stringUpCase: false});
                //
                expect(result![0][0].match(/^[a-z]+$/gm)).toBeTruthy();
            })

            it('only up letters', () => {
                //
                const result = Forger.create<[string][]>({stringSpecial: false, stringNumbers: false, stringLowCase: false});
                //
                expect(result![0][0].match(/^[A-Z]+$/gm)).toBeTruthy();
            })

            it('only specials', () => {
                //
                const result = Forger.create<[string][]>({stringLowCase: false, stringNumbers: false, stringUpCase: false});
                //
                expect(result![0][0].match(/^[^A-Za-z\d]+$/gm)).toBeTruthy();
            })
        })
    });
})




