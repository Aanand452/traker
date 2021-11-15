import React, { Component } from "react";
import {
  IconSettings,
  Spinner,
  ToastContainer,
  Toast,
} from "@salesforce/design-system-react";
import { withRouter } from "react-router-dom";

import { Container } from "./styles";
import ActivitiesTable from "../ActivitiesTable";
import { getAPIUrl } from "../../config/config";
import ConfirmationDailog from "../Prompt";
import { getCookie } from "../../utils/cookie";
import moment from "moment";

class EditActivityPage extends Component {
  state = {
    showLoader: false,
    showConfirmationDialog: false,
    showToast: false,
    activities: [],
    selectedActivity: "",
    toast: {},
    activitiesDate: "",
  };

  componentDidMount() {
    console.log("showPrograms", localStorage.getItem("showPrograms"));
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
        this.setState({ activitiesDate: data.activitiesDate });
    } catch (e) {
      console.error("ERROR: cannot get the url config: ", e);
    }
  }

  getActivities = async (startDate = this.state.activitiesDate, endDate) => {
    this.setState({ showLoader: true });
    const user = localStorage.getItem("userId");
    const body = { startDate, endDate };
    let token = getCookie("token").replaceAll('"', "");
    // const config = {
    //   // method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   // body: JSON.stringify(body),
    // };
    const config = {
      // method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({
      //   programsStartDate: startDate ? startDate : programsFYstartDate,
      //   programsEndDate:  endDate ? endDate :  programsFYendDate,
      // })
    };

    try {
      let response = await fetch(`${this.API_URL}/program-planners`, config);
      response = await response.json();

      let allActivities = [];

      response.result.forEach((program) => {
        console.log(program);
        let {
          offers: { offers },
        } = program;

        offers.forEach((offer, i) => {
          offer.activities.forEach((activity, k) => {
            console.log(activity);
            allActivities.push({
              title: program.programName,
              formatId: activity.formatId.label,
              abstract: program.abstract,
              activityId: i + k,
              asset: "",
              campaignId: "",
              customerMarketing: false,
              endDate: moment(activity.date).toDate(),
              id: i + k,
              programId: "Service Buyer (ANZ)",
              regionId: program.region[0].label,
              startDate: moment(activity.date).toDate(),
              userId: program.programOwner,
            });
          });
        });
      });
      console.log("ALL activities", allActivities);
      this.setState({
        activities: allActivities,
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
          {console.log("Activities", this.state.activities)}
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
