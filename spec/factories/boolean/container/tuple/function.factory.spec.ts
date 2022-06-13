import {Forger} from "../../../../../src/forger";

describe('Boolean-tuple-function', () => {
    it('success lambda result', () => {
        const result = Forger.create<()=> [boolean]>()!();
        //
        expect(typeof result[0] === 'boolean').toBeTruthy();
    })
})
