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
import { showLeaderboard } from './actions/LeaderboardActions';
import PlaySound from './components/PlaySound';
import SpinningVinyl from './components/SpinningVinyl';
import Leaderboard from './components/Leaderboard';

// import { initializeAndLogin } from './actions/FirebaseActions';

import { niceFormatJestError } from './helpers/JestHelpers';
import { connect } from 'react-redux';

import win1 from './sounds/win1.mp3';
import win2 from './sounds/win2.mp3';
import win3 from './sounds/win3.mp3';
import lose2 from './sounds/lose2.mp3';
import lose5 from './sounds/lose5.mp3';
import lose6 from './sounds/lose6.mp3';

const Root = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
`;

const StyledLinearProgress = styled(LinearProgress)`
	background-color: rgba(229, 229, 229, 0.76) !important;
	height: 40px !important;
	margin: 0 0 30px 0 !important;
`;

const Header = styled.div`
	background-color: #6abcfb;
	color: #fff;
	h1 {
		margin: 10px 15px;
	}
`;

const YellowAccentBar = styled.div`
	background-color: #ffd33f;
	height: 5px;
`;

const RedAccentBar = styled.div`
	background-color: #e84733;
	height: 5px;
`;

const StyledRaisedButton = styled(RaisedButton)`
	width: 200px;
	align-self: center;
`;

const ContentContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 40px;
`;

const SideContainer = styled.div`
	width: 20%;
`;

const CenterContainer = styled.div`
	width: 55%;
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
		const questionPreviouslyAnswered = questionsCompleted.includes(questionId);
		const progressPercent = questionsCompleted.length / Object.keys(exercises).length * 100;
		const winSoundsArray = [win1, win2, win3];
		const loseSoundsArray = [lose2, lose5, lose6];
		const randWin = winSoundsArray[Math.floor(Math.random() * winSoundsArray.length)];
		const randLose = loseSoundsArray[Math.floor(Math.random() * loseSoundsArray.length)];
		return (
			<Root>
				<Header>
					<h1>Funky</h1>
					<YellowAccentBar />
					<RedAccentBar />
				</Header>

				<StyledLinearProgress mode="determinate" value={progressPercent} color="#6cc93d" />
				{/* <PointCounter points={totalPoints} /> */}
				{loggedIn ? (
					<UserInfo name={this.props.userName} avatarUrl={this.props.avatarUrl} />
				) : (
					<StyledRaisedButton label="Login with GitHub" onClick={this.props.login} />
				)}
				<ContentContainer>
					<SideContainer />
					<CenterContainer>
						<Instructions questionId={questionId} text={exercise.title} />
						<CodeBlock
							code={exercise.display}
							input={input}
							onChange={this.onInputChange}
							onKeyPress={this.handleKeyPress}
							showLineNumbers={true}
						/>
						<SpinningVinyl labelColor="green" textColor="yellow" />
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
						<RaisedButton
							label="Show Leaderboard"
							style={style}
							secondary={true}
							onClick={this.props.showLeaderboard}
						/>
						{correctSubmission && <h1>Correct!</h1>}
						{correctSubmission && <PlaySound src={randWin} />}
						{error && <PlaySound src={randLose} />}
						<Leaderboard />
					</CenterContainer>
					<SideContainer />
				</ContentContainer>
				<SideContainer />
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
	showLeaderboard,
})(App);
