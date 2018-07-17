import React from 'react';
import styled from 'styled-components';
import LinearProgress from 'material-ui/LinearProgress';

const StyledLinearProgress = styled(LinearProgress)`
	background-color: rgba(255, 255, 255, 0.76) !important;
	height: 30px !important;
	margin: 0 0 30px 0 !important;
`;

const Progress = ({ questionsCompleted, exercises }) => {
	const progressPercent = questionsCompleted ? questionsCompleted.size / Object.keys(exercises).length * 100 : 0;

	return <StyledLinearProgress mode="determinate" value={progressPercent} color="#ff4081" />;
};

export default Progress;
