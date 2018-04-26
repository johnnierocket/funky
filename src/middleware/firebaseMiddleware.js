import firebase from 'firebase';
import { CLEAR_USER_DATA, LOGIN, REHYDRATE_QUESTIONS, UPDATE_LEADERBOARD } from '../constants/actionTypes';
import { getQuestionsState, getLoggedIn, getAvatarUrl, getUserName, getTotalPoints } from '../selectors';
import nth from 'lodash/fp/nth';

const module = () => nth(1, /module\/(.*?)\//.exec(window.location.pathname)) || 'funkyjs';
const uid = () => firebase.auth().currentUser.uid;
const questionsRefName = () => `/users/${uid()}/questions/${module()}`;
const userLeaderboardRefName = () => `/leaderboard/${uid()}/${module()}`;
const userInfoRefName = () => `/users/${uid()}/meta`;
const saveToFirebase = store => {
	const state = store.getState();
	if (!getLoggedIn(state)) {
		return;
	}

	const name = getUserName(state);
	const avatarUrl = getAvatarUrl(state);
	const points = getTotalPoints(state);

	firebase
		.database()
		.ref(questionsRefName())
		.set(JSON.stringify(getQuestionsState(state)));
	firebase
		.database()
		.ref(userLeaderboardRefName())
		.set({ name, avatarUrl, points });
};
const updateUserInfo = store => {
	const state = store.getState();
	if (getLoggedIn(state)) {
		firebase
			.database()
			.ref(userInfoRefName())
			.set({ name: getUserName(state), avatarUrl: getAvatarUrl(state) });
	}
};

const rehydrateQuestions = async store => {
	const result = await firebase
		.database()
		.ref(questionsRefName())
		.once('value');
	const payload = result.val();
	if (payload) {
		store.dispatch({ type: REHYDRATE_QUESTIONS, payload: JSON.parse(payload) });
	} else {
		saveToFirebase(store);
	}
};

const subscribeToLeaderboard = store => {
	firebase
		.database()
		.ref(`/leaderboard`)
		.on('value', snapshot => store.dispatch({ type: UPDATE_LEADERBOARD, payload: snapshot.val() }));
};

const clearUserData = () =>
	firebase
		.database()
		.ref(questionsRefName())
		.remove();

export default store => {
	subscribeToLeaderboard(store);
	return next => action => {
		next(action);
		if (action.type === LOGIN) {
			rehydrateQuestions(store);
			updateUserInfo(store);
		} else if (action.type === CLEAR_USER_DATA) {
			clearUserData();
		} else {
			saveToFirebase(store);
		}
	};
};
