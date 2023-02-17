import {Forger} from "../../src/forger";
import { should } from "@artstesh/it-should";


describe('Object factory', () => {
    describe('interface', () => {
        describe('create() single object', () => {

            it('inner class is defined', () => {
                class InnerTest {}
                interface Test {prop: InnerTest}
                const obj = Forger.create<Test>();
                //
                expect(obj!.prop).toBeDefined();
            })

            it('circular depth 0', () => {
                class InnerTest {parent!: Test;}
                interface Test {child: InnerTest}
                const objs = Forger.create<Test>({}, 0);
                //
                expect(objs!.child.parent).toBeNull();
            })

            it('circular depth 1', () => {
                class InnerTest {parent!: Test}
                interface Test {child: InnerTest; prop: string}
                const obj = Forger.create<Test>({}, 1);
                //
                expect(obj!.child.parent.child.parent).toBeNull();
            })

            it('tup success', () => {
                interface Test {prop: [number, boolean]}
                const result = Forger.create<Test>();
                //
                expect(result!.prop[0]).toBeDefined();
                expect(result!.prop[1]).toBeDefined();
            })
        })
        describe('create() array of objects', () => {

            it('inner class is defined', () => {
                class InnerTest {}
                interface Test {prop: InnerTest}
                const obj = Forger.create<Test[]>();
                //
                expect(obj![0].prop).toBeDefined();
            })

            it('function, success', () => {
                interface Test {prop: (str: string) => number}
                const obj = Forger.create<Test[]>();
                //
                expect(obj![0].prop('any')).toBeTruthy();
            })

            it('action, success', () => {
                interface Test {prop: (str: string) => void}
                const obj = Forger.create<Test[]>();
                //
                obj![0].prop('any');
                expect(obj![0].prop).toBeDefined();
            })

            it('circular depth 0', () => {
                interface InnerTest {parent: Test; prop: string}
                interface Test {child: InnerTest}
                const objs = Forger.create<Test[]>({}, 0);
                //
                expect(objs![0].child.parent).toBeNull();
            })

            it('circular depth 1', () => {
                class InnerTest {parent!: Test}
                interface Test {child: InnerTest; prop: string}
                const objs = Forger.create<Test[]>({}, 1);
                //
                expect(objs![0].child.parent.child.parent).toBeNull();
            })

            it('tup success', () => {
                interface Test {prop: [number, boolean]}
                const result = Forger.create<Test[]>();
                //
                expect(result![0].prop[0]).toBeDefined();
                expect(result![0].prop[1]).toBeDefined();
            })
        })
    })
    describe('class', () => {
        describe('create() single object', () => {

            it('inner class is defined', () => {
                interface InnerTest {}
                interface Test {prop: InnerTest}
                const obj = Forger.create<Test>();
                //
                expect(obj!.prop).toBeDefined();
            })

            it('array of arrays, success', () => {
                class Test {prop!: number[][]}
                const obj = Forger.create<Test>();
                //
                expect(obj!.prop.filter(a => !!a.length).length).toBeTruthy();
            })

            it('circular depth 0', () => {
                interface InnerTest {parent: Test; prop: string}
                interface Test {child: InnerTest}
                const objs = Forger.create<Test>({}, 0);
                //
                expect(objs!.child.parent).toBeNull();
            })

            it('circular depth 1', () => {
                class InnerTest {parent!: Test}
                class Test {child!: InnerTest;}
                const objs = Forger.create<Test>({}, 1);
                //
                expect(objs!.child.parent.child.parent).toBeNull();
            })

            it('tup success', () => {
                interface Test {prop: [string, number]}
                const result = Forger.create<Test>();
                //
                expect(result!.prop[0]).toBeDefined();
                expect(result!.prop[1]).toBeDefined();
            })
        })
        describe('create() array of objects', () => {
            it('without settings success', () => {
                interface Test {prop: number[]}
                const obj = Forger.create<Test[]>();
                //
                expect(!!obj![0].prop.length).toBeTruthy();
            })

            it('inner class is defined', () => {
                class InnerTest {}
                class Test {prop!: InnerTest}
                const obj = Forger.create<Test[]>();
                //
                expect(obj![0].prop).toBeDefined();
            })

            it('array of arrays, success', () => {
                interface Test {prop: number[][]}
                const obj = Forger.create<Test[]>();
                //
                expect(obj![0].prop.filter(a => !!a.length).length).toBeTruthy();
            })

            it('circular depth 0', () => {
                interface InnerTest {parent: Test;}
                interface Test {child: InnerTest}
                const objs = Forger.create<Test[]>({}, 0);
                //
                expect(objs![0].child.parent).toBeNull();
            })

            it('circular depth 1', () => {
                interface InnerTest {parent: Test}
                interface Test {child: InnerTest;}
                const objs = Forger.create<Test[]>({}, 1);
                //
                expect(objs![0].child.parent.child.parent).toBeNull();
            })

            it('tup success', () => {
                interface Test {prop: [number, boolean]}
                const result = Forger.create<Test[]>();
                //
                expect(result![0].prop[0]).toBeDefined();
                expect(result![0].prop[1]).toBeDefined();
            })
        })
    })

    describe('specific cases', () => {

        it('object array circular', () => {
            interface Test { tests: Test[]; }
            const result = Forger.create<Test>()!;
            //
            expect(result).toBeDefined();
        });

        it('correct union with null type', () => {
            interface Test { field: string }
            const result = Forger.create<Test | null>()!;
            const result2 = Forger.create<null | Test>()!;
            //
            expect(result).toBeDefined();
            expect(result2).toBeDefined();
        });

        it('correct union with undefined type', () => {
            interface Test { field: string }
            const result = Forger.create<Test | undefined>()!;
            const result2 = Forger.create<undefined | Test>()!;
            //
            expect(result).toBeDefined();
            expect(result2).toBeDefined();
        });

        it('correct union with null type of property', () => {
            interface Test { field: string | null;field2: null | string;field3?: string }
            const result = Forger.create<Test>()!;
            //
            should().string(typeof result.field).equals('string');
            should().string(typeof result.field2).equals('string');
            should().string(typeof result.field3).equals('string');
        });

        it('correct union with undefined type of property', () => {
            interface Test { field: string | undefined;field2: undefined | string;field3?: string }
            const result = Forger.create<Test>()!;
            //
            should().string(typeof result.field).equals('string');
            should().string(typeof result.field2).equals('string');
            should().string(typeof result.field3).equals('string');
        });

        it('literals are different', () => {
            interface Test { field: ('a' | 1)[] }
            const result = Forger.create<Test | undefined>({arrayLength: 20})!;
            //
            expect(result.field.filter(e => e === 'a').length).toBeTruthy();
            expect(result.field.filter(e => e === 1).length).toBeTruthy();
        });

        it('object array circular count by prop', () => {
            interface InnerTest {field: number}
            interface Test { tests: InnerTest[]; tests2: InnerTest[]; tests3: InnerTest[];}
            const result = Forger.create<Test>({}, 1)!;
            //
            expect(result.tests3[0]).not.toBeNull();
        });

        it('inner generics success', () => {
            interface Inner<C> {field: C}
            interface Test<T, Z>{inner: Inner<T>}
            const result = Forger.create<Test<string, number>>()!;
            //
            expect(result).toBeTruthy();
        });
    })
})
