import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { atomDark } from 'react-syntax-highlighter/styles/prism';

export default ({ code }) => (
	<SyntaxHighlighter language="javascript" style={atomDark} showLineNumbers>
		{code}
	</SyntaxHighlighter>
);
