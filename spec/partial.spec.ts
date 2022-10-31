import { Forger } from '../src';

describe('partial#', () => {

    it('inner generics success', () => {
        interface Test {prop: string, inner: Test}
        const obj = Forger.createWith<Test>().with(t => t.prop = '').result()!;
        //
        expect(obj.inner.prop).not.toEqual(obj.prop);
        expect(obj.inner.prop).toBeDefined();
    });
})
