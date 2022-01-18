import React, { Component } from "react";
import {
  Icon,
  IconSettings,
  AppLauncher,
  GlobalNavigationBar,
  GlobalNavigationBarRegion,
  ProgressBar,
  ScopedNotification,
  GlobalHeaderNotifications,
  GlobalHeaderProfile,
  GlobalHeader,
  Popover,
  Button,
} from "@salesforce/design-system-react";

import { NavContainer } from "./styles";
import NavigationBarLink from "./NavigationBarLink";
import { Link, withRouter } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { setCookie } from "../../utils/cookie";
import { getAPIUrl } from "../../config/config";

const HeaderProfileCustomContent = (props) => (
  <div id="header-profile-custom-popover-content">
    <div className="slds-m-around_medium">
      <div className="slds-tile slds-tile_board slds-m-horizontal_small">
        <div className="slds-tile__detail">
          <p className="slds-truncate">
            <a onClick={props.onClick}>Log Out Tracker</a>
          </p>
        </div>
      </div>
    </div>
  </div>
);
HeaderProfileCustomContent.displayName = "HeaderProfileCustomContent";

// Notifications content is currently the contents of a generic `Popover` with markup copied from https://www.lightningdesignsystem.com/components/global-header/#Notifications. This allows content to have tab stops and focus trapping. If you need a more specific/explicit `GlobalHeaderNotification` content, please create an issue.
const HeaderNotificationsCustomContent = (props) => (
  <ul id="header-notifications-custom-popover-content">
    {console.log(props.items.length)}
    {props.items.length > 0 ? (
      props.items.map((item) => (
        <li
          className={`slds-global-header__notification ${
            item.unread ? "slds-global-header__notification_unread" : ""
          }`}
          key={`notification-item-${item.id}`}
        >
          <div className="slds-media slds-has-flexi-truncate slds-p-around_x-small">
            <div className="slds-media__figure"></div>
            <div className="slds-media__body">
              <div className="slds-grid slds-grid_align-spread">
                <Link
                  to={item.link}
                  className="slds-text-link_reset slds-has-flexi-truncate"
                >
                  <h3
                    className="slds-truncate"
                    title={`${item.name} ${item.action}`}
                  >
                    <strong>{`${item.name} ${item.action}`}</strong>
                  </h3>
                  <p className="slds-truncate" title={item.comment}>
                    {item.comment}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </li>
      ))
    ) : (
      <li>No new Notifications</li>
    )}
  </ul>
);

HeaderNotificationsCustomContent.displayName =
  "HeaderNotificationsCustomContent";

class NavBar extends Component {
  state = {
    tableauUrl: "/",
    progress: { active: false, percentage: 0 },
    notification: { active: false, message: "", type: "", icon: "" },
    notifications: [],
    programsFYstartDate: "",
    programsFYendDate: "",
  };
  API_URL = "localhost:3000";

  onClickLogout = (e) => {
    e.preventDefault();

    this.clearLocalStorage();
    setCookie("userid", null, 0);
    setCookie("token", null, 0);
    setCookie("role", null, 0);
    document.location.replace("/logout");
  };

  clearLocalStorage = () => {
    let items = [
      "userId",
      "Owner",
      "Program",
      "Campaign ID",
      "Title",
      "Format",
      "Abstract",
      "Region",
      "Start date",
      "End date",
      "Assets",
      "Program Owner",
      "Program Name",
      "Budget",
      "MP Target",
      "Target Region",
      "Lifecycle Stage",
      "APM1",
      "APM2",
      "Industry",
      "Segment",
      "Persona",
      "Customer Message",
      "Other KPI's",
    ];
    for (let i = 0; i < items.length; i++) {
      localStorage.removeItem(items[i]);
    }
  };

  configUrls(data) {
    this.setState(
      {
        tableauUrl: data.tablaeu,
        programsFYstartDate: data.programsFYstartDate,
        programsFYendDate: data.programsFYendDate,
      },
      ...this.state
    );
  }

  fileUpload = (e) => {
    this.setState({ progress: { active: true } });
    let number = 0;
    let interval = setInterval(() => {
      this.setState({ progress: { active: true, percentage: number } });
      number += 1;
      if (this.state.progress.percentage === 101) {
        this.setState({ progress: { active: false, percentage: 0 } });
        this.handleNotification(
          true,
          "CSV file Uploaded successfully",
          "success",
          "success"
        );
        clearInterval(interval);
      }
    }, 20);
  };

  handleNotification = (active, message, type, icon) => {
    this.setState({ notification: { active, message, type, icon } });
    setTimeout(() => {
      this.setState({
        notification: { active: false, message: "", type: "", icon: "" },
      });
    }, 4000);
  };

  async getConfig() {
    try {
      if (window.location.hostname === "localhost")
        this.API_URL = "http://localhost:3000/api/v1";
      else this.API_URL = await getAPIUrl();

      let response = await fetch("/config");
      let data = await response.json();
      response.status === 200 && this.configUrls(data);
    } catch (e) {
      console.log("ERROR: cannot get the url config: ", e);
    }
  }

