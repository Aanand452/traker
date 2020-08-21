import React from 'react';
import NotFoundPage from '../containers/NotFoundPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SfdcPageAppWrapper } from './styles/page';

import Login from '../components/Login'
import CreateActivityPage from '../components/CreateActivityPage'
import NavBar from '../components/NavBar';
import EditActivityPage from '../components/EditActivityPage';
import EditProgramPage from '../components/EditProgramPage';
import HomePage from '../components/HomePage';

function EditActivity() {
  return (
    <div>
      <NavBar />
      <EditActivityPage />
    </div>
  )
} 

function EditProgram() {
  return (
    <div>
      <NavBar />
      <EditProgramPage />
    </div>
  )
} 

function CreateActivity(){
  return(
    <div>
      <NavBar />
      <CreateActivityPage />
    </div>
  )
}

function Home(){
  return(
    <div>
      <NavBar />
      <HomePage />
    </div>
  )
}

function App({closeSettingsMenu, user}) {
  return (
    <Router>
      
      <SfdcPageAppWrapper className="app" onClick={closeSettingsMenu}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/my-activities" component={EditActivity} />
          <Route exact path="/programs-view" component={EditProgram} />
          <Route exact path="/create-activity" component={CreateActivity} />
          <Route exact path="*" component={NotFoundPage} />
        </Switch>
      </SfdcPageAppWrapper>
    </Router>
  );
}

export default App;
