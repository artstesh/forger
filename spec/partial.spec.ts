import {Forger} from "../src";

describe('partial#', () => {

    it('inner generics success', () => {
        interface Inner<C> {field: C}
        interface Test<T, Z>{inner: Inner<T>}
        const result = Forger.create<Test<string, number>>()!;
        //
        expect(result).toBeTruthy();
    });
})
