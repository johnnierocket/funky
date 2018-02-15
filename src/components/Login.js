import React from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import RaisedButton from 'material-ui/RaisedButton';

const StyledRaisedButton = styled(RaisedButton)`
	width: 200px;
	align-self: center;
`;

const Login = ({ loggedIn, login, userName, avatarUrl }) =>
	loggedIn ? (
		<UserInfo name={userName} avatarUrl={avatarUrl} />
	) : (
		<StyledRaisedButton label="Login with GitHub" onClick={login} />
	);

export default Login;
