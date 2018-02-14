import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { atomDark } from 'react-syntax-highlighter/styles/prism';
import { createElement } from 'react-syntax-highlighter';
import styled from 'styled-components';
import AutosizeInput from 'react-input-autosize';

const StyledAutosizeInput = styled(AutosizeInput)`
	input {
		background: transparent;
		outline: none;
		padding: 1px 5px;
		margin: 0 5px;
		border-radius: 5px;
		border: 1px solid #444444;
		font-size: 1rem;
		color: white;
		font-family: 'Fira Code';
		text-align: center;
	}
`;

export default class CustomSyntaxHighlighter extends Component {
	state = {
		input: '',
	};

	handleInput = e => {
		this.setState({
			input: e.target.value,
		});
	};

	customRenderer = ({ rows, stylesheet, useInlineStyles }) => {
		return rows.map((row, idx) => {
			return row.children.map((item, idx) => {
				if (item.children && item.children[0].value === '__INPUT__') {
					return (
						<StyledAutosizeInput
							autoFocus
							key={idx}
							type="text"
							onChange={this.handleInput}
							value={this.state.input}
							placeholder="???"
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
