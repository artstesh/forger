import {Forger} from "../src";

describe('isolated', () => {

    it('union literals', () => {
        interface Test {prop: {field: string}}
        const result = Forger.create<Test>()!;
        //
        console.log(result);
        expect(result.prop?.field).toBeTruthy();
    });
})
