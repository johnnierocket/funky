import {
	SUBMIT_CORRECT_RESPONSE,
	NEXT_QUESTION,
	PREVIOUS_QUESTION,
	USE_HINT,
} from '../constants/actionTypes';

const initialState = {
	questionId: 1,
	questionsCompleted: 0,
	failedAttemptsCounter: 0,
	hintsUsedCounter: 0,
	totalPoints: 0,
};

export default function questionsReducer(state = initialState, action) {
	switch (action.type) {
		case SUBMIT_CORRECT_RESPONSE:
			return {
				...state,
				questionId: state.questionId++,
				questionsCompleted: state.questionsCompleted++,
				totalPoints: state.totalPoints + action.payload.pointValue,
			};
		case NEXT_QUESTION:
			// Next question is fired if a user goes back to a previously answered question, then clicks Next
			debugger;
			return {
				...state,
				questionId: state.questionId + 1,
			};
		case PREVIOUS_QUESTION:
			// remember to disable previous button on Question 0
			return {
				...state,
				questionId: state.questionId - 1,
			};
		case USE_HINT:
			return {
				...state,
				hintsUsedCounter: state.hintsUsedCounter++,
				totalPoints: state.totalPoints - 10,
			};
		default:
			return state;
	}
}
