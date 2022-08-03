import {Forger} from "../src";

describe('isolated', () => {

    it('generate field\'s grandparent props', () => {
        interface GrandParent {grandParentProp: number}
        interface Parent extends GrandParent {parentProp: number}
        interface Child extends Parent {childProp: number}
        interface Test {field: Child}
        const result = Forger.create<Test>()!;
        //
        expect(result.field.grandParentProp).toBeTruthy();
    });
})
