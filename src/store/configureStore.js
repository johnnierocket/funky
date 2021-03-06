import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import firebase from '../middleware/firebaseMiddleware';

const logger = createLogger({ collapsed: true });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const finalCreateStore = composeEnhancers(applyMiddleware(logger, thunk, firebase))(createStore);

export const configureStore = function configureStore(initialState) {
	const store = finalCreateStore(rootReducer, initialState);

	if (module.hot) {
		module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers')));
	}

	return store;
};
