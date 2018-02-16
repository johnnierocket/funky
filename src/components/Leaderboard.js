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

class Leaderboard extends React.Component {
	render() {
		const { users } = this.props;

		const sortedUsers = users.sort((a, b) => b.points - a.points);

		return (
			<LeaderboardWrapper>
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
	}),
	{ hide }
)(Leaderboard);
