import { combineReducers } from 'redux';
import { UPDATE_LEADERBOARD } from '../constants/actionTypes';

const byPoints = (a, b) => a.points < b.points;
const users = (state = [], action) => {
	switch (action.type) {
		case UPDATE_LEADERBOARD:
			return Object.keys(action.payload || {})
				.map(id => ({ ...action.payload[id], id }))
				.sort(byPoints)
				.slice(0, 10);
		default:
			return state;
	}
};

export default combineReducers({ users });
