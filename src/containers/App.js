import React from 'react';
import { connect } from 'react-redux';
import NotFoundPage from '../containers/NotFoundPage';
import { toggleSettingsMenu } from '../actions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { css } from 'glamor';
import { SfdcPageAppWrapper } from './styles/page';

import Login from '../components/Login'
import NavBar from '../components/NavBar';
import Table from '../components/DataTable';

function List() {
  return (
    <div>
      <NavBar />
      <Table />
    </div>
  )
} 

function App({closeSettingsMenu, user}) {
  return (
    <Router>
      
      <SfdcPageAppWrapper className="app" onClick={closeSettingsMenu}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/create-new-row" component={CreateNewRow} />
          <Route exact path="/home" component={List} />
          <Route exact path="*" component={NotFoundPage} />
        </Switch>
      </SfdcPageAppWrapper>
    </Router>
  );
}

export default App;
