import React from 'react';
import SpinningVinyl from './SpinningVinyl';
import styled from 'styled-components';
import exercises from '../Exercises';

const StyledVinyls = styled.div`
	display: flex;
	margin: auto;
	margin: 1em;
`;

export default class NextVinyls extends React.Component {
	render() {
		const { questionId } = this.props;

		return (
			<StyledVinyls>
				{Object.keys(exercises)
					.slice(questionId)
					.map(id => <SpinningVinyl isSpinning={false} points={exercises[id].points} size="small" />)}
			</StyledVinyls>
		);
	}
}
