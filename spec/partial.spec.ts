import {Forger} from "../src";

describe('isolated', () => {

    it('union literals', () => {
        const result = Forger.create<string>({stringNumbers: false, stringSpecial: false,
        stringUpCase: false, stringLowCase: false})!;
        //
        console.log({ result });
        expect(result).toEqual('');
    });
})
