import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import DevTools from '../containers/DevTools';

const logger = createLogger();

const finalCreateStore = compose(
	// applyMiddleware(logger, thunk),
	DevTools.instrument()
)(createStore);

export const configureStore = function configureStore(initialState) {
	const store = finalCreateStore(rootReducer, initialState);

	if (module.hot) {
		module.hot.accept('../reducers', () =>
			store.replaceReducer(require('../reducers'))
		);
	}

	return store;
};
