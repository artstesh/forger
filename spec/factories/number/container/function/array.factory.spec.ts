import {Forger} from "../../../../../src/forger";

describe('Function, number-array', () => {
    describe('default settings', () => {
        it('number, correct type', () => {
            const elements = Forger.create<() => number[]>()!();
            //
            expect(typeof elements[0] === 'number');
        })

        it('number, not the same', () => {
            const elements = new Set(Forger.create<() => number[]>()!());
            //
            expect(elements.size > 1).toBeTruthy();
        })

        it('floor by default', () => {
            //
            const elements = Forger.create<() => number[]>()!();
            //
            expect(elements[0] % 1).toBe(0);
        })
    });

    describe('custom settings', () => {

        it('follow numberMax', () => {
            const upLimit = 3;
            const elements = Forger.create<() => number[]>({numberMax: upLimit, arrayLength: 10})!();
            //
            expect(elements.filter(n => n > upLimit).length).toBeFalsy();
        })

        it('follow numberMax', () => {
            const upLimit = 10;
            const bottomLimit = 8;
            const elements = Forger.create<() => number[]>({numberMax: upLimit,
                numberMin: bottomLimit, arrayLength: 10})!();
            //
            expect(elements.filter(n => n < bottomLimit).length).toBeFalsy();
        })

        it('float success', () => {
            //
            const elements = Forger.create<() => number[]>({numberFloat: true})!();
            //
            expect(elements[0] % 1).not.toBe(0);
        })

        it('wrong min&max is fixed', () => {
            const numberMin = 1000;
            const numberMax = 100;
            //
            const elements = Forger.create<() => number[]>({numberMax, numberMin})!();
            //
            expect(elements[0] >= numberMin).toBeTruthy();
        })
    })
});
