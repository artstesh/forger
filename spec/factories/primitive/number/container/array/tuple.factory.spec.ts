import {Forger} from "../../../../../../src/forger";
import { should } from "@artstesh/it-should";


describe('Array of number-tuple', () => {
    describe('default settings', () => {
        it('correct type', () => {
            const element = Forger.create<[number][]>();
            //
            should().string(typeof element![0][0]).equals('number');
        })

        it('not the same', () => {
            const numbers =  Forger.create<[number][]>()!.map(e => e[0]);
            //
            should().array(numbers).uniq();
        })
    });
    describe('custom settings', () => {
        it('follow up limit', () => {
            const upLimit = 3;
            const elements = Forger.create<[number][]>({numberMax: upLimit, arrayLength: 10})!.map(e => e[0]);
            //
            should().array(elements).containOnly(e => e! <= upLimit);
        })

        it('follow bottom limit', () => {
            const upLimit = 10;
            const bottomLimit = 8;
            const elements = Forger.create<[number][]>({numberMax: upLimit, numberMin: bottomLimit, arrayLength: 10})!.map(e => e[0]);
            //
            should().array(elements).containOnly(e => e! >= bottomLimit);
        })

        it('floor by default', () => {
            //
            const elements = Forger.create<[number][]>()![0][0];
            //
            expect(elements % 1).toBe(0);
        })

        it('float success', () => {
            //
            const elements = Forger.create<[number][]>({numberFloat: true})![0][0];
            //
            expect(elements % 1).not.toBe(0);
        })

        it('wrong min&max is fixed', () => {
            const numberMin = 1000;
            const numberMax = 100;
            //
            const element = Forger.create<[number][]>({numberMax, numberMin})![0][0];
            //
            should().number(element).greaterOrEqual(numberMin);
        })
    });
})



