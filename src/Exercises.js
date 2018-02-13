const exercises = [
	{
		title: '',
		points: 10,
		display: `
      Given
      const greet = greeting => name => {
        console.log(greeting + name);
      }
      
      const hello = greet(__INPUT__)
      
      hello("Omar"); // "Hello Omar"
    `,
		givens: {
			greet: greeting => name => {
				return greeting + name;
			},
		},
		assert: ({ greet, input }) =>
			expect(greet(input)).toEqual('Hello Bart'),
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
