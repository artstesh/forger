import {Forger} from "../src";

describe('isolated', () => {

    it('success', () => {
        interface InnerTest {field: number}
        interface Test { tests: InnerTest[]; tests2: InnerTest[]; tests3: InnerTest[];}
        const result = Forger.create<Test>({}, 1)!;
        console.log(result);
        //
        expect(result.tests3[0]).not.toBeNull();
    });
})
