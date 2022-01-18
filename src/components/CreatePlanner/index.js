import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import NavBar from "../NavBar";
import BudgetInput from "../BudgetInput/BudgetInput";
import update from "immutability-helper";
import { withRouter } from "react-router";
import ConfirmationDialog from "../Prompt";

import {
  Input,
  Datepicker,
  Button,
  Textarea,
  comboboxFilterAndLimit,
  Combobox,
  IconSettings,
  Icon,
  Modal,
} from "@salesforce/design-system-react";
import { getCookie } from "../../utils/cookie";
import { getAPIUrl } from "../../config/config";
import { Title } from "../CreateProgramPage/styles";
import "./index.css";

class CreatePlanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [
        {
          id: 0,
          offer: "",
          activities: [
            {
              id: 0,
              title: "",
              formatId: "",
              date: new Date(),
            },
            {
              id: 1,
              title: "",
              formatId: "",
              date: new Date(),
            },
          ],
        },
      ],
      showConfirmationDialog: false,
      planner_id: false,
      industries: [],
      apm1s: [],
      segments: [],
      personas: [],
      formats: [],
      formatsSelected: [],
      defaultFormats: [],
      regions: [],
      program: {
        selectedApm1s: [],
        selectedIndustries: [],
        selectedSegments: [],
        selectedPersonas: [],
        regionId: [],
        q1_budget: "",
        q2_budget: "",
        q3_budget: "",
        q4_budget: "",
        mp_target_q1: "",
        mp_target_q2: "",
        mp_target_q3: "",
        mp_target_q4: "",
        owner: "",
        abstract: "",
      },
      error: {},
    };
  }

  closeConfirmationDialog = () => {
    this.setState({ showConfirmationDialog: false });
  };

  async checkFormat() {
    try {
      let token = getCookie("token").replaceAll('"', "");
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let response = await fetch(`${this.API_URL}/format`, config);
      if (response.status === 200) {
        let { result } = await response.json();
        result = result.map((item) => ({ label: item.name, ...item }));
        let formats = result.map((el) => ({
          ...el,
          id: el.format_id,
          icon: (
            <Icon
              assistiveText={{ label: "Task" }}
              category="standard"
              name="task2"
            />
          ),
        }));
        this.setState({
          formats: [
            {
              label: "All",
              id: "all",
              icon: (
                <Icon
                  assistiveText={{ label: "Account" }}
                  category="standard"
                  name="campaign"
                />
              ),
            },
            ...formats,
          ],
        });
        let defaultFormats = this.getDefaultFornats(formats);

        this.setState({
          formatsSelected: defaultFormats,
          defaultFormats: formats,
        });
      } else {
        throw new Error(response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  getDefaultFornats = (formats) => {
    let defaultFormatNames = [
      "3rdParty-Virtual Event",
      "Exec Engagement",
      "Executive Visit",
      "F2F Event",
      "Webinar",
      "Webinar - 3rd Party",
      "Virtual Event",
      "SIC",
      "Launch",
    ];
    return formats.filter((format) => {
      if (!defaultFormatNames.includes(format.label)) return false;
      return true;
    });
  };

  getIndustry = async () => {
    try {
      let token = getCookie("token").replaceAll('"', "");
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const request = await fetch(`${this.API_URL}/industry`, config);
      const response = await request.json();
      const industry = response.result.map((item) => ({
        id: item.industryId,
        label: item.name,
      }));

      if (response.info.code === 200) this.setState({ industries: industry });
      else throw new Error(response.info.status);
    } catch (err) {
      this.showError(err);
    }
  };

  getSegment = async () => {
    try {
      let token = getCookie("token").replaceAll('"', "");
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const request = await fetch(`${this.API_URL}/segment`, config);
      const response = await request.json();
      const segment = response.result.map((item) => ({
        id: item.segmentId,
        label: item.name,
      }));
      if (response.info.code === 200)
        this.setState({
          segments: [
            {
              label: "All",
              id: "all",
            },
            ...segment,
          ],
        });
      else throw new Error(response.info.status);
    } catch (err) {
      this.showError(err);
    }
  };

  getRegions = async () => {
    try {
      let token = getCookie("token").replaceAll('"', "");
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const request = await fetch(`${this.API_URL}/region`, config);
      const response = await request.json();

      let regions = response.result.map((el) => ({ ...el, id: el.region_id }));

      if (response.info.code === 200) this.setState({ regions });
      else throw new Error(response.info.status);
    } catch (err) {
      this.showError(err);
    }
  };

  addOffer = () => {
    this.setState({
      offers: [
        ...this.state.offers,
        {
          id: this.state.offers.length + 1,
          offer: "",
          activities: [
            {
              id: 1,
              title: "",
              formatId: "",
              date: new Date(),
            },
            {
              id: 2,
              title: "",
              formatId: "",
              date: new Date(),
            },
          ],
        },
      ],
    });
  };

  addActivity = (id) => {
    const offer = this.state.offers.find((item) => {
      return item.id === id;
    });

    const newOffer = offer.activities.push({
      id: offer.activities.length + 1,
      title: "",
      format: "",
      date: new Date(),
    });

    this.setState(
      update(this.state.offers, {
        $splice: [
          [this.state.offers.findIndex((item) => item.id === id), 1, newOffer],
        ],
      })
    );
  };

  removeActivity = (offer, activity) => {
    // completed
    let offers = this.state.offers;
    const index = offer;
    let activities = offers[index];

    if (index > -1) {
      activities.activities.splice(activity, 1);
    }
    offers[index] = activities;

    this.setState({ offers });
  };

  removeOffer = (offerid) => {
    // complete and button alignments
    let offers = this.state.offers;
    const index = this.state.offers.findIndex((item) => item.id === offerid);
    if (index > -1) {
      offers.splice(index, 1);
    }
    this.setState({ offers });
  };

  getPersona = async () => {
    try {
      let token = getCookie("token").replaceAll('"', "");
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const request = await fetch(`${this.API_URL}/persona`, config);
      const response = await request.json();
      const persona = response.result.map((item) => ({
        id: item.personaId,
        label: item.name,
      }));

      if (response.info.code === 200) this.setState({ personas: persona });
      else throw new Error(response.info.status);
    } catch (err) {
      this.showError(err);
    }
  };

  getPlannerByID = async (id) => {
    try {
      let token = getCookie("token").replaceAll('"', "");
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const request = await fetch(
        `${this.API_URL}/program-planner/${id}`,
        config
      );
      let response = await request.json();

      let { result } = response;
      let { budgets, mp_target } = result;

      if (!mp_target) {
        mp_target = {};
      }

      this.setState({
        program: {
          selectedApm1s: result.apm,
          selectedIndustries: result.programIndustry,
          selectedSegments: result.segment,
          selectedPersonas: result.persona,
          regionId: result.region,
          q1_budget: budgets.q1,
          q2_budget: budgets.q2,
          q3_budget: budgets.q3,
          q4_budget: budgets.q4,
          mp_target_q1: mp_target.q1,
          mp_target_q2: mp_target.q2,
          mp_target_q3: mp_target.q3,
          mp_target_q4: mp_target.q4,
          abstract: result.abstract,
          name: result.programName,
          owner: result.programOwner,
          kpi: result.otherKPIs,
        },
        offers: result.offers.offers,
      });

      // if (response.info.code === 200) this.setState({ personas: persona });
      // else throw new Error(response.info.status);
    } catch (err) {
      console.log(err);
      // this.showError(err);
    }
  };

  handleDelete = async () => {
    this.setState({ showConfirmationDialog: false });
    const token = getCookie("token").replaceAll('"', "");
    const config = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: this.state.planner_id,
      }),
    };

    await fetch(
      `${this.API_URL}/program-planner/${this.state.planner_id}`,
      config
    )
      .then((res) => res.json())
      .then((res) => {
        window.location.replace("/planner-view");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleOpen = () => {
    this.setState({ isDeleteOpen: !this.state.isDeleteOpen });
  };

  getAPM1 = async () => {
    try {
      let token = getCookie("token").replaceAll('"', "");
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const request = await fetch(`${this.API_URL}/apm1`, config);
      const response = await request.json();
      const apm1 = response.result.map((item) => ({
        id: item.apm1Id,
        label: item.name,
      }));

      if (response.info.code === 200)
        this.setState({
          apm1s: [{ id: "234521", label: "All" }, ...apm1],
        });
      else throw new Error(response.info.status);
    } catch (err) {
      this.showError(err);
    }
  };

  validations = (input, data) => {
    let errors = { ...this.state.error };
    const inputs = [
      "name",
      "owner",
      "q1_budget",
      "q2_budget",
      "q3_budget",
      "q4_budget",
      "mp_target_q1",
      "mp_target_q2",
      "mp_target_q3",
      "mp_target_q4",
      "selectedIndustries",
      "regionId",
      "kpi",
      "selectedApm1s",
      "selectedSegments",
      "selectedPersonas",
      "abstract",
    ];

    if (input) {
      if (inputs.includes(input) && !data) {
        errors = { ...errors, [input]: "This field is required" };
      } else if (input === "year" && data.length > 0 && data.length !== 4) {
        errors = { ...errors, year: "This field must contain 4 character" };
      } else {
        delete errors[input];
      }
    } else {
      inputs.forEach((input) => {
        if (
          typeof this.state.program[input] === "number" &&
          this.state.program[input] >= 0
        ) {
          delete errors[input];
        } else if (
          this.state.program[input] &&
          input !== "year" &&
          this.state.program[input].length > 0
        ) {
          delete errors[input];
        } else {
          errors = { ...errors, [input]: "This field is required" };
        }
      });
    }

    this.setState({ error: errors });
    if (Object.keys(errors).length > 0) return false;

    return true;
  };

  handleChange = (value, data) => {
    const newRow = { ...this.state.program, [value]: data };
    this.validations(value, data);
    this.setState({ program: newRow });
  };

  handleSubmit = async () => {
    this.setState({ showLoader: true });

    try {
      let apm1Id = this.state.program.selectedApm1s;
      let industryId = this.state.program.selectedIndustries;
      let segmentId = this.state.program.selectedSegments;
      let personaId = this.state.program.selectedPersonas;
      let regionId = this.state.program.regionId;

      const token = getCookie("token").replaceAll('"', "");
      const userId = getCookie("userid").replaceAll('"', "");
      console.log(this.state.program.abstract);
      const body = {
        programId: userId,
        programName: this.state.program.name,
        programOwner: this.state.program.owner,
        budgets: {
          q1: Number(this.state.program.q1_budget),
          q2: Number(this.state.program.q2_budget),
          q3: Number(this.state.program.q3_budget),
          q4: Number(this.state.program.q4_budget),
        },
        mp_target: {
          q1: Number(this.state.program.mp_target_q1),
          q2: Number(this.state.program.mp_target_q2),
          q3: Number(this.state.program.mp_target_q3),
          q4: Number(this.state.program.mp_target_q4),
        },
        approval: {},
        region: regionId,
        apm: apm1Id,
        programIndustry: industryId,
        segment: segmentId,
        persona: personaId,
        abstract: this.state.program.abstract || "",
        offers: {
          offers: this.state.offers.length > 0 ? this.state.offers : [],
        },
      };
      if (this.state.program.kpi) body.otherKPIs = this.state.program.kpi;

      const config = {
        method: this.state.planner_id ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      };

      const response = await fetch(
        `${this.API_URL}/${
          this.state.planner_id ? "program-planner" : "program-planners"
        }/${this.state.planner_id ? this.state.planner_id : ""}`,
        config
      );

      if (response.status === 200) {
        // window.location.reload();
        this.props.history.push({
          pathname: "/planner-view",
          state: { newProgram: true },
        });
      } else throw new Error("Something went wrong, please try again");
    } catch (err) {
      console.log(err);
      // this.setState({ showLoader: false });
      // this.showError(err);
    }
  };

  setup = async (planner_id) => {
    if (window.location.hostname === "localhost")
      this.API_URL = "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();

    this.getIndustry();
    this.getAPM1();
    this.getRegions();
    this.getSegment();
    this.checkFormat();
    this.getPersona();
    if (planner_id) this.getPlannerByID(planner_id);
  };

  componentDidMount() {
    let planner_id = window.location.href.split("=");
    if (planner_id.length > 1) {
      // for editing
      this.setState({ planner_id: planner_id[1] });
      this.setup(planner_id[1]);
    } else {
      this.setup(false);
    }
  }

  render() {
    let { program } = this.state;
    let cumulative_budget =
      parseFloat(program.q1_budget) +
      parseFloat(program.q2_budget) +
      parseFloat(program.q3_budget) +
      parseFloat(program.q4_budget);

    let cumulative_mp_target =
      parseFloat(program.mp_target_q1) +
      parseFloat(program.mp_target_q2) +
      parseFloat(program.mp_target_q3) +
      parseFloat(program.mp_target_q4);

    return (
      <div style={{ padding: "1%", paddingTop: "5.6rem" }}>
        <NavBar />

        <IconSettings iconPath="assets/icons">
          <div style={{ border: "groove", padding: "2%" }}>
            <Title> Program Plan on a Page</Title>
            <div
              style={{ width: "100%", marginRight: "auto", textAlign: "end" }}
            >
              Cumulative Budget:{" "}
              <span style={{ fontWeight: "bold" }}>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(cumulative_budget)}
              </span>
            </div>
            <div
              style={{ width: "100%", marginRight: "auto", textAlign: "end" }}
            >
              Cumulative MP Target:{" "}
              <span style={{ fontWeight: "bold" }}>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(cumulative_mp_target)}
              </span>
            </div>
            <div style={{ width: "100%", overflowX: "hidden" }}>
              <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>
                Program Level Data
              </h2>
              <div>
                <div style={{ width: "50%", float: "left" }}>
                  <div style={{ padding: "1%" }}>
                    <Input
                      required
                      placeholder="Enter program name"
                      defaultValue={this.state.program.name}
                      label="Program Name"
                      onChange={(e) =>
                        this.handleChange("name", e.target.value)
                      }
                      errorText={this.state.error.name}
                    />
                  </div>
                  <div style={{ padding: "1%", display: "flex" }}>
                    <BudgetInput
                      onChange={(e, data) => {
                        this.handleChange("q1_budget", data.value);
                      }}
                      required
                      label="Q1 Budget"
                      defaultValue={this.state.program.q1_budget}
                      placeholder="Q1"
                      errorText={this.state.error.q1_budget}
                    />
                    <BudgetInput
                      onChange={(e, data) =>
                        this.handleChange("q2_budget", data.value)
                      }
                      required
                      defaultValue={this.state.program.q2_budget}
                      label="Q2 Budget"
                      placeholder="Q2"
                      errorText={this.state.error.q2_budget}
                    />
                    <BudgetInput
                      onChange={(e, data) =>
                        this.handleChange("q3_budget", data.value)
                      }
                      required
                      defaultValue={this.state.program.q3_budget}
                      label="Q3 Budget"
                      placeholder="Q3"
                      errorText={this.state.error.q3_budget}
                    />
                    <BudgetInput
                      onChange={(e, data) =>
                        this.handleChange("q4_budget", data.value)
                      }
                      required
                      label="Q4 Budget"
                      defaultValue={this.state.program.q4_budget}
                      placeholder="Q4"
                      errorText={this.state.error.q4_budget}
                    />
                  </div>
                  <div style={{ padding: "1%" }}>
                    <Combobox
                      required
                      events={{
                        onSelect: (event, data) => {
                          return (
                            data.selection.length &&
                            this.handleChange("regionId", data.selection)
                          );
                        },
                      }}
                      labels={{ label: "Region" }}
                      options={this.state.regions}
                      selection={this.state.program.regionId}
                      value="region"
                      variant="readonly"
                      errorText={this.state.error.regionId}
                    />
                  </div>
                  <div style={{ padding: "1%" }}>
                    <Textarea
                      label="Abstract"
                      onChange={(e) => {
                        this.handleChange("abstract", e.target.value);
                      }}
                      defaultValue={this.state.program.abstract}
                      placeholder="Enter Abstract"
                      required
                      errorText={this.state.error.abstract}
                    />
                  </div>

                  <div style={{ padding: "1%" }}>
                    <Textarea
                      label="Other Kpi's"
                      onChange={(e) => {
                        this.handleChange("kpi", e.target.value);
                      }}
                      defaultValue={this.state.program.kpi}
                      placeholder="Enter KPI's"
                    />
                  </div>
                </div>
                <div style={{ float: "right", width: "50%" }}>
                  <div style={{ padding: "1%" }}>
                    <Input
                      required
                      placeholder="Program Owner"
                      onChange={(e) => {
                        this.handleChange("owner", e.target.value);
                      }}
                      defaultValue={this.state.program.owner}
                      label="Owner"
                      errorText={this.state.error.owner}
                    />
                  </div>
                  {/*  */}
                  <div style={{ padding: "1%", display: "flex" }}>
                    <BudgetInput
                      onChange={(e, data) => {
                        this.handleChange("mp_target_q1", data.value);
                      }}
                      required
                      label="MP Target (Q1)"
                      defaultValue={this.state.program.mp_target_q1}
                      placeholder="Q1"
                      errorText={this.state.error.mp_target_q1}
                    />
                    <BudgetInput
                      onChange={(e, data) =>
                        this.handleChange("mp_target_q2", data.value)
                      }
                      required
                      defaultValue={this.state.program.mp_target_q2}
                      label="MP Target (Q2)"
                      placeholder="Q2"
                      errorText={this.state.error.mp_target_q2}
                    />
                    <BudgetInput
                      onChange={(e, data) =>
                        this.handleChange("mp_target_q3", data.value)
                      }
                      required
                      defaultValue={this.state.program.mp_target_q3}
                      label="MP Target (Q3)"
                      placeholder="Q3"
                      errorText={this.state.error.mp_target_q3}
                    />
                    <BudgetInput
                      onChange={(e, data) =>
                        this.handleChange("mp_target_q4", data.value)
                      }
                      required
                      label="MP Target (Q4)"
                      defaultValue={this.state.program.mp_target_q4}
                      placeholder="Q4"
                      errorText={this.state.error.mp_target_q4}
                    />
                  </div>
                  {/*  */}
                  <div style={{ padding: "1%" }}>
                    <Combobox
                      required
                      events={{
                        onRequestRemoveSelectedOption: (event, data) => {
                          this.setState({
                            program: {
                              ...this.state.program,
                              selectedApm1s: data.selection,
                            },
                          });
                        },
                        onSelect: (event, data) =>
                          data.selection.length &&
                          this.handleChange("selectedApm1s", data.selection),
                      }}
                      labels={{
                        label: "APM 1",
                        placeholder: "Select an option",
                      }}
                      menuItemVisibleLength={5}
                      multiple
                      variant="inline-listbox"
                      options={comboboxFilterAndLimit({
                        limit: this.state.apm1s.length,
                        options: this.state.apm1s,
                        selection: this.state.program.selectedApm1s,
                      })}
                      selection={this.state.program.selectedApm1s}
                      errorText={this.state.error.selectedApm1s}
                    />
                  </div>
                  <div style={{ padding: "1%" }}>
                    <Combobox
                      variant="inline-listbox"
                      required
                      events={{
                        onRequestRemoveSelectedOption: (event, data) => {
                          this.setState({
                            program: {
                              ...this.state.program,
                              selectedIndustries: data.selection,
                            },
                          });
                        },
                        onSelect: (event, data) =>
                          data.selection.length &&
                          this.handleChange(
                            "selectedIndustries",
                            data.selection
                          ),
                      }}
                      labels={{
                        label: "Industry",
                        placeholder: "Select an option",
                      }}
                      menuItemVisibleLength={5}
                      multiple
                      options={comboboxFilterAndLimit({
                        limit: this.state.industries.length,
                        options: this.state.industries,
                        selection: this.state.program.selectedIndustries,
                      })}
                      selection={this.state.program.selectedIndustries}
                      errorText={this.state.error.selectedIndustries}
                    />
                  </div>
                  <div style={{ padding: "1%" }}>
                    <Combobox
                      required
                      variant="inline-listbox"
                      events={{
                        onRequestRemoveSelectedOption: (event, data) => {
                          this.setState({
                            program: {
                              ...this.state.program,
                              selectedPersonas: data.selection,
                            },
                          });
                        },
                        onSelect: (event, data) =>
                          data.selection.length &&
                          this.handleChange("selectedPersonas", data.selection),
                      }}
                      labels={{
                        label: "Persona",
                        placeholder: "Select an option",
                      }}
                      menuItemVisibleLength={5}
                      multiple
                      options={comboboxFilterAndLimit({
                        limit: this.state.personas.length,
                        options: this.state.personas,
                        selection: this.state.program.selectedPersonas,
                      })}
                      selection={this.state.program.selectedPersonas}
                      errorText={this.state.error.selectedPersonas}
                    />
                  </div>
                  <div style={{ padding: "1%", zIndex: 2 }}>
                    <Combobox
                      variant="inline-listbox"
                      required
                      events={{
                        onRequestRemoveSelectedOption: (event, data) => {
                          this.setState({
                            program: {
                              ...this.state.program,
                              selectedSegments: data.selection,
                            },
                          });
                        },
                        onSelect: (event, data) =>
                          data.selection.length &&
                          this.handleChange("selectedSegments", data.selection),
                      }}
                      labels={{
                        label: "Segment",
                        placeholder: "Select an option",
                      }}
                      menuItemVisibleLength={5}
                      multiple
                      options={comboboxFilterAndLimit({
                        limit: this.state.segments.length,
                        options: this.state.segments,
                        selection: this.state.program.selectedSegments,
                      })}
                      selection={this.state.program.selectedSegments}
                      errorText={this.state.error.selectedSegments}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>
                Offer Level Data
              </h2>
            </div>
            <div style={{ marginTop: "5px" }}>
              {this.state.offers.map((offer, i) => {
                return (
                  <div style={{ padding: "2%" }}>
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          width: "50%",
                          paddingBottom: "1%",
                        }}
                      >
                        <Input
                          required
                          placeholder="Offer Name"
                          label={`Offer Name`}
                          value={offer.offer}
                          onChange={(e) => {
                            let offers = [...this.state.offers];
                            offers[i].offer = e.target.value;
                            this.setState({ offers });
                          }}
                          errorText={this.state.error.offer_name}
                        />
                      </div>
                      <div
                        style={{
                          marginTop: "auto",
                          marginBottom: "auto",
                          marginLeft: "20px",
                        }}
                      >
                        {this.state.offers.length > 1 && (
                          <Button
                            label="Remove Offer"
                            variant="destructive"
                            onClick={() => this.removeOffer(offer.id)}
                          />
                        )}
                      </div>
                    </div>
                    <h2
                      style={{
                        fontWeight: "500",
                        fontSize: "17px",
                        marginTop: "4px",
                      }}
                    >
                      Activities
                    </h2>

                    {offer.activities.map((activity, k) => {
                      return (
                        <div
                          style={{
                            margin: "auto",
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "10px",
                            paddingLeft: "10px",
                          }}
                        >
                          <div
                            style={{
                              paddingLeft: "15px",
                              display: "inline-block",
                              width: "95%",
                            }}
                          >
                            <div
                              style={{
                                width: "50%",
                                margin: "5px",
                                display: "inline-block",
                              }}
                            >
                              <Input
                                required
                                placeholder="Title"
                                label={"Title"}
                                value={activity.title}
                                onChange={(e) => {
                                  let offers = [...this.state.offers];
                                  offers[i].activities[k].title =
                                    e.target.value;
                                  this.setState({ offers });
                                }}
                              />
                            </div>
                            <div
                              style={{
                                width: "30%",
                                margin: "5px",
                                display: "inline-block",
                              }}
                            >
                              <Combobox
                                variant="inline-listbox"
                                events={{
                                  onchange: (e, val) => {
                                    let offers = [...this.state.offers];
                                    offers[i].activities[k].formatId =
                                      e.target.value;
                                    this.setState({ offers });
                                  },

                                  onSelect: (event, data) => {
                                    if (data.selection.length) {
                                      let offers = [...this.state.offers];
                                      offers[i].activities[k].formatId =
                                        data.selection[0];
                                      this.setState({ offers });
                                    }
                                  },
                                }}
                                labels={{ label: "Format" }}
                                name="format"
                                options={this.state.defaultFormats}
                                selection={[{ ...activity.formatId }]}
                                value="format"
                                variant="readonly"
                                required
                                errorText={this.state.error.format}
                              />
                            </div>
                            <div
                              style={{
                                width: "15%",
                                margin: "5px",
                                display: "inline-block",
                              }}
                            >
                              <Datepicker
                                required
                                label="Tentative Date"
                                formatter={(date) =>
                                  date ? moment(date).format("MM/DD/YYYY") : ""
                                }
                                parser={(dateString) => {
                                  return moment(
                                    dateString,
                                    "MM/DD/YYYY"
                                  ).toDate();
                                }}
                                value={moment(activity.date).format(
                                  "MM/DD/YYYY"
                                )}
                                onChange={(event, data) => {
                                  let offers = [...this.state.offers];
                                  offers[i].activities[k].date = moment(
                                    data.formattedDate
                                  ).format("MM/DD/YYYY");
                                  this.setState({ offers });
                                }}
                              />
                            </div>
                          </div>
                          <div
                            style={{
                              width: "5%",
                              margin: "auto",
                              textAlign: "center",
                              cursor: "pointer",
                            }}
                            onClick={() => this.removeActivity(i, k)}
                          >
                            {" "}
                            <Icon
                              assistiveText={{ lable: "Warning" }}
                              category="utility"
                              colorVariant="error"
                              name="delete"
                              size="x-small"
                              onClick={() => this.removeActivity(i, k)}
                            />
                          </div>
                        </div>
                      );
                    })}
                    <div
                      style={{
                        paddingLeft: "1.5%",
                        display: "inline-block",
                        textAlign: "end",
                        width: "100%",
                      }}
                    >
                      <Button
                        label="Add Activity"
                        variant="brand"
                        onClick={() => this.addActivity(offer.id)}
                      />
                    </div>
                  </div>
                );
              })}
              {this.state.offers.length < 3 && (
                <div style={{ paddingLeft: "0.5%", paddingBottom: "2%" }}>
                  <Button
                    label="Add Offer"
                    variant="brand"
                    onClick={this.addOffer}
                  />
                </div>
              )}

              <div style={{ textAlign: "center", paddingTop: "2%" }}>
                <Button
                  onClick={() => this.validations() && this.handleSubmit()}
                  style={{ backgroundColor: "#21bf4b", color: "white" }}
                >
                  {this.state.planner_id ? "Update" : "Save"}
                </Button>
                <Link to="/planner-view" style={{ paddingLeft: "5px" }}>
                  <Button
                    style={{ backgroundColor: "#b0b0b0", color: "white" }}
                  >
                    Cancel
                  </Button>
                </Link>
                {this.state.planner_id && (
                  <span
                    onClick={() =>
                      this.setState({ showConfirmationDialog: true })
                    }
                    style={{ cursor: "pointer", paddingLeft: "5px" }}
                    title="delete"
                  >
                    <Button
                      style={{ backgroundColor: "#ba0517", color: "white" }}
                    >
                      Delete
                    </Button>
                  </span>
                )}
              </div>
            </div>
          </div>

          <Modal
            isOpen={this.state.isDeleteOpen}
            footer={[
              <Button label="Cancel" onClick={this.toggleOpen} />,
              <Button label="Save" variant="brand" onClick={this.toggleOpen} />,
            ]}
            onRequestClose={this.toggleOpen}
            heading="New Opportunity"
          >
            <section className="slds-p-around_large">
              <div className="slds-form-element slds-m-bottom_large">
                <label className="slds-form-element__label" htmlFor="opptyName">
                  Opportunity Name
                </label>
                <div className="slds-form-element__control">
                  <input
                    id="opptyName"
                    className="slds-input"
                    type="text"
                    placeholder="Enter name"
                  />
                </div>
              </div>
              <div className="slds-form-element slds-m-bottom_large">
                <label
                  className="slds-form-element__label"
                  htmlFor="description"
                >
                  Opportunity Description
                </label>
                <div className="slds-form-element__control">
                  <textarea
                    id="description"
                    className="slds-textarea"
                    placeholder="Enter description"
                  />
                </div>
              </div>

              <div className="slds-form-element slds-m-bottom_large">
                <label className="slds-form-element__label" htmlFor="amount">
                  Amount
                </label>
                <div className="slds-form-element__control">
                  <input
                    id="amount"
                    className="slds-input"
                    type="text"
                    placeholder="Enter Amount"
                  />
                </div>
              </div>
            </section>
          </Modal>
          <ConfirmationDialog
            message="Are you sure you want to delete this planner?"
            isOpen={this.state.showConfirmationDialog}
            onClose={this.closeConfirmationDialog}
            onConfirm={this.handleDelete}
          />
        </IconSettings>
      </div>
    );
  }
}

export default withRouter(CreatePlanner);
