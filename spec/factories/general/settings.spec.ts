import {Forger} from "../../../src/forger";

describe('Settings', () => {
    const expectedLength = 6;

    describe('object', () => {
        it('literal', function () {
            const result = Forger.create<boolean[]>({arrayLength: 6})?.length;
            //
            expect(result).toEqual(expectedLength)
        });
        it('variable', function () {
            const result = Forger.create<boolean[]>({arrayLength: expectedLength})?.length;
            //
            expect(result).toEqual(expectedLength)
        });
        it('func', function () {
            const func = (n: number) => n;
            const result = Forger.create<boolean[]>({arrayLength: func(expectedLength)})?.length;
            //
            expect(result).toEqual(expectedLength)
        });
    })

    describe('ref object', () => {
        const settings = {arrayLength: expectedLength};
        it('variable', function () {
            const result = Forger.create<boolean[]>(settings)?.length;
            //
            expect(result).toEqual(expectedLength)
        });
        it('func', function () {
            const func = () => settings;
            const result = Forger.create<boolean[]>(func())?.length;
            //
            expect(result).toEqual(expectedLength)
        });
    })
})
