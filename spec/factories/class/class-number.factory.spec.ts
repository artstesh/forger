import {Forger} from "../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Object-number factory', () => {
    describe('single', () => {
        class Test { prop!: number }
        describe('default settings', () => {
            it('number, correct type', () => {
                const element = Forger.create<Test>();
                //
                should().string(typeof element!.prop).equals('number');
            })
        });
        describe('custom settings', () => {
            it('follow up limit', () => {
                const upLimit = 3;
                const element = Forger.create<Test>({numberMax: upLimit})!.prop;
                //
                should().number(element).lessOrEqual(upLimit);
            })

            it('follow bottom limit', () => {
                const upLimit = 10;
                const bottomLimit = 8;
                const element = Forger.create<Test>({numberMax: upLimit, numberMin: bottomLimit})!.prop;
                //
                should().number(element).greaterOrEqual(bottomLimit);
            })

            it('floor by default', () => {
                //
                const elements = Forger.create<Test>()!.prop;
                //
                should().number(elements % 1).equals(0);
            })

            it('float success', () => {
                //
                const elements = Forger.create<Test>({numberFloat: true})!.prop;
                //
                should().number(elements % 1).not.equals(0);
            })

            it('wrong min&max is fixed', () => {
                const numberMin = 1000;
                const numberMax = 100;
                //
                const elements = Forger.create<Test>({numberMax, numberMin})!.prop;
                //
                should().number(elements).greaterOrEqual(numberMin);
            })
        });
    })
    describe('array', () => {
        class Test { prop!: number[] }
        describe('default settings', () => {
            it('number, correct type', () => {
                const elements = Forger.create<Test>();
                //
                should().string(typeof elements!.prop[0]).equals('number');
            })

            it('number, not the same', () => {
                const elements = new Set(Forger.create<Test>()!.prop);
                //
                expect(elements.size > 1).toBeTruthy();
            })

            it('floor by default', () => {
                //
                const elements = Forger.create<Test>();
                //
                expect(elements!.prop[0] % 1).toBe(0);
            })
        });

        describe('custom settings', () => {

            it('follow numberMax', () => {
                const upLimit = 3;
                const elements = Forger.create<Test>({numberMax: upLimit, arrayLength: 10})!.prop;
                //
                expect(elements.filter(n => n > upLimit).length).toBeFalsy();
            })

            it('follow numberMax', () => {
                const upLimit = 10;
                const bottomLimit = 8;
                const elements = Forger.create<Test>({numberMax: upLimit,
                    numberMin: bottomLimit, arrayLength: 10})!.prop;
                //
                expect(elements.filter(n => n < bottomLimit).length).toBeFalsy();
            })

            it('float success', () => {
                //
                const elements = Forger.create<Test>({numberFloat: true})!.prop;
                //
                expect(elements[0] % 1).not.toBe(0);
            })

            it('wrong min&max is fixed', () => {
                const numberMin = 1000;
                const numberMax = 100;
                //
                const elements = Forger.create<Test>({numberMax, numberMin})!.prop;
                //
                should().number(elements[0]).greaterOrEqual(numberMin);
            })
        })
    });
    describe('arrays of arrays', () => {
        class Test { prop!: number[][] }
        describe('default settings', () => {
            it('number, correct type', () => {
                const elements = Forger.create<Test>()!.prop;
                //
                should().string(typeof elements[0][0]).equals('number');
            })

            it('number, not the same', () => {
                const elements = new Set(Forger.create<Test>()!.prop[0]);
                //
                expect(elements.size > 1).toBeTruthy();
            })

            it('floor by default', () => {
                //
                const elements = Forger.create<Test>()!.prop[0];
                //
                expect(elements[0] % 1).toBe(0);
            })
        });

        describe('custom settings', () => {
            it('follow numberMax', () => {
                const upLimit = 3;
                const elements = Forger.create<Test>({numberMax: upLimit, arrayLength: 10})!.prop[0];
                //
                expect(elements.filter(n => n > upLimit).length).toBeFalsy();
            })

            it('follow numberMax', () => {
                const upLimit = 10;
                const bottomLimit = 8;
                const elements = Forger.create<Test>({numberMax: upLimit,
                    numberMin: bottomLimit, arrayLength: 10})!.prop[0];
                //
                expect(elements.filter(n => n < bottomLimit).length).toBeFalsy();
            })

            it('float success', () => {
                //
                const elements = Forger.create<Test>({numberFloat: true})!.prop[0];
                //
                expect(elements[0] % 1).not.toBe(0);
            })

            it('wrong min&max is fixed', () => {
                const numberMin = 1000;
                const numberMax = 100;
                //
                const elements = Forger.create<Test>({numberMax, numberMin})!.prop[0];
                //
                should().number(elements[0]).greaterOrEqual(numberMin);
            })
        })
    });
    describe('tuple', () => {
        class Test { prop!: [number] }
        describe('default settings', () => {
            it('number, correct type', () => {
                const element = Forger.create<Test>();
                //
                should().string(typeof element!.prop[0]).equals('number');
            })
        });
        describe('custom settings', () => {
            it('follow up limit', () => {
                const upLimit = 3;
                const element = Forger.create<Test>({numberMax: upLimit})!.prop;
                //
                expect(element[0] <= upLimit).toBeTruthy();
            })

            it('follow bottom limit', () => {
                const upLimit = 10;
                const bottomLimit = 8;
                const element = Forger.create<Test>({numberMax: upLimit, numberMin: bottomLimit})!.prop;
                //
                should().number(element[0]).greaterOrEqual(bottomLimit);
            })

            it('floor by default', () => {
                //
                const elements = Forger.create<Test>()!.prop;
                //
                expect(elements[0] % 1).toBe(0);
            })

            it('float success', () => {
                //
                const elements = Forger.create<Test>({numberFloat: true})!.prop;
                //
                expect(elements[0] % 1).not.toBe(0);
            })

            it('wrong min&max is fixed', () => {
                const numberMin = 1000;
                const numberMax = 100;
                //
                const elements = Forger.create<Test>({numberMax, numberMin})!.prop;
                //
                should().number(elements[0]).greaterOrEqual(numberMin);
            })
        });
    })
})
