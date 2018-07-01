import { combineReducers } from 'redux';
import { UPDATE_LEADERBOARD, CLEAR_LEADERBOARD } from '../constants/actionTypes';

const byPoints = (a, b) => a.points < b.points;
const users = (state = [], action) => {
	switch (action.type) {
		case UPDATE_LEADERBOARD:
			const { payload: { score = {} } } = action;
			return Object.keys(score)
				.map(id => ({ ...score[id], id }))
				.sort(byPoints)
				.slice(0, 10);
		case CLEAR_LEADERBOARD:
			return [];
		default:
			return state;
	}
};

export default combineReducers({ users });
