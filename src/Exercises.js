const exercises = [
	{
		id: 1,
		title: 'Using a function returned from another function',
		points: 10,
		display: `const greet = greeting => name => {
	console.log(greeting + name);
}

const hello = greet(__INPUT__)

hello("Omar"); // "Hello Omar"`,
		givens: {
			greet: greeting => name => {
				return greeting + name;
			},
		},
		assert: ({ greet, input }) =>
			expect(greet(input)).toEqual('Hello Bart'),
	},
	{
		id: 2,
		title: 'Calling a function returned from another function',
		points: 20,
		display: `const add = x => y => x + y;
const add1 = __INPUT__;

[1, 2, 3].map(add1) // [2, 3, 4]`,
		givens: {
			add: x => y => x + y,
		},
		assert: ({ input }) => expect([1, 2, 3].map(input)).toEqual([2, 3, 4]),
	},
	{
		id: 3,
		title: 'Returning a function from a function and mapping over values',
		points: 30,
		display: `
      const getField = __INPUT__;

      [{
        id: 1,
        name: 'Johnnie'
      }, {
        id: 2,
        name: 'Omar'
      }, {
        id: 3,
        name: 'Brad'
      }].map(getField('id')); // [1, 2, 3]
    `,
		givens: {},
		assert: ({ input }) =>
			expect(
				[
					{
						id: 1,
						name: 'Johnnie',
					},
					{
						id: 2,
						name: 'Omar',
					},
					{
						id: 3,
						name: 'Brad',
					},
				].map(input('id'))
			).toEqual([1, 2, 3]),
	},
];

export default exercises;

/*
  Usage

  const validate = exercise => input => {
    return exercise.assert({ ...exercise.givens, input });
  }

  const Question = ({ exercise }) => {
    return (<pre>{exercise.display}</pre>);
  }
*/
