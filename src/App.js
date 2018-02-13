import React, { Component } from 'react';
import exercises from './Exercises';
import styled from 'styled-components';
import CodeBlock from './components/CodeBlock';
import Instructions from './components/Instructions';
// import { initializeAndLogin } from './actions/FirebaseActions';
import * as QuestionActions from './actions/QuestionsActions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const Root = styled.div`
	width: 50%;
	min-width: 800px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

class App extends Component {
	render() {
		const { questionId, actions } = this.props;
		const exercise = exercises.find(ex => ex.id === questionId);
		const instructions = `#${questionId} ${exercise.title}`;
		return (
			<Root>
				<Instructions text={instructions} />
				<CodeBlock code={exercise.display} />
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
