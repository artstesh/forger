import {Forger} from "../../../src";
import { should } from "@artstesh/it-should";

describe('interface inheritance', () => {

    it('generate parent props', () => {
        interface Parent {parentProp: number}
        interface Child extends Parent {childProp: number}
        const result = Forger.create<Child>()!;
        //
        should().number(result.parentProp).positive();
    });

    it('generate grandparent props', () => {
        interface GrandParent {grandParentProp: number}
        interface Parent extends GrandParent {parentProp: number}
        interface Child extends Parent {childProp: number}
        const result = Forger.create<Child>()!;
        //
        should().number(result.grandParentProp).positive();
    });

    it('generate field\'s parent props', () => {
        interface Parent {parentProp: number}
        interface Child extends Parent {childProp: number}
        interface Test {field: Child}
        const result = Forger.create<Test>()!;
        //
        should().number(result.field.parentProp).positive();
    });

    it('generate field\'s grandparent props', () => {
        interface GrandParent {grandParentProp: number}
        interface Parent extends GrandParent {parentProp: number}
        interface Child extends Parent {childProp: number}
        interface Test {field: Child}
        const result = Forger.create<Test>()!;
        //
        should().number(result.field.grandParentProp).positive();
    });
})
