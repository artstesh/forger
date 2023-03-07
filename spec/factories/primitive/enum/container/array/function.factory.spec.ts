import {Forger} from "../../../../../../src/forger";
import { should } from "@artstesh/it-should";

enum UnderTestEnum {
    One = 1, Two, Three
}

describe('Enum factory', () => {
    it('success', () => {
        const result = Forger.create<(()=>UnderTestEnum)[]>()![0]();
        //
        should().true(result);
        expect(Object.values(UnderTestEnum).includes(result!)).toBeTruthy();
    })
})



