import firebase from 'firebase';
import { LOGIN, REHYDRATE_QUESTIONS } from '../constants/actionTypes';
import { getQuestionsState, getTotalPoints } from '../reducers/index';

const loggedIn = () => !!firebase.auth().currentUser;
const uid = () => firebase.auth().currentUser.uid;
const refName = () => `/users/${uid()}/questions`;
const pointsRefName = () => `/leaderboard/${uid()}/points`;
const saveToFirebase = store => {
	if (!loggedIn()) { return; }
	const state = store.getState();
	firebase
		.database()
		.ref(refName())
		.set(JSON.stringify(getQuestionsState(state)));
	firebase
		.database()
		.ref(pointsRefName())
		.set(getTotalPoints(state));
};
const rehydrateQuestions = async store => {
	const result = await firebase
		.database()
		.ref(refName())
		.once('value');
	const payload = result.val();
	if (payload) {
		store.dispatch({ type: REHYDRATE_QUESTIONS, payload: JSON.parse(payload) });
	} else {
		saveToFirebase(store);
	}
};

export default store => next => action => {
	next(action);
	if (action.type === LOGIN) {
		rehydrateQuestions(store);
	} else {
		saveToFirebase(store);
	}
};
