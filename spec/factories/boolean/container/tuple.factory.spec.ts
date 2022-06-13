import {Forger} from "../../../../src/forger";

describe('Boolean-tuple', () => {
    it('correct type', () => {
        const element = Forger.create<[boolean]>()![0];
        //
        expect(typeof element === 'boolean');
    })
})




