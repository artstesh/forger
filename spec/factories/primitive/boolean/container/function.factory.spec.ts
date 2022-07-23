import {Forger} from "../../../../../src/forger";


describe('Boolean-function', () => {
    it('success lambda result', () => {
        const result = Forger.create<()=> boolean>()!();
        //
        expect(typeof result === 'boolean').toBeTruthy();
    })
})




