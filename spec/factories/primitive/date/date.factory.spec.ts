import {Forger} from "../../../../src/forger";

describe('Date factory', () => {
    describe('create()', () => {
        describe('default settings', () => {
            it('correct type', () => {
                const element = Forger.create<Date>();
                //
                expect(element instanceof Date);
            })
        });
        describe('custom settings', () => {
            it('follow limits', () => {
                const upLimit = new Date(2000, 1, 2);
                const bottomLimit = new Date(2000, 1, 1);
                const elements = Forger.create<Date[]>({dateMax: upLimit, dateMin: bottomLimit, arrayLength: 10});
                //
                expect(elements!.filter(n => n.getTime() > upLimit.getTime() || n.getTime() < bottomLimit.getTime()).length).toBeFalsy();
            })
        });
    })
})
