import {
	SUBMIT_CORRECT_RESPONSE,
	SUBMIT_INCORRECT_RESPONSE,
	NEXT_QUESTION,
	PREVIOUS_QUESTION,
	USE_HINT,
	SET_START_TIME,
	SET_END_TIME,
	CLEAR_USER_DATA,
} from '../constants/actionTypes';

export const submitCorrectResponse = ({ moduleId, points, questionId }) => ({
	type: SUBMIT_CORRECT_RESPONSE,
	payload: { moduleId, points, questionId },
});

export const submitIncorrectResponse = ({ moduleId }) => ({
	type: SUBMIT_INCORRECT_RESPONSE,
	payload: { moduleId },
});

export const nextQuestion = ({ moduleId, input }) => ({
	type: NEXT_QUESTION,
	payload: { moduleId, input },
});

export const previousQuestion = ({ moduleId }) => ({
	type: PREVIOUS_QUESTION,
	payload: { moduleId },
});

export const useHint = ({ moduleId }) => ({
	type: USE_HINT,
	payload: { moduleId },
});

export const setStartTime = ({ moduleId, time }) => ({
	type: SET_START_TIME,
	payload: { moduleId, time },
});

export const setEndTime = ({ moduleId, time }) => ({
	type: SET_END_TIME,
	payload: { moduleId, time },
});

export const clearUserData = () => ({
	type: CLEAR_USER_DATA,
});
