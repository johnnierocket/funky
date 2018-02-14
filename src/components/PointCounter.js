import React from 'react';
import styled from 'styled-components';

const StyledText = styled.div`
	position: absolute;
	top: 15px;
	right: 0;
	font-weight: bold;
`;

export default ({ points }) => <StyledText>Total Points: {points}</StyledText>;
