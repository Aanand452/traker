import React from 'react';
import { connect } from 'react-redux';
import NotFoundPage from '../containers/NotFoundPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { css } from 'glamor';
import { SfdcPageAppWrapper } from './styles/page';

import Login from '../components/Login'
import NewRow from '../components/newRow'
import NavBar from '../components/NavBar';
import Table from '../components/DataTable';

function MyList() {
  return (
    <div>
      <NavBar />
      <Table type="1" />
    </div>
  )
} 

function TeamList() {
  return (
    <div>
      <NavBar />
      <Table type="2" />
    </div>
  )
} 

function Layout(){
  return(
    <div>
      <NavBar />
      <NewRow />
    </div>
  )
}

function App({closeSettingsMenu, user}) {
  return (
    <Router>
      
      <SfdcPageAppWrapper className="app" onClick={closeSettingsMenu}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/my-report" component={MyList} />
          <Route exact path="/team-report" component={TeamList} />
          <Route exact path="/home" component={Layout} />
          <Route exact path="*" component={NotFoundPage} />
        </Switch>
      </SfdcPageAppWrapper>
    </Router>
  );
}

export default App;
