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
import StyledInputRange from '../components/StyledInputRange';
import Leaderboard from '../components/Leaderboard';
import RaisedButton from 'material-ui/RaisedButton';

import win1 from '../sounds/next1_50cent_2.mp3';
import win2 from '../sounds/next2_jayz_woo.mp3';
import win3 from '../sounds/next3_khaled-anotherone.mp3';
import win4 from '../sounds/next4_liljon_2.mp3';

import lose1 from '../sounds/lose2.mp3';
import lose2 from '../sounds/lose5.mp3';
import lose3 from '../sounds/lose6.mp3';

import scratch1 from '../sounds/scratch1.mp3';
import scratch2 from '../sounds/scratch2.mp3';
import scratch3 from '../sounds/scratch3.mp3';

const numExercises = Object.keys(exercises).length;

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
	position: relative;
	flex: 0.2;
	flex-basis: 300px;
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
	border-radius: 75%;
`;

const StyledRaisedButton = styled(RaisedButton)`
	margin: 0 auto;
	display: flex !important;
	font-family: 'Righteous', cursive;
`;
class ContentContainer extends Component {
	state = {
		error: '',
		correctSubmission: false,
		input: '',
		next: false,
		gameOver: false,
	};

	componentWillMount() {
		if (+this.props.questionId > numExercises) {
			this.setState({
				gameOver: true,
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.questionId !== nextProps.questionId) {
			this.setState({
				correctSubmission: false,
				input: nextProps.questionsInputs[nextProps.questionId] || '',
				next: true,
			});
		}
		if (nextProps.questionId > numExercises) {
			this.setState({
				gameOver: true,
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
				this.playWinSound();
			} catch (error) {
				this.setState({
					correctSubmission: false,
					error: niceFormatJestError(error),
					next: false,
				});
				submitIncorrectResponse(points);
				this.playLoseSound();
			}
		}
	};

	playWinSound = () => {
		const w1 = new Audio(win1);
		const w2 = new Audio(win2);
		const w3 = new Audio(win3);
		const w4 = new Audio(win4);
		const winArray = [w1, w2, w3, w4];
		const randWinSound = winArray[Math.floor(Math.random() * winArray.length)];
		randWinSound.play();
	};

	playLoseSound = () => {
		const l1 = new Audio(lose1);
		const l2 = new Audio(lose2);
		const l3 = new Audio(lose3);
		const loseArray = [l1, l2, l3];
		const randLoseSound = loseArray[Math.floor(Math.random() * loseArray.length)];
		randLoseSound.play();
	};

	previousQuestion = () => {
		this.setState({
			input: '',
			next: false,
		});
		this.props.previousQuestion();
	};

	nextQuestion = () => {
		this.setState({
			input: '',
			next: true,
		});
		this.props.nextQuestion();
	};

	startOver = () => {
		this.setState({
			input: '',
			error: '',
			next: true,
			gameOver: false,
		});
		this.props.clearUserData();
	};

	debounceSound = (fn, delay) => {
		let timeoutId;
		return function() {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => fn.call(), delay);
		};
	};

	playScratchSound = () => {
		const sc1 = new Audio(scratch1);
		const sc2 = new Audio(scratch2);
		const sc3 = new Audio(scratch3);
		const scArray = [sc1, sc2, sc3];
		const randScratch = scArray[Math.floor(Math.random() * scArray.length)];
		randScratch.play();
	};

	render() {
		const { questionId, questionsCompleted } = this.props;
		const { error, correctSubmission, next, input, gameOver } = this.state;
		const exercise = exercises[questionId] || 0;
		const questionPreviouslyAnswered = questionsCompleted.includes(questionId);
		const rotateDeg = error && 30;

		return gameOver ? (
			<div>
				<Leaderboard />
				<StyledRaisedButton
					label="Start Over"
					backgroundColor="#6cc93d"
					labelColor="#ffffff"
					onClick={this.startOver}
					style={{ width: '250px' }}
				/>
			</div>
		) : (
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
							<StyledInputRange onChange={this.debounceSound(this.playScratchSound, 500)} />
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
