import {Forger} from "../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Boolean factory', () => {
    it('correct type', () => {
        const element = Forger.create<boolean>();
        //
        should().string(typeof element).equals('boolean');
    })

    it('correct union with null type', () => {
        const element = Forger.create<null | boolean>()!;
        const element2 = Forger.create<boolean | null>()!;
        //
        should().string(typeof element).equals('boolean');
        should().string(typeof element2).equals('boolean');
    })

    it('correct union with undefined type', () => {
        const element = Forger.create<undefined | boolean>()!;
        const element2 = Forger.create<boolean | undefined>()!;
        //
        should().string(typeof element).equals('boolean');
        should().string(typeof element2).equals('boolean');
    })
})
