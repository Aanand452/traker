import React from "react";
import NotFoundPage from "../containers/NotFoundPage";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "moment/locale/en-au";
import { SfdcPageAppWrapper } from "./styles/page";
import { getCookie } from "../utils/cookie";
import { Settings } from "@salesforce/design-system-react";

import Login from "../components/Login";
import CreateActivityPage from "../components/CreateActivityPage";
import CreateProgramPage from "../components/CreateProgramPage";
import NavBar from "../components/NavBar";
import EditActivityPage from "../components/EditActivityPage";
import EditPlannerActivityPage from "../components/EditPlannerActivityPage/index";
import EditProgramPage from "../components/EditProgramPage";
import HomePage from "../components/HomePage";
import PrivateRoute from "../components/PrivateRoute";
import CreatePlanner from "../components/CreatePlanner";
import EditPlanner from "../components/EditPlanner";
import PlanningView from "../components/PlanningView";
import PlannerPage from "../components/Planner";
import Calendar from "../components/Calendar";
import SideNavBar from "../components/NewCalendar/SideNavBar/";
import ListView from "../components/NewCalendar/ListView";
import Date from "../components/NewCalendar/Date";
import NewActivity from "../components/NewCalendar/NewActivity"
import AddUser from "../components/NewCalendar/AddUser"

Settings.setAppElement("#root");

function EditActivity() {
  return (
    <div>
      <NavBar />
      <EditActivityPage />
    </div>
  );
}

function EditPlannerActivity() {
  return (
    <div>
      <NavBar />
      <EditPlannerActivityPage />
    </div>
  );
}

function EditProgram() {
  return (
    <div>
      <NavBar />
      <EditProgramPage />
    </div>
  );
}

function CreateActivity() {
  return (
    <div>
      <NavBar />
      <CreateActivityPage />
    </div>
  );
}

function Home() {
  return (
    <div>
      <NavBar />
      <HomePage />
    </div>
  );
}

function Planner() {
  return (
    <div>
      <NavBar showPrograms={true} />
      <PlannerPage />
    </div>
  );
}

function CreateProgram() {
  return (
    <div>
      <NavBar />
      <CreateProgramPage />
    </div>
  );
}

function App({ closeSettingsMenu, user }) {
  return (
    <Router>
      <SfdcPageAppWrapper className="app" onClick={closeSettingsMenu}>
        <Switch>
          <Route exact path="/"
            render={() =>

              <SideNavBar />


              //!localStorage.getItem("userId") ? (
              // <Login />
              // ) : (
              // <Redirect to="/home" />
              // )
            }
          />
          <Route exact path="/addUser" component={AddUser} />
          <Route exact path="/newActivity" component={NewActivity} />
          <Route exact path="/date" component={Date} />
          <Route exact path="/listView" component={ListView} />
          <PrivateRoute exact path="/sideNavBar" component={SideNavBar} />
          <PrivateRoute exact path="/home" component={Home} />

          <PrivateRoute exact path="/my-activities" component={EditActivity} />

          <PrivateRoute
            exact
            path="/planner-activities"
            component={EditPlannerActivity}
          />

          <PrivateRoute
            exact
            path="/programs-view"
            render={
              () => (
                // getCookie("role").replaceAll('"', "") === "admin" ? (
                <EditProgram />
              )
              // ) : (
              // <Redirect to="/" />
              // )
            }
          />

          <PrivateRoute
            exact
            path="/create-activity"
            component={CreateActivity}
          />

          <PrivateRoute
            exact
            path="/create-program"
            render={() =>
              getCookie("role").replaceAll('"', "") === "admin" ? (
                <CreateProgram />
              ) : (
                <Redirect to="/" />
              )
            }
          />

          <PrivateRoute
            exact
            path="/create-planner"
            render={() => <CreatePlanner />}
          />

          <PrivateRoute exact path="/planner" render={() => <Planner />} />

          <PrivateRoute
            exact
            path="/planner-view"
            render={() => <EditPlanner />}
          />

          <PrivateRoute
            exact
            path="/planner-slider"
            render={() => <PlanningView />}
          />

          <Route exact path="*" component={NotFoundPage} />
        </Switch>
      </SfdcPageAppWrapper>
    </Router>
  );
}

export default App;
