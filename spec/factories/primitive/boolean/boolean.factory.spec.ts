import {Forger} from "../../../../src/forger";

describe('Boolean factory', () => {
    it('correct type', () => {
        const element = Forger.create<boolean>();
        //
        expect(typeof element === 'boolean');
    })
})
