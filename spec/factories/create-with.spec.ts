import { Forger } from '../../src/forger';
import { should } from "@artstesh/it-should";


describe('createWith', () => {

  it('set specific value', () => {
    interface Test {prop: string}
    const expected = Forger.create<string>()!;
    const obj = Forger.createWith<Test>().with(t => t.prop = expected).result();
    //
    should().string(obj!.prop).equals(expected);
  })

  it('set a few values', () => {
    interface Test {prop1: string,prop2: string}
    const expected1 = Forger.create<string>()!;
    const expected2 = Forger.create<string>()!;
    const obj = Forger.createWith<Test>()
      .with(t => t.prop1 = expected1)
      .with(t => t.prop2 = expected2).result();
    //
    should().string(obj!.prop1).equals(expected1);
    should().string(obj!.prop2).equals(expected2);
  })

  it('other props generated', () => {
    interface Test {prop: string, other: number}
    const obj = Forger.createWith<Test>().with(t => t.prop = '').result();
    //
    should().number(obj!.other).positive();
  })

  it('allow generate with create inside', () => {
    interface Test {prop: string, other: number}
    const obj = Forger.createWith<Test>()
      .with(t => t.prop = Forger.create<string>()!).result();
    //
    should().true(obj!.prop);
  })

  it('set value for root instance of type only', () => {
    interface Test {prop: string, inner: Test}
    const expected = Forger.create<string>()!;
    const obj = Forger.createWith<Test>().with(t => t.prop = expected).result()!;
    //
    should().true(obj.inner.prop);
    should().string(obj.inner.prop).not.equals(obj.prop);
  })

  it('not set value with the same name for other types', () => {
    interface Inner {prop: string}
    interface Test {prop: string, inner: Inner}
    const expected = Forger.create<string>({}, 0)!;
    const obj = Forger.createWith<Test>().with(t => t.prop = expected).result();
    //
    should().string(obj?.inner.prop).defined();
    should().string(obj?.inner.prop).not.equals(expected);
  })
})
