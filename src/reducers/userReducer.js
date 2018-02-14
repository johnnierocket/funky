import { LOGIN, LOGOUT } from '../constants/actionTypes';

const initialState = {};

export default function(state, action) {
	if (!state) {
		return initialState;
	}

	switch (action.type) {
		case LOGIN:
			return { ...state, user: action.payload.user };
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
}

export const loggedIn = state => !!state.user;
export const userName = state => state.user ? state.user.displayName : '';
export const userId = state => state.user ? state.user.uid : '';
export const userAvatarUrl = state => state.user ? state.user.photoURL : '';
