import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getCurrentExercises } from '../helpers/LocationHelpers';
import { getAvatarUrl, getLoggedIn, getQuestionId, getUserName, getOverFailLimit } from '../selectors';

import CodeBlock from './CodeBlock';
import Instructions from './Instructions';
import Leaderboard from './screens/Leaderboard';
import PlaySound from './PlaySound';

import track1 from '../sounds/track1-downtown.mp3';
import track2 from '../sounds/track2-retrosoul.mp3';

const StyledCenterContainer = styled.div`
	flex: 1;
	margin: 0;
	margin-top: -50px;
	padding-left: 2em;
`;

class CenterContainer extends Component {
	static propTypes = {
		error: PropTypes.string.isRequired,
		onInputChange: PropTypes.func.isRequired,
		handleKeyPress: PropTypes.func.isRequired,
		correctSubmission: PropTypes.bool.isRequired,
		input: PropTypes.string.isRequired,
		// selectors
		loggedIn: PropTypes.bool.isRequired,
		userName: PropTypes.string.isRequired,
		avatarUrl: PropTypes.string.isRequired,
		questionId: PropTypes.number.isRequired,
		overFailLimit: PropTypes.bool.isRequired
	};

	render() {
		const {
			questionId,
			error,
			onInputChange,
			handleKeyPress,
			correctSubmission,
			overFailLimit,
			input
		} = this.props;
		const exercise = getCurrentExercises()[questionId];
		const vinylTrackArray = [ track1, track2 ];
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
				{error &&
				!overFailLimit && (
					<div>
						<h1>Hmm... not quite.</h1>
						<CodeBlock code={error} showLineNumbers={false} children={<span>Your</span>} />
					</div>
				)}
				{!error && <PlaySound src={randTrack} />}
				{overFailLimit && (
					<div>
						<h1>Wipeout! We were looking for:</h1>
						<CodeBlock code={exercise.answer} showLineNumbers={false} />
					</div>
				)}
				{correctSubmission && <h1>Correct!</h1>}
				{questionId === getCurrentExercises().length && <Leaderboard />}
			</StyledCenterContainer>
		);
	}
}

const selectors = createStructuredSelector({
	loggedIn: getLoggedIn,
	userName: getUserName,
	avatarUrl: getAvatarUrl,
	questionId: getQuestionId,
	overFailLimit: getOverFailLimit
});

export default connect(selectors)(CenterContainer);
