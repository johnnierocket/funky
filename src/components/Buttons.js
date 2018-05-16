import React from 'react';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import { getExercisesCount } from '../helpers/LocationHelpers';
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
	questionIndex,
	questionPreviouslyAnswered,
	exercises,
	validateResponse,
	nextQuestion,
	previousQuestion,
}) => (
	<ButtonsWrapper>
		<StyledRaisedButton label="Previous" onClick={previousQuestion} disabled={!(questionIndex - 1)} />
		<StyledRaisedButton
			label="Next"
			secondary={true}
			onClick={nextQuestion}
			disabled={!questionPreviouslyAnswered || questionIndex === getExercisesCount()}
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
