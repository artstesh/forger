import { Forger } from '../src';

describe('partial#', () => {

    it('inner generics success', () => {
        interface Test {prop: string, other: string}
        const obj = Forger.createWith<Test>({stringLength: 2})
          .with(t => t.prop = Forger.create<string>({stringSpecial: false})!)
          .result();
        //
        expect(obj!.other).toBeTruthy();
    });
})
