import {
	SUBMIT_CORRECT_RESPONSE,
	SUBMIT_INCORRECT_RESPONSE,
	NEXT_QUESTION,
	PREVIOUS_QUESTION,
	USE_HINT,
	SET_START_TIME,
	SET_END_TIME,
	CLEAR_USER_DATA,
	CLEAR_FAILED_ATTEMPTS,
	SET_INPUT_AND_ERROR,
} from '../constants/actionTypes';
import { getModuleId } from '../helpers/LocationHelpers';
import { getLoggedIn } from '../selectors';

export const submitCorrectResponse = ({ points, questionId }) => ({
	type: SUBMIT_CORRECT_RESPONSE,
	payload: { moduleId: getModuleId(), points, questionId },
});

export const submitIncorrectResponse = ({ points, questionId, failedAttempts }) => ({
	type: SUBMIT_INCORRECT_RESPONSE,
	payload: { moduleId: getModuleId(), points, failedAttempts, questionId },
});

export const clearFailedAttempts = () => ({
	type: CLEAR_FAILED_ATTEMPTS,
	payload: { moduleId: getModuleId() },
});

export const setInputAndError = ({ input, error }) => ({
	type: SET_INPUT_AND_ERROR,
	payload: {
		moduleId: getModuleId(),
		input,
		error,
	},
});

export const nextQuestion = ({ input }) => ({
	type: NEXT_QUESTION,
	payload: { moduleId: getModuleId(), input },
});

export const previousQuestion = ({ input }) => ({
	type: PREVIOUS_QUESTION,
	payload: { moduleId: getModuleId(), input },
});

export const useHint = () => ({
	type: USE_HINT,
	payload: { moduleId: getModuleId() },
});

export const setStartTime = ({ time }) => ({
	type: SET_START_TIME,
	payload: { moduleId: getModuleId(), time },
});

export const setEndTime = ({ time }) => ({
	type: SET_END_TIME,
	payload: { moduleId: getModuleId(), time },
});

export const clearUserData = () => ({
	type: CLEAR_USER_DATA,
});

export const ensureUserLoggedIn = history => (dispatch, getState) => {
	if (!getLoggedIn(getState())) {
		history.push('/login');
	}
};
