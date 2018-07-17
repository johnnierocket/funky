import { createSelector } from 'reselect';
import { getModuleId } from '../helpers/LocationHelpers';

export const getQuestionsState = state => state.questionsReducer;
export const getUserState = state => state.user;
export const getLeaderboardState = state => state.leaderboards;

// USER STATE
export const getCurrentUser = createSelector([getUserState], userState => userState.user);

export const getLoggedIn = createSelector([getCurrentUser], getCurrentUser => !!getCurrentUser);

export const getUserName = createSelector(
	[getUserState],
	userState => (userState.user ? userState.user.displayName : '')
);

export const getAvatarUrl = createSelector(
	[getUserState],
	userState => (userState.user ? userState.user.photoURL : '')
);

// QUESTIONS STATE
export const getQuestionsCompleted = createSelector([getQuestionsState], questionsState =>
	questionsState.getIn([getModuleId(), 'questionsCompleted'])
);

export const getQuestionId = createSelector([getQuestionsState], questionsState =>
	questionsState.getIn([getModuleId(), 'questionId'])
);

export const getQuestionsInputs = createSelector([getQuestionsState], questionsState =>
	questionsState.getIn([getModuleId(), 'questionsInputs'])
);

export const getTotalPoints = createSelector([getQuestionsState], questionsState =>
	questionsState.getIn([getModuleId(), 'totalPoints'])
);

export const getStartTime = createSelector([getQuestionsState], questionsState =>
	questionsState.getIn([getModuleId(), 'startTime'])
);

// LEADERBOARD STATE
export const getLeaderboardUsers = createSelector([getLeaderboardState], leaderboardState => leaderboardState.users);
