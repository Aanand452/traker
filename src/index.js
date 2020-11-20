import React from 'react';
import {render} from 'react-dom';
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css';
import App from './containers/App';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import app from './reducers';
import svg4Everybody from 'svg4everybody';
import { getCookie } from './utils/cookie';
svg4Everybody(); //polyfill for svg icons

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(app, composeEnhancers(
  applyMiddleware(thunk)
));

localStorage.setItem('userId', getCookie('userid').replaceAll('"',''));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
