import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { getLoggedIn } from '../selectors';
import Modules from '../Modules';
import funky from '../images/logos/funky.png';

const StyledImg = styled.img`
	width: auto;
	height: 200px;
	-webkit-transform-origin-x: right;
	-webkit-transform-origin-y: bottom;
	transition: transform 0.25s linear 0s;
	padding: 1em;
`;

const Link = styled.button`
	padding: 10px 5px;
	margin: auto 4px;
	background-color: #fff;
	border: 2px solid #b0a5a5;
	border-radius: 3%;
	outline: none;
	flex-basis: 300px;
	text-transform: uppercase;
	flex: 2;
	font-size: 16px;
	color: #b0a5a5;
`;

const PlayButton = Link.extend`
	flex-basis: 150px;
	background-color: #69c94b;
	border: 2px solid #69c94b;
	color: #fff;
	flex: 1;
`;

const LessonsContainer = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
`;

const LessonBox = styled.div`
	font-family: 'Righteous', cursive;
	flex: 1;
	width: 300px;
	height: 400px;
	margin: 5em 2em;
	background-color: #fff;
	box-shadow: 2px 4px 2px #b0a5a5;
	max-width: 300px;
	padding: 1em;
`;

const ButtonGroup = styled.div`
	display: flex;
	justify-content: center;
	flex-flow: row wrap;
`;

const Title = styled.span`
	font-family: 'Righteous', cursive;
	font-size: 24px;
	text-align: center;
	padding: 1em 0;
	width: 100%;
`;

const Module = ({ moduleId, moduleName, handlePlay, showLeaderboard, logoName }) => (
	<LessonBox>
		<ButtonGroup>
			<StyledImg src={funky} alt="record" />
			<Title>{moduleName}</Title>
			<Link onClick={showLeaderboard}>
				<i class="fas fa-trophy" style={{ color: '##9B9B9B' }} /> Leaders
			</Link>
			<PlayButton onClick={handlePlay}>
				<i class="fas fa-play-circle" /> Play
			</PlayButton>
		</ButtonGroup>
	</LessonBox>
);

class Home extends Component {
	static propTypes = {
		// react-router
		history: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		match: PropTypes.object.isRequired,
		// selectors
		loggedIn: PropTypes.bool.isRequired,
	};

	componentDidMount() {
		const { loggedIn, history } = this.props;
		!loggedIn && history.push('/login');
	}

	handlePlay = id => {
		this.props.history.push(`/module/${id}/gameplay`);
	};

	showLeaderboard = id => {
		this.props.history.push(`/module/${id}/leaderboard`);
	};

	render() {
		return (
			<div>
				<LessonsContainer>
					{Object.keys(Modules).map(id => (
						<Module
							key={id}
							moduleId={id}
							moduleName={Modules[id].moduleName}
							handlePlay={this.handlePlay.bind(this, id)}
							showLeaderboard={this.showLeaderboard.bind(this, id)}
							logoName={Modules[id].logoName}
						/>
					))}
				</LessonsContainer>
			</div>
		);
	}
}

const selectors = createStructuredSelector({
	loggedIn: getLoggedIn,
});

const withRedux = connect(selectors);

export default withRouter(withRedux(Home));
