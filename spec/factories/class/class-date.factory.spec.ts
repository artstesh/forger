import {Forger} from "../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Object-date factory', () => {
    describe('single', () => {
        class Test {prop!: Date}
        describe('default settings', () => {
            it('correct type', () => {
                const element = Forger.create<Test>();
                //
                should().date(element!.prop).beTypeOf(Date);
            })
        });
        describe('custom settings', () => {
            it('follow limits', () => {
                const upLimit = new Date(2000, 1, 2);
                const bottomLimit = new Date(2000, 1, 1);
                const element = Forger.create<Test>({dateMax: upLimit, dateMin: bottomLimit})!.prop;
                //
                should().date(element).before(upLimit);
            })
        });
    })
    describe('arrays', () => {
        class Test {prop!: Date[]}
        describe('default settings', () => {
            it('correct type', () => {
                const elements = Forger.create<Test>();
                //
                should().date(elements!.prop[0]).beTypeOf(Date);
            })

            it('not the same', () => {
                const elements = Forger.create<Test>()!.prop;
                //
                should().array(elements).uniq();
            })
        });

        describe('custom settings', () => {
            it('follow limits', () => {
                const upLimit = new Date(2000, 1, 2);
                const bottomLimit = new Date(2000, 1, 1);
                const elements = Forger.create<Test>({dateMax: upLimit, dateMin: bottomLimit})!.prop;
                //
                elements.forEach(d => should().date(d).inRange(bottomLimit, upLimit));
            })
        })
    });
    describe('arrays of arrays', () => {
        class Test {prop!: Date[][]}
        describe('default settings', () => {
            it('correct type', () => {
                const elements = Forger.create<Test>()!.prop;
                //
                should().date(elements[0][0]).beTypeOf(Date);
            })

            it('not the same', () => {
                const elements = Forger.create<Test>()!.prop[0];
                //
                should().array(elements).uniq();
            })
        });

        describe('custom settings', () => {
            it('follow limits', () => {
                const upLimit = new Date(2000, 1, 2);
                const bottomLimit = new Date(2000, 1, 1);
                const elements =Forger.create<Test>({dateMax: upLimit, dateMin: bottomLimit})!.prop[0];
                //
                elements.forEach(d => should().date(d).inRange(bottomLimit, upLimit));
            })
        })
    });

    describe('function result', () => {
        it('success lambda result', () => {
            const result = Forger.create<()=> Date>()!();
            //
            should().date(result).beTypeOf(Date);
        })
    })
})
