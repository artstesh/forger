import {Forger} from "../../../../src/forger";

describe('String factory', () => {
    describe('create()', () => {
        describe('default settings', () => {
            it('correct type', () => {
                const element = Forger.create<string>();
                //
                expect(typeof element === 'string');
            })

            it('correct union with null type', () => {
                const element = Forger.create<null | string>()!;
                const element2 = Forger.create<string | null>()!;
                //
                expect(typeof element === 'string');
                expect(typeof element2 === 'string');
            })

            it('correct union with undefined type', () => {
                const element = Forger.create<undefined | string>()!;
                const element2 = Forger.create<string | undefined>()!;
                //
                expect(typeof element === 'string');
                expect(typeof element2 === 'string');
            })

            it('not the same', () => {
                const elements = Forger.create<string[]>();
                //
                const set = new Set(elements);
                //
                expect(set.size > 1).toBeTruthy();
            })
        });

        describe('custom settings', () => {
            it('correct length', () => {
                const length = 4;
                //
                const result = Forger.create<string>({stringLength: length});
                //
                expect(result!.length).toEqual(length);
            })
            it('only numbers', () => {
                //
                const result = Forger.create<string>({stringSpecial: false, stringLowCase: false, stringUpCase: false});
                //
                expect(result!.match(/^\d+$/gm)).toBeTruthy();
            })

            it('only low letters', () => {
                //
                const result = Forger.create<string>({stringSpecial: false, stringNumbers: false, stringUpCase: false});
                //
                expect(result!.match(/^[a-z]+$/gm)).toBeTruthy();
            })

            it('only up letters', () => {
                //
                const result = Forger.create<string>({stringSpecial: false, stringNumbers: false, stringLowCase: false});
                //
                expect(result!.match(/^[A-Z]+$/gm)).toBeTruthy();
            })

            it('only specials', () => {
                //
                const result = Forger.create<string>({stringLowCase: false, stringNumbers: false, stringUpCase: false});
                //
                expect(result!.match(/^[^A-Za-z\d]+$/gm)).toBeTruthy();
            })
        });
    });
})




