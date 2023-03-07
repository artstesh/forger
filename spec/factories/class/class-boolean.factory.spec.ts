import {Forger} from "../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Object-boolean factory', () => {
    describe('single', () => {
        class Test {
            prop!: boolean
        }

        it('correct type', () => {
            const element = Forger.create<Test>();
            //
            should().string(typeof element!.prop).equals('boolean');
        })
    })
    describe('array', () => {
        class Test {
            prop!: boolean[]
        }

        it('correct type', () => {
            const elements = Forger.create<Test>();
            //
            should().string(typeof elements!.prop[0]).equals('boolean');
        })

        it('not the same', () => {
            class Test {
                prop!: boolean[]
            }
            const elements = Forger.create<Test>({arrayLength: 10})!.prop;
            //
            should().true(new Set(elements).size > 1);
        })
    })
    describe('arrays of arrays', () => {
        class Test {
            prop!: boolean[][]
        }

        it('correct type', () => {
            const elements = Forger.create<Test>()!.prop;
            //
            should().string(typeof elements[0][0]).equals('boolean');
        })

        it('not the same', () => {
            const elements = Forger.create<Test>({arrayLength: 10})!.prop[0];
            //
            should().true(new Set(elements).size > 1);
        })
    });

    describe('tuple', () => {
        class Test {
            prop!: [boolean]
        }

        it('correct type', () => {
            const element = Forger.create<Test>();
            //
            should().string(typeof element!.prop[0]).equals('boolean');
        })

        it('not the same', () => {
            const elements = Forger.create<Test[]>({arrayLength: 20})!.map(e => e.prop[0]);
            //
            should().true(new Set(elements).size > 1);
        })
    })
})
