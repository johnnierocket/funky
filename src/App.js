import React, { Component } from 'react';
import exercises from './Exercises';
import styled, { injectGlobal } from 'styled-components';
import * as QuestionActions from './actions/QuestionsActions';
import { loggedIn, userName, userAvatarUrl } from './reducers/index';
import { initializeAndLogin } from './actions/FirebaseActions';
import Header from './components/Header';
import ContentContainer from './components/ContentContainer';
import Progress from './components/Progress';
import bg from './images/bg.svg';
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
`;

class App extends Component {
	render() {
		const { loggedIn, questionsCompleted, avatarUrl, login, userName } = this.props;

		return (
			<Root>
				<Header loggedIn={loggedIn} avatarUrl={avatarUrl} login={login} userName={userName} />
				<Progress questionsCompleted={questionsCompleted} exercises={exercises} />
				{/* <PointCounter points={totalPoints} /> */}

				<ContentContainer />
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
