import { combineReducers } from 'redux';
import questionsReducer from './questionsReducer';
import userReducer from './userReducer';
import leaderboards from './leaderboardReducer';

export default combineReducers({
	questionsReducer: questionsReducer,
	user: userReducer,
	leaderboards: leaderboards,
});
