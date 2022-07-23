import {Forger} from "../src";

describe('isolated', () => {
    interface Test {
        tests: Test[];
    }

    it('success', () => {
        const result = Forger.create<Test>()!;
        //
        expect(result).not.toBeUndefined();
    });
})
