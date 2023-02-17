import {Forger} from "../../../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Boolean-function-tuple', () => {
    it('correct type', () => {
        const element = Forger.create<() => [boolean]>()!();
        //
        should().string(typeof element[0]).equals('boolean');
    })
})




