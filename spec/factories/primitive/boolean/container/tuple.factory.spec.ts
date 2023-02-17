import {Forger} from "../../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Boolean-tuple', () => {
    it('correct type', () => {
        const element = Forger.create<[boolean]>()![0];
        //
        should().string(typeof element).equals('boolean');
    })
})




