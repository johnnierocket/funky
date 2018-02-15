import React from 'react';
import SpinningVinyl from './SpinningVinyl';
import styled from 'styled-components';
import exercises from '../Exercises';

const StyledVinyls = styled.div`
	display: flex;
	margin: auto;
	margin: 20px 0;
	flex-flow: row wrap;
`;

export default class NextVinyls extends React.Component {
	render() {
		const { questionId, next } = this.props;

		return (
			<StyledVinyls>
				{next && (
					<SpinningVinyl
						isMovingUp={true}
						isSpinning={false}
						flipAndSlide={false}
						points={exercises[questionId].points}
						size="small"
					/>
				)}
				{Object.keys(exercises)
					.slice(questionId)
					.map((id, idx) => (
						<SpinningVinyl key={idx} isSpinning={false} points={exercises[id].points} size="small" />
					))}
			</StyledVinyls>
		);
	}
}
