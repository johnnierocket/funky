import React from 'react';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';

const StyledRaisedButton = styled(RaisedButton)`
	margin: 12px;
`;

const Buttons = ({
	questionId,
	questionPreviouslyAnswered,
	exercises,
	validateResponse,
	nextQuestion,
	previousQuestion,
}) => (
	<div>
		<StyledRaisedButton label="Go Back" onClick={previousQuestion} disabled={!(questionId - 1)} />
		<StyledRaisedButton
			label="Attempt Answer"
			backgroundColor="#ffa500"
			labelColor="#ffffff"
			onClick={validateResponse}
			disabled={questionPreviouslyAnswered}
		/>
		<StyledRaisedButton
			label="Next Question"
			secondary={true}
			onClick={nextQuestion}
			disabled={!questionPreviouslyAnswered || questionId === exercises.length}
		/>
	</div>
);

export default Buttons;
