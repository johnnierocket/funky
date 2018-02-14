import React, { Component } from 'react';
import exercises from './Exercises';
import styled from 'styled-components';
import CodeBlock from './components/CodeBlock';
import Instructions from './components/Instructions';
import ProgressBar from './components/ProgressBar';
import PointCounter from './components/PointCounter';
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
	state = {
		correctSubmissiion: false,
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.questionId !== nextProps.questionId) {
			this.setState({
				correctSubmission: false,
			});
		}
	}

	validateResponse = () => {
		const { questionId, actions } = this.props;
		const exercise = exercises[questionId];
		if (exercise.assert) {
			this.setState({
				correctSubmission: true,
			});
		}
		actions.submitCorrectResponse(exercise.points);
		// debugger;
		return exercise.assert;
	};

	render() {
		const { questionId, questionsCompleted, totalPoints, actions } = this.props;
		const { correctSubmission } = this.state;
		const exercise = exercises[questionId];
		const instructions = `#${questionId} ${exercise.title}`;
		const questionPreviouslyAnswered = questionsCompleted.includes(questionId);
		return (
			<Root>
				<ProgressBar progress={questionsCompleted.length / exercises.length} />
				<PointCounter points={totalPoints} />
				<h1>You are on Question {questionId}</h1>
				<Instructions text={instructions} />
				<CodeBlock code={exercise.display} />
				<button onClick={actions.previousQuestion} disabled={!(questionId - 1)}>
					Prev
				</button>
				<button onClick={this.validateResponse}>Attempt Answer</button>
				<button
					onClick={actions.nextQuestion}
					disabled={!questionPreviouslyAnswered || questionId === exercises.length}
				>
					Next
				</button>
				{correctSubmission && <h1>Correct!</h1>}
			</Root>
		);
	}
}

function mapStateToProps(state) {
	return {
		questionId: state.questionsReducer.questionId,
		questionsCompleted: state.questionsReducer.questionsCompleted,
		totalPoints: state.questionsReducer.totalPoints,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(QuestionActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
