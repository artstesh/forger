import {Forger} from "../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Date factory', () => {
    describe('create()', () => {
        describe('default settings', () => {
            it('correct type', () => {
                const element = Forger.create<Date>();
                //
                should().true(element instanceof Date);
            })

            it('correct union with null type', () => {
                const element = Forger.create<null | Date>()!;
                const element2 = Forger.create<Date | null>()!;
                //
                should().true(element instanceof Date);
                should().true(element2 instanceof Date);
            })

            it('correct union with undefined type', () => {
                const element = Forger.create<undefined | Date>()!;
                const element2 = Forger.create<Date | undefined>()!;
                //
                should().true(element instanceof Date);
                should().true(element2 instanceof Date);
            })
        });
        describe('custom settings', () => {
            it('follow limits', () => {
                const upLimit = new Date(2000, 1, 2);
                const bottomLimit = new Date(2000, 1, 1);
                const elements = Forger.create<Date[]>({dateMax: upLimit, dateMin: bottomLimit, arrayLength: 10})!;
                //
                should().array(elements.map(e => e.getTime())).containOnly(e => e! > bottomLimit.getTime() && e! < upLimit.getTime());
            })
        });
    })
})
