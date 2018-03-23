import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import styled, { injectGlobal } from 'styled-components';
import { getLoggedIn, getUserName, getAvatarUrl } from './selectors';
import { initializeAndLogin } from './actions/FirebaseActions';
import bg from './images/bg.svg';

import Home from './components/Home';
import Login from './components/Login';
import Header from './components/Header';
import GamePlay from './components/Gameplay';
import Leaderboard from './components/Leaderboard';

injectGlobal`
	html {
		height: 100%;
	}
	body {
		background-image: url(${bg});
		background-size: cover;
		background-position: center center;
		height: 100%;
	}
`;

const Root = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	background-size: cover;
	height: 100vh;
	width: 100vw;
	min-width: 1250px;
	overflow-x: hidden;
	overflow-y: scroll;
`;

class App extends Component {
	static propTypes = {
		// react-router
		history: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		match: PropTypes.object.isRequired,
		// selectors
		loggedIn: PropTypes.bool.isRequired,
		userName: PropTypes.string.isRequired,
		avatarUrl: PropTypes.string.isRequired,
		// actions
		login: PropTypes.func.isRequired,
	};

	render() {
		const { loggedIn, avatarUrl, login, userName } = this.props;
		return (
			<Root>
				<Header loggedIn={loggedIn} avatarUrl={avatarUrl} login={login} userName={userName} />
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/module/:moduleId/gameplay" component={GamePlay} />
				<Route exact path="/module/:moduleId/leaderboard" component={Leaderboard} />
			</Root>
		);
	}
}

const selectors = createStructuredSelector({
	loggedIn: getLoggedIn,
	userName: getUserName,
	avatarUrl: getAvatarUrl,
});

const actions = {
	login: initializeAndLogin,
};

const withRedux = connect(selectors, actions);
export default withRouter(withRedux(App));
