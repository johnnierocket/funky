import React from 'react';
import styled from 'styled-components';

const StyledText = styled.div`
	text-align: left;
	font-size: 1.5em;
	margin-bottom: 40px;
`;

const Situation = styled.div`
	font-size: 2rem;
	margin-bottom: 10px;
`;

export default ({ questionId, text }) => (
	<StyledText>
		<Situation>Situation {questionId}</Situation>
		{text}
	</StyledText>
);
