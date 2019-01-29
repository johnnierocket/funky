import React from 'react';
import SpinningVinyl from './SpinningVinyl';
import styled from 'styled-components';
import { getCurrentExercises } from '../helpers/LocationHelpers';

const StyledVinyls = styled.div`
	display: flex;
	margin: auto;
	margin: 20px 0;
	flex-flow: row wrap;
`;

export default class NextVinyls extends React.Component {
	render() {
		const { questionId } = this.props;

		return (
			<StyledVinyls>
				{Object.keys(getCurrentExercises())
					.slice(questionId)
					.map((id, idx) => (
						<SpinningVinyl
							key={idx}
							isSpinning={false}
							flipAndSlide={false}
							points={getCurrentExercises()[id].points}
							size="small"
						/>
					))}
			</StyledVinyls>
		);
	}
}
