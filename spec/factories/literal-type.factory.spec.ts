import {Forger} from "../../src";

describe('LiteralType factory', () => {

  it('primitive inner type', () => {
    interface Test {prop: {field: string}}
    const result = Forger.create<Test>()!;
    //
    expect(typeof result.prop?.field === 'string').toBeTruthy();
    expect(result.prop?.field).toBeTruthy();
  });

  it('circular literal type', () => {
    interface Test {prop: {field: Test}}
    const result = Forger.create<Test>()!;
    //
    expect(result.prop?.field?.prop).toBeTruthy();
  });

  it('reference inner type', () => {
    interface InnerTest {innerProp: number}
    interface Test {prop: {field: InnerTest}}
    const result = Forger.create<Test>()!;
    //
    expect(result.prop?.field?.innerProp).toBeTruthy();
  });
})
