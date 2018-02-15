import React, { Component } from 'react';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import introRecord from '../images/introRecord.png';

const ContentWrapper = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	width: 100%;
	text-align: center;
	transform: translate(-50%, -50%);
`;

const Title = styled.div`
	font-family: 'Shrikhand', cursive;
	font-size: 2rem;
	color: #333;
	text-transform: uppercase;
`;

const StyledImg = styled.img`
	margin: 50px auto;
	display: block;
	max-width: 440px;
`;

const StyledRaisedButton = styled(RaisedButton)`
	margin: 0 auto;
	display: flex !important;
	font-family: 'Righteous', cursive;
`;

export default class ContentContainer extends Component {
	render() {
		return (
			<ContentWrapper>
				<Title>Are you ready for some composition?</Title>
				<StyledImg src={introRecord} alt="record" />
				{this.props.loggedIn ? (
					<StyledRaisedButton
						label="Let's Get It Poppin'!"
						backgroundColor="#6cc93d"
						labelColor="#ffffff"
						onClick={this.props.startGame}
						style={{ width: '250px' }}
					/>
				) : (
					<StyledRaisedButton
						label="Login with Github to Continue"
						backgroundColor="#6cc93d"
						labelColor="#ffffff"
						onClick={this.props.login}
						style={{ width: '320px' }}
					/>
				)}
			</ContentWrapper>
		);
	}
}
