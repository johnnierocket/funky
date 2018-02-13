import { combineReducers } from 'redux';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({
  questionsReducer,
});

export default rootReducer;
