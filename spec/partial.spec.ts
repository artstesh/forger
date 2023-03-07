import { Forger } from '../src';
import { should } from "@artstesh/it-should";

interface ActivityBase {
    fieldId?: null | string;
}
type FertilizerControl = ActivityBase & {
    'brandName'?: number;
} & {
};

describe('partial#', () => {

    it('inner generics success', () => {
        const obj = Forger.create<FertilizerControl>()!;
        //
        console.log(obj);
        should().false(obj.fieldId);
    });
})
