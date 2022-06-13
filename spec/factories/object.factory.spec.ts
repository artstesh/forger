import {Forger} from "../../src/forger";


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
})
