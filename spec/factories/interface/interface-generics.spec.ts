import {Forger} from "../../../src";
import { should } from "@artstesh/it-should";

describe('interface generics', () => {

  describe('primitives', () => {
    it('generate generic string', () => {
      interface Test<T>{field: T}
      const result = Forger.create<Test<string>>()!;
      //
      should().true(result.field);
    });

    it('generate generic number', () => {
      interface Test<T>{field: T}
      const result = Forger.create<Test<number>>()!;
      //
      should().true(result.field);
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
    should().true(result.field);
    should().true( result.field instanceof Date);
  });

  it('generate generic object', () => {
    interface InnerTest {childField: number}
    interface Test<T>{field: T}
    const result = Forger.create<Test<InnerTest>>()!;
    //
    should().true(result.field.childField);
  });

  it('non-generic generates successfully', () => {
    interface Test<T>{field: T, otherField: string}
    const result = Forger.create<Test<number>>()!;
    //
    should().true(result.otherField);
    should().true(result.field);
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
    should().true(result.otherField?.length);
    should().true(result.field);
  });
})
