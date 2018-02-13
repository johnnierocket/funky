import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { atomDark } from 'react-syntax-highlighter/styles/prism';
import { createElement } from 'react-syntax-highlighter';

const customRenderer = ({ rows, stylesheet, useInlineStyles }) => {
	return rows.map((row, idx) => {
		console.log(row, idx);
		// if __INPUT__, return an <input> tag, else:
		return createElement({
			node: rows[idx],
			stylesheet,
			useInlineStyles,
			key: idx,
		});
	});
};

export default ({ code }) => {
	return (
		<SyntaxHighlighter language="javascript" style={atomDark} renderer={customRenderer} showLineNumbers>
			{code}
		</SyntaxHighlighter>
	);
};
