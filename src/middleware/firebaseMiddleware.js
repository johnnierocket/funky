import firebase from 'firebase';
import { LOGIN, REHYDRATE_QUESTIONS, UPDATE_LEADERBOARD } from '../constants/actionTypes';
import { getQuestionsState, getTotalPoints, loggedIn, userAvatarUrl, userName } from '../reducers/index';

const uid = () => firebase.auth().currentUser.uid;
const questionsRefName = () => `/users/${uid()}/questions`;
const userLeaderboardRefName = () => `/leaderboard/${uid()}`;
const userInfoRefName = () => `/users/${uid()}/meta`;
const saveToFirebase = store => {
	const state = store.getState();
	if (!loggedIn(state)) {
		return;
	}
	firebase
		.database()
		.ref(questionsRefName())
		.set(JSON.stringify(getQuestionsState(state)));
	firebase
		.database()
		.ref(userLeaderboardRefName())
		.set({ name: userName(state), avatarUrl: userAvatarUrl(state), points: getTotalPoints(state) });
};
const updateUserInfo = store => {
	const state = store.getState();
	if (loggedIn(state)) {
		firebase
			.database()
			.ref(userInfoRefName())
			.set({ name: userName(state), avatarUrl: userAvatarUrl(state) });
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

export default store => {
	subscribeToLeaderboard(store);
	return next => action => {
		next(action);
		if (action.type === LOGIN) {
			rehydrateQuestions(store);
			updateUserInfo(store);
		} else {
			saveToFirebase(store);
		}
	};
};
