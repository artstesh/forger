import {Forger} from "../../../../../src/forger";
import { should } from "@artstesh/it-should";


describe('Boolean-function', () => {
    it('success lambda result', () => {
        const result = Forger.create<()=> boolean>()!();
        //
        should().string(typeof result).equals('boolean');
    })
})




