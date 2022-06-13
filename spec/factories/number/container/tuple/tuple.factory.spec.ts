import {Forger} from "../../../../../src/forger";

describe('Tuple of number-tuple', () => {
    describe('default settings', () => {
        it('correct type', () => {
            const element = Forger.create<[[number]]>();
            //
            expect(typeof element![0][0] === 'number');
        })
    });
    describe('custom settings', () => {
        it('follow up limit', () => {
            const upLimit = 3;
            const elements = Forger.create<[[number]]>({numberMax: upLimit})![0][0];
            //
            expect(elements <= upLimit).toBeTruthy();
        })

        it('follow bottom limit', () => {
            const upLimit = 10;
            const bottomLimit = 8;
            const elements = Forger.create<[[number]]>({numberMax: upLimit, numberMin: bottomLimit})![0][0];
            //
            expect(elements >= bottomLimit).toBeTruthy();
        })

        it('floor by default', () => {
            //
            const elements = Forger.create<[[number]]>()![0][0];
            //
            expect(elements % 1).toBe(0);
        })

        it('float success', () => {
            //
            const elements = Forger.create<[[number]]>({numberFloat: true})![0][0];
            //
            expect(elements % 1).not.toBe(0);
        })

        it('wrong min&max is fixed', () => {
            const numberMin = 1000;
            const numberMax = 100;
            //
            const element = Forger.create<[[number]]>({numberMax, numberMin})![0][0];
            //
            expect(element >= numberMin).toBeTruthy();
        })
    });
})
