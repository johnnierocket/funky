import { combineReducers } from 'redux';
import * as questionsReducer from './questionsReducer';
import * as userReducer from './userReducer';
import * as leaderboard from './leaderboardReducer';

export default combineReducers({
	questionsReducer: questionsReducer.default,
	user: userReducer.default,
	leaderboard: leaderboard.default,
});
