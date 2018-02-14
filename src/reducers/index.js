import { combineReducers, compose } from 'redux';
import * as questionsReducer from './questionsReducer';
import * as userReducer from './userReducer';
import * as leaderboard from './leaderboardReducer';

const rootReducer = combineReducers({
	questionsReducer: questionsReducer.default,
	user: userReducer.default,
	leaderboard: leaderboard.default
});

export default rootReducer;

export const getQuestionsState = state => state.questionsReducer;
const getUserState = state => state.user;
const getLeaderboardState = state => state.leaderboard;

export const loggedIn = compose(userReducer.loggedIn, getUserState);
export const userName = compose(userReducer.userName, getUserState);
export const userId = compose(userReducer.userId, getUserState);
export const userAvatarUrl = compose(userReducer.userAvatarUrl, getUserState);
export const getTotalPoints = compose(questionsReducer.getTotalPoints, getQuestionsState);
export const getShowingLeaderboard = compose(leaderboard.getShowingLeaderboard, getLeaderboardState);
export const getLeaderboardUsers = compose(leaderboard.getUsers, getLeaderboardState);
