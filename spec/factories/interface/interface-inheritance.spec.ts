import {Forger} from "../../../src";

describe('interface inheritance', () => {

    it('generate parent props', () => {
        interface Parent {parentProp: number}
        interface Child extends Parent {childProp: number}
        const result = Forger.create<Child>()!;
        //
        expect(result.parentProp).toBeTruthy();
    });

    it('generate grandparent props', () => {
        interface GrandParent {grandParentProp: number}
        interface Parent extends GrandParent {parentProp: number}
        interface Child extends Parent {childProp: number}
        const result = Forger.create<Child>()!;
        //
        expect(result.grandParentProp).toBeTruthy();
    });

    it('generate field\'s parent props', () => {
        interface Parent {parentProp: number}
        interface Child extends Parent {childProp: number}
        interface Test {field: Child}
        const result = Forger.create<Test>()!;
        //
        expect(result.field.parentProp).toBeTruthy();
    });

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
