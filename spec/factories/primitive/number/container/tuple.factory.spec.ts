import {Forger} from "../../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Tuple of numbers', () => {
    describe('default settings', () => {
        it('correct type', () => {
            const element = Forger.create<[number]>();
            //
            should().string(typeof element![0]).equals('number');
        })
    });
    describe('custom settings', () => {
        it('follow up limit', () => {
            const upLimit = 3;
            const elements = Forger.create<[number]>({numberMax: upLimit})![0];
            //
            expect(elements <= upLimit).toBeTruthy();
        })

        it('follow bottom limit', () => {
            const upLimit = 10;
            const bottomLimit = 8;
            const elements = Forger.create<[number]>({numberMax: upLimit, numberMin: bottomLimit})![0];
            //
            should().number(elements).greaterOrEqual(bottomLimit);
        })

        it('floor by default', () => {
            //
            const elements = Forger.create<[number]>()![0];
            //
            expect(elements % 1).toBe(0);
        })

        it('float success', () => {
            //
            const elements = Forger.create<[number]>({numberFloat: true})![0];
            //
            expect(elements % 1).not.toBe(0);
        })

        it('wrong min&max is fixed', () => {
            const numberMin = 1000;
            const numberMax = 100;
            //
            const element = Forger.create<[number]>({numberMax, numberMin})![0];
            //
            expect(element >= numberMin).toBeTruthy();
        })
    });
})



