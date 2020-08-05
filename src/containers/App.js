import React from 'react';
import { connect } from 'react-redux';
import NotFoundPage from '../containers/NotFoundPage';
import { toggleSettingsMenu } from '../actions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { css } from 'glamor';

import Login from './Login'
import NavBar from '../components/NavBar';
/**
 * App Container:
 * Handles the app routing and double checks
 * authentication (for showing Devs auth component)
 */

const appStyle = css({
  '@media(max-width: 767px)': {
    marginLeft: '0',
    marginRight: '0',
    paddingRight: '0',
    paddingLeft: '0',
    marginTop: '78px',
    minWidth: '357px',
    height: '100%'
  },
  minHeight: '300px',
  minWidth: '1145px',
  marginTop: '70px'
});

const listStyle = css({
  '@media(max-width: 767px)': {
    height: '100%'
  }
});

function List() {
  return (
    <div>
      <NavBar />
      <p>What's up bro</p>
    </div>
  )
} 

function App({closeSettingsMenu, user}) {
  return (
    <Router>
      
      <div className="app" onClick={closeSettingsMenu}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/admin" component={List} />
          <Route exact path="/home" component={List} />
          <Route exact path="*" component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
