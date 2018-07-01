import firebase from 'firebase';
import {
	CLEAR_USER_DATA,
	LOGIN,
	REHYDRATE_QUESTIONS,
	UPDATE_LEADERBOARD,
	CLEAR_LEADERBOARD,
} from '../constants/actionTypes';
import { getQuestionsState, getLoggedIn, getAvatarUrl, getUserName, getTotalPoints } from '../selectors';
import { getModuleId } from '../helpers/LocationHelpers';

const uid = () => firebase.auth().currentUser.uid;
const questionsRefName = () => `/users/${uid()}/questions`;
const userLeaderboardRefName = () => `/leaderboard/${getModuleId()}/${uid()}`;
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

const clearUserData = () =>
	firebase
		.database()
		.ref(questionsRefName())
		.remove();

export default store => {
	return next => action => {
		next(action);
		if (action.type === LOGIN) {
			rehydrateQuestions(store);
			updateUserInfo(store);
		} else if (action.type === CLEAR_USER_DATA) {
			clearUserData();
		} else if (action.type === UPDATE_LEADERBOARD || action.type === CLEAR_LEADERBOARD) {
			return;
		} else {
			saveToFirebase(store);
		}
	};
};
