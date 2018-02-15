import {
	SUBMIT_CORRECT_RESPONSE,
	SUBMIT_INCORRECT_RESPONSE,
	NEXT_QUESTION,
	PREVIOUS_QUESTION,
	USE_HINT,
	SET_START_TIME,
	SET_END_TIME,
} from '../constants/actionTypes';

export const submitCorrectResponse = pointValue => ({
	type: SUBMIT_CORRECT_RESPONSE,
	payload: { pointValue },
});

export const submitIncorrectResponse = () => ({
	type: SUBMIT_INCORRECT_RESPONSE,
});

export const nextQuestion = input => ({
	type: NEXT_QUESTION,
	payload: { input },
});

export const previousQuestion = () => ({
	type: PREVIOUS_QUESTION,
});

export const useHint = () => ({
	type: USE_HINT,
});

export const setStartTime = time => ({
	type: SET_START_TIME,
	payload: { time },
});

export const setEndTime = time => ({
	type: SET_END_TIME,
	payload: { time },
});
