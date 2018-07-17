import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import { getLeaderboardUsers, getCurrentUser, getTotalPoints } from '../selectors';
import { getModuleId } from '../helpers/LocationHelpers';
import firebase from 'firebase';
import Transition from 'react-transition-group/Transition';
import { UPDATE_LEADERBOARD, CLEAR_LEADERBOARD } from '../constants/actionTypes';
import StyledSpin from './StyledSpin';
import StyledFade from './StyledFade';

const LeaderboardWrapper = styled.div`
	font-family: Righteous;
	text-align: -webkit-center;
	padding: 2em 4em;
`;

const LeaderboardRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 4em;
	border: 1px solid #979797;
	-webkit-flex-shrink: 2;
	-ms-flex-negative: 2;
	flex-shrink: 2;
	max-width: 600px;
	background: white;
`;

const BoomShakalaka = styled.span`
	font-family: 'Righteous', cursive;
	font-size: 32px;
	margin: 0 auto;
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
	width: 65%;
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
		show: true,
		entered: false
	};

	toggleEnterState = () => {
		this.setState({ in: true });
	};

	componentDidMount() {
		this.firebaseRef && this.firebaseRef.off('value');

		this.firebaseRef = firebase.database().ref(`/leaderboard/${getModuleId()}`);

		this.firebaseRef
			.orderByChild('points')
			.limitToFirst(10)
			.on('value', this.props.updateLeaderboard);

		setTimeout(() => {
			this.setState({
				show: false
			});
		}, 3000);
	}

	componentWillUnmount() {
		this.firebaseRef && this.firebaseRef.off('value');
		this.props.clearLeaderboard();
	}

	render() {
		const { users, currentUser, totalPoints } = this.props;
		const { show } = this.state;

		if (!users) {
			return null;
		}

		const sortedUsers = users.sort((a, b) => b.points - a.points);
		return (
			<LeaderboardWrapper>
				<Transition in={show} timeout={3000}>
					{state => {
						switch (state) {
							case 'entering':
							case 'entered':
								return (
									<div>
										<BoomShakalaka>Boom Shakalaka!</BoomShakalaka>
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
									</div>
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

const actions = dispatch => ({
	updateLeaderboard: snapshot => {
		snapshot && dispatch({ type: UPDATE_LEADERBOARD, payload: { moduleId: getModuleId(), score: snapshot.val() } });
	},
	clearLeaderboard: () => dispatch({ type: CLEAR_LEADERBOARD })
});

export default connect(selectors, actions)(Leaderboard);
