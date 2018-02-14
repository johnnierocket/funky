import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import styled from 'styled-components';
import UserInfo from './UserInfo';
import { getLeaderboardUsers, getShowingLeaderboard } from '../reducers/index';
import { hideLeaderboard as hide } from '../actions/LeaderboardActions';

const LeaderboardRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const Leaderboard = ({ hide, open, users }) => (
	<Dialog modal={false} title="Leaderboard" open={open} onRequestClose={hide}>
		{users.map(user => (
			<LeaderboardRow key={user.id}>
				<UserInfo avatarUrl={user.avatarUrl} name={user.name} />
				<span>{user.points}</span>
			</LeaderboardRow>
		))}
	</Dialog>
);

export default connect(
	state => ({
		open: getShowingLeaderboard(state),
		users: getLeaderboardUsers(state),
	}),
	{ hide }
)(Leaderboard);
