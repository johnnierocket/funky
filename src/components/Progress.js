import React from 'react';
import styled from 'styled-components';
import LinearProgress from 'material-ui/LinearProgress';

const StyledLinearProgress = styled(LinearProgress)`
	background-color: rgba(255, 255, 255, 0.76) !important;
	height: 40px !important;
	margin: 0 0 30px 0 !important;
`;

const Login = ({ questionsCompleted, exercises }) => {
	const progressPercent = questionsCompleted.length / Object.keys(exercises).length * 100;

	return <StyledLinearProgress mode="determinate" value={progressPercent} color="#6cc93d" />;
};

export default Login;
