import {Forger} from "../src";

describe('isolated', () => {

    it('success', () => {
        const result = Forger.create<undefined | number>()!;
        //
        expect(result).toBeTruthy();
    });
})