  componentDidMount() {
    this.getConfig();
    this.getPlanners();
  }

  getPlanners = async (startDate, endDate) => {
    this.setState({ showLoader: true });

    const { programsFYstartDate, programsFYendDate } = this.state;

    try {
      let token = getCookie("token").replaceAll('"', "");
      let email = getCookie("username").replaceAll('"', "");
      const config = {
        method: "POST",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          programsStartDate: startDate ? startDate : programsFYstartDate,
          programsEndDate: endDate ? endDate : programsFYendDate,
        }),
      };

      const response = await fetch(`${this.API_URL}/planners`, config);
      if (response.status === 200) {
        let { result } = await response.json();
        let notifications = [],
          aggregates = { budget: 0, mp_target: 0 };

        for (let program of result) {
          if (program.approval) {
            if (program.approval.submittedBy) {
              for (let appr of program.approval.approver1) {
                if (email === appr.email && appr.status !== "Accepted")
                  notifications.push({
                    action: "needed",
                    comment: "For planner - " + program.programName,
                    id: 1,
                    name: "Approval Request",
                    link: "/planner-slider?planner=" + program.ProgramPlannerId,
                  });
              }

              for (let appr of program.approval.approver2) {
                if (email === appr.email && appr.status !== "Accepted")
                  notifications.push({
                    action: "needed",
                    comment: "For planner - " + program.programName,
                    id: 1,
                    name: "Approval Request",
                    link: "/planner-slider?planner=" + program.ProgramPlannerId,
                  });
              }
            }
          }
        }

        this.setState({ programs: result, aggregates, notifications });
      } else {
        console.error("---", response);
        throw new Error(response);
      }
    } catch (err) {
      console.error(err);
      this.setState({
        toast: {
          active: true,
          heading: "Something went wrong, please try again in a few seconds",
          variant: "error",
        },
      });
    }

    this.setState({ showLoader: false });
  };

  render() {
    return (
      <NavContainer>
        <IconSettings iconPath="/assets/icons">
          <GlobalHeader logoSrc="assets/images/logo.svg">
            <Button
              assistiveText={{ icon: "Filters" }}
              iconCategory="utility"
              iconName="filterList"
              iconVariant="border-filled"
              variant="icon"
              style={{ marginLeft: "5px" }}
              onClick={() => {}}
            />
            <GlobalHeaderNotifications
              notificationCount={this.state.notifications.length}
              popover={
                <Popover
                  ariaLabelledby="header-notifications-custom-popover-content"
                  body={
                    <HeaderNotificationsCustomContent
                      items={this.state.notifications}
                    />
                  }
                  id="header-notifications-popover-id"
                />
              }
            />
            <GlobalHeaderProfile
              avatar="/images/avatar.png"
              userName={getCookie("userName").replaceAll('"', "")}
              popover={
                <Popover
                  ariaLabelledby="nav-heading"
                  body={
                    <HeaderProfileCustomContent onClick={this.onClickLogout} />
                  }
                  id="header-profile-popover-id"
                />
              }
            />
          </GlobalHeader>
          {this.props.match.path !== "/home" && (
            <GlobalNavigationBar>
              <GlobalNavigationBarRegion region="primary">
                <AppLauncher triggerName="Activity Tracker">
                  Activity Tracker
                </AppLauncher>
              </GlobalNavigationBarRegion>
              <GlobalNavigationBarRegion region="secondary" navigation>
                <NavigationBarLink to="/home" title="Home" />
                {localStorage.getItem("showPrograms") !== "false" && (
                  <NavigationBarLink to="/planner" title="Planner" />
                )}
                <NavigationBarLink
                  to={
                    localStorage.getItem("showPrograms") === "false"
                      ? "/my-activities"
                      : "/planner-activities"
                  }
                  title="Activities"
                />
                {localStorage.getItem("showPrograms") !== "false" ? (
                  <NavigationBarLink to="/planner-view" title="Programs List" />
                ) : (
                  <NavigationBarLink
                    to="/programs-view"
                    title="Programs List"
                  />
                )}
                {this.state.tableauUrl !== "/" && (
                  <NavigationBarLink
                    title="Go to reports"
                    href={this.state.tableauUrl}
                  />
                )}
              </GlobalNavigationBarRegion>
            </GlobalNavigationBar>
          )}
          {this.state.progress.active && (
            <ProgressBar
              color="success"
              className="progress-bar"
              value={
                this.state.progress.percentage
                  ? this.state.progress.percentage
                  : 0
              }
            />
          )}
          {this.state.notification.active && (
            <ScopedNotification
              icon={
                <Icon
                  assistiveText={{
                    label: "Success",
                  }}
                  category="utility"
                  name={this.state.notification.icon}
                  size="small"
                  inverse={true}
                />
              }
              className={`slds-notification-bar slds-box slds-box_x-small slds-align_absolute-center progress-bar slds-box slds-theme_shade slds-theme_alert-texture slds-theme_${this.state.notification.type}`}
            >
              {this.state.notification.message}
            </ScopedNotification>
          )}
        </IconSettings>
      </NavContainer>
    );
  }
}

export default withRouter(NavBar);
