import { combineReducers } from 'redux';
import { UPDATE_LEADERBOARD, SHOW_LEADERBOARD, HIDE_LEADERBOARD } from '../constants/actionTypes';

const byPoints = (a, b) => a.points < b.points;
const users = (state, action) => {
	if (!state) {
		return [];
	}

	switch (action.type) {
		case UPDATE_LEADERBOARD:
			return Object.keys(action.payload)
				.map(id => ({ ...action.payload[id], id }))
				.sort(byPoints)
				.slice(0, 10);
		default:
			return state;
	}
};

const showingLeaderboard = (state, action) => {
	if ('undefined' === typeof state) {
		return false;
	}

	switch (action.type) {
		case SHOW_LEADERBOARD:
			return true;
		case HIDE_LEADERBOARD:
			return false;
		default:
			return state;
	}
};

export default combineReducers({ showingLeaderboard, users });

export const getShowingLeaderboard = state => state.showingLeaderboard;
export const getUsers = state => state.users;
