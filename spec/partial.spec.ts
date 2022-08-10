import {Forger} from "../src";

describe('isolated', () => {

    it('union literals', () => {
        interface Test {field: string}
        const result = Forger.create<('a' | Test)[]>({arrayLength: 20})!;
        //
        expect(result.filter(e => typeof e === 'string').length).toBeTruthy();
    });
})
