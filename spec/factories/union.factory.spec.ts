import {Forger} from "../../src";

describe('Union factory', () => {

    it('ignore undefined', () => {
        const arrayLength = 10;
        //
        const result = Forger.create<('a' | undefined)[]>({arrayLength})!;
        //
        expect(result.filter(e => e === 'a').length === arrayLength).toBeTruthy();
    });

    it('ignore null', () => {
        const arrayLength = 10;
        //
        const result = Forger.create<('a' | null)[]>({arrayLength})!;
        //
        expect(result.filter(e => e === 'a').length === arrayLength).toBeTruthy();
    });

    it('literals are different', () => {
        const result = Forger.create<('a' | 2 | true)[]>({arrayLength: 30})!;
        //
        expect(result.filter(e => e === 'a').length).toBeTruthy();
        expect(result.filter(e => e === 2).length).toBeTruthy();
        expect(result.filter(e => e === true).length).toBeTruthy();
    });

    it('literal with object', () => {
        interface Test {field: string}
        const result = Forger.create<('a' | Test)[]>({arrayLength: 20})!;
        //
        expect(result.filter(e => e === 'a').length).toBeTruthy();
        expect(result.filter(e => typeof e === 'object' && ('field' in e)).length).toBeTruthy();
    });
})
