import {Forger} from "../../../src/forger";

describe('Object-boolean factory', () => {
    describe('single', () => {
        class Test {
            prop!: boolean
        }

        it('correct type', () => {
            const element = Forger.create<Test>();
            //
            expect(typeof element!.prop === 'boolean');
        })
    })
    describe('array', () => {
        class Test {
            prop!: boolean[]
        }

        it('correct type', () => {
            const elements = Forger.create<Test>();
            //
            expect(typeof elements!.prop[0] === 'boolean');
        })

        it('not the same', () => {
            class Test {
                prop!: boolean[]
            }

            const elements = new Set(Forger.create<Test>({arrayLength: 10})!.prop);
            //
            expect(elements.size > 1).toBeTruthy();
        })
    })
    describe('arrays of arrays', () => {
        class Test {
            prop!: boolean[][]
        }

        it('correct type', () => {
            const elements = Forger.create<Test>()!.prop;
            //
            expect(typeof elements[0][0] === 'boolean');
        })

        it('not the same', () => {
            const elements = new Set(Forger.create<Test>({arrayLength: 10})!.prop[0]);
            //
            expect(elements.size > 1).toBeTruthy();
        })
    });

    describe('tuple', () => {
        class Test {
            prop!: [boolean]
        }

        it('correct type', () => {
            const element = Forger.create<Test>();
            //
            expect(typeof element!.prop[0] === 'boolean');
        })

        it('not the same', () => {
            const elements = Forger.create<Test[]>({arrayLength: 10})!.map(e => e.prop[0]);
            //
            const set = new Set(elements);
            //
            expect(set.size > 1).toBeTruthy();
        })
    })
})
