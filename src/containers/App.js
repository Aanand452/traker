import React from 'react';
import NotFoundPage from '../containers/NotFoundPage';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'moment/locale/en-au';
import { SfdcPageAppWrapper } from './styles/page';

import Login from '../components/Login'
import CreateActivityPage from '../components/CreateActivityPage'
import CreateProgramPage from '../components/CreateProgramPage'
import NavBar from '../components/NavBar';
import EditActivityPage from '../components/EditActivityPage';
import EditProgramPage from '../components/EditProgramPage';
import HomePage from '../components/HomePage';
import PrivateRoute from '../components/PrivateRoute';

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

function CreateProgram() {
  return(
    <div>
      <NavBar />
      <CreateProgramPage />
    </div>
  );
};

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

localStorage.setItem('userId', getCookie('userid'));

function App({closeSettingsMenu, user}) {
  return (
    <Router>
      
      <SfdcPageAppWrapper className="app" onClick={closeSettingsMenu}>
        <Switch>
          <Route exact path="/" render={() => !localStorage.getItem("userId") ? <Login /> : <Redirect to='/home' />} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/my-activities" component={EditActivity} />
          <PrivateRoute exact path="/programs-view" component={EditProgram} />
          <PrivateRoute exact path="/create-activity" component={CreateActivity} />
          <PrivateRoute exact path="/create-program" component={CreateProgram} />
          <Route exact path="*" component={NotFoundPage} />
        </Switch>
      </SfdcPageAppWrapper>
    </Router>
  );
}

export default App;
