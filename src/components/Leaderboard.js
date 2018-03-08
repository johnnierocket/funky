import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import { getLeaderboardUsers, getShowingLeaderboard } from '../reducers/index';
import { hideLeaderboard as hide } from '../actions/LeaderboardActions';

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

const PersonalUserRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 50px;
	background-color: rgba(106, 188, 251, 0.3);
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
	border: solid 1.5px #6abcfb;
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
	render() {
		const { users, currentUser, totalPoints } = this.props;

		const sortedUsers = users.sort((a, b) => b.points - a.points);

		return (
			<LeaderboardWrapper>
				<PersonalUserRow>
					<UserInfo rank="" avatarUrl={currentUser.photoURL} name={currentUser.displayName} />
					<span>{totalPoints}</span>
				</PersonalUserRow>
				{sortedUsers.map((user, idx) => (
					<LeaderboardRow key={user.id}>
						<UserInfo rank={idx + 1} avatarUrl={user.avatarUrl} name={user.name} />
						<span>{user.points}</span>
					</LeaderboardRow>
				))}
			</LeaderboardWrapper>
		);
	}
}

export default connect(
	state => ({
		open: getShowingLeaderboard(state),
		users: getLeaderboardUsers(state),
		currentUser: state.user.user,
		totalPoints: state.questionsReducer.totalPoints,
	}),
	{ hide }
)(Leaderboard);