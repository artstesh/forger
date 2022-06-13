import {Forger} from "../../../../../src/forger";

describe('Boolean-array-function', () => {
    it('success lambda result', () => {
        const result = Forger.create<(()=> boolean)[]>()![0];
        //
        expect(typeof result() === 'boolean').toBeTruthy();
    })
})



