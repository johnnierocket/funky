import * as firebase from 'firebase';

firebase.initializeApp({
	apiKey: 'AIzaSyBZuI63DFvccYpQtrfr2IX6gbAt-KlVd_A',
	authDomain: 'funky-d49ba.firebaseapp.com',
	databaseURL: 'https://funky-d49ba.firebaseio.com',
	projectId: 'funky-d49ba',
	storageBucket: 'funky-d49ba.appspot.com',
	messagingSenderId: '269410971293',
});

const githubProvider = new firebase.auth.GithubAuthProvider();
export const login = () => async dispatch => {
	const { credential, user } = await firebase
		.auth()
		.signInWithPopup(githubProvider);
	return dispatch({ type: 'LOGIN', payload: { credential, user } });
};
export const initializeAndLogin = () => dispatch => {
	return dispatch(login());
};
