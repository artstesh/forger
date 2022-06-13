import {Forger} from "../../src/forger";

describe('Array factory', () => {
    const length = 6;

    describe('arrays', () => {
        describe('default settings', () => {
            it('number', () => {
                const elements = new Set(Forger.create<number[]>());
                //
                expect(typeof elements === 'number');
                expect(elements!.size > 1).toBeTruthy();
            })

            it('string', () => {
                const elements = new Set(Forger.create<string[]>());
                //
                expect(typeof elements === 'string');
                expect(elements.size > 1).toBeTruthy();
            })

            it('Date', () => {
                const elements = new Set(Forger.create<Date[]>());
                //
                expect(elements instanceof Date);
                expect(elements.size > 1).toBeTruthy();
            })

            it('boolean', () => {
                const elements = Forger.create<boolean[]>();
                //
                expect(typeof elements === 'boolean');
                expect(elements!.length).toBeTruthy();
            })
        })
    });

    it('default settings not empty', () => {
        const numbers = Forger.create<number[]>();
        //
        expect(numbers!.length).toBeTruthy();
    })

    it('not the same date', () => {
        const date = Forger.create<Date[]>({arrayLength: length});
        //
        const set = new Set(date);
        //
        expect(set.size > 1).toBeTruthy();
    })

    it('not the same number', () => {
        const date = Forger.create<number[]>({arrayLength: length});
        //
        const set = new Set(date);
        //
        expect(set.size > 1).toBeTruthy();
    })

    it('not the same boolean', () => {
        const date = Forger.create<boolean[]>({arrayLength: 20});
        //
        const set = new Set(date);
        //
        expect(set.size > 1).toBeTruthy();
    })

    it('not the same string', () => {
        const date = Forger.create<string[]>({arrayLength: length});
        //
        const set = new Set(date);
        //
        expect(set.size > 1).toBeTruthy();
    })

    it('array of arrays, success', () => {
        const arrOfStringArrays = Forger.create<string[][]>();
        //
        expect(arrOfStringArrays!.filter(a => !!a.length).length).toBeTruthy();
    })
})
