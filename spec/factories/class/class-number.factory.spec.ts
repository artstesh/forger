import {Forger} from "../../../src/forger";

describe('Object-number factory', () => {
    describe('single', () => {
        class Test { prop!: number }
        describe('default settings', () => {
            it('number, correct type', () => {
                const element = Forger.create<Test>();
                //
                expect(typeof element!.prop === 'number');
            })
        });
        describe('custom settings', () => {
            it('follow up limit', () => {
                const upLimit = 3;
                const element = Forger.create<Test>({numberMax: upLimit})!.prop;
                //
                expect(element <= upLimit).toBeTruthy();
            })

            it('follow bottom limit', () => {
                const upLimit = 10;
                const bottomLimit = 8;
                const element = Forger.create<Test>({numberMax: upLimit, numberMin: bottomLimit})!.prop;
                //
                expect(element >= bottomLimit).toBeTruthy();
            })

            it('floor by default', () => {
                //
                const elements = Forger.create<Test>()!.prop;
                //
                expect(elements % 1).toBe(0);
            })

            it('float success', () => {
                //
                const elements = Forger.create<Test>({numberFloat: true})!.prop;
                //
                expect(elements % 1).not.toBe(0);
            })

            it('wrong min&max is fixed', () => {
                const numberMin = 1000;
                const numberMax = 100;
                //
                const elements = Forger.create<Test>({numberMax, numberMin})!.prop;
                //
                expect(elements >= numberMin).toBeTruthy();
            })
        });
    })
    describe('array', () => {
        class Test { prop!: number[] }
        describe('default settings', () => {
            it('number, correct type', () => {
                const elements = Forger.create<Test>();
                //
                expect(typeof elements!.prop[0] === 'number');
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
                expect(elements[0] >= numberMin).toBeTruthy();
            })
        })
    });
    describe('arrays of arrays', () => {
        class Test { prop!: number[][] }
        describe('default settings', () => {
            it('number, correct type', () => {
                const elements = Forger.create<Test>()!.prop;
                //
                expect(typeof elements[0][0] === 'number');
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
                expect(elements[0] >= numberMin).toBeTruthy();
            })
        })
    });
    describe('tuple', () => {
        class Test { prop!: [number] }
        describe('default settings', () => {
            it('number, correct type', () => {
                const element = Forger.create<Test>();
                //
                expect(typeof element!.prop[0] === 'number');
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
                expect(element[0] >= bottomLimit).toBeTruthy();
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
                expect(elements[0] >= numberMin).toBeTruthy();
            })
        });
    })
})
