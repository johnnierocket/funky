import React, { Component } from 'react';
import exercises from '../Exercises';
import styled from 'styled-components';
import CenterContainer from './CenterContainer';
import SpinningVinyl from './SpinningVinyl';
import NextVinyls from './NextVinyls';
import Footer from './Footer';
import * as QuestionActions from '../actions/QuestionsActions';
import { initializeAndLogin } from '../actions/FirebaseActions';
import { showLeaderboard } from '../actions/LeaderboardActions';
import { niceFormatJestError } from '../helpers/JestHelpers';
import { connect } from 'react-redux';

const ContentWrapper = styled.div`
	display flex;
	flex-direction: column;
	flex: 1;
`;

const ContentRow = styled.div`
	display: flex;
	flex: 1;
	justify-content: space-between;
	margin-top: 40px;
`;

const SideContainer = styled.div`
	margin: 1em;
	width: 20%;
`;

class ContentContainer extends Component {
	state = {
		error: '',
		correctSubmission: false,
		input: '',
		next: false,
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.questionId !== nextProps.questionId) {
			this.setState({
				correctSubmission: false,
				input: nextProps.questionsInputs[nextProps.questionId] || '',
				error: '',
				next: true,
			});
		}
	}

	onInputChange = e => {
		this.setState({ input: e.target.value });
	};

	handleKeyPress = event => {
		if (event.key === 'Enter') {
			this.validateResponse();
		}
	};

	validateResponse = () => {
		const { questionId, questionsCompleted, submitCorrectResponse, submitIncorrectResponse } = this.props;
		const { input } = this.state;
		const { assert, givens, points } = exercises[questionId];

		if (!questionsCompleted.includes(questionId)) {
			try {
				assert({ ...givens, input });
				this.setState({
					correctSubmission: true,
					error: '',
					next: false,
				});
				submitCorrectResponse(points);
			} catch (error) {
				this.setState({
					correctSubmission: false,
					error: niceFormatJestError(error),
					next: false,
				});
				submitIncorrectResponse(points);
			}
		}
	};

	previousQuestion = () => {
		this.setState({
			input: '',
			error: '',
			next: false,
		});
		this.props.previousQuestion();
	};

	nextQuestion = () => {
		this.setState({
			input: '',
			error: '',
			next: true,
		});
		this.props.nextQuestion(this.state.input);
	};

	render() {
		const { questionId, questionsCompleted } = this.props;
		const { error, correctSubmission, next, input } = this.state;
		const exercise = exercises[questionId];
		const questionPreviouslyAnswered = questionsCompleted.includes(questionId);

		return (
			<ContentWrapper>
				<ContentRow>
					<SideContainer />
					<CenterContainer
						error={error}
						onInputChange={this.onInputChange}
						handleKeyPress={this.handleKeyPress}
						correctSubmission={correctSubmission}
						next={next}
						input={input}
					/>
					<SideContainer>
						<SpinningVinyl isSpinning={!error} points={exercise.points} />
						<NextVinyls questionId={questionId} />
					</SideContainer>
				</ContentRow>
				<Footer
					questionId={questionId}
					questionPreviouslyAnswered={questionPreviouslyAnswered}
					exercises={exercises}
					validateResponse={this.validateResponse}
					nextQuestion={this.nextQuestion}
					previousQuestion={this.previousQuestion}
				/>
			</ContentWrapper>
		);
	}
}

function mapStateToProps(state) {
	return {
		questionId: state.questionsReducer.questionId,
		questionsInputs: state.questionsReducer.questionsInputs,
		questionsCompleted: state.questionsReducer.questionsCompleted,
	};
}

export default connect(mapStateToProps, {
	...QuestionActions,
	login: initializeAndLogin,
	showLeaderboard,
})(ContentContainer);
