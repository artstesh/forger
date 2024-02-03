import {Forger} from "../../../../../../src/forger";
import { should } from "@artstesh/it-should";


describe('String-array-function', () => {
    describe('default settings', () => {
        it('string, correct type', () => {
            const elements = Forger.create<(()=> string)[]>()!;
            //
            should().string(typeof elements[0]()).equals('string');
        })

        it('string, not the same', () => {
            const elements = Forger.create<(()=> string)[]>()!.map(e => e());
            //
            should().array(elements).uniq();
        })
    });

    describe('custom settings', () => {
        it('correct length', () => {
            const length = 4;
            //
            const result = Forger.create<(()=> string)[]>({stringLength: length})!;
            //
            expect(result[0]().length).toEqual(length);
        })
        it('only numbers', () => {
            //
            const result = Forger.create<(()=> string)[]>({stringSpecial: false, stringLowCase: false, stringUpCase: false})!;
            //
            should().string(result[0]()).match(/^\d+$/gm);
        })

        it('only low letters', () => {
            //
            const result = Forger.create<(()=> string)[]>({stringSpecial: false, stringNumbers: false, stringUpCase: false})!;
            //
            should().string(result[0]()).match(/^[a-z]+$/gm);
        })

        it('only up letters', () => {
            //
            const result = Forger.create<(()=> string)[]>({stringSpecial: false, stringNumbers: false, stringLowCase: false})!;
            //
            should().string(result[0]()).match(/^[A-Z]+$/gm);
        })

        it('only specials', () => {
            //
            const result = Forger.create<(()=> string)[]>({stringLowCase: false, stringNumbers: false, stringUpCase: false})!;
            //
            should().string(result[0]()).match(/^[^A-Za-z\d]+$/gm);
        })
    })
});



