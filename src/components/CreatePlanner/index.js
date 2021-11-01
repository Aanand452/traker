import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import NavBar from "../NavBar";
import BudgetInput from "../BudgetInput/BudgetInput";
import update from "immutability-helper";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import {
  Input,
  Datepicker,
  Button,
  Textarea,
  comboboxFilterAndLimit,
  Combobox,
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
          ],
        },
      ],
      planner_id: false,
      industries: [],
      apm1s: [],
      segments: [],
      personas: [],
      regions: [],
      program: {
        selectedApm1s: [],
        selectedIndustries: [],
        selectedSegments: [],
        selectedPersonas: [],
        q1_budget: "",
        q2_budget: "",
        q3_budget: "",
        q4_budget: "",
        owner: "",
        abstract: "",
      },
      error: {},
    };
  }

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

      if (response.info.code === 200) this.setState({ segments: segment });
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
    console.log(offer, activity);
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
      console.log(response);
      let { budgets } = result;

      this.setState({
        program: {
          selectedApm1s: result.apm,
          selectedIndustries: result.programIndustry,
          selectedSegments: result.segment,
          selectedPersonas: result.persona,
          regionId: this.state.regions.filter(
            (item) => result.region === item.id
          ),
          q1_budget: budgets.q1,
          q2_budget: budgets.q2,
          q3_budget: budgets.q3,
          q4_budget: budgets.q4,
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

      if (response.info.code === 200) this.setState({ apm1s: apm1 });
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
      "budget",
      "metrics",
      "customerMessage",
      "regionId",
      "selectedApm1s",
      "selectedIndustries",
      "selectedSegments",
      "selectedPersonas",
      "year",
      "quarter",
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
        } else if (this.state.program["year"].length === 4) {
          delete errors["year"];
        } else {
          if (
            this.state.program["year"].length !== 4 &&
            this.state.program["year"].length > 0
          ) {
            errors = {
              ...errors,
              [input]: "This field is required",
              year: "This field must contain 4 character",
            };
          } else {
            errors = { ...errors, [input]: "This field is required" };
          }
        }
      });
    }

    this.setState({ error: errors });
    if (Object.keys(errors).length > 0) return false;

    return true;
  };

  handleChange = (value, data) => {
    if (value === "year" && isNaN(data)) {
      this.setState({ year: "" });
      return;
    }

    const newRow = { ...this.state.program, [value]: data };
    console.log(newRow);
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

      const token = getCookie("token").replaceAll('"', "");
      const userId = getCookie("userid").replaceAll('"', "");

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
        region: this.state.program.regionId[0].region_id,
        apm: apm1Id,
        programIndustry: industryId,
        segment: segmentId,
        persona: personaId,
        abstract: this.state.program.abstract || "",
        offers: {
          offers:
            this.state.offers[0].offer.length > 0 ? this.state.offers : [],
        },
      };
      if (this.state.program.kpi) body.otherKPIs = this.state.program.kpi;
      console.log(body);

      const config = {
        method: this.state.planner_id ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      };

      console.log(JSON.stringify(body));

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
    this.getPersona();
    console.log(planner_id);
    if (planner_id) this.getPlannerByID(planner_id);
  };

  componentDidMount() {
    console.log(11);
    let planner_id = window.location.href.split("=");
    if (planner_id.length > 1) {
      console.log(planner_id[1]);
      // for editing
      this.setState({ planner_id: planner_id[1] });
      this.setup(planner_id[1]);
    } else {
      this.setup(false);
    }
  }

  render() {
    return (
      <div style={{ padding: "1%", paddingTop: "5.6rem" }}>
        <NavBar />

        <div style={{ border: "groove", padding: "2%" }}>
          <Title> Create Program Planner</Title>
          <div style={{ width: "100%", overflow: "hidden" }}>
            <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>Program</h2>
            <div>
              <div style={{ width: "50%", float: "left" }}>
                <div style={{ padding: "1%" }}>
                  <Input
                    required
                    placeholder="Enter program name"
                    defaultValue={this.state.program.name}
                    label="Program Name"
                    onChange={(e) => this.handleChange("name", e.target.value)}
                  />
                </div>
                <div style={{ padding: "1%", display: "flex" }}>
                  <BudgetInput
                    onChange={(e, data) => {
                      console.log(e.target.value);
                      this.handleChange("q1_budget", data.value);
                    }}
                    required
                    label="Q1 Budget"
                    defaultValue={this.state.program.q1_budget}
                    placeholder="Q1"
                  />
                  <BudgetInput
                    onChange={(e, data) =>
                      this.handleChange("q2_budget", data.value)
                    }
                    required
                    defaultValue={this.state.program.q2_budget}
                    label="Q2 Budget"
                    placeholder="Q2"
                  />
                  <BudgetInput
                    onChange={(e, data) =>
                      this.handleChange("q3_budget", data.value)
                    }
                    required
                    defaultValue={this.state.program.q3_budget}
                    label="Q3 Budget"
                    placeholder="Q3"
                  />
                  <BudgetInput
                    onChange={(e, data) =>
                      this.handleChange("q4_budget", data.value)
                    }
                    required
                    label="Q4 Budget"
                    defaultValue={this.state.program.q4_budget}
                    placeholder="Q4"
                  />
                </div>
                <div style={{ padding: "1%" }}>
                  <Combobox
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
                        this.handleChange("selectedIndustries", data.selection),
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
                    events={{
                      onSelect: (event, data) =>
                        data.selection.length &&
                        this.handleChange("regionId", data.selection),
                    }}
                    labels={{ label: "Target Region" }}
                    options={this.state.regions}
                    selection={this.state.program.regionId}
                    value="region"
                    variant="readonly"
                    errorText={this.state.error.regionId}
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
                  />
                </div>
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
                      label: "APM",
                      placeholder: "Select an option",
                    }}
                    menuItemVisibleLength={5}
                    multiple
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
                    required
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
                <div style={{ padding: "1%" }}>
                  <Combobox
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
                <div style={{ padding: "1%" }}>
                  <Textarea
                    label="Abstract"
                    onChange={(e) => {
                      this.handleChange("abstract", e.target.value);
                    }}
                    defaultValue={this.state.program.abstract}
                    placeholder="Enter Abstract"
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", paddingTop: "2%" }}>
            {/* <Link to="/planner-view"> */}
            <Button onClick={this.handleSubmit}>
              {this.state.planner_id ? "Update" : "Save"}
            </Button>
            {/* </Link> */}
            <Button
              onClick={() =>
                this.setState({
                  program: {
                    selectedApm1s: [],
                    selectedIndustries: [],
                    selectedSegments: [],
                    selectedPersonas: [],
                    q1_budget: "",
                    q2_budget: "",
                    q3_budget: "",
                    q4_budget: "",
                    owner: "",
                    abstract: "",
                    name: "",
                  },
                })
              }
            >
              Reset
            </Button>
          </div>
          <div style={{ display: "flex" }}>
            <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>Offers</h2>
            <div style={{ paddingLeft: "0.5%", paddingBottom: "2%" }}>
              <Button
                label="Add Offer"
                variant="brand"
                onClick={this.addOffer}
              />
            </div>
          </div>

          <div style={{ marginTop: "5px" }}>
            {this.state.offers.map((offer, i) => {
              return (
                <div style={{ padding: "2%" }}>
                  <div style={{ display: "flex", justifyContent: "left" }}>
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
                      />
                    </div>
                    <div
                      style={{
                        paddingLeft: "1.5%",
                        marginRight: "auto",
                        marginTop: "auto",
                        marginBottom: "auto",
                      }}
                    >
                      <Button
                        label="Remove Offer"
                        variant="destructive"
                        onClick={() => this.removeOffer(offer.id)}
                      />
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
                                offers[i].activities[k].title = e.target.value;
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
                            <Input
                              required
                              placeholder="Format"
                              label="Format"
                              value={activity.format}
                              onChange={(e) => {
                                let offers = [...this.state.offers];
                                offers[i].activities[k].format = e.target.value;
                                this.setState({ offers });
                              }}
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
                                date ? moment(date).format("DD/MM/YYYY") : ""
                              }
                              parser={(dateString) =>
                                moment(dateString, "DD/MM/YYYY").toDate()
                              }
                              value={activity.date}
                              onChange={(event, data) => {
                                let offers = [...this.state.offers];
                                offers[i].activities[k].date = moment(
                                  data.formattedDate
                                ).format("DD/MM/YYYY");
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
                          }}
                        >
                          <Button
                            label="-"
                            variant="destructive"
                            onClick={() => this.removeActivity(i, k)}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <div style={{ paddingLeft: "1.5%", display: "inline-block" }}>
                    <Button
                      label="add Activity"
                      variant="brand"
                      onClick={() => this.addActivity(offer.id)}
                    />
                  </div>
                </div>
              );
            })}

            <div style={{ textAlign: "center" }}>
              <Button
                onClick={this.handleSubmit}
                label={this.state.planner_id ? "Update" : "Save"}
                variant="brand"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreatePlanner);
