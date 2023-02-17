import {Forger} from "../../../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Boolean-array-function', () => {
    it('success lambda result', () => {
        const result = Forger.create<(()=> boolean)[]>()![0];
        //
        should().string(typeof result()).equals('boolean');
    })
})



