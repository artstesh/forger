import {Forger} from "../../../../../../src/forger";

describe('String-array-array', () => {
    describe('default settings', () => {
        it('string, correct type', () => {
            const elements = Forger.create<string[][]>();
            //
            expect(typeof elements![0][0] === 'string');
        })

        it('string, not the same', () => {
            const elements = new Set(Forger.create<string[][]>()![0]);
            //
            expect(elements.size > 1).toBeTruthy();
        })
    });

    describe('custom settings', () => {
        it('correct length', () => {
            const length = 4;
            //
            const result = Forger.create<string[][]>({stringLength: length})![0];
            //
            expect(result[0].length).toEqual(length);
        })
        it('only numbers', () => {
            //
            const result = Forger.create<string[][]>({stringSpecial: false, stringLowCase: false, stringUpCase: false})![0];
            //
            expect(result[0].match(/^\d+$/gm)).toBeTruthy();
        })

        it('only low letters', () => {
            //
            const result = Forger.create<string[][]>({stringSpecial: false, stringNumbers: false, stringUpCase: false})![0];
            //
            expect(result[0].match(/^[a-z]+$/gm)).toBeTruthy();
        })

        it('only up letters', () => {
            //
            const result = Forger.create<string[][]>({stringSpecial: false, stringNumbers: false, stringLowCase: false})![0];
            //
            expect(result[0].match(/^[A-Z]+$/gm)).toBeTruthy();
        })

        it('only specials', () => {
            //
            const result = Forger.create<string[][]>({stringLowCase: false, stringNumbers: false, stringUpCase: false})![0];
            //
            expect(result[0].match(/^[^A-Za-z\d]+$/gm)).toBeTruthy();
        })
    })
});
