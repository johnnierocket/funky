import { combineReducers, compose } from 'redux';
import * as questionsReducer from './questionsReducer';
import * as userReducer from './userReducer';

const rootReducer = combineReducers({
	questionsReducer: questionsReducer.default,
	user: userReducer.default,
});

export default rootReducer;

export const getQuestionsState = state => state.questionsReducer;
const getUserState = state => state.user;

export const loggedIn = compose(userReducer.loggedIn, getUserState);
export const userName = compose(userReducer.userName, getUserState);
export const userId = compose(userReducer.userId, getUserState);
export const userAvatarUrl = compose(userReducer.userAvatarUrl, getUserState);
export const getTotalPoints = compose(questionsReducer.getTotalPoints, getQuestionsState);
