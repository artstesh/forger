import {Forger} from "../../../../../src/forger";

enum UnderTestEnum {
    One, Two, Three
}

describe('Enum factory', () => {
    it('success', () => {
        const result = Forger.create<()=>UnderTestEnum>()!();
        //
        expect(result).not.toBeUndefined();
        expect(Object.values(UnderTestEnum).includes(result!)).toBeTruthy();
    })
})
