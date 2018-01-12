import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from 'app';
import reducer from './reducers/reducer';

const store = createStore(reducer);

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('react-root')
);
