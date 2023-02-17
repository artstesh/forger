import {Forger} from "../../../src/forger";

describe('Object-date factory', () => {
    describe('single', () => {
        class Test {prop!: Date}
        describe('default settings', () => {
            it('correct type', () => {
                const element = Forger.create<Test>();
                //
                expect(element!.prop instanceof Date);
            })
        });
        describe('custom settings', () => {
            it('follow limits', () => {
                const upLimit = new Date(2000, 1, 2);
                const bottomLimit = new Date(2000, 1, 1);
                const element = Forger.create<Test>({dateMax: upLimit, dateMin: bottomLimit})!.prop;
                //
                expect(element.getTime() <= upLimit.getTime()).toBeTruthy();
            })
        });
    })
    describe('arrays', () => {
        class Test {prop!: Date[]}
        describe('default settings', () => {
            it('correct type', () => {
                const elements = Forger.create<Test>();
                //
                expect(elements!.prop[0] instanceof Date);
            })

            it('not the same', () => {
                const elements = new Set(Forger.create<Test>()!.prop);
                //
                expect(elements.size > 1).toBeTruthy();
            })
        });

        describe('custom settings', () => {
            it('follow limits', () => {
                const upLimit = new Date(2000, 1, 2);
                const bottomLimit = new Date(2000, 1, 1);
                const elements = Forger.create<Test>({dateMax: upLimit, dateMin: bottomLimit})!.prop;
                //
                expect(elements.filter(n => n.getTime() > upLimit.getTime() || n.getTime() < bottomLimit.getTime()).length).toBeFalsy();
            })
        })
    });
    describe('arrays of arrays', () => {
        class Test {prop!: Date[][]}
        describe('default settings', () => {
            it('correct type', () => {
                const elements = Forger.create<Test>()!.prop;
                //
                expect(elements[0][0] instanceof Date);
            })

            it('not the same', () => {
                const elements = new Set(Forger.create<Test>()!.prop[0]);
                //
                expect(elements.size > 1).toBeTruthy();
            })
        });

        describe('custom settings', () => {
            it('follow limits', () => {
                const upLimit = new Date(2000, 1, 2);
                const bottomLimit = new Date(2000, 1, 1);
                const elements =Forger.create<Test>({dateMax: upLimit, dateMin: bottomLimit})!.prop[0];
                //
                expect(elements.filter(n => n.getTime() > upLimit.getTime() || n.getTime() < bottomLimit.getTime()).length).toBeFalsy();
            })
        })
    });

    describe('function result', () => {
        it('success lambda result', () => {
            const result = Forger.create<()=> Date>()!();
            //
            expect(result instanceof Date);
        })
    })
})
