import {Forger} from "../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Tuple factory', () => {
    it('success', () => {
        const result = Forger.create<[string, number]>();
        //
        should().string(typeof result![0]).equals('string');
        should().string(typeof result![1]).equals('number');
    })
})
