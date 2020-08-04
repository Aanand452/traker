import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './containers/App';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import app from './reducers';
import {setUser} from './actions';
import svg4Everybody from 'svg4everybody';
svg4Everybody(); //polyfill for svg icons

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(app, composeEnhancers(
  applyMiddleware(thunk)
));

const cookie = document.cookie.match(/(user=([^;]+))/);
const user = cookie && cookie[2];

if (user) {
  const userObj = JSON.parse(decodeURIComponent(user));
  store.dispatch(setUser(userObj));
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
