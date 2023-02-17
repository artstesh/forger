import {Forger} from "../../../src/forger";
import { should } from "@artstesh/it-should";

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
            const result = Forger.create<boolean[]>(settings);
            //
            should().array(result).hasLength(expectedLength);
        });
        it('func', function () {
            const func = () => settings;
            const result = Forger.create<boolean[]>(func());
            //
            should().array(result).hasLength(expectedLength);
        });
    })
})
