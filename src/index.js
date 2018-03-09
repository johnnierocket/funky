import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './store/configureStore';

const store = configureStore();

const StyledApp = () => (
	<MuiThemeProvider>
		<App />
	</MuiThemeProvider>
);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<StyledApp />
		</Router>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
