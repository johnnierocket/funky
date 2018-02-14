import React, { Component } from 'react';
import exercises from './Exercises';
import styled from 'styled-components';
import CodeBlock from './components/CodeBlock';
import Instructions from './components/Instructions';
import LinearProgress from 'material-ui/LinearProgress';
import PointCounter from './components/PointCounter';
import * as QuestionActions from './actions/QuestionsActions';
import RaisedButton from 'material-ui/RaisedButton';

// import { initializeAndLogin } from './actions/FirebaseActions';

import { niceFormatJestError } from './helpers/JestHelpers';
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

const StyledLinearProgress = styled(LinearProgress)`
	margin-bottom: 40px !important;
`;

const style = {
	margin: 12,
};

class App extends Component {
	state = {
		correctSubmissiion: false,
		incorrectSubmission: false,
		input: '',
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.questionId !== nextProps.questionId) {
			this.setState({
				correctSubmission: false,
				incorrectSubmission: false,
			});
		}
	}

	onInputChange = e => {
		this.setState({ input: e.target.value });
	};

	validateResponse = () => {
		const { questionId, actions } = this.props;
		const { input } = this.state;
		const { assert, givens, points } = exercises[questionId];

		try {
			assert({ ...givens, input });
			this.setState({
				correctSubmission: true,
				incorrectSubmission: false,
				error: '',
			});
			actions.submitCorrectResponse(points);
		} catch (error) {
			this.setState({
				incorrectSubmission: true,
				error: niceFormatJestError(error),
			});
			actions.submitIncorrectResponse();
		}
	};

	previousQuestion = () => {
		this.setState({
			input: '',
		});
		this.props.actions.previousQuestion();
	};

	nextQuestion = () => {
		this.setState({
			input: '',
		});
		this.props.actions.nextQuestion();
	};

	render() {
		const { questionId, questionsCompleted, totalPoints } = this.props;
		const { correctSubmission, incorrectSubmission, input } = this.state;
		const exercise = exercises[questionId];
		const instructions = `#${questionId} ${exercise.title}`;
		const questionPreviouslyAnswered = questionsCompleted.includes(questionId);
		const progressPercent = questionsCompleted.length / Object.keys(exercises).length * 100;
		return (
			<Root>
				<StyledLinearProgress mode="determinate" value={progressPercent} />
				<PointCounter points={totalPoints} />
				<Instructions text={instructions} />
				<CodeBlock code={exercise.display} input={input} onChange={this.onInputChange} />
				<RaisedButton
					label="Go Back"
					style={style}
					onClick={this.previousQuestion}
					disabled={!(questionId - 1)}
				/>
				<RaisedButton
					label="Attempt Answer"
					style={style}
					primary={true}
					onClick={this.validateResponse}
					disabled={questionPreviouslyAnswered}
				/>
				<RaisedButton
					label="Next Question"
					style={style}
					secondary={true}
					onClick={this.nextQuestion}
					disabled={!questionPreviouslyAnswered || questionId === exercises.length}
				/>
				{correctSubmission && <h1>Correct!</h1>}
				{incorrectSubmission && <h1>Wrong, sir. You lose points.</h1>}
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
