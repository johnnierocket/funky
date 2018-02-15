import React, { Component } from 'react';
import styled from 'styled-components';
import exercises from '../Exercises';
import CodeBlock from './CodeBlock';
import Instructions from './Instructions';
import Leaderboard from './Leaderboard';
import Buttons from './Buttons';
import PlaySound from './PlaySound';
import * as QuestionActions from '../actions/QuestionsActions';
import { initializeAndLogin } from '../actions/FirebaseActions';
import { showLeaderboard } from '../actions/LeaderboardActions';
import { loggedIn, userName, userAvatarUrl } from '../reducers/index';
import { niceFormatJestError } from '../helpers/JestHelpers';
import { connect } from 'react-redux';

import lose2 from '../sounds/lose2.mp3';
import lose5 from '../sounds/lose5.mp3';
import lose6 from '../sounds/lose6.mp3';
import next1 from '../sounds/next1_50cent_2.mp3';
import next2 from '../sounds/next2_jayz_woo.mp3';
import next3 from '../sounds/next3_khaled-anotherone.mp3';
import next4 from '../sounds/next4_liljon_2.mp3';
import track1 from '../sounds/track1-downtown.mp3';
import track2 from '../sounds/track2-retrosoul.mp3';

const StyledCenterContainer = styled.div`
	width: 60%;
	margin: 1em;
`;

class CenterContainer extends Component {
	state = {
		correctSubmission: false,
		input: '',
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

	onInputChange = e => {
		this.setState({ input: e.target.value });
	};

	handleKeyPress = event => {
		if (event.key === 'Enter') {
			this.validateResponse();
		}
	};

	validateResponse = () => {
		const { questionId, questionsCompleted, submitCorrectResponse, submitIncorrectResponse, setError } = this.props;
		const { input } = this.state;
		const { assert, givens, points } = exercises[questionId];

		if (!questionsCompleted.includes(questionId)) {
			try {
				assert({ ...givens, input });
				this.setState({
					correctSubmission: true,
					next: false,
				});
				setError('');
				submitCorrectResponse(points);
			} catch (error) {
				this.setState({
					correctSubmission: false,
					next: false,
				});
				setError(niceFormatJestError(error));
				submitIncorrectResponse(points);
			}
		}
	};

	previousQuestion = () => {
		this.setState({
			input: '',
			next: false,
		});
		this.props.setError('');
		this.props.previousQuestion();
	};

	nextQuestion = () => {
		this.setState({
			input: '',
			next: true,
		});
		this.props.setError('');
		this.props.nextQuestion(this.state.input);
	};

	render() {
		const { questionId, questionsCompleted, error } = this.props;
		const { correctSubmission, input, next } = this.state;
		const exercise = exercises[questionId];
		const questionPreviouslyAnswered = questionsCompleted.includes(questionId);
		const vinylTrackArray = [track1, track2];
		const nextSoundArray = [next1, next2, next3, next4];
		const loseSoundsArray = [lose2, lose5, lose6];
		const randTrack = vinylTrackArray[Math.floor(Math.random() * vinylTrackArray.length)];
		const randLose = loseSoundsArray[Math.floor(Math.random() * loseSoundsArray.length)];
		const randNext = nextSoundArray[Math.floor(Math.random() * nextSoundArray.length)];

		return (
			<StyledCenterContainer>
				<Instructions questionId={questionId} text={exercise.title} />
				<CodeBlock
					code={exercise.display}
					input={input}
					onChange={this.onInputChange}
					onKeyPress={this.handleKeyPress}
					showLineNumbers={true}
				/>
				{error && (
					<div>
						<h1>Hmm... not quite.</h1>
						<CodeBlock code={error} showLineNumbers={false} children={<span>Your</span>} />
					</div>
				)}
				<Buttons
					questionId={questionId}
					questionPreviouslyAnswered={questionPreviouslyAnswered}
					exercises={exercises}
					validateResponse={this.validateResponse}
					nextQuestion={this.nextQuestion}
					previousQuestion={this.previousQuestion}
				/>
				{!error && <PlaySound src={randTrack} />}
				{correctSubmission && <h1>Correct!</h1>}
				{next && <PlaySound src={randNext} />}
				{error && <PlaySound src={randLose} />}
				<Leaderboard />
			</StyledCenterContainer>
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
	showLeaderboard,
})(CenterContainer);
