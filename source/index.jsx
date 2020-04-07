import React from 'react';
import { render } from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import WeatherReducer from 'Reducers/weather.js';
import initialState from 'Reducers/initialState.js';

import App from 'Components/App';

const store = createStore(
	WeatherReducer,
	initialState,
	compose(
		applyMiddleware(thunk),
		DEVBUILD && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
	)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);