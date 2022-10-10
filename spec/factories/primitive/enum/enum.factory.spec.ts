import {Forger} from "../../../../src/forger";

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

    it('Not the same in array', () => {
        const length = 10;
        const enums = Forger.create<UnderTestEnum[]>({arrayLength: length});
        //
        const set = new Set(enums);
        //
        expect(set.size > 1).toBeTruthy();
    })

    it('Not the same in objects', () => {
        interface Test {field: UnderTestEnum}
        const length = 10;
        const objs = Forger.create<Test[]>({arrayLength: length})!;
        //
        const set = new Set(objs.map(e => e.field));
        //
        expect(set.size > 1).toBeTruthy();
    })

    it('Not the same in array of objects', () => {
        interface Test {field: UnderTestEnum}
        const length = 10;
        const objs = Array.from({length}).map(() => Forger.create<Test>())!;
        //
        const set = new Set(objs.map(e => e!.field));
        //
        expect(set.size > 1).toBeTruthy();
    })

    it('Bulk creation, not the same', () => {
        const enums = Array.from({length:10}).map(() => Forger.create<UnderTestEnum>());
        //
        const set = new Set(enums);
        //
        expect(set.size > 1).toBeTruthy();
    })

    it('correct union with null type', () => {
        const element = Forger.create<null | UnderTestEnum>()!;
        const element2 = Forger.create<UnderTestEnum | null>()!;
        //
        expect(Object.values(UnderTestEnum).includes(element)).toBeTruthy();
        expect(Object.values(UnderTestEnum).includes(element2)).toBeTruthy();
    })

    it('correct union with undefined type', () => {
        const element = Forger.create<undefined | UnderTestEnum>()!;
        const element2 = Forger.create<UnderTestEnum | undefined>()!;
        //
        expect(Object.values(UnderTestEnum).includes(element)).toBeTruthy();
        expect(Object.values(UnderTestEnum).includes(element2)).toBeTruthy();
    })
})
