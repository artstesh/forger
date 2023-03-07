import {Forger} from "../../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Array of numbers', () => {
    describe('default settings', () => {
        it('number, correct type', () => {
            const elements = Forger.create<number[]>();
            //
            should().string(typeof elements![0]).equals('number');
        })

        it('number, not the same', () => {
            const elements = Forger.create<number[]>();
            //
            should().true(new Set(elements).size > 1);
        })

        it('floor by default', () => {
            //
            const elements = Forger.create<number[]>();
            //
            expect(elements![0] % 1).toBe(0);
        })
    });

    describe('custom settings', () => {

        it('follow numberMax', () => {
            const upLimit = 3;
            const elements = Forger.create<number[]>({numberMax: upLimit, arrayLength: 10});
            //
            should().array(elements).containOnly(e => e! <= upLimit);
        })

        it('follow numberMax', () => {
            const upLimit = 10;
            const bottomLimit = 8;
            const elements = Forger.create<number[]>({numberMax: upLimit,
                numberMin: bottomLimit, arrayLength: 10});
            //
            should().array(elements).containOnly(e => e! >= bottomLimit);
        })

        it('float success', () => {
            //
            const elements = Forger.create<number[]>({numberFloat: true});
            //
            expect(elements![0] % 1).not.toBe(0);
        })

        it('wrong min&max is fixed', () => {
            const numberMin = 1000;
            const numberMax = 100;
            //
            const elements = Forger.create<number[]>({numberMax, numberMin});
            //
            should().array(elements).containOnly(e => e! >= numberMin);
        })
    })
});
