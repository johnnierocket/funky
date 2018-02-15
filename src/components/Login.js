import React from 'react';
import UserInfo from './UserInfo';

const Login = ({ loggedIn, userName, avatarUrl }) =>
	loggedIn ? <UserInfo name={userName} avatarUrl={avatarUrl} /> : null;

export default Login;
