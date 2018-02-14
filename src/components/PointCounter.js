import React from 'react';
import styled from 'styled-components';

const StyledText = styled.div`
	position: absolute;
	top: 0;
	right: 0;
`;

export default ({ points }) => <StyledText>Total Points: {points}</StyledText>;
