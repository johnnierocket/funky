import React from 'react';
import styled from 'styled-components';

const StyledText = styled.div`
	text-align: left;
	font-size: 1.5em;
	margin-bottom: 40px;
	font-family: 'Righteous', cursive;
	color: #444444;
`;

const Situation = styled.div`
	font-size: 2rem;
	margin-bottom: 10px;
	text-transform: uppercase;
`;

export default ({ questionId, text }) => (
	<StyledText>
		<Situation>Jive #{questionId}</Situation>
		{text}
	</StyledText>
);
