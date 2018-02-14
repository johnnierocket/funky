export const niceFormatJestError = error => {
	if (error.matcherResult) {
		const { actual, expected } = error.matcherResult;
		return `Your code returned ${actual} but the correct answer needs to return ${expected}`;
	}
	return error.message;
};
