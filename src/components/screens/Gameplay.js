import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { listOf } from 'react-immutable-proptypes';

import { ensureUserLoggedIn } from '../../actions/QuestionsActions';
import { getCurrentExercises } from '../../helpers/LocationHelpers';
import { getLoggedIn, getQuestionsCompleted } from '../../selectors';

import ContentContainer from './ContentContainer';
import Progress from '../Progress';

class FunkyModule extends Component {
	static propTypes = {
		// react-router
		history: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		match: PropTypes.object.isRequired,
		// selectors
		loggedIn: PropTypes.bool.isRequired,
		questionsCompleted: listOf(PropTypes.number),
	};

	componentDidMount() {
		this.ensureLoggedIn();
	}

	componentDidUpdate() {
		this.ensureLoggedIn();
	}

	ensureLoggedIn = () => {
		const { ensureUserLoggedIn, history } = this.props;
		ensureUserLoggedIn(history);
	};

	render() {
		const { questionsCompleted } = this.props;
		return (
			<div>
				<Progress questionsCompleted={questionsCompleted} exercises={getCurrentExercises()} />
				<ContentContainer />
			</div>
		);
	}
}

const selectors = createStructuredSelector({
	loggedIn: getLoggedIn,
	questionsCompleted: getQuestionsCompleted,
});

const actions = {
	ensureUserLoggedIn,
};

const withRedux = connect(selectors, actions);

export default withRouter(withRedux(FunkyModule));
