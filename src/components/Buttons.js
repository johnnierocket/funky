import React from 'react';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import { getModuleId } from '../helpers/LocationHelpers';

const moduleId = getModuleId();

const ButtonsWrapper = styled.div`
	display: flex;
	flex: 1;
`;

const StyledRaisedButton = styled(RaisedButton)`
	margin: 12px;
	display: flex !important;
`;

const StyledSubmitButton = styled(StyledRaisedButton)`
	margin-left: auto;
	margin-right: 2rem;
`;

const Buttons = ({
	questionId,
	questionPreviouslyAnswered,
	exercises,
	validateResponse,
	nextQuestion,
	previousQuestion,
}) => (
	<ButtonsWrapper>
		<StyledRaisedButton label="Previous" onClick={() => previousQuestion({ moduleId })} disabled={!(questionId - 1)} />
		<StyledRaisedButton
			label="Next"
			secondary={true}
			onClick={() => nextQuestion({ moduleId })}
			disabled={!questionPreviouslyAnswered || questionId === exercises.length}
		/>
		<StyledSubmitButton
			label="Submit"
			backgroundColor="#ffa500"
			labelColor="#ffffff"
			onClick={validateResponse}
			disabled={questionPreviouslyAnswered}
		/>
	</ButtonsWrapper>
);

export default Buttons;
