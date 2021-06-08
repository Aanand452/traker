import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  IconSettings,
  ToastContainer,
  Toast,
  Input,
  Combobox,
  Button,
  Textarea,
  Panel,
  Spinner,
  comboboxFilterAndLimit,
} from '@salesforce/design-system-react';

import BudgetInput from '../BudgetInput/BudgetInput'

import { Title, Container } from './styles';
import { getAPIUrl } from '../../config/config';
import { getCookie } from '../../utils/cookie';

class CreateProgramPage extends Component {
  state = {
    regions: [],
    lifecycleStages: [],
    apm1s: [],
    apm2s: [],
    industries: [],
    segments: [],
    personas: [],
    quarter: [{id:"1", label:"Q1"}, {id:"2", label:"Q2"}, {id:"3", label:"Q3"}, {id:"4", label:"Q4"}],
    program: {
      selectedApm1s: [],
      selectedApm2s: [],
      selectedLifecycleStages: [],
      selectedIndustries: [],
      selectedSegments: [],
      selectedPersonas: [],
      year: ""
    },
    error: {},
    toast: {
      active: false
    },
    showLoader: false
  };

  setup = async () => {
    if(window.location.hostname === 'localhost') this.API_URL =  "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();

    this.getRegions();
    this.getLifecycles();
    this.getAPM1();
    this.getAPM2();
    this.getIndustry();
    this.getSegment();
    this.getPersona();
  };

  getRegions = async () => {
    try {
      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const request = await fetch(`${this.API_URL}/region`, config);
      const response = await request.json();

      let regions = response.result.map(el => ({...el, id: el.region_id}))

      if(response.info.code === 200) this.setState({ regions });
      else throw new Error(response.info.status);
    } catch (err) {
      this.showError(err);
    }
  }

  getLifecycles = async () => {
    try {
      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const request = await fetch(`${this.API_URL}/lifecycle-stage`, config);
      const response = await request.json();
      const lifecycles = response.result.map(item => ({id: item.lifecycleStageId, label: item.name}));

      if(response.info.code === 200) this.setState({ lifecycleStages: lifecycles });
      else throw new Error(response.info.status);
    } catch (err) {
      this.showError(err);
    }
  };

  getAPM1 = async () => {
    try {
      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const request = await fetch(`${this.API_URL}/apm1`, config);
      const response = await request.json();
      const apm1 = response.result.map(item => ({id: item.apm1Id, label: item.name}));


      if(response.info.code === 200) this.setState({ apm1s: apm1 });
      else throw new Error(response.info.status);
    } catch (err) {
      this.showError(err);
    }
  };

  getAPM2 = async () => {
    try {
      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const request = await fetch(`${this.API_URL}/apm2`, config);
      const response = await request.json();
      const apm2 = response.result.map(item => ({id: item.apm2Id, label: item.name}));

      if(response.info.code === 200) this.setState({ apm2s: apm2 });
      else throw new Error(response.info.status);
    } catch (err) {
      this.showError(err);
    }
  };

  getIndustry = async () => {
    try {
      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const request = await fetch(`${this.API_URL}/industry`, config);
      const response = await request.json();
      const industry = response.result.map(item => ({id: item.industryId, label: item.name}));

      if(response.info.code === 200) this.setState({ industries : industry });
      else throw new Error(response.info.status);
    } catch (err) {
      this.showError(err);
    }
  };

  getSegment = async () => {
    try {
      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const request = await fetch(`${this.API_URL}/segment`, config);
      const response = await request.json();
      const segment = response.result.map(item => ({id: item.segmentId, label: item.name}));

      if(response.info.code === 200) this.setState({ segments: segment });
      else throw new Error(response.info.status);
    } catch (err) {
      this.showError(err);
    }
  };

  getPersona = async () => {
    try {
      let token = getCookie('token').replaceAll('"','');
      const config = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      const request = await fetch(`${this.API_URL}/persona`, config);
      const response = await request.json();
      const persona = response.result.map(item => ({id: item.personaId, label: item.name}));

      if(response.info.code === 200) this.setState({ personas: persona });
      else throw new Error(response.info.status);
    } catch (err) {
      this.showError(err);
    }
  };

  validations = (input, data) => {
    let errors = {...this.state.error};
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
      "quarter"
    ];

