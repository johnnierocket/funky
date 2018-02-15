import React, { Component } from 'react';
import exercises from './Exercises';
import styled from 'styled-components';
import * as QuestionActions from './actions/QuestionsActions';
import { loggedIn, userName, userAvatarUrl } from './reducers/index';
import { initializeAndLogin } from './actions/FirebaseActions';
import Header from './components/Header';
import Login from './components/Login';
import ContentContainer from './components/ContentContainer';
import Progress from './components/Progress';
import { connect } from 'react-redux';

const Root = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
`;

class App extends Component {
	state = {
		correctSubmission: false,
		input: '',
		error: '',
		next: false,
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.questionId !== nextProps.questionId) {
			this.setState({
				correctSubmission: false,
				input: nextProps.questionsInputs[nextProps.questionId] || '',
				next: true,
			});
		}
	}

	render() {
		const { loggedIn, questionsCompleted, avatarUrl, login, userName } = this.props;

		return (
			<Root>
				<Header />
				<Progress questionsCompleted={questionsCompleted} exercises={exercises} />
				{/* <PointCounter points={totalPoints} /> */}
				<Login loggedIn={loggedIn} login={login} userName={userName} avatarUrl={avatarUrl} />
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
