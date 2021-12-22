import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Spinner,
  ToastContainer,
  Toast,
  IconSettings,
} from "@salesforce/design-system-react";

import { getCookie } from "../../utils/cookie";
import { getAPIUrl } from "../../config/config";
import { Container } from "./styles";
import PlannerList from "../PlannerList";
import ConfirmationDialog from "../Prompt";
import NavBar from "../NavBar";

class EditPlanner extends Component {
  state = {
    showLoader: false,
    showConfirmationDialog: false,
    toast: {
      active: false,
    },
    programs: [],
    aggregates: {
      budget: 0,
      mp_target: 0,
    },
    selectedProgram: "",
    programsFYstartDate: "",
    programsFYendDate: "",
  };

  componentDidMount() {
    this.setupAndFetch();
    if (this.props.location.state && this.props.location.state.newProgram) {
      this.setState({
        toast: {
          active: true,
          variant: "success",
          heading: "The program was added successfuly",
        },
      });
    }
    if (this.props.location.state && this.props.location.state.allPrograms) {
      this.setState({
        allPrograms: true,
      });
    }
  }

  async getConfig() {
    try {
      const request = await fetch("/config");
      const data = await request.json();
      request.status === 200 &&
        this.setState({
          programsFYstartDate: data.programsFYstartDate,
          programsFYendDate: data.programsFYendDate,
        });
    } catch (e) {
      console.error("ERROR: cannot get the url config: ", e);
    }
  }

  setupAndFetch = async () => {
    if (window.location.hostname === "localhost")
      this.API_URL = "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();
    await this.getConfig();
    this.getPrograms();
  };

  getPrograms = async (startDate, endDate) => {
    this.setState({ showLoader: true });
    const user = localStorage.getItem("userId");

    const { programsFYstartDate, programsFYendDate } = this.state;

    try {
      let token = getCookie("token").replaceAll('"', "");
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
        let aggregates = { budget: 0, mp_target: 0 };

        result = result.map((program) => {
          program.cumulative_budget =
            program.budgets.q1 +
            program.budgets.q2 +
            program.budgets.q3 +
            program.budgets.q4;
          program.cumulative_mp_target = program.mp_target
            ? program.mp_target.q1 +
              program.mp_target.q2 +
              program.mp_target.q3 +
              program.mp_target.q4
            : 0;

          program.approval_status = program?.approval?.status
            ? program.approval.status
            : "Pending for Approval";
          aggregates.budget += parseInt(program.cumulative_budget);
          aggregates.mp_target += parseInt(program.cumulative_mp_target);
          return program;
        });
        this.setState({ programs: result, aggregates });
      } else throw new Error(response);
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

  onDelete = (program) => {
    this.setState({
      showConfirmationDialog: true,
      selectedProgram: program.programId,
    });
  };

  closeConfirmationDialog = () => {
    this.setState({ showConfirmationDialog: false, selectedProgram: "" });
  };

  deleteProgram = async () => {
    this.setState({
      showConfirmationDialog: false,
      showLoader: true,
    });

    const token = getCookie("token").replaceAll('"', "");
    const userId = getCookie("userid").replaceAll('"', "");
    const config = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
      }),
    };

    try {
      const response = await fetch(
        `${this.API_URL}/program/${this.state.selectedProgram}`,
        config
      );
      if (response.status === 200) {
        await this.getPrograms();

        this.setState({
          toast: {
            active: true,
            heading: "A program was deleted successfuly",
            variant: "success",
          },
          selectedProgram: "",
        });
      } else throw new Error(response);
    } catch (err) {
      console.error(err);
      this.setState({
        toast: {
          active: true,
          heading: "Something went wrong, please try again in a few seconds",
          variant: "error",
        },
        selectedProgram: "",
      });
    }

    this.setState({ showLoader: false });
  };

  onEdit = () => {
    this.setState({
      toast: {
        active: true,
        variant: "success",
        heading: "The program was updated successfuly",
      },
    });
    this.getPrograms();
  };

  onGetHistoric = (startDate, endDate) => {
    this.getPrograms(startDate, endDate);
  };

  render() {
    return (
      <Container>
        <NavBar showPrograms={true} />
        <IconSettings iconPath="/assets/icons">
          <ConfirmationDialog
            message="Are you sure you want to delete this program?"
            isOpen={this.state.showConfirmationDialog}
            onClose={this.closeConfirmationDialog}
            onConfirm={this.deleteProgram}
          />
          {this.state.showLoader && (
            <Spinner
              size="small"
              variant="brand"
              assistiveText={{ label: "Loading..." }}
            />
          )}
          {this.state.toast.active && (
            <ToastContainer>
              <Toast
                labels={{ heading: this.state.toast.heading }}
                variant={this.state.toast.variant}
                duration={5000}
                onRequestClose={() =>
                  this.setState({ toast: { active: false } })
                }
              />
            </ToastContainer>
          )}
          <PlannerList
            onEdit={this.onEdit}
            onDelete={this.onDelete}
            onGetHistoric={this.onGetHistoric}
            data={this.state.programs}
            aggregates={this.state.aggregates}
            all={this.state.allPrograms}
          />
        </IconSettings>
      </Container>
    );
  }
}

export default withRouter(EditPlanner);
