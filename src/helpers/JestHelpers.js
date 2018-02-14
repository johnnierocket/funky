export const niceFormatJestError = error => {
	if (error.matcherResult) {
		const { actual, expected } = error.matcherResult;
		return `Your code returned ${actual} but the expected return is ${expected}`;
	}
	return error.message;
};
