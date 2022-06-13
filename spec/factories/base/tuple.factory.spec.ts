import {Forger} from "../../../src/forger";

describe('Tuple factory', () => {
    it('success', () => {
        const result = Forger.create<[string, number]>();
        //
        expect(result![0]).toBeDefined();
        expect(result![1]).toBeDefined();
    })
})
