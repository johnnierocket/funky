/* eslint-disable no-eval */
import expect from 'expect';

const munkyjs = {
	'1': {
		id: '1',
		title: 'Am I dumb?',
		points: 10,
		display: `console.log(__INPUT__);`,
		assert: () => expect(true).toEqual(true),
	},
};

export default munkyjs;
