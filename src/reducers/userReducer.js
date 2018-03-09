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
