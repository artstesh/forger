import {Forger} from "../../../../src/forger";

describe('Boolean factory', () => {
    it('correct type', () => {
        const element = Forger.create<boolean>();
        //
        expect(typeof element === 'boolean');
    })

    it('correct union with null type', () => {
        const element = Forger.create<null | boolean>()!;
        const element2 = Forger.create<boolean | null>()!;
        //
        expect(typeof element === 'boolean');
        expect(typeof element2 === 'boolean');
    })

    it('correct union with undefined type', () => {
        const element = Forger.create<undefined | boolean>()!;
        const element2 = Forger.create<boolean | undefined>()!;
        //
        expect(typeof element === 'boolean');
        expect(typeof element2 === 'boolean');
    })
})
