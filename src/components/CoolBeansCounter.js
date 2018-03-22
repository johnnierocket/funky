import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getTotalPoints } from '../selectors';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: 10px;
`;

const Points = styled.div`
	padding: 1px 10px;
	background: white;
	border: 1px solid #666;
	font-family: 'Shrikhand', sans-serif;
	color: #6abcfb;
	font-size: 2rem;
	margin-bottom: 4px;
`;

const Text = styled.div`
	font-family: 'Righteous', sans-serif;
	text-transform: uppercase;
	font-size: 0.9rem;
`;

const selectors = createStructuredSelector({
	totalPoints: getTotalPoints,
});

class CoolBeansCounter extends Component {
	static PropTypes = {
		totalPoints: PropTypes.number,
	};

	render() {
		const { totalPoints } = this.props;
		return (
			<Wrapper>
				<Points>{totalPoints}</Points>
				<Text>Cool Beans!</Text>
			</Wrapper>
		);
	}
}

export default connect(selectors)(CoolBeansCounter);
