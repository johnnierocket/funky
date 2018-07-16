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
} from '../constants/actionTypes';
import { getModuleId } from '../helpers/LocationHelpers';

export const submitCorrectResponse = ({ points, questionId }) => ({
	type: SUBMIT_CORRECT_RESPONSE,
	payload: { moduleId: getModuleId(), points, questionId },
});

export const submitIncorrectResponse = ({ points, questionId, failed3Times }) => ({
	type: SUBMIT_INCORRECT_RESPONSE,
	payload: { moduleId: getModuleId(), points, failed3Times, questionId },
});

export const clearFailedAttempts = () => ({
	type: CLEAR_FAILED_ATTEMPTS,
	payload: { moduleId: getModuleId() },
});

export const nextQuestion = () => ({
	type: NEXT_QUESTION,
	payload: { moduleId: getModuleId() },
});

export const previousQuestion = () => ({
	type: PREVIOUS_QUESTION,
	payload: { moduleId: getModuleId() },
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
