import React, { Component } from 'react';
import exercises from './Exercises';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';
import * as QuestionActions from './actions/QuestionsActions';
import { initializeAndLogin } from './actions/FirebaseActions';
import Header from './components/Header';
import ContentContainer from './components/ContentContainer';
import StartingContainer from './components/StartingContainer';
import Progress from './components/Progress';
import bg from './images/bg.svg';
import moment from 'moment';
import { connect } from 'react-redux';
import { getLoggedIn, getUserName, getAvatarUrl, getQuestionsCompleted } from './selectors';

injectGlobal`
	html {
		height: 100%;
	}
	body {
		background-image: url(${bg});
		background-size: cover;
		background-position: center center;
		height: 100%;
	}
`;

const Root = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	background-size: cover;
	height: 100vh;
	width: 100vw;
	min-width: 1250px;
	overflow-x: hidden;
	overflow-y: scroll;
`;

class App extends Component {
	state = {
		startingScreen: true,
	};

	startGame = () => {
		this.props.setStartTime(moment());
		this.setState({
			startingScreen: false,
		});
	};

	render() {
		const { loggedIn, questionsCompleted, avatarUrl, login, userName } = this.props;
		const { startingScreen } = this.state;

		return (
			<Root>
				<Header loggedIn={loggedIn} avatarUrl={avatarUrl} login={login} userName={userName} />
				{!startingScreen && <Progress questionsCompleted={questionsCompleted} exercises={exercises} />}
				{startingScreen ? (
					<StartingContainer login={login} loggedIn={loggedIn} startGame={this.startGame} />
				) : (
					<ContentContainer />
				)}
			</Root>
		);
	}
}

const selectors = createStructuredSelector({
	loggedIn: getLoggedIn,
	userName: getUserName,
	avatarUrl: getAvatarUrl,
	questionsCompleted: getQuestionsCompleted,
});

const actions = {
	...QuestionActions,
	login: initializeAndLogin,
};

const withRedux = connect(selectors, actions);

export default withRouter(withRedux(App));
