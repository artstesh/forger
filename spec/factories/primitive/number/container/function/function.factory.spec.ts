import {Forger} from "../../../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Function in function number', () => {
    it('success lambda result', () => {
        const result = Forger.create<()=> ()=> number>()!()();
        //
        should().string(typeof result).equals('number');
    })
    describe('custom settings', () => {
        it('follow up limit', () => {
            const upLimit = 3;
            const elements = Forger.create<()=> ()=> number>({numberMax: upLimit});
            //
            should().number(elements!()()).lessOrEqual(upLimit);
        })

        it('follow bottom limit', () => {
            const upLimit = 10;
            const bottomLimit = 8;
            const elements = Forger.create<()=> ()=> number>({numberMax: upLimit, numberMin: bottomLimit});
            //
            should().number(elements!()()).greaterOrEqual(bottomLimit);
        })

        it('floor by default', () => {
            //
            const elements = Forger.create<()=> ()=> number>();
            //
            expect(elements!()() % 1).toBe(0);
        })

        it('float success', () => {
            //
            const elements = Forger.create<()=> ()=> number>({numberFloat: true});
            //
            expect(elements!()() % 1).not.toBe(0);
        })

        it('wrong min&max is fixed', () => {
            const numberMin = 1000;
            const numberMax = 100;
            //
            const elements = Forger.create<()=> ()=> number>({numberMax, numberMin});
            //
            should().number(elements!()()).greaterOrEqual(numberMin);
        })
    });
})
