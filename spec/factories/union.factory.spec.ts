import {Forger} from "../../src";
import { should } from "@artstesh/it-should";

describe('Union factory', () => {

    it('ignore undefined', () => {
        const arrayLength = 10;
        //
        const result = Forger.create<('a' | undefined)[]>({arrayLength})!;
        //
        should().array(result).containOnly(e => e === 'a');
    });

    it('ignore null', () => {
        const arrayLength = 10;
        //
        const result = Forger.create<('a' | null)[]>({arrayLength})!;
        //
        should().array(result).containOnly(e => e === 'a');
    });

    it('literals are different', () => {
        const result = Forger.create<('a' | 2 | true)[]>({arrayLength: 30})!;
        //
        should().array(result).contain('a');
        should().array(result).contain(2);
        should().array(result).contain(true);
    });

    it('literal with object', () => {
        interface Test {field: string}
        const result = Forger.create<('a' | Test)[]>({arrayLength: 20})!;
        //
        should().array(result).contain('a');
        should().array(result).containBy(e => typeof e === 'object' && ('field' in e!));
    });
})
