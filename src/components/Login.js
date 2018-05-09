import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { setStartTime } from '../actions/QuestionsActions';
import { getLoggedIn } from '../selectors';
import { initializeAndLogin } from '../actions/FirebaseActions';

import StartingContainer from './StartingContainer';

class Login extends Component {
	static propTypes = {
		// react-router
		history: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		match: PropTypes.object.isRequired,
		// selectors
		loggedIn: PropTypes.bool.isRequired,
		// actions
		login: PropTypes.func.isRequired,
		setStartTime: PropTypes.func.isRequired,
	};

	startGame = () => {
		const { setStartTime, history } = this.props;
		setStartTime({ time: moment() });
		history.push('/');
	};

	render() {
		const { login, loggedIn } = this.props;
		return <StartingContainer login={login} loggedIn={loggedIn} startGame={this.startGame} />;
	}
}

const selectors = createStructuredSelector({
	loggedIn: getLoggedIn,
});

const actions = {
	login: initializeAndLogin,
	setStartTime,
};

const withRedux = connect(selectors, actions);

export default withRouter(withRedux(Login));
