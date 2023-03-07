import {Forger} from "../../src";
import { should } from "@artstesh/it-should";

describe('LiteralType factory', () => {

  it('primitive inner type', () => {
    interface Test {prop: {field: string}}
    const result = Forger.create<Test>()!;
    //
    should().string(result.prop?.field).defined();
    should().string(typeof result.prop?.field).equals('string');
  });

  it('circular literal type', () => {
    interface Test {prop: {field: Test}}
    const result = Forger.create<Test>()!;
    //
    should().true(result.prop?.field?.prop);
  });

  it('reference inner type', () => {
    interface InnerTest {innerProp: number}
    interface Test {prop: {field: InnerTest}}
    const result = Forger.create<Test>()!;
    //
    should().true(result.prop?.field?.innerProp);
  });
})
