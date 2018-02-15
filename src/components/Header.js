import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
	background-color: #6abcfb;
	color: #fff;
	h1 {
		margin: 10px 15px;
	}
`;

const YellowAccentBar = styled.div`
	background-color: #ffd33f;
	height: 5px;
`;

const RedAccentBar = styled.div`
	background-color: #e84733;
	height: 5px;
`;

const Header = () => (
	<StyledHeader>
		<h1>Funky</h1>
		<YellowAccentBar />
		<RedAccentBar />
	</StyledHeader>
);

export default Header;
