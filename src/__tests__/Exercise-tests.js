import exercises from '../Exercises';

it('1 Using a function returned from another function', () => {
	const exercise = exercises['1'];
	exercise.assert({ ...exercise.givens, input: '"Hello"' });
});

it('2 Calling a function returned from another function', () => {
	const exercise = exercises['2'];
	exercise.assert({ ...exercise.givens, input: 'add(1)' });
});

it('3 Returning a function from a function and mapping over values', () => {
	const exercise = exercises['3'];
	exercise.assert({
		...exercise.givens,
		input: 'field => item => item[field]',
	});
});

it('4 Calling one function with the return value from another', () => {
	const exercise = exercises['4'];
	exercise.assert({
		...exercise.givens,
		input: 'inner => `<h1>${inner}</h1>`',
	});
});

it('5 Mapping function returns into other functions manually', () => {
	const exercise = exercises['5'];
	exercise.assert({
		...exercise.givens,
		input: 'li',
	});
});

it('6 Mapping function returns through compose (right to left)', () => {
	const exercise = exercises['6'];
	exercise.assert({
		...exercise.givens,
		input: 'li',
	});
});
