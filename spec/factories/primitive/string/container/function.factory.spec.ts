import {Forger} from "../../../../../src/forger";
import { should } from "@artstesh/it-should";


describe('String-function', () => {
    it('success lambda result', () => {
        const result = Forger.create<()=> string>()!();
        //
        should().string(typeof result).equals('string');
    })

    describe('default settings', () => {
        it('correct type', () => {
            const element = Forger.create<()=> string>()!();
            //
            should().string(typeof element).equals('string');
        })
    });

    describe('custom settings', () => {
        it('correct length', () => {
            const length = 4;
            //
            const result = Forger.create<()=> string>({stringLength: length})!();
            //
            should().string(result).hasLength(length);
        })
        it('only numbers', () => {
            //
            const result = Forger.create<()=> string>({stringSpecial: false, stringLowCase: false, stringUpCase: false})!();
            //
            should().string(result).match(/^\d+$/gm);
        })

        it('only low letters', () => {
            //
            const result = Forger.create<()=> string>({stringSpecial: false, stringNumbers: false, stringUpCase: false})!();
            //
            should().string(result).match(/^[a-z]+$/gm);
        })

        it('only up letters', () => {
            //
            const result = Forger.create<()=> string>({stringSpecial: false, stringNumbers: false, stringLowCase: false})!();
            //
            should().string(result).match(/^[A-Z]+$/gm);
        })

        it('only specials', () => {
            //
            const result = Forger.create<()=> string>({stringLowCase: false, stringNumbers: false, stringUpCase: false})!();
            //
            should().string(result).match(/^[^A-Za-z\d]+$/gm);
        })
    });
})




