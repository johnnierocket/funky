import React, { Component } from 'react';
import exercises from './Exercises';
import styled from 'styled-components';
import CodeBlock from './components/CodeBlock';
import Instructions from './components/Instructions';
import LinearProgress from 'material-ui/LinearProgress';
import PointCounter from './components/PointCounter';
import UserInfo from './components/UserInfo';
import * as QuestionActions from './actions/QuestionsActions';
import RaisedButton from 'material-ui/RaisedButton';
import { loggedIn, userName, userAvatarUrl } from './reducers/index';
import { initializeAndLogin } from './actions/FirebaseActions';
import PlaySound from './components/PlaySound';
import SpinningVinyl from './components/SpinningVinyl';

// import { initializeAndLogin } from './actions/FirebaseActions';

import { niceFormatJestError } from './helpers/JestHelpers';
import { connect } from 'react-redux';

import win1 from './sounds/win1.mp3';
import win2 from './sounds/win2.mp3';
import win3 from './sounds/win3.mp3';
import lose2 from './sounds/lose2.mp3';
import lose5 from './sounds/lose5.mp3';
import lose6 from './sounds/lose6.mp3';

import track1 from './sounds/track1-downtown.mp3';
import track2 from './sounds/track2-retrosoul.mp3';

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
	background-color: #ffffff !important;
`;

const style = {
	margin: 12,
};

class App extends Component {
	state = {
		correctSubmissiion: false,
		input: '',
		error: '',
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.questionId !== nextProps.questionId) {
			this.setState({
				correctSubmission: false,
				input: nextProps.questionsInputs[nextProps.questionId] || '',
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
				});
				submitCorrectResponse(points);
			} catch (error) {
				this.setState({
					correctSubmission: false,
					error: niceFormatJestError(error),
				});
				submitIncorrectResponse(points);
			}
		}
	};

	previousQuestion = () => {
		this.setState({
			input: '',
			error: '',
		});
		this.props.previousQuestion();
	};

	nextQuestion = () => {
		this.setState({
			input: '',
			error: '',
		});
		this.props.nextQuestion(this.state.input);
	};

	render() {
		const { loggedIn, questionId, questionsCompleted, totalPoints } = this.props;
		const { correctSubmission, input, error } = this.state;
		const exercise = exercises[questionId];
		const instructions = `#${questionId} ${exercise.title}`;
		const questionPreviouslyAnswered = questionsCompleted.includes(questionId);
		const progressPercent = questionsCompleted.length / Object.keys(exercises).length * 100;
		const vinylTrackArray = [track1, track2];
		const winSoundsArray = [win1, win2, win3];
		const loseSoundsArray = [lose2, lose5, lose6];
		const randTrack = vinylTrackArray[Math.floor(Math.random() * vinylTrackArray.length)];
		const randWin = winSoundsArray[Math.floor(Math.random() * winSoundsArray.length)];
		const randLose = loseSoundsArray[Math.floor(Math.random() * loseSoundsArray.length)];
		console.log('points', exercise.points);

		return (
			<Root>
				{loggedIn ? (
					<UserInfo name={this.props.userName} avatarUrl={this.props.avatarUrl} />
				) : (
					<RaisedButton label="Login with GitHub" onClick={this.props.login} />
				)}
				<StyledLinearProgress mode="determinate" value={progressPercent} color="#ff4081" />
				<PointCounter points={totalPoints} />
				<Instructions text={instructions} />
				<CodeBlock
					code={exercise.display}
					input={input}
					onChange={this.onInputChange}
					onKeyPress={this.handleKeyPress}
					showLineNumbers={true}
				/>
				<SpinningVinyl isSpinning={!error} points={exercise.points} />
				{!error && <PlaySound src={randTrack} />}
				{error && (
					<div>
						<h1>Hmm... not quite.</h1>
						<CodeBlock code={error} showLineNumbers={false} children={<span>Your</span>} />
					</div>
				)}
				<RaisedButton
					label="Go Back"
					style={style}
					onClick={this.previousQuestion}
					disabled={!(questionId - 1)}
				/>
				<RaisedButton
					label="Attempt Answer"
					style={style}
					backgroundColor="#ffa500"
					labelColor="#ffffff"
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
				{correctSubmission && <PlaySound src={randWin} />}
				{error && <PlaySound src={randLose} />}
			</Root>
		);
	}
}

function mapStateToProps(state) {
	return {
		loggedIn: loggedIn(state),
		userName: userName(state),
		avatarUrl: userAvatarUrl(state),
		questionId: state.questionsReducer.questionId,
		questionsCompleted: state.questionsReducer.questionsCompleted,
		questionsInputs: state.questionsReducer.questionsInputs,
		totalPoints: state.questionsReducer.totalPoints,
	};
}

export default connect(mapStateToProps, {
	...QuestionActions,
	login: initializeAndLogin,
})(App);
