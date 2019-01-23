import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { getLoggedIn, getQuestionsState } from '../selectors';
import Modules from '../Modules';
import exercises from '../exercises';
import funky from '../images/logos/funky.png';
import { ensureUserLoggedIn } from '../actions/QuestionsActions';

const StyledImg = styled.img`
	width: auto;
	height: 200px;
	-webkit-transform-origin-x: right;
	-webkit-transform-origin-y: bottom;
	transition: transform 0.25s linear 0s;
	padding: 1em;
`;

const LeaderButton = styled.button`
	padding: 10px 5px;
	font-family: 'Righteous', sans-serif;
	border: none;
	background: none;
	outline: none;
	text-transform: uppercase;
	font-size: 16px;
	color: #6abcfb;
	cursor: pointer;

	&:hover {
		color: #000;
	}
`;

const AnsweredQuestions = styled.div`
	margin-left: auto;
	font-size: 20px;
	color: #ff4081;
	font-family: 'Shrikhand', sans-serif;
	letter-spacing: 2px;
`;

const PlayButton = LeaderButton.extend`
	color: #69c94b;
	margin-right: auto;
`;

const LessonsContainer = styled.div`
	display: flex;
	flex-flow: row wrap;
	margin: auto;
	width: 100%;
`;

const LessonBox = styled.div`
	font-family: 'Righteous', cursive;
	flex: 1;
	width: 300px;
	margin: 5em 2em;
	background-color: #fafafa;
	box-shadow: 0 0 20px #b0a5a5;
	max-width: 300px;
	padding: 1em;
	border-radius: 10px;
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

const getObjectSize = obj => {
	let size = 0;
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};

const Module = ({ moduleId, moduleName, handlePlay, showLeaderboard, logoName, totalQuestions, questionsAnswered }) => (
	<LessonBox>
		<ButtonGroup>
			<AnsweredQuestions>
				{questionsAnswered}/{totalQuestions}
			</AnsweredQuestions>
			<StyledImg src={funky} alt="record" />
			<Title>{moduleName}</Title>
			<PlayButton onClick={handlePlay}>
				<i className="fas fa-play-circle" /> Play
			</PlayButton>
			<LeaderButton onClick={showLeaderboard}>
				<i className="fas fa-trophy" style={{ color: '##9B9B9B' }} /> Leaders
			</LeaderButton>
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
		this.ensureLoggedIn();
	}

	componentDidUpdate() {
		this.ensureLoggedIn();
	}

	ensureLoggedIn = () => {
		const { ensureUserLoggedIn, history } = this.props;
		ensureUserLoggedIn(history);
	};

	handlePlay = id => {
		this.props.history.push(`/module/${id}/gameplay`);
	};

	showLeaderboard = id => {
		this.props.history.push(`/module/${id}/leaderboard`);
	};

	render() {
		const { questionsState } = this.props;
		return (
			<div>
				<LessonsContainer>
					{Object.keys(Modules).map(id => {
						const questionsAnswered = questionsState.getIn([id, 'questionsCompleted']).size;
						return (
							<Module
								key={id}
								moduleId={id}
								moduleName={Modules[id].moduleName}
								handlePlay={this.handlePlay.bind(this, id)}
								showLeaderboard={this.showLeaderboard.bind(this, id)}
								logoName={Modules[id].logoName}
								questionsAnswered={questionsAnswered}
								totalQuestions={getObjectSize(exercises[id])}
							/>
						);
					})}
				</LessonsContainer>
			</div>
		);
	}
}

const selectors = createStructuredSelector({
	loggedIn: getLoggedIn,
	questionsState: getQuestionsState,
});

const actions = {
	ensureUserLoggedIn,
};

const withRedux = connect(selectors, actions);

export default withRouter(withRedux(Home));
