import {Forger} from "../../../src/forger";

describe('Date-tuple factory', () => {
    describe('create()', () => {
        describe('default settings', () => {
            it('correct type', () => {
                const element = Forger.create<[Date]>()![0];
                //
                expect(element instanceof Date);
            })

            it('not the same', () => {
                const numbers = Forger.create<[Date][]>()!.map(e => e[0]);
                //
                const set = new Set(numbers);
                //
                expect(set.size > 1).toBeTruthy();
            })
        });
        describe('custom settings', () => {
            it('follow limits', () => {
                const upLimit = new Date(2000, 1, 2);
                const bottomLimit = new Date(2000, 1, 1);
                const elements = Forger.create<[Date][]>({dateMax: upLimit, dateMin: bottomLimit, arrayLength: 10})!.map(e => e[0]);
                //
                expect(elements.filter(n => n.getTime() > upLimit.getTime() || n.getTime() < bottomLimit.getTime()).length).toBeFalsy();
            })
        });
    })
    describe('arrays', () => {
        describe('default settings', () => {
            it('correct type', () => {
                const elements = Forger.create<[Date][]>()!.map(e => e[0]);
                //
                expect(elements[0] instanceof Date);
            })

            it('not the same', () => {
                const elements = new Set(Forger.create<[Date][]>()!.map(e => e[0]));
                //
                expect(elements.size > 1).toBeTruthy();
            })
        });

        describe('custom settings', () => {
            it('follow limits', () => {
                const upLimit = new Date(2000, 1, 2);
                const bottomLimit = new Date(2000, 1, 1);
                const elements = Forger.create<[Date][]>({dateMax: upLimit, dateMin: bottomLimit})!.map(e => e[0]);
                //
                expect(elements.filter(n => n.getTime() > upLimit.getTime() || n.getTime() < bottomLimit.getTime()).length).toBeFalsy();
            })
        })
    });
    describe('arrays of arrays', () => {
        describe('default settings', () => {
            it('correct type', () => {
                const elements = Forger.create<[Date][][]>()!.map(e => e[0]);
                //
                expect(elements[0][0] instanceof Date);
            })

            it('not the same', () => {
                const elements = new Set(Forger.create<[Date][][]>()![0].map(e => e[0]));
                //
                expect(elements.size > 1).toBeTruthy();
            })
        });

        describe('custom settings', () => {
            it('follow limits', () => {
                const upLimit = new Date(2000, 1, 2);
                const bottomLimit = new Date(2000, 1, 1);
                const elements =Forger.create<[Date][][]>({dateMax: upLimit, dateMin: bottomLimit})![0].map(e => e[0]);
                //
                expect(elements.filter(n => n.getTime() > upLimit.getTime() || n.getTime() < bottomLimit.getTime()).length).toBeFalsy();
            })
        })
    });
})