    if (input) {
      if(inputs.includes(input) && !data) {
        errors = {...errors, [input]: "This field is required"};
      } else if(input === "year" && data.length > 0 && data.length !== 4) {
        errors = {...errors, year: "This field must contain 4 character"};
      } else {
        delete errors[input];
      }
    } else {
      inputs.forEach((input) => {
        if(typeof this.state.program[input] === "number" && this.state.program[input] >= 0) {
          delete errors[input];
        } else if(this.state.program[input] && input !== "year"  && this.state.program[input].length > 0) {
          delete errors[input];
        } else if(this.state.program["year"].length === 4) {
          delete errors["year"];
        } else {
          if(this.state.program["year"].length !== 4 && this.state.program["year"].length > 0) {
            errors = {...errors, [input]: "This field is required", year: "This field must contain 4 character"};
          } else {
            errors = {...errors, [input]: "This field is required"};
          }
        }
      })
    }

    this.setState({error: errors});
    if(Object.keys(errors).length > 0) return false;

    return true;
  };

  handleChange = (value, data) => {
    
    if(value === "year" && isNaN(data)) {
      this.setState({year: ""});
      return;
    }

    const newRow = {...this.state.program, [value]: data};

    this.validations(value, data);
    this.setState({program: newRow});
  };

  handleSubmit = async () => {
    this.setState({showLoader: true});

    try {

      let apm1Id = this.state.program.selectedApm1s.map(el => el.id);
      let industryId = this.state.program.selectedIndustries.map(el => el.id);
      let segmentId = this.state.program.selectedSegments.map(el => el.id);
      let personaId = this.state.program.selectedPersonas.map(el => el.id);

      const token = getCookie('token').replaceAll('"','');
      const userId = getCookie('userid').replaceAll('"','');
      const body = {
        userId,
        name: this.state.program.name,
        owner: this.state.program.owner,
        budget: Number(this.state.program.budget),
        metrics: Number(this.state.program.metrics),
        customerMessage: this.state.program.customerMessage,
        quarter: Number(this.state.program.quarter[0].id),
        year: Number(this.state.program.year),
        regionId: this.state.program.regionId[0].region_id,
        apm1Id,
        industryId,
        segmentId,
        personaId,
      };

      if(this.state.program.selectedLifecycleStages) body.lifecycleStageId = this.state.program.selectedLifecycleStages.map(el => el.id);
      if(this.state.program.selectedApm2s) body.apm2Id = this.state.program.selectedApm2s.map(el => el.id);
      if(this.state.program.kpi) body.otherKpis = this.state.program.kpi;

      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      };

      const response = await fetch(`${this.API_URL}/program`, config);

      if(response.status === 200) {
        this.props.history.push({
          pathname: '/programs-view',
          state: { newProgram: true }
        });
      } else throw new Error('Something went wrong, please try again');
    } catch (err) {
      this.setState({showLoader: false});
      this.showError(err)
    };
  };

  showError = (err) => {
    this.setState({
      toast: {
        active: true,
        variant: 'error',
        heading: 'Something went wrong, please try again.'
      }
    });
    console.error(err);
  };

  componentDidMount() {
    this.setup();
  };

  render() {
    return (
      <Container>
        <IconSettings iconPath="assets/icons">
          {this.state.toast.active && (
            <ToastContainer>
              <Toast
                labels={{heading: this.state.toast.heading}}
                variant={this.state.toast.variant}
                duration={5000}
                onRequestClose={() => this.setState({toast: {active: false}})}
              />
            </ToastContainer>
          )}
          {this.state.showLoader && <Spinner size="small" variant="brand" assistiveText={{ label: "Loading..." }} />}

          <Panel>
            <Title>Create new program</Title>
            <div className="slds-grid slds-wrap slds-p-around_medium slds_full-width">
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Input
                  required
                  placeholder="Enter program name"
                  label="Program Name"
                  onChange={(event, data) => this.handleChange("name", data.value)}
                  errorText={this.state.error.name}
                  value={this.state.program.name || ''}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Input
                  required
                  placeholder="Enter program owner"
                  label="Program Owner"
                  onChange={(event, data) => this.handleChange("owner", data.value)}
                  errorText={this.state.error.owner}
                  value={this.state.program.owner || ''}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <BudgetInput
                  required
                  label="Budget"
                  onChange={(event, data) => this.handleChange("budget", data.value)}
                  value={this.state.program.budget || ''}
                  errorText={this.state.error.budget}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <BudgetInput
                  required
                  label="MP target"
                  onChange={(event, data) => this.handleChange("metrics", data.value)}
                  value={this.state.program.metrics || ''}
                  errorText={this.state.error.metrics}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Combobox
                  required
                  events={{onSelect: (event, data) => data.selection.length && this.handleChange("regionId", data.selection)}}
                  labels={{label: 'Target Region'}}
                  options={this.state.regions}
                  selection={this.state.program.regionId}
                  value="region"
                  variant="readonly"
                  errorText={this.state.error.regionId}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Combobox
                  events={{
                    onRequestRemoveSelectedOption: (event, data) => {
                      this.setState({
                        program: { ...this.state.program, selectedLifecycleStages: data.selection }
                      });
                    },
                    onSelect: (event, data) => data.selection.length && this.handleChange("selectedLifecycleStages", data.selection)
                  }}
                  labels={{
                    label: 'Lifecycle Stage',
                    placeholder: 'Select an option',
                  }}
                  menuItemVisibleLength={5}
                  multiple
                  options={comboboxFilterAndLimit({
                    limit: this.state.lifecycleStages.length,
                    options: this.state.lifecycleStages,
                    selection: this.state.program.selectedLifecycleStages
                  })}
                  selection={this.state.program.selectedLifecycleStages}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Combobox
                  required
                  events={{
                    onRequestRemoveSelectedOption: (event, data) => {
                      this.setState({
                        program: { ...this.state.program, selectedApm1s: data.selection }
                      });
                    },
                    onSelect: (event, data) => data.selection.length && this.handleChange("selectedApm1s", data.selection)
                  }}
                  labels={{
                    label: 'APM1',
                    placeholder: 'Select an option',
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
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Combobox
                  events={{
                    onRequestRemoveSelectedOption: (event, data) => {
                      this.setState({
                        program: { ...this.state.program, selectedApm2s: data.selection }
                      });
                    },
                    onSelect: (event, data) => data.selection.length && this.handleChange("selectedApm2s", data.selection)
                  }}
                  labels={{
                    label: 'APM2',
                    placeholder: 'Select an option',
                  }}
                  menuItemVisibleLength={5}
                  multiple
                  options={comboboxFilterAndLimit({
                    limit: this.state.apm2s.length,
                    options: this.state.apm2s,
                    selection: this.state.program.selectedApm2s,
                  })}
                  selection={this.state.program.selectedApm2s}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Combobox
                  required
                  events={{
                    onRequestRemoveSelectedOption: (event, data) => {
                      this.setState({
                        program: { ...this.state.program, selectedIndustries: data.selection }
                      });
                    },
                    onSelect: (event, data) => data.selection.length && this.handleChange("selectedIndustries", data.selection)
                  }}
                  labels={{
                    label: 'Industry',
                    placeholder: 'Select an option',
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
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Combobox
                  required
                  events={{
                    onRequestRemoveSelectedOption: (event, data) => {
                      this.setState({
                        program: { ...this.state.program, selectedSegments: data.selection }
                      });
                    },
                    onSelect: (event, data) => data.selection.length && this.handleChange("selectedSegments", data.selection)
                  }}
                  labels={{
                    label: 'Segment',
                    placeholder: 'Select an option',
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
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Combobox
                  required
                  events={{
                    onRequestRemoveSelectedOption: (event, data) => {
                      this.setState({
                        program: { ...this.state.program, selectedPersonas: data.selection }
                      });
                    },
                    onSelect: (event, data) => data.selection.length && this.handleChange("selectedPersonas", data.selection)
                  }}
                  labels={{
                    label: 'Persona',
                    placeholder: 'Select an option',
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
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Textarea
                  required
                  label="Customer Message"
                  errorText={this.state.error.customerMessage}
                  placeholder="Enter customer message"
                  value={this.state.program.customerMessage || ''}
                  onChange={(event, data) => this.handleChange("customerMessage", event.target.value)}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Textarea
                  label="Other KPI's"
                  errorText={this.state.error.kpi}
                  placeholder="Enter kpi's"
                  value={this.state.program.kpi || ''}
                  onChange={(event, data) => this.handleChange("kpi", event.target.value)}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-4 slds-form-element">
                <Input
                  required
                  placeholder="Enter fiscal year"
                  label="Fiscal year"
                  onChange={(event, data) => this.handleChange("year", data.value)}
                  errorText={this.state.error.year}
                  value={this.state.program.year}
                  maxLength="4"
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-4 slds-form-element">
                <Combobox
                  required
                  events={{onSelect: (event, data) => data.selection.length && this.handleChange("quarter", data.selection)}}
                  labels={{label: 'Quarter'}}
                  options={this.state.quarter}
                  selection={this.state.program.quarter}
                  value="quarter"
                  variant="readonly"
                  errorText={this.state.error.quarter}
                />
              </div>
              <div className="slds-col slds-size_1-of-1">
                <Button label="Save" variant="brand" onClick={() => this.validations() && this.handleSubmit()} />
              </div>
            </div>
          </Panel>
        </IconSettings>
      </Container>
    )
  };
};

export default withRouter(CreateProgramPage);
