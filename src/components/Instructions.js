import React from 'react';
import styled from 'styled-components';

const StyledText = styled.div`
	text-align: center;
	font-size: 1.5em;
	margin-bottom: 20px;
`;

export default ({ text }) => <StyledText>{text}</StyledText>;
