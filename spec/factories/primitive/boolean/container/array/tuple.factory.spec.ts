import {Forger} from "../../../../../../src/forger";

describe('Boolean-array-tuple', () => {
    it('correct type', () => {
        const element = Forger.create<[boolean][]>();
        //
        expect(typeof element![0][0] === 'boolean');
    })

    it('not the same', () => {
        const elements = new Set(Forger.create<[boolean][]>({arrayLength: 10})!.map(e => e[0]));
        //
        expect(elements.size > 1).toBeTruthy();
    })
})




