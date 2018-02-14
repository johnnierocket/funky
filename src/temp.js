import { compose } from 'lodash-fp';

// returning a function from a function

const greet = greeting => name => {
	console.log(greeting + name);
};

const hello = greet(___);

// such that: hello("Bart") returns "Hello Bart";

expect(hello('Bart')).toEqual('Hello Bart');

// returning a function from a function full definition
const add = x => y => x + y;

const add1 = ___;

[1, 2, 3].map(add1); // [2, 3, 4]

// returning a function from a function and mapping
const getField = ___;

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
].map(getField('id'));

// [1, 2, 3]

// calling one function with the return value from another
const div = inner => `<div>${inner}</div>`;

const h1 = inner => __INPUT__;

div(h1('Big Text!')); // <div><h1>Big Text!</h1></div>

// mapping function returns into other functions manually
import { map } from 'lodash-fp';
const ul = inner => `<ul>${inner}</ul>`;
const li = inner => `<li>${inner}</li>`;

const buildUl = items => ul(map(__INPUT__)(items));

buildUl(['item1', 'item2', 'item3']); // <ul><li>item1</li><li>item2</li><li>item3</li></ul>

// mapping function returns using compose (right to left)
import { map, compose } from 'lodash-fp';
const ul = inner => `<ul>${inner}</ul>`;
const li = inner => `<li>${inner}</li>`;

const buildUl = compose(ul, map(__INPUT__));

buildUl(['item1', 'item2', 'item3']); // <ul><li>item1</li><li>item2</li><li>item3</li></ul>
