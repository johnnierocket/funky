import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { atomDark } from 'react-syntax-highlighter/styles/prism';
import { createElement } from 'react-syntax-highlighter';

const customRenderer = ({ rows, stylesheet, useInlineStyles }) => {
	return rows.map((row, idx) => {
		return row.children.map((item, idx) => {
			if (item.children && item.children[0].value === '__INPUT__') {
				return <input key={idx} type="text" value="blah" />;
			}
			return createElement({
				node: item,
				stylesheet,
				useInlineStyles,
				key: idx,
			});
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
