import {Forger} from "../../src/forger";
import { should } from "@artstesh/it-should";

describe('Array factory general', () => {

    describe('array interface', () => {
        it('number', () => {
            const result = Forger.create<Array<string>>()!;
            //
            should().array(result).defined();
            should().string(typeof result[0]).equals('string');
        })
    });
})
