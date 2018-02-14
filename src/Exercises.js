/* eslint-disable no-eval */

import compose from 'lodash/fp/compose';
import map from 'lodash/fp/map';
import join from 'lodash/fp/join';
import expect from 'expect';
import toUpper from 'lodash/fp/toUpper';

const greet = greeting => name => {
	return greeting + ' ' + name;
};
const add = x => y => x + y;
const div = inner => `<div>${inner}</div>`;
const ul = inner => `<ul>${inner}</ul>`;
const li = inner => `<li>${inner}</li>`;

const exercises = {
	'1': {
		id: '1',
		title: 'Using a function returned from another function',
		points: 10,
		display: `const greet = greeting => name => (greeting + " " + name);

const hello = greet(__INPUT__)

hello("Omar"); // "Hello Omar"`,
		givens: { greet },
		assert: ({ greet, input }) => expect(greet(eval(input))('Omar')).toEqual('Hello Omar'),
	},
	'2': {
		id: '2',
		title: 'Calling a function returned from another function',
		points: 20,
		display: `const add = x => y => x + y;
const add1 = __INPUT__;

[1, 2, 3].map(add1) // [2, 3, 4]`,
		givens: { add },
		assert: ({ add, input }) => expect([1, 2, 3].map(eval(input))).toEqual([2, 3, 4]),
	},
	'3': {
		id: '3',
		title: 'Returning a function from a function and mapping over values',
		points: 30,
		display: `const getField = __INPUT__;

[{
	id: 1,
	name: 'Johnnie'
}, {
	id: 2,
	name: 'Omar'
}, {
	id: 3,
	name: 'Brad'
}].map(getField('id')); // [1, 2, 3]`,
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
		givens: { div },
		assert: ({ div, input }) => expect(div(eval(input)('Big Text!'))).toEqual('<div><h1>Big Text!</h1></div>'),
	},
	'5': {
		id: '5',
		title: 'Currying map creates an interesting helper function',
		points: 20,
		givens: {
			toUpper,
			map,
		},
		display: `import map from 'lodash/fp/map';
import toUpper from 'lodash/fp/toUpper';

const arrayToUpper = map(__INPUT__);

arrayToUpper(['item1','item2','item3']); // ['ITEM1', 'ITEM2', 'ITEM3']`,
		assert: ({ toUpper, map, input }) =>
			expect(map(eval(input))(['item1', 'item2', 'item3'])).toEqual(['ITEM1', 'ITEM2', 'ITEM3']),
	},
	'6': {
		id: '6',
		title: 'Mapping function returns into other functions manually',
		points: 30,
		givens: {
			ul,
			li,
		},
		display: `import map from 'lodash/fp/map';
import join from 'lodash/fp/join';

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
	'7': {
		id: '7',
		title: 'Introducing compose to put our items into <li>',
		points: 20,
		givens: {
			map,
			compose,
			join,
			li,
		},
		display: `import map from 'lodash/fp/map';
import compose from 'lodash/fp/compose';
import join from 'lodash/fp/join';

const li = inner => \`<li>\${inner}</li>\`;

// compose will pass the args into the right-most function first, 
// execute it, and then pass the return value into the next function 
// and so on moving right to left
const buildList = compose(join(''), __INPUT__);
		
buildList(['item1','item2','item3']); // '<li>item1</li><li>item2</li><li>item3</li>'`,
		assert: ({ compose, li, map, input }) =>
			expect(compose(join(''), eval(input))(['item1', 'item2', 'item3'])).toEqual(
				'<li>item1</li><li>item2</li><li>item3</li>'
			),
	},
	'8': {
		id: '8',
		title: 'Mapping function returns through compose (right to left)',
		points: 40,
		givens: {
			ul,
			li,
			compose,
			join,
			map,
		},
		display: `import map from 'lodash/fp/map';
import compose from 'lodash/fp/compose';
import join from 'lodash/fp/join';

const ul = inner => \`<ul>\${inner}</ul>\`;
const li = inner => \`<li>\${inner}</li>\`;

// compose will pass the args into the right-most function first, 
// execute it, and then pass the return value into the next function 
// and so on moving right to left
const buildUl = compose(__INPUT__);

buildUl(['item1', 'item2', 'item3']) // <ul><li>item1</li><li>item2</li><li>item3</li></ul>`,
		assert: ({ ul, li, compose, join, map, input }) =>
			expect(eval(`compose(${input})`)(['item1', 'item2', 'item3'])).toEqual(
				'<ul><li>item1</li><li>item2</li><li>item3</li></ul>'
			),
	},
};

export default exercises;
