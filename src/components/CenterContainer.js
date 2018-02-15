import React, { Component } from 'react';
import styled from 'styled-components';
import exercises from '../Exercises';
import CodeBlock from './CodeBlock';
import Instructions from './Instructions';
import Leaderboard from './Leaderboard';
import PlaySound from './PlaySound';

import { loggedIn, userName, userAvatarUrl } from '../reducers/index';
import { connect } from 'react-redux';

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
		const randTrack = vinylTrackArray[Math.floor(Math.random() * vinylTrackArray.length)];

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
