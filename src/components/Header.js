import React from 'react';
import styled from 'styled-components';
import LoginBug from './LoginBug';

const StyledHeader = styled.div`
	background-color: #6abcfb;
	color: #fff;
`;

const TitleBar = styled.div`
	display: flex;
	justify-content: space-between;
	align-content: center;
	padding: 10px 20px;
`;

const Title = styled.div`
	font-family: 'Shrikhand', cursive;
	text-transform: uppercase;
	letter-spacing: 2px;
	font-size: 1.5rem;
	align-self: center;
`;

const CloseButton = styled.div`
	cursor: pointer;
	height: 50px;
	line-height: 2em;
	font-size: 24px;
	padding: 0 10px;
`;

const YellowAccentBar = styled.div`
	background-color: #ffd33f;
	height: 5px;
`;

const RedAccentBar = styled.div`
	background-color: #e84733;
	height: 5px;
`;

const StyledLoginBug = styled(LoginBug)`
	display: inline-flex;
`;

const Header = ({ loggedIn, login, userName, avatarUrl, isPlaying, history }) => (
	<StyledHeader>
		<TitleBar>
			{isPlaying ? (
				<CloseButton onClick={() => history.push('/')}>
					<i className="fas fa-times" />
				</CloseButton>
			) : (
				<Title>Funky</Title>
			)}
			<StyledLoginBug loggedIn={loggedIn} login={login} userName={userName} avatarUrl={avatarUrl} />
		</TitleBar>

		<YellowAccentBar />
		<RedAccentBar />
	</StyledHeader>
);

export default Header;
