import {Forger} from "../../../../../src/forger";


describe('String-function', () => {
    it('success lambda result', () => {
        const result = Forger.create<()=> string>()!();
        //
        expect(typeof result === 'string').toBeTruthy();
    })

    describe('default settings', () => {
        it('correct type', () => {
            const element = Forger.create<()=> string>()!();
            //
            expect(typeof element === 'string');
        })
    });

    describe('custom settings', () => {
        it('correct length', () => {
            const length = 4;
            //
            const result = Forger.create<()=> string>({stringLength: length})!();
            //
            expect(result.length).toEqual(length);
        })
        it('only numbers', () => {
            //
            const result = Forger.create<()=> string>({stringSpecial: false, stringLowCase: false, stringUpCase: false})!();
            //
            expect(result.match(/^\d+$/gm)).toBeTruthy();
        })

        it('only low letters', () => {
            //
            const result = Forger.create<()=> string>({stringSpecial: false, stringNumbers: false, stringUpCase: false})!();
            //
            expect(result.match(/^[a-z]+$/gm)).toBeTruthy();
        })

        it('only up letters', () => {
            //
            const result = Forger.create<()=> string>({stringSpecial: false, stringNumbers: false, stringLowCase: false})!();
            //
            expect(result.match(/^[A-Z]+$/gm)).toBeTruthy();
        })

        it('only specials', () => {
            //
            const result = Forger.create<()=> string>({stringLowCase: false, stringNumbers: false, stringUpCase: false})!();
            //
            expect(result.match(/^[^A-Za-z\d]+$/gm)).toBeTruthy();
        })
    });
})




