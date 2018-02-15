import React, { Component } from 'react';
import exercises from './Exercises';
import styled, { injectGlobal } from 'styled-components';
import * as QuestionActions from './actions/QuestionsActions';
import { loggedIn, userName, userAvatarUrl } from './reducers/index';
import { initializeAndLogin } from './actions/FirebaseActions';
import Header from './components/Header';
import ContentContainer from './components/ContentContainer';
import StartingContainer from './components/StartingContainer';
import Progress from './components/Progress';
import bg from './images/bg.svg';
import moment from 'moment';
import { connect } from 'react-redux';

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
	overflow: hidden;
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

function mapStateToProps(state) {
	return {
		loggedIn: loggedIn(state),
		userName: userName(state),
		avatarUrl: userAvatarUrl(state),
		questionsCompleted: state.questionsReducer.questionsCompleted,
	};
}

export default connect(mapStateToProps, {
	...QuestionActions,
	login: initializeAndLogin,
})(App);
