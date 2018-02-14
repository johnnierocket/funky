import { SUBMIT_CORRECT_RESPONSE, NEXT_QUESTION, PREVIOUS_QUESTION, USE_HINT } from '../constants/actionTypes';

export const submitCorrectResponse = pointValue => ({
	type: SUBMIT_CORRECT_RESPONSE,
	payload: { pointValue },
});

export const nextQuestion = () => ({
	type: NEXT_QUESTION,
});

export const previousQuestion = () => ({
	type: PREVIOUS_QUESTION,
});

export const useHint = () => ({
	type: USE_HINT,
});
