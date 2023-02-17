import {Forger} from "../../../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Boolean-tuple-function', () => {
    it('success lambda result', () => {
        const result = Forger.create<()=> [boolean]>()!();
        //
        should().string(typeof result[0]).equals('boolean');
    })
})
