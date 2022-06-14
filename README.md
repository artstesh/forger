# forger
<em>A legal way to forge everything you want ;)</em>

### Description of the project

Legal way to forge anything ;)

Forger is designed to make it easier to write test code in terms of creating auto-generated objects/primitives, allowing the developer to focus on the really important things instead of inventing test data.

### Review

Forger is designed to save the developer from manually creating numerous test data, saving time and not littering the code with declarations of data that is not important for the test, thus facilitating both writing and reading tests.

Consider a small example:

```typescript
// interface Student {name: string, age: number}
describe('student.service', () => {
	it('save success', () => {
		const student = Forger.create<Student>();
		//
		const result = studentService.save(student);
		//
		console.log(student) // { name: 'I8SE1ou3ZD', age: 345 }
		expect(result).toBeTruthy();
	})
});
```

The point of this simple test is to check the result of the response of a certain service. For us, it does not matter at all what specific data will be transferred inside the student. In the absence of Forger, the developer would be forced to manually write some kind of stub, furthermore creating uncertainty for the reader about the importance of this data. With Forger, the test contains only the data that is really important to it.

### License

This project is licensed under the MIT License
