import React, { Component } from "react";
import {
  IconSettings,
  Spinner,
  ToastContainer,
  Toast,
} from "@salesforce/design-system-react";
import { withRouter } from "react-router-dom";

import { Container } from "./styles";
import ActivitiesTable from "../ActivitiesTable/planner";
import { getAPIUrl } from "../../config/config";
import ConfirmationDailog from "../Prompt";
import { getCookie } from "../../utils/cookie";
import moment from "moment";

class EditActivityPage extends Component {
  state = {
    showLoader: false,
    showConfirmationDialog: false,
    showToast: false,
    planner_id: false,
    activities: [],
    selectedActivity: "",
    toast: {},
    allPrograms: [],
    activitiesDate: "",
  };

  componentDidMount() {
    this.setupAndFetch();
    if (this.props.location.state && this.props.location.state.newActivity) {
      this.setState({
        toast: {
          active: true,
          type: "success",
          message: "A New Activity Has Been Added",
        },
        showToast: true,
      });
    }
  }

  setupAndFetch = async () => {
    if (window.location.hostname === "localhost")
      this.API_URL = "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();

    await this.getConfig();
    this.getActivities();
  };

  async getConfig() {
    try {
      const request = await fetch("/config");
      const data = await request.json();
      request.status === 200 &&
        this.setState({
          activitiesDate: data.activitiesDate,
          programsFYstartDate: data.programsFYstartDate,
          programsFYendDate: data.programsFYendDate,
        });
    } catch (e) {
      console.error("ERROR: cannot get the url config: ", e);
    }
  }

  getActivities = async (startDate = this.state.activitiesDate, endDate) => {
    this.setState({ showLoader: true });
    const user = localStorage.getItem("userId");
    const body = { startDate, endDate };
    let token = getCookie("token").replaceAll('"', "");

    let planner_id = window.location.href.split("=");
    if (planner_id.length > 1) {
      // for editing
      planner_id = planner_id[1];
      this.setState({ planner_id });
    } else {
      planner_id = false;
    }
    const { programsFYstartDate, programsFYendDate } = this.state;
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        programsStartDate: startDate ? startDate : programsFYstartDate,
        programsEndDate: endDate ? endDate : programsFYendDate,
      }),
    };

    try {
      let response = await fetch(`${this.API_URL}/planners`, config);
      response = await response.json();

      let allActivities = [];
      if (planner_id)
        response.result = response.result.filter(
          (program) => program.ProgramPlannerId === planner_id
        );
      response.result.forEach((program) => {
        let {
          offers: { offers },
        } = program;
        offers.forEach((offer, i) => {
          offer.activities.forEach((activity, k) => {
            allActivities.push({
              title: activity.title,
              formatId: activity.formatId?.label,
              abstract: program.abstract,
              activityId: i + k,
              asset: "",
              campaignId: "",
              customerMarketing: false,
              endDate: moment(activity.date).toDate(),
              id: i + k,
              programId: "Service Buyer (ANZ)",
              regionId:
                program.region.length > 0 ? program.region[0]?.label : 0,
              startDate: moment(activity.date).toDate(),
              userId: program.programOwner,
            });
          });
        });
      });
      console.log(allActivities);
      this.setState({
        activities: allActivities,
        allPrograms: response.result,
      });
    } catch (err) {
      console.error(err);
    }

    this.setState({ showLoader: false });
  };

  onDelete = (activity) => {
    this.setState({
      showConfirmationDialog: true,
      selectedActivity: activity.activityId,
    });
  };

  closeConfirmationDialog = () => {
    this.setState({ showConfirmationDialog: false });
  };

  deleteActivity = async () => {
    this.setState({
      showConfirmationDialog: false,
      showLoader: true,
    });

    let token = getCookie("token").replaceAll('"', "");
    let userId = getCookie("userid").replaceAll('"', "");
    const config = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        activityId: this.state.selectedActivity,
        userId,
      }),
    };

    try {
      const request = await fetch(`${this.API_URL}/activity`, config);
      await request.json();
      await this.getActivities();

      this.setState({
        showToast: true,
        toast: {
          message: "An activity was deleted successfuly",
          type: "success",
        },
      });
    } catch (err) {
      console.error(err);

      this.setState({
        showToast: true,
        toast: {
          message: "Something went wrong, please try again in a few seconds",
          type: "error",
        },
      });
    }

    this.setState({ showLoader: false });
  };

  render() {
    return (
      <Container>
        <IconSettings iconPath="/assets/icons">
          <ActivitiesTable
            data={this.state.activities}
            onDelete={this.onDelete}
            reloadActivities={this.getActivities}
            planner={true}
          />
          {/* <ActivityCalendar></ActivityCalendar> */}
          <ConfirmationDailog
            isOpen={this.state.showConfirmationDialog}
            onClose={this.closeConfirmationDialog}
            onConfirm={this.deleteActivity}
          />
          {this.state.showLoader && (
            <Spinner
              size="small"
              variant="brand"
              assistiveText={{ label: "Loading..." }}
            />
          )}
          {this.state.showToast && (
            <ToastContainer>
              <Toast
                labels={{ heading: [this.state.toast.message] }}
                variant={this.state.toast.type}
                duration={5000}
                onRequestClose={() => this.setState({ showToast: false })}
              />
            </ToastContainer>
          )}
        </IconSettings>
      </Container>
    );
  }
}

export default withRouter(EditActivityPage);
