import {Forger} from "../../src/forger";

describe('Array factory general', () => {

    describe('array interface', () => {
        it('number', () => {
            const result = Forger.create<Array<string>>()!;
            //
            expect(result).not.toBeUndefined();
            expect(typeof result[0] == 'string').toBeTruthy();
        })
    });
})
