import {Forger} from "../src";

describe('partial#', () => {

    it('inner generics success', () => {
        interface Test {field?: string, field2?: string}
        const result = Forger.createWith<Test>()
          .with(s => s.field = 'art')
          .with(s => s.field2 = Forger.create<string>({stringLength:2}))
          .result();
        //
        console.log(JSON.stringify(result));
        expect(result?.field).toBe('art');
    });
})
