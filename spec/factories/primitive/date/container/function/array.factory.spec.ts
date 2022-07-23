import {Forger} from "../../../../../../src/forger";

describe('Date-function-array', () => {
    describe('default settings', () => {
        it('correct type', () => {
            const date = Forger.create<() => Date[]>()!();
            //
            expect(date[0] instanceof Date);
        })
    });

    describe('custom settings', () => {
        it('follow limits', () => {
            const upLimit = new Date(2000, 1, 2);
            const bottomLimit = new Date(2000, 1, 1);
            const date = Forger.create<() => Date[]>({dateMax: upLimit, dateMin: bottomLimit})!()[0];
            //
            expect(date!.getTime() > upLimit.getTime() || date!.getTime() < bottomLimit.getTime()).toBeFalsy();
        })
    })
});
