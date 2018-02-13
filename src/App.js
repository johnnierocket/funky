import React, { Component } from 'react';
import styled from 'styled-components';
// import logo from './logo.svg';
import { initializeAndLogin } from './actions/FirebaseActions';
import * as QuestionActions from './actions/QuestionsActions';
import exercises from './Exercises';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Root = styled.div`
	color: #cc0000;
	font-family: Lato, sans-serif;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

class App extends Component {
	render() {
		const { questionId, actions } = this.props;
		const question = exercises.find(ex => ex.id === questionId);
		return (
			<Root>
				<h1>You are on Question {questionId}</h1>
				<div>{question.display}</div>
				<button onClick={actions.previousQuestion}>Prev</button>
				<button onClick={actions.nextQuestion}>Next</button>
			</Root>
		);
	}
}

function mapStateToProps(state) {
	return {
		questionId: state.questionsReducer.questionId,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(QuestionActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
