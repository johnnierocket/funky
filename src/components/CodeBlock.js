import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { atomDark } from 'react-syntax-highlighter/styles/prism';
import { createElement } from 'react-syntax-highlighter';
import styled from 'styled-components';
import AutosizeInput from 'react-input-autosize';
import { string, func } from 'prop-types';

const StyledAutosizeInput = styled(AutosizeInput)`
	input {
		background: transparent;
		outline: none;
		padding: 1px 5px;
		margin: 0 5px;
		border-radius: 5px;
		border: 1px solid orange;
		font-size: 1rem;
		color: white;
		font-family: 'Fira Code';
		text-align: center;
	}
`;

export default class CustomSyntaxHighlighter extends Component {
	static displayName = 'CustomSyntaxHighlighter';

	static propTypes = {
		code: string,
		onChange: func,
		input: string,
	};

	customRenderer = ({ rows, stylesheet, useInlineStyles }) => {
		return rows.map((row, idx) => {
			return row.children.map((item, idx) => {
				if (item.children && item.children[0].value.trim() === '__INPUT__') {
					return (
						<StyledAutosizeInput
							autoFocus
							key={idx}
							type="text"
							onChange={this.props.onChange}
							value={this.props.input}
							placeholder="..."
						/>
					);
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

	render() {
		return (
			<SyntaxHighlighter language="javascript" style={atomDark} renderer={this.customRenderer} showLineNumbers>
				{this.props.code}
			</SyntaxHighlighter>
		);
	}
}
