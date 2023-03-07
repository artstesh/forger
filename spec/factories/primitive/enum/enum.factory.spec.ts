import {Forger} from "../../../../src/forger";
import { should } from "@artstesh/it-should";

enum UnderTestEnum {
    One = 1, Two, Three
}

describe('Enum factory', () => {
    it('success', () => {
        const result = Forger.create<UnderTestEnum>();
        //
        should().true(result);
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
        const elements = new Set(Forger.create<UnderTestEnum[]>({arrayLength: length}));
        //
        should().true(elements.size > 1);
    })

    it('Not the same in objects', () => {
        interface Test {field: UnderTestEnum}
        const length = 10;
        const elements = new Set(Forger.create<Test[]>({arrayLength: length})!);
        //
        should().true(elements.size > 1);
    })

    it('Not the same in array of objects', () => {
        interface Test {field: UnderTestEnum}
        const length = 10;
        const objs = Array.from({length}).map(() => Forger.create<Test>())!;
        //
        const set = new Set(objs.map(e => e!.field));
        //
        should().true(set.size > 1);
    })

    it('Bulk creation, not the same', () => {
        const elements = Array.from({length:10}).map(() => Forger.create<UnderTestEnum>());
        //
        should().true(new Set(elements).size > 1);
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
