import {Forger} from "../../../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Date-array-array', () => {
    describe('default settings', () => {
        it('correct type', () => {
            const elements = Forger.create<Date[][]>();
            //
            should().date(elements![0][0]).beTypeOf(Date);
        })

        it('not the same', () => {
            const elements = Forger.create<Date[][]>()![0];
            //
            should().array(elements).uniq();
        })
    });

    describe('custom settings', () => {
        it('follow limits', () => {
            const upLimit = new Date(2000, 1, 2);
            const bottomLimit = new Date(2000, 1, 1);
            const elements =Forger.create<Date[][]>({dateMax: upLimit, dateMin: bottomLimit})![0];
            //
            elements.forEach(d => should().date(d).inRange(bottomLimit, upLimit));
        })
    })
});
