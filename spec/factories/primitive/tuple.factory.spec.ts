import {Forger} from "../../../src/forger";

describe('Tuple factory', () => {
    it('success', () => {
        const result = Forger.create<[string, number]>();
        //
        expect(typeof result![0] == 'string').toBeTruthy();
        expect(typeof result![1] == 'number').toBeTruthy();
    })
})
