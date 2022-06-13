import {Forger} from "../../../src/forger";


enum UnderTestEnum {
    One, Two, Three
}

describe('Enum factory', () => {
    it('success', () => {
        const result = Forger.create<UnderTestEnum>();
        //
        expect(result).not.toBeUndefined();
        expect(Object.values(UnderTestEnum).includes(result!)).toBeTruthy();
    })

    it('sized by settings', () => {
        const length = 6;
        const enums = Forger.create<UnderTestEnum[]>({arrayLength: length});
        //
        expect(enums!.length).toBe(length);
    })

    it('not the same', () => {
        const length = 6;
        const date = Forger.create<UnderTestEnum[]>({arrayLength: length});
        //
        const set = new Set(date);
        //
        expect(set.size > 1).toBeTruthy();
    })

    describe('function result', () => {
        it('success lambda result', () => {
            const result = Forger.create<()=> UnderTestEnum>()!();
            //
            expect(Object.values(UnderTestEnum).includes(result)).toBeTruthy();
        })
    })
})
