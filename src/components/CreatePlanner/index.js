import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import NavBar from "../NavBar";
import BudgetInput from "../BudgetInput/BudgetInput";
import update from "immutability-helper";

import {
  Icon,
  Input,
  Datepicker,
  Button,
  Textarea,
  Expression,
  ToastContainer,
  IconSettings,
  comboboxFilterAndLimit,
  Checkbox,
  Combobox,
} from "@salesforce/design-system-react";
import { FormContainer, Container, Sfdch1NewRow } from "./styles";
import { getCookie } from "../../utils/cookie";
import { getAPIUrl } from "../../config/config";

class CreatePlanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [
        {
          id: 1,
          offer: "",
          activities: [
            {
              id: 1,
              title: "",
              format: "",
              date: new Date(),
            },
          ],
        },
      ],
      industries: [],
      segments: [],
      personas: [],
      regions: [],
      program: {
        selectedApm1s: [],
        selectedApm2s: [],
        selectedLifecycleStages: [],
        selectedIndustries: [],
        selectedSegments: [],
        selectedPersonas: [],
        year: "",
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
          activities: [{ id: 1, title: "", format: "", date: new Date() }],
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
    const index = this.state.offers.findIndex((item) => item.id === offer);
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

    this.validations(value, data);
    this.setState({ program: newRow });
  };

  setup = async () => {
    if (window.location.hostname === "localhost")
      this.API_URL = "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();

    this.getIndustry();
    this.getRegions();
    this.getSegment();
    this.getPersona();
  };

  componentDidMount() {
    this.setup();
  }

  render() {
    return (
      <div style={{ padding: "1%", paddingTop: "5.6rem" }}>
        <NavBar />

        <div style={{ border: "groove", padding: "2%" }}>
          <div style={{ fontSize: "40px", textAlign: "center" }}>
            Program Planner
          </div>
          <div style={{ width: "100%", overflow: "hidden" }}>
            <div>
              <div style={{ width: "50%", float: "left" }}>
                <div style={{ padding: "1%" }}>
                  <Input
                    required
                    placeholder="Enter program name"
                    label="Program Name"
                  />
                </div>
                <div style={{ padding: "1%", display: "flex" }}>
                  <BudgetInput
                    onChange={(e, t) => console.log(e, t)}
                    required
                    label="Q1 Budget"
                    placeholder="Q1"
                  />
                  <BudgetInput
                    onChange={(e, t) => console.log(e, t)}
                    required
                    label="Q2 Budget"
                    placeholder="Q2"
                  />
                  <BudgetInput
                    onChange={(e, t) => console.log(e, t)}
                    required
                    label="Q3 Budget"
                    placeholder="Q3"
                  />
                  <BudgetInput
                    onChange={(e, t) => console.log(e, t)}
                    required
                    label="Q4 Budget"
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
                  <Textarea label="Other Kpi's" placeholder="Enter KPI's" />
                </div>
              </div>
              <div style={{ float: "right", width: "50%" }}>
                <div style={{ padding: "1%" }}>
                  <Input required placeholder="Program Owner" label="Owner" />
                </div>
                <div style={{ padding: "1%" }}>
                  <Input required placeholder="Select an Option" label="AMP" />
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
                  <Textarea label="Abstract" placeholder="Enter Abstract" />
                </div>
              </div>
              <div style={{ textAlign: "center", paddingTop: "2%" }}>
                <Link to="/planner-view">
                  <Button>Save</Button>
                </Link>
                <Button>Reset</Button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "10px" }}>
          {this.state.offers.map((offer, i) => {
            return (
              <div style={{ border: "groove", padding: "2%" }}>
                <div
                  style={{ width: "50%", margin: "10px", paddingBottom: "1%" }}
                >
                  <Input
                    required
                    placeholder="Offer Name"
                    label={`Offer Name`}
                    value={offer.offer}
                  />
                </div>
                {offer.activities.map((activity, k) => {
                  return (
                    <div
                      style={{
                        margin: "auto",
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <div
                        style={{
                          border: "groove",
                          padding: "1%",
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
                          onClick={() =>
                            this.removeActivity(offer.id, activity.id)
                          }
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
                <div style={{ paddingLeft: "1.5%", display: "inline-block" }}>
                  <Button
                    label="remove Offer"
                    variant="destructive"
                    onClick={() => this.removeOffer(offer.id)}
                  />
                </div>
              </div>
            );
          })}

          <div style={{ paddingLeft: "0.5%", paddingBottom: "2%" }}>
            <Button label="add Offer" variant="brand" onClick={this.addOffer} />
          </div>

          <div style={{ textAlign: "center" }}>
            <Link to="/planner-view">
              <Button label="Save" variant="brand" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePlanner;
