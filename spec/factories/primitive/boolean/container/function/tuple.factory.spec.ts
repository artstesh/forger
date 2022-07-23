import {Forger} from "../../../../../../src/forger";

describe('Boolean-function-tuple', () => {
    it('correct type', () => {
        const element = Forger.create<() => [boolean]>()!();
        //
        expect(typeof element[0] === 'boolean');
    })
})




