import exercises from '../Exercises';

const validate = (exId, input) =>
	exercises[exId].assert({
		...exercises[exId].givens,
		input,
	});

it('1 Using a function returned from another function', () => {
	validate('1', '"Hello"');
});

it('2 Calling a function returned from another function', () => {
	validate('2', 'add(1)');
});

it('3 Returning a function from a function and mapping over values', () => {
	validate('3', 'prop => item => item[prop]');
});

it('4 Calling one function with the return value from another', () => {
	validate('4', 'inner => `<h1>${inner}</h1>`');
});

it('5 Currying map creates an interesting helpful function', () => {
	validate('5', 'toUpper');
});

it('6 Mapping function returns into other functions manually', () => {
	validate('6', 'li');
});

it('7 Introducing compose to put our items into <li>', () => {
	validate('7', 'map(li)');
});

it('8 Mapping function returns through compose (right to left)', () => {
	validate('8', "ul, join(''), map(li)");
});

it('9 Use a transformer to reduce a List into a Map', () => {
	validate('9', 'reducer, Map()');
});

it('10 Transform and Filter a List into a Map', () => {
	validate('10', 'match => match(key)');
});

it('11 Selecting values out of a Map', () => {
	validate('11', "['roles', 'teams']");
});

it('12 Selecting values out of a Map', () => {
	validate('12', 'onlyAdmin, flatten, getVals');
});
