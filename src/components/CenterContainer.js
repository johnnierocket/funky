import React, { Component } from 'react';
import styled from 'styled-components';
import exercises from '../Exercises';
import CodeBlock from './CodeBlock';
import Instructions from './Instructions';
import Leaderboard from './Leaderboard';
import PlaySound from './PlaySound';

import { loggedIn, userName, userAvatarUrl } from '../reducers/index';
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
	flex: 1;
	margin: 40px;
`;

class CenterContainer extends Component {
	render() {
		const { questionId, error, onInputChange, handleKeyPress, correctSubmission, next, input } = this.props;
		const exercise = exercises[questionId];
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
					onChange={onInputChange}
					onKeyPress={handleKeyPress}
					showLineNumbers={true}
				/>
				{error && (
					<div>
						<h1>Hmm... not quite.</h1>
						<CodeBlock code={error} showLineNumbers={false} children={<span>Your</span>} />
					</div>
				)}
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
	};
}

export default connect(mapStateToProps)(CenterContainer);
