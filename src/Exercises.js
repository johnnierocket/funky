/* eslint-disable no-eval */

import compose from 'lodash/fp/compose';
import join from 'lodash/fp/join';
import expect from 'expect';
import toUpper from 'lodash/fp/toUpper';
import { at, isEqual, some, reduce, set, map, flatten, filter } from 'mudash/fp';
import { Map, List, fromJS } from 'immutable';

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
	'9': {
		id: '9',
		title: 'Use a transformer to reduce a List into a Map',
		points: 20,
		givens: {
			reduce,
			set,
			List,
			Map,
			reducer: (map, key) => set(key, true, map),
			items: List(['admin', 'writer', 'approver']),
		},
		display: `import { Map, List } from 'immutable';
import { reduce, set } from 'mudash/fp';

const items = List(['admin', 'writer', 'approver']);

// 'set' takes the arguments: (path, value, data) and is curried by default
// if given only a path and value it will return a function that always set
// the same path and value to whatever collection is given
const reducer = (map, key) => set(key, true, map);

reduce(__INPUT__)(items);
// Map({ admin: true, writer: true, approver: true })`,
		assert: ({ reduce, reducer, Map, items, input }) =>
			expect(eval(`reduce(${input})(items)`)).toEqual(Map({ admin: true, writer: true, approver: true })),
	},
	'10': {
		id: '10',
		title: 'Transform and Filter a List into a Map',
		points: 40,
		givens: {
			List,
			Map,
			reduce,
			set,
			some,
			map,
			matchers: map(isEqual, List(['admin', 'approver'])),
			items: List(['admin', 'writer', 'approver']),
		},
		display: `import { map, some, isEqual reduce } from 'mudash/fp';
import { Map, List } from 'immutable';

const items = List(['admin', 'writer', 'approver']);

// isEqual compares two arguments and is curried by default
const matchers = map(isEqual, List(['admin', 'approver']));

const isEnabled = key => some(__INPUT__, matchers);

reduce((obj, key) => set(key, isEnabled(key), obj), Map(), items);
// Map({ admin: true, writer: false, approver: true })`,
		assert: ({ input, some, reduce, Map, items, matchers, set }) =>
			expect(
				eval(`reduce((obj, key) => set(key, (key => some(${input}, matchers))(key), obj), Map(), items)`)
			).toEqual(Map({ admin: true, writer: false, approver: true })),
	},
	'11': {
		id: '11',
		title: '11 Selecting values out of a Map',
		points: 10,
		givens: {
			at,
			data: fromJS({
				name: 'Bart',
				roles: ['admin', 'writer'],
				teams: ['customer', 'internal'],
			}),
		},
		display: `import { at } from 'mudash/fp';
import { fromJS } from 'immutable';

const data = fromJS({
	name: 'Bart',
	roles: ['admin', 'writer'],
	teams: ['customer', 'internal']
});

// 'at' takes a list of lookup paths and returns a list of the results

at(__INPUT__)(data);
// List([List(['admin', 'writer']), List(['customer', 'internal'])])`,
		assert: ({ input, at, data }) =>
			expect(at(eval(input))(data)).toEqual(List([List(['admin', 'writer']), List(['customer', 'internal'])])),
	},
	'12': {
		id: '12',
		title: '',
		points: 50,
		givens: {
			compose,
			flatten,
			data: fromJS({
				name: 'Bart',
				roles: ['admin', 'writer'],
				teams: ['customer', 'internal'],
			}),
			getVals: at(['roles', 'teams']),
			onlyAdmin: filter(isEqual('admin')),
		},
		display: `import { fromJS } from 'immutable';
import { at, isEqual, flatten, filter } from 'mudash/fp';

const data = fromJS({
	name: 'Bart',
	roles: ['admin', 'writer'],
	teams: ['customer', 'internal']
});

const getVals = at(['roles', 'teams']);
const onlyAdmin = filter(isEqual('admin'));

// 'flatten' is available which takes a single argument of List and
// returns sub-lists flattened into the out list
// Hint: you do not need to create any new functions

compose(__INPUT__)(data); // List(['admin'])`,
		assert: ({ input, flatten, data, onlyAdmin, getVals, compose }) =>
			expect(eval(`compose(${input})(data)`)).toEqual(List(['admin'])),
	},
};

export default exercises;
