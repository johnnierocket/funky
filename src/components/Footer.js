import React from 'react';
import styled from 'styled-components';
import { getCurrentExercises, getQuestionIndex } from '../helpers/LocationHelpers';
import Buttons from './Buttons';

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
			questionIndex={getQuestionIndex(questionId)}
			questionPreviouslyAnswered={questionPreviouslyAnswered}
			exercises={getCurrentExercises()}
			validateResponse={validateResponse}
			nextQuestion={nextQuestion}
			previousQuestion={previousQuestion}
		/>
	</StyledFooter>
);

export default Footer;
