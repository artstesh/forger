import {Forger} from "../../../src";

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
      expect(typeof result.field === 'boolean').toBeTruthy();
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
    expect(typeof result.field === 'number').toBeTruthy();
    expect(typeof result.otherField === 'string').toBeTruthy();
  });

  it('order of parameters does not important', () => {
    interface Test<T, Z>{field: Z, otherField: T}
    const result = Forger.create<Test<string, number>>()!;
    //
    expect(result.otherField?.length).toBeTruthy();
    expect(result.field).toBeTruthy();
  });
})
