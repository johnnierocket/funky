import nth from 'lodash/fp/nth';
import exercises from '../exercises';

export const getModuleId = () => nth(1, /module\/(.*?)\//.exec(window.location.pathname)) || 'funkyjs';

export const getCurrentExercises = () => exercises[getModuleId()];

export const getExercisesCount = () => Object.keys(getCurrentExercises()).length;

export const getQuestionIndex = (exerciseId) =>
	Object.keys(getCurrentExercises()).findIndex((id) => id === exerciseId.toString());
