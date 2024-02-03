import {Forger} from "../../../../../../src/forger";
import { should } from "@artstesh/it-should";

describe('Date-tuple-function', () => {
    describe('default settings', () => {
        it('correct type', () => {
            const date = Forger.create<[() => Date]>()![0]();
            //
            should().true(date instanceof Date);
        })
    });

    describe('custom settings', () => {
        it('follow limits', () => {
            const upLimit = new Date(2000, 1, 2);
            const bottomLimit = new Date(2000, 1, 1);
            const date = Forger.create<[() => Date]>({dateMax: upLimit, dateMin: bottomLimit})![0]();
            //
            should().date(date).inRange(bottomLimit,upLimit);
        })
    })
})
