import {Forger} from "../src";

describe('isolated', () => {

    it('success', () => {
        const result = Forger.create<Array<string>>()!;
        //
        expect(result).not.toBeUndefined();
        expect(typeof result[0] == 'string').toBeTruthy();
    });
})
