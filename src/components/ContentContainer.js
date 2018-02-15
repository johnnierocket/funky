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
import handle from '../images/handle.png';

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
	margin: 40px;
	width: 30%;
	position: relative;
`;

const VinylControls = styled.div`
	position: relative;
`;

const StyledImg = styled.img`
	width: 150px;
	position: absolute;
	z-index: 1;
	left: 150px;
	bottom: 0;
	transform: rotate(${props => props.rotate}deg);
	-webkit-transform-origin-x: right;
	-webkit-transform-origin-y: bottom;
	transition: transform 0.25s linear 0s;
`;

const MusicScratcher = styled.div`
	position: absolute;
	width: 10px;
	height: 118px;
	background-color: #000;
	left: 350px;
	bottom: 100px;
`;

const MusicDial = styled.div`
	position: absolute;
	width: 28.5px;
	height: 28.5px;
	background-color: #000;
	border: solid 0.5px #000;
	border-radius: 100%;
	left: 340px;
	bottom: ${props => props.bottom};
`;

const MusicSwitch = styled.div`
	position: absolute;
	width: 4px;
	height: 12px;
	background-color: #fff;
	left: 43.5%;
	top: 3px;
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
		const { correctSubmission } = this.state;
		if (event.key === 'Enter') {
			correctSubmission ? this.nextQuestion() : this.validateResponse();
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
		const rotateDeg = error && 30;

		return (
			<ContentWrapper>
				<ContentRow>
					<CenterContainer
						error={error}
						onInputChange={this.onInputChange}
						handleKeyPress={this.handleKeyPress}
						correctSubmission={correctSubmission}
						next={next}
						input={input}
					/>
					<SideContainer>
						<SpinningVinyl points={exercise.points} isSpinning={!error} flipAndSlide={next} />
						<VinylControls>
							<StyledImg src={handle} alt="handle" rotate={rotateDeg} />
							<MusicScratcher />
							<MusicDial bottom="50px">
								<MusicSwitch />
							</MusicDial>
							<MusicDial bottom="10px">
								<MusicSwitch />
							</MusicDial>
						</VinylControls>
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