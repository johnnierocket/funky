import React, { Component } from 'react';
import exercises from '../Exercises';
import styled from 'styled-components';
import CenterContainer from './CenterContainer';
import SpinningVinyl from './SpinningVinyl';
import NextVinyls from './NextVinyls';
import { connect } from 'react-redux';

const StyledContentContainer = styled.div`
	display: flex;
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
	};

	setError = error => {
		this.setState({ error });
	};

	render() {
		const { questionId } = this.props;
		const { error } = this.state;
		const exercise = exercises[questionId];

		return (
			<StyledContentContainer>
				<SideContainer />
				<CenterContainer setError={this.setError} error={error} />
				<SideContainer>
					<SpinningVinyl isSpinning={!error} points={exercise.points} />
					<NextVinyls questionId={questionId} />
				</SideContainer>
			</StyledContentContainer>
		);
	}
}

function mapStateToProps(state) {
	return {
		questionId: state.questionsReducer.questionId,
	};
}

export default connect(mapStateToProps)(ContentContainer);
