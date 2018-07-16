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

const Footer = ({
	questionId,
	questionPreviouslyAnswered,
	disableSubmit,
	validateResponse,
	nextQuestion,
	previousQuestion,
	failed3Times,
}) => (
	<StyledFooter>
		<Buttons
			questionIndex={getQuestionIndex(questionId)}
			questionPreviouslyAnswered={questionPreviouslyAnswered}
			disableSubmit={disableSubmit}
			exercises={getCurrentExercises()}
			validateResponse={validateResponse}
			nextQuestion={nextQuestion}
			previousQuestion={previousQuestion}
			failed3Times={failed3Times}
		/>
	</StyledFooter>
);

export default Footer;
