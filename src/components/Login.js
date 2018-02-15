import React from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import FlatButton from 'material-ui/FlatButton';

const StyledFlatButton = styled(FlatButton)`
	width: 200px !important;
	color: #ffffff !important;
	font-family: 'Righteous', cursive !important;
`;

const Login = ({ loggedIn, login, userName, avatarUrl }) =>
	loggedIn ? (
		<UserInfo name={userName} avatarUrl={avatarUrl} />
	) : (
		<StyledFlatButton label="Login with GitHub" onClick={login} />
	);

export default Login;
