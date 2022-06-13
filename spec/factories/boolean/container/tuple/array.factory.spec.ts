import {Forger} from "../../../../../src/forger";

describe('Boolean-tuple-array', () => {
    it('correct type', () => {
        const elements = Forger.create<[boolean[]]>();
        //
        expect(typeof elements![0][0] === 'boolean');
    })

    it('not the same', () => {
        const elements = new Set(Forger.create<[boolean[]]>({arrayLength: 10})![0]);
        //
        expect(elements.size > 1).toBeTruthy();
    })
});
