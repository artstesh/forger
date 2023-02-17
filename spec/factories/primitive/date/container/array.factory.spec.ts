import {Forger} from "../../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Date array', () => {
    describe('default settings', () => {
        it('correct type', () => {
            const elements = Forger.create<Date[]>();
            //
            expect(elements![0] instanceof Date);
        })

        it('not the same', () => {
            const elements = new Set(Forger.create<Date[]>());
            //
            expect(elements.size > 1).toBeTruthy();
        })
    });

    describe('custom settings', () => {
        it('follow limits', () => {
            const upLimit = new Date(2000, 1, 2);
            const bottomLimit = new Date(2000, 1, 1);
            const elements = Forger.create<Date[]>({dateMax: upLimit, dateMin: bottomLimit})!;
            //
            should().array(elements.map(e => e.getTime())).containOnly(e => e! > bottomLimit.getTime() && e! < upLimit.getTime());
        })
    })
});
