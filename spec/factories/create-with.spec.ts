import { Forger } from '../../src/forger';


describe('createWith', () => {

  it('set specific value', () => {
    interface Test {prop: string}
    const expected = Forger.create<string>()!;
    const obj = Forger.createWith<Test>().with(t => t.prop = expected).result();
    //
    expect(obj!.prop).toEqual(expected);
  })

  it('set a few values', () => {
    interface Test {prop1: string,prop2: string}
    const expected1 = Forger.create<string>()!;
    const expected2 = Forger.create<string>()!;
    const obj = Forger.createWith<Test>()
      .with(t => t.prop1 = expected1)
      .with(t => t.prop2 = expected2).result();
    //
    expect(obj!.prop1).toEqual(expected1);
    expect(obj!.prop2).toEqual(expected2);
  })

  it('other props generated', () => {
    interface Test {prop: string, other: number}
    const obj = Forger.createWith<Test>().with(t => t.prop = '').result();
    //
    expect(obj!.other).toBeTruthy();
  })

  it('allow generate with create inside', () => {
    interface Test {prop: string, other: number}
    const obj = Forger.createWith<Test>()
      .with(t => t.prop = Forger.create<string>()!).result();
    //
    expect(obj!.prop).toBeDefined();
  })

  it('set value for root instance of type only', () => {
    interface Test {prop: string, inner: Test}
    const expected = Forger.create<string>()!;
    const obj = Forger.createWith<Test>().with(t => t.prop = expected).result()!;
    //
    expect(obj.inner.prop).not.toEqual(obj.prop);
    expect(obj.inner.prop).toBeDefined();
  })

  it('not set value with the same name for other types', () => {
    interface Inner {prop: string}
    interface Test {prop: string, inner: Inner}
    const expected = Forger.create<string>({}, 0)!;
    const obj = Forger.createWith<Test>().with(t => t.prop = expected).result();
    //
    expect(obj!.inner.prop).not.toEqual(expected);
    expect(obj!.inner.prop).toBeDefined();
  })
})
