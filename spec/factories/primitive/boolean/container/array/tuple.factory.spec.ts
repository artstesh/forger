import {Forger} from "../../../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Boolean-array-tuple', () => {
    it('correct type', () => {
        const element = Forger.create<[boolean][]>();
        //
        should().string(typeof element![0][0]).equals('boolean');
    })

    it('not the same', () => {
        const elements = Forger.create<[boolean][]>({arrayLength: 10})!.map(e => e[0]);
        //
        should().true(new Set(elements).size > 1);
    })
})




