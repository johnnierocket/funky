import * as firebase from 'firebase';

window.Firebase = firebase;

var config = {
	apiKey: 'AIzaSyBZuI63DFvccYpQtrfr2IX6gbAt-KlVd_A',
	authDomain: 'funky-d49ba.firebaseapp.com',
	databaseURL: 'https://funky-d49ba.firebaseio.com',
	projectId: 'funky-d49ba',
	storageBucket: 'funky-d49ba.appspot.com',
	messagingSenderId: '269410971293',
};

export const initializeFirebase = firebase.initializeApp.bind(null, config);
const githubProvider = new firebase.auth.GithubAuthProvider();
export const login = () => async dispatch => {
	const { credential, user } = await firebase
		.auth()
		.signInWithPopup(githubProvider);
	return dispatch({ type: 'LOGIN', payload: { credential, user } });
};
export const initializeAndLogin = () => () => {
	console.log('initializeAndLogin');
	initializeFirebase();
	login()(action => console.log(action));
};
