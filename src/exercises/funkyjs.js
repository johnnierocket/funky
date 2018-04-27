/* eslint-disable no-eval */

import compose from 'lodash/fp/compose';
import join from 'lodash/fp/join';
import expect from 'expect';
import toUpper from 'lodash/fp/toUpper';
import map from 'lodash/fp/map';
import { Map, List, fromJS, set, get } from 'immutable';

const greet = greeting => name => {
	return greeting + ' ' + name;
};
const add = x => y => x + y;
const div = inner => `<div>${inner}</div>`;
const ul = inner => `<ul>${inner}</ul>`;
const li = inner => `<li>${inner}</li>`;

const funkyjs = {
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
			set,
			Map,
			reducer: (map, key) => set(map, key, true),
			items: List(['admin', 'writer', 'approver']),
		},
		display: `import { Map, List, set } from 'immutable';

const items = List(['admin', 'writer', 'approver']);

// sometimes you might want to convert a List into a Map for quick lookup
// this is a perfect fit for using a reducer!
const reducer = (map, key) => set(map, key, true);

items.reduce(__INPUT__); // Map({ admin: true, writer: true, approver: true })`,
		assert: ({ reducer, items, input, Map }) =>
			expect(eval(`items.reduce(${input})`)).toEqual(Map({ admin: true, writer: true, approver: true })),
	},
	'10': {
		id: '10',
		title: 'Transform and Filter a List into a Map',
		points: 40,
		givens: {
			List,
			Map,
			items: List(['admin', 'writer', 'approver']),
		},
		display: `import { Map } from 'immutable';

const items = List(['admin', 'writer', 'approver']);

const match = __INPUT__;

// using tacit argument passing we can invoke the function
// that match returns against the current item
items.map(match('admin')); // List([ true, false, false ])
`,
		assert: ({ items, input }) => expect(items.map(eval(input)('admin'))).toEqual(List([true, false, false])),
	},
	'11': {
		id: '11',
		title: 'Transform and Filter a List into a Map',
		points: 40,
		givens: {
			List,
			Map,
			enabledItems: List(['admin', 'writer', 'manager']),
			items: List(['admin', 'writer', 'approver']),
			match: a => b => a === b,
		},
		display: `import { Map, List, set } from 'immutable';

const items = List(['admin', 'approver', 'writer']);
const enabledItems = List(['admin', 'writer', 'manager']);
const match = a => b => a === b;

// by binding match to the given key we can check if
// some of the enabled items match that key
const isEnabled = key => enabledItems.some(__INPUT__);

const reducer = (obj, key) => set(obj, key, isEnabled(key));

items.reduce(reducer, Map()); // Map({ admin: true, approver: false, writer: true })`,
		assert: ({ items, input, enabledItems, match, Map }) => {
			const isEnabled = key => enabledItems.some(eval(input));
			expect(items.reduce((obj, key) => set(obj, key, isEnabled(key)), Map())).toEqual(
				Map({ admin: true, approver: false, writer: true })
			);
		},
	},
	'12': {
		id: '12',
		title: 'Selecting values out of a Map',
		points: 10,
		givens: {
			get,
			data: fromJS({
				name: 'Bart',
				roles: ['admin', 'writer'],
				teams: ['customer', 'internal'],
			}),
			flatMap: (arr, pred) => List(arr).flatMap(pred),
		},
		display: `import { fromJS, get } from 'immutable';

const flatMap = (arr, pred) => List(arr).flatMap(pred);

const data = fromJS({
	name: 'Bart',
	roles: ['admin', 'writer'],
	teams: ['customer', 'internal']
});

// 'at' takes a list of lookup paths and returns a flattened result List
const at = paths => obj => flatMap(__INPUT__);

at(['roles','teams'])(data); // List(['admin', 'writer', 'customer', 'internal'])`,
		assert: ({ input, data, flatMap, get }) => {
			const at = paths => obj => eval(`flatMap(${input})`);
			expect(at(['roles', 'teams'])(data)).toEqual(List(['admin', 'writer', 'customer', 'internal']));
		},
	},
	'13': {
		id: '13',
		title: 'Selecting values out of a Map',
		points: 50,
		givens: {
			compose,
			data: fromJS({
				name: 'Bart',
				roles: ['admin', 'writer'],
				teams: ['customer', 'internal'],
			}),
			at: paths => obj => List(paths).flatMap(path => get(obj, path)),
			onlyAdmin: items => items.filter(item => item === 'admin'),
		},
		display: `import { fromJS, get, List } from 'immutable';
import compose from 'lodash/fp/compose';

const match = a => b => a === b;
const at = paths => obj => List(paths).flatMap(path => get(obj, path));
const onlyAdmin = items => items.filter(match('admin'));

const data = fromJS({
	name: 'Bart',
	roles: ['admin', 'writer'],
	teams: ['customer', 'internal']
});

// using only the functions defined above we can build a flattened list of roles from the data
const doFilter = compose(__INPUT__);

doFilter(data); // List(['admin'])`,
		assert: ({ input, onlyAdmin, at, data, compose }) => {
			expect(eval(`compose(${input})`)(data)).toEqual(List(['admin']));
		},
	},
};

export default funkyjs;
