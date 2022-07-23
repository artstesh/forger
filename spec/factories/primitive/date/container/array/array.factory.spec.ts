import {Forger} from "../../../../../../src/forger";

describe('Date-array-array', () => {
    describe('default settings', () => {
        it('correct type', () => {
            const elements = Forger.create<Date[][]>();
            //
            expect(elements![0][0] instanceof Date);
        })

        it('not the same', () => {
            const elements = new Set(Forger.create<Date[][]>()![0]);
            //
            expect(elements.size > 1).toBeTruthy();
        })
    });

    describe('custom settings', () => {
        it('follow limits', () => {
            const upLimit = new Date(2000, 1, 2);
            const bottomLimit = new Date(2000, 1, 1);
            const elements =Forger.create<Date[][]>({dateMax: upLimit, dateMin: bottomLimit})![0];
            //
            expect(elements.filter(n => n.getTime() > upLimit.getTime() || n.getTime() < bottomLimit.getTime()).length).toBeFalsy();
        })
    })
});
