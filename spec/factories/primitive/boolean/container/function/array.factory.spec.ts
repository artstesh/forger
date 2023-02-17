import {Forger} from "../../../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Boolean-function-array', () => {
    it('correct type', () => {
        const elements = Forger.create<() => boolean[]>();
        //
        should().string(typeof elements!()[0]).equals('boolean');
    })

    it('not the same', () => {
        const elements = new Set(Forger.create<() => boolean[]>({arrayLength: 10})!());
        //
        expect(elements.size > 1).toBeTruthy();
    })
});
