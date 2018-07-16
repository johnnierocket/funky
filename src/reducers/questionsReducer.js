import {
	SUBMIT_CORRECT_RESPONSE,
	SUBMIT_INCORRECT_RESPONSE,
	NEXT_QUESTION,
	PREVIOUS_QUESTION,
	USE_HINT,
	REHYDRATE_QUESTIONS,
	SET_START_TIME,
	SET_END_TIME,
	CLEAR_USER_DATA,
	CLEAR_FAILED_ATTEMPTS,
} from '../constants/actionTypes';
import { Map, List, fromJS } from 'immutable';
import reduce from 'lodash/fp/reduce';
import modules from '../Modules';

const emptyModule = {
	questionId: 1,
	questionsCompleted: List(),
	questionsInputs: Map(),
	failedAttemptsCounter: 0,
	hintsUsedCounter: 0,
	totalPoints: 0,
	startTime: 0,
	endTime: 0,
};

const initialState = reduce(
	(stateMap, key) => {
		return stateMap.set(key, fromJS(emptyModule));
	},
	Map(),
	Object.keys(modules)
);

export default function questionsReducer(state = initialState, action) {
	switch (action.type) {
		case REHYDRATE_QUESTIONS:
			return fromJS(action.payload);
		case SUBMIT_CORRECT_RESPONSE:
			return state
				.updateIn([action.payload.moduleId, 'questionsCompleted'], questionsCompleted =>
					questionsCompleted.push(action.payload.questionId)
				)
				.updateIn(
					[action.payload.moduleId, 'totalPoints'],
					totalPoints => totalPoints + (action.payload.points || 0)
				);
		case SUBMIT_INCORRECT_RESPONSE:
			const newState = state
				.updateIn([action.payload.moduleId, 'totalPoints'], totalPoints =>
					Math.max(0, totalPoints - (action.payload.points || 0))
				)
				.updateIn([action.payload.moduleId, 'failedAttemptsCounter'], failedAttempts => failedAttempts + 1);
			if (action.payload.overFailLimit) {
				return newState.updateIn([action.payload.moduleId, 'questionsCompleted'], questionsCompleted =>
					questionsCompleted.push(action.payload.questionId)
				);
			}
			return newState;
		case CLEAR_FAILED_ATTEMPTS:
			return state.setIn([action.payload.moduleId, 'failedAttemptsCounter'], 0);
		case NEXT_QUESTION:
			const questionId = state.getIn([action.payload.moduleId, 'questionId']);
			return state
				.setIn([action.payload.moduleId, 'questionsInputs', questionId], action.payload.input)
				.setIn([action.payload.moduleId, 'questionId'], questionId + 1);
		case PREVIOUS_QUESTION:
			return state.updateIn([action.payload.moduleId, 'questionId'], questionId => questionId - 1);
		case USE_HINT:
			return state
				.updateIn([action.payload.moduleId, 'hintsUsedCounter'], hintsUsed => hintsUsed++)
				.updateIn([action.payload.moduleId, 'totalPoints'], totalPoints => totalPoints - 2);
		case SET_START_TIME:
			return state.setIn([action.payload.moduleId, 'startTime'], action.payload.time);
		case SET_END_TIME:
			return state.setIn([action.payload.moduleId, 'endTime'], action.payload.time);
		case CLEAR_USER_DATA:
			return initialState;
		default:
			return state;
	}
}
