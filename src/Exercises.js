/* eslint-disable no-eval */

import compose from 'lodash/fp/compose';
import map from 'lodash/fp/map';
import join from 'lodash/fp/join';
import expect from 'expect';

const exercises = {
	'1': {
		id: '1',
		title: 'Using a function returned from another function',
		points: 10,
		display: `const greet = greeting => name => (greeting + " " + name);

const hello = greet(__INPUT__)

hello("Omar"); // "Hello Omar"`,
		givens: {
			greet: greeting => name => {
				return greeting + ' ' + name;
			},
		},
		assert: ({ greet, input }) => expect(greet(eval(input))('Omar')).toEqual('Hello Omar'),
	},
	'2': {
		id: '2',
		title: 'Calling a function returned from another function',
		points: 20,
		display: `const add = x => y => x + y;
const add1 = __INPUT__;

[1, 2, 3].map(add1) // [2, 3, 4]`,
		givens: {
			add: x => y => x + y,
		},
		assert: ({ add, input }) => expect([1, 2, 3].map(eval(input))).toEqual([2, 3, 4]),
	},
	'3': {
		id: '3',
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
				].map(eval(input)('id'))
			).toEqual([1, 2, 3]),
	},
	'4': {
		id: '4',
		title: 'Calling one function with the return value from another',
		points: 10,
		display: `const div = inner => \`<div>\${inner}</div>\`;

const h1 = __INPUT__

div(h1('Big Text!')); // <div><h1>Big Text!</h1></div>`,
		givens: {
			div: inner => `<div>${inner}</div>`,
		},
		assert: ({ div, input }) => expect(div(eval(input)('Big Text!'))).toEqual('<div><h1>Big Text!</h1></div>'),
	},
	'5': {
		id: '5',
		title: 'Mapping function returns into other functions manually',
		points: 20,
		givens: {
			ul: inner => `<ul>${inner}</ul>`,
			li: inner => `<li>${inner}</li>`,
		},
		display: `import map from 'lodash/fp/map';
const ul = inner => \`<ul>\${inner}</ul>\`;
const li = inner => \`<li>\${inner}</li>\`;

// kinda ugly, right?
const buildUl = items => ul(join('', map(__INPUT__)(items)));

buildUl(['item1', 'item2', 'item3']) // <ul><li>item1</li><li>item2</li><li>item3</li></ul>`,
		assert: ({ ul, li, buildUL, input }) =>
			expect(ul(join('', map(eval(input))(['item1', 'item2', 'item3'])))).toEqual(
				'<ul><li>item1</li><li>item2</li><li>item3</li></ul>'
			),
	},
	'6': {
		id: '6',
		title: 'Mapping function returns through compose (right to left)',
		points: 30,
		givens: {
			ul: inner => `<ul>${inner}</ul>`,
			li: inner => `<li>${inner}</li>`,
		},
		display: `import map from 'lodash/fp/map';
import compose from 'lodash/fp/compose';
const ul = inner => \`<ul>\${inner}</ul>\`;
const li = inner => \`<li>\${inner}</li>\`;

// ahh much better - args are passed into the right-most function first and returned to the next function
const buildUl = compose(ul, join(''), map(__INPUT__));

buildUl(['item1', 'item2', 'item3']) // <ul><li>item1</li><li>item2</li><li>item3</li></ul>`,
		assert: ({ ul, li, buildUL, input }) =>
			expect(compose(ul, join(''), map(eval(input)))(['item1', 'item2', 'item3'])).toEqual(
				'<ul><li>item1</li><li>item2</li><li>item3</li></ul>'
			),
	},
};

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
