import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { getLoggedIn } from '../selectors';

const Link = styled.button``;

class Home extends Component {
	static propTypes = {
		// react-router
		history: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		match: PropTypes.object.isRequired,
		// selectors
		loggedIn: PropTypes.bool.isRequired,
	};

	componentDidMount() {
		const { loggedIn, history } = this.props;
		!loggedIn && history.push('/login');
	}

	handlePlay = () => {
		this.props.history.push('/gameplay');
	};

	showLeaderboard = () => {
		this.props.history.push('/leaderboard');
	};

	render() {
		return (
			<div>
				<Link onClick={this.handlePlay}>Play Funky</Link>
				<Link onClick={this.showLeaderboard}>Show Leaderboard</Link>
			</div>
		);
	}
}

const selectors = createStructuredSelector({
	loggedIn: getLoggedIn,
});

const withRedux = connect(selectors);

export default withRouter(withRedux(Home));
