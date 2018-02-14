import React from 'react';
import styled from 'styled-components';

const StyledBar = styled.div`
	display: flex;
	margin: auto;
	height: 50px;
`;

export default ({ progress }) => <StyledBar>{progress}% Complete</StyledBar>;
