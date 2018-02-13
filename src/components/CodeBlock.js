import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { atomDark } from 'react-syntax-highlighter/styles/prism';
import { createElement } from 'react-syntax-highlighter';
import styled from 'styled-components';

const StyledInput = styled.input`
	background: transparent;
	color: white;
	font-size: 1rem;
	border 1px solid white;
	border-radius: 5px;
	margin: 0 5px;
	padding: 1px 5px;
	outline: none;
`;

const customRenderer = ({ rows, stylesheet, useInlineStyles }) => {
	return rows.map((row, idx) => {
		return row.children.map((item, idx) => {
			if (item.children && item.children[0].value === '__INPUT__') {
				return <StyledInput key={idx} type="text" placeholder="?" size="" />;
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
