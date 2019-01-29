import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Transition from 'react-transition-group/Transition';
import styled from 'styled-components';
import firebase from 'firebase';

import { ensureUserLoggedIn } from '../../actions/QuestionsActions';
import { UPDATE_LEADERBOARD, CLEAR_LEADERBOARD } from '../../constants/actionTypes';
import { getModuleId } from '../../helpers/LocationHelpers';
import { getLeaderboardUsers, getCurrentUser, getTotalPoints } from '../../selectors';

import UserInfo from '../UserInfo';
import StyledSpin from '../StyledSpin';
import StyledFade from '../StyledFade';

const LeaderboardWrapper = styled.div`
	font-family: Righteous;
	display: flex;
	padding: 2em;
	flex-flow: column;
	margin: 0 auto;
	align-items: center;
`;

const LeaderboardRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 2em;
	border: 1px solid #979797;
	-webkit-flex-shrink: 2;
	-ms-flex-negative: 2;
	flex-shrink: 2;
	width: 700px;
	background: white;
`;

const BoomShakalaka = styled.span`
	font-family: 'Righteous', cursive;
	font-size: 32px;
	margin: 0 auto;
	padding: 1em 0;
	color: #e2487e;
`;

const PersonalUserRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 50px;
	background-color: rgba(106, 188, 251, 0.3);
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
	border: solid 1.5px #e2487e;
	margin: auto;
	margin-bottom: 2em;

	div {
		flex: 1;
	}

	span {
		padding-right: 1em;
	}

	img {
		margin-right: 1em;
	}
`;

class Leaderboard extends React.Component {
	static propTypes: {
		users: PropTypes.array.isRequired,
		// actions
		subscribeToLeaderboard: PropTypes.func,
		clearLeaderboard: PropTypes.func
	};

	state = {
		show: true
	};

	componentDidMount() {
		this.firebaseRef && this.firebaseRef.off('value');

		this.firebaseRef = firebase.database().ref(`/leaderboard/${getModuleId()}`);

		this.firebaseRef.orderByChild('points').limitToFirst(10).on('value', this.props.updateLeaderboard);

		setTimeout(() => {
			this.setState({
				show: false
			});
		}, 3000);

		this.ensureLoggedIn();
	}

	componentWillUnmount() {
		this.firebaseRef && this.firebaseRef.off('value');
		this.props.clearLeaderboard();
	}

	componentDidUpdate() {
		this.ensureLoggedIn();
	}

	ensureLoggedIn = () => {
		const { ensureUserLoggedIn, history } = this.props;
		ensureUserLoggedIn(history);
	};

	render() {
		const { users, currentUser, totalPoints } = this.props;
		const { show } = this.state;

		if (!users || !currentUser) {
			return null;
		}

		const sortedUsers = users.sort((a, b) => b.points - a.points);
		return (
			<LeaderboardWrapper>
				<BoomShakalaka>Boom Shakalaka!</BoomShakalaka>
				<Transition in={show} timeout={3000}>
					{(state) => {
						switch (state) {
							case 'entering':
							case 'entered':
								return (
									<StyledSpin>
										<PersonalUserRow>
											<UserInfo
												rank=""
												avatarUrl={currentUser.photoURL}
												name={currentUser.displayName}
											/>
											<span>{totalPoints}</span>
										</PersonalUserRow>
									</StyledSpin>
								);
							case 'exiting':
							case 'exited':
								return (
									<StyledFade>
										{sortedUsers.map((user, idx) => (
											<LeaderboardRow key={user.id}>
												<UserInfo rank={idx + 1} avatarUrl={user.avatarUrl} name={user.name} />
												<span>{user.points}</span>
											</LeaderboardRow>
										))}
									</StyledFade>
								);
							default:
								return;
						}
					}}
				</Transition>
			</LeaderboardWrapper>
		);
	}
}

const selectors = createStructuredSelector({
	users: getLeaderboardUsers,
	currentUser: getCurrentUser,
	totalPoints: getTotalPoints
});

const actions = (dispatch) => ({
	updateLeaderboard: (snapshot) => {
		snapshot && dispatch({ type: UPDATE_LEADERBOARD, payload: { moduleId: getModuleId(), score: snapshot.val() } });
	},
	clearLeaderboard: () => dispatch({ type: CLEAR_LEADERBOARD }),
	ensureUserLoggedIn: (history) => dispatch(ensureUserLoggedIn(history))
});

export default connect(selectors, actions)(Leaderboard);
