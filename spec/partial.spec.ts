import { Forger } from '../src';
import { should } from "@artstesh/it-should";

describe('partial#', () => {
    it('partial#1', () => {
        interface ITest { field: null | string; }
        type SomeType = ITest & { 'id'?: number; };
        const obj = Forger.create<SomeType>()!;
        //
        should().true(obj.field);
        should().true(obj.id);
    });
})
