import React from 'react';
import {render} from 'react-dom';
import '@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css';
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

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

localStorage.setItem('userId', getCookie('userid').replaceAll('"',''));

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
