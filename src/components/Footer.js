import React from 'react';
import styled from 'styled-components';
import exercises from '../Exercises';
import Buttons from './Buttons';

// TODO get from route
const moduleId = 'funkyjs';

const StyledFooter = styled.div`
	display: flex;
	justify-self: flex-end;
	background-color: rgba(255, 255, 255, 0.76);
	padding: 15px 1em;
	z-index: 1;
	position: absolute;
	width: 100%;
	bottom: 0;
`;

const Footer = ({ questionId, questionPreviouslyAnswered, validateResponse, nextQuestion, previousQuestion }) => (
	<StyledFooter>
		<Buttons
			questionId={questionId}
			questionPreviouslyAnswered={questionPreviouslyAnswered}
			exercises={exercises}
			validateResponse={validateResponse}
			nextQuestion={() => nextQuestion({ moduleId })}
			previousQuestion={() => previousQuestion({ moduleId })}
		/>
	</StyledFooter>
);

export default Footer;
