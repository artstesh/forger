import {Forger} from "../src";

describe('partial#', () => {

    it('union literals', () => {
        interface Test<T, Z>{zill: Z, temp: boolean, field: T}
        const result = Forger.create<Test<string, number>>()!;
        //
        expect(result.field?.length).toBeTruthy();
    });
})
