import {Forger} from "../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Number factory', () => {
    describe('create()', () => {
        describe('default settings', () => {
            it('number, correct type', () => {
                const element = Forger.create<number>();
                //
                should().string(typeof element).equals('number');
            })

            it('correct union with null type', () => {
                const element = Forger.create<null | number>()!;
                const element2 = Forger.create<number | null>()!;
                //
                should().string(typeof element).equals('number');
                should().string(typeof element2).equals('number');
            })

            it('correct union with undefined type', () => {
                const element = Forger.create<undefined | number>()!;
                const element2 = Forger.create<number | undefined>()!;
                //
                should().string(typeof element).equals('number');
                should().string(typeof element2).equals('number');
            })
        });

        describe('custom settings', () => {
            it('follow up limit', () => {
                const upLimit = 3;
                const elements = Forger.create<number>({numberMax: upLimit, arrayLength: 10});
                //
                should().number(elements).lessOrEqual(upLimit);
            })

            it('follow bottom limit', () => {
                const upLimit = 10;
                const bottomLimit = 8;
                const elements = Forger.create<number>({numberMax: upLimit, numberMin: bottomLimit});
                //
                should().number(elements).greaterOrEqual(bottomLimit);
            })

            it('floor by default', () => {
                //
                const elements = Forger.create<number>();
                //
                expect(elements! % 1).toBe(0);
            })

            it('float success', () => {
                //
                const elements = Forger.create<number>({numberFloat: true});
                //
                expect(elements! % 1).not.toBe(0);
            })

            it('wrong min&max is fixed', () => {
                const numberMin = 1000;
                const numberMax = 100;
                //
                const element = Forger.create<number>({numberMax, numberMin});
                //
                should().number(element).greaterOrEqual(numberMin);
            })
        });
    })
})
