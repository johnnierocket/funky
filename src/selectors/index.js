import { createSelector } from 'reselect';

export const getQuestionsState = state => state.questionsReducer;
export const getUserState = state => state.user;
export const getLeaderboardState = state => state.leaderboard;

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
export const getQuestionsCompleted = createSelector(
	[getQuestionsState],
	questionsState => questionsState.getIn(['funkyjs','questionsCompleted'])
);

export const getQuestionId = createSelector([getQuestionsState], questionsState => questionsState.getIn(['funkyjs', 'questionId']));

export const getQuestionsInputs = createSelector([getQuestionsState], questionsState => questionsState.getIn(['funkyjs','questionsInputs']));

export const getTotalPoints = createSelector([getQuestionsState], questionsState => questionsState.getIn(['funkyjs','totalPoints']));

// LEADERBOARD STATE
export const getLeaderboardUsers = createSelector([getLeaderboardState], leaderboardState => leaderboardState.users);

export const getShowingLeaderboard = createSelector(
	[getLeaderboardState],
	leaderboardState => leaderboardState.showingLeaderboard
);
