import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import ContentContainer from './ContentContainer';
import Progress from './Progress';
import exercises from '../Exercises';

import { getLoggedIn, getQuestionsCompleted } from '../selectors';

class Home extends Component {
	static propTypes = {
		// react-router
		history: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		match: PropTypes.object.isRequired,
		// selectors
		loggedIn: PropTypes.bool.isRequired,
		questionsCompleted: PropTypes.arrayOf(PropTypes.number),
	};

	componentDidMount() {
		const { loggedIn, history } = this.props;
		!loggedIn && history.push('/login');
	}

	render() {
		const { questionsCompleted } = this.props;
		return (
			<div>
				<Progress questionsCompleted={questionsCompleted} exercises={exercises} />
				<ContentContainer />
			</div>
		);
	}
}

const selectors = createStructuredSelector({
	loggedIn: getLoggedIn,
	questionsCompleted: getQuestionsCompleted,
});

const withRedux = connect(selectors);

export default withRouter(withRedux(Home));
