import {Forger} from "../../../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Date-function-tuple', () => {
    describe('default settings', () => {
        it('correct type', () => {
            const date = Forger.create<() => [Date]>()!()[0];
            //
            should().date(date).beTypeOf(Date);
        })
    });

    describe('custom settings', () => {
        it('follow limits', () => {
            const upLimit = new Date(2000, 1, 2);
            const bottomLimit = new Date(2000, 1, 1);
            const date = Forger.create<() => [Date]>({dateMax: upLimit, dateMin: bottomLimit})!()[0];
            //
            should().date(date).inRange(bottomLimit,upLimit);
        })
    })
})




