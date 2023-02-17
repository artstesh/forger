import {Forger} from "../../../src";
import { should } from "@artstesh/it-should";

describe('interface generics', () => {

  describe('primitives', () => {
    it('generate generic string', () => {
      interface Test<T>{field: T}
      const result = Forger.create<Test<string>>()!;
      //
      expect(result.field).toBeTruthy();
    });

    it('generate generic number', () => {
      interface Test<T>{field: T}
      const result = Forger.create<Test<number>>()!;
      //
      expect(result.field).toBeTruthy();
    });

    it('generate generic boolean', () => {
      interface Test<T>{field: T}
      const result = Forger.create<Test<boolean>>()!;
      //
      should().string(typeof result.field).equals('boolean');
    });
  })

  it('generate generic Date', () => {
    interface Test<T>{field: T}
    const result = Forger.create<Test<Date>>()!;
    //
    expect(result.field).toBeTruthy();
    expect( result.field instanceof Date).toBeTruthy();
  });

  it('generate generic object', () => {
    interface InnerTest {childField: number}
    interface Test<T>{field: T}
    const result = Forger.create<Test<InnerTest>>()!;
    //
    expect(result.field.childField).toBeTruthy();
  });

  it('non-generic generates successfully', () => {
    interface Test<T>{field: T, otherField: string}
    const result = Forger.create<Test<number>>()!;
    //
    expect(result.otherField).toBeTruthy();
    expect(result.field).toBeTruthy();
  });

  it('a few parameters success', () => {
    interface Test<T, Z>{field: Z, otherField: T}
    const result = Forger.create<Test<string, number>>()!;
    //
    should().string(typeof result.field).equals('number');
    should().string(typeof result.otherField).equals('string');
  });

  it('order of parameters does not important', () => {
    interface Test<T, Z>{field: Z, otherField: T}
    const result = Forger.create<Test<string, number>>()!;
    //
    expect(result.otherField?.length).toBeTruthy();
    expect(result.field).toBeTruthy();
  });
})
