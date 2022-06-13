import {Forger} from "../../../src/forger";

describe('Method factory', () => {

    it('success lambda', () => {
        const result = Forger.create<()=> number>();
        //
        expect(result).toBeTruthy();
        expect(typeof result== 'function').toBeTruthy();
    })

    it('success lambda result', () => {
        const result = Forger.create<()=> number>()!();
        //
        expect(typeof result === 'number').toBeTruthy();
    })
})
