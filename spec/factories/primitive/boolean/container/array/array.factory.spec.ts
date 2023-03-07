import {Forger} from "../../../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Boolean-array-array factory', () => {
    it('correct type', () => {
        const elements = Forger.create<boolean[][]>();
        //
        should().string(typeof elements![0][0]).equals('boolean');
    })

    it('not the same', () => {
        const elements = Forger.create<boolean[][]>({arrayLength: 10})![0];
        //
        should().true(new Set(elements).size > 1);
    })
});
