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
  Spinner
} from '@salesforce/design-system-react';

import BudgetInput from '../BudgetInput/BudgetInput'

import { Title, Container } from './styles';
import { getAPIUrl } from '../../config/config';

class CreateProgramPage extends Component {
  state = {
    regions: [],
    lifecycleStages: [],
    apm1s: [],
    apm2s: [],
    industries: [],
    segments: [],
    personas: [],
    program: {},
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
      const request = await fetch(`${this.API_URL}/region`);
      const response = await request.json();

      if(response.info.code === 200) this.setState({ regions: response.result });
      else throw new Error(response.info.status);
    } catch (err) {
      this.showError(err);
    }
  }

  getLifecycles = async () => {
    try {
      const request = await fetch(`${this.API_URL}/lifecycle-stage`);
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
      const request = await fetch(`${this.API_URL}/apm1`);
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
      const request = await fetch(`${this.API_URL}/apm2`);
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
      const request = await fetch(`${this.API_URL}/industry`);
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
      const request = await fetch(`${this.API_URL}/segment`);
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
      const request = await fetch(`${this.API_URL}/persona`);
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
      "apm1Id",
      "industryId",
      "segmentId",
      "personaId"
    ];

    if (input) {
      if(inputs.includes(input) && !data) {
        errors = {...errors, [input]: "This field is required"};
      } else {
        delete errors[input];
      }
    } else {
      inputs.forEach((input) => {
        if(this.state.program[input]) {
          delete errors[input];
        } else {
          errors = {...errors, [input]: "This field is required"};
        }
      })
    }

    this.setState({error: errors});
    if(Object.keys(errors).length > 0) return false;
    
    return true;
  };

  handleChange = (value, data) => {
    const newRow = {...this.state.program, [value]: data};

    this.validations(value, data);
    this.setState({program: newRow});
  };

  handleSubmit = async () => {
    this.setState({showLoader: true});

    try {
      const body = {
        name: this.state.program.name,
        owner: this.state.program.owner,
        budget: this.state.program.budget,
        metrics: this.state.program.metrics,
        customerMessage: this.state.program.customerMessage,
        regionId: this.state.program.regionId[0].region_id,
        apm1Id: this.state.program.apm1Id[0].id,
        industryId: this.state.program.industryId[0].id,
        segmentId: this.state.program.segmentId[0].id,
        personaId: this.state.program.personaId[0].id
      };
      if(this.state.program.lifecycleStageId) body.lifecycleStageId = this.state.program.lifecycleStageId[0].id;
      if(this.state.program.apm2Id) body.apm2Id = this.state.program.apm2Id[0].id;
      if(this.state.program.kpi) body.otherKpis = this.state.program.kpi;

      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
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

        <Container>
          <Panel>
            <Title>Create new program</Title>
            <div className="slds-grid slds-wrap slds-p-around_medium slds_full-width">
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Input
                  placeholder="Enter program name"
                  label="Program Name"
                  onChange={(event, data) => this.handleChange("name", data.value)}
                  errorText={this.state.error.name}
                  value={this.state.program.name || ''}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Input
                  placeholder="Enter program owner"
                  label="Program Owner"
                  onChange={(event, data) => this.handleChange("owner", data.value)}
                  errorText={this.state.error.owner}
                  value={this.state.program.owner || ''}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <BudgetInput
                  label="budget"
                  onChange={(event, data) => this.handleChange("budget", data.value)}
                  value={this.state.program.budget || ''}
                  errorText={this.state.error.budget}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <BudgetInput
                  label="MP target"
                  onChange={(event, data) => this.handleChange("metrics", data.value)}
                  value={this.state.program.metrics || ''}
                  errorText={this.state.error.metrics}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Combobox
                  events={{onSelect: (event, data) => data.selection.length && this.handleChange("regionId", data.selection)}}
                  labels={{label: 'Target Region'}}
                  name="region"
                  options={this.state.regions}
                  selection={this.state.program.regionId}
                  value="region"
                  variant="readonly"
                  errorText={this.state.error.regionId}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Combobox
                  events={{onSelect: (event, data) => data.selection.length && this.handleChange("lifecycleStageId", data.selection)}}
                  labels={{label: 'Lifecycle Stage'}}
                  name="lifecycleStage"
                  options={this.state.lifecycleStages}
                  selection={this.state.program.lifecycleStageId}
                  value="lifecycleStage"
                  variant="readonly"
                  errorText={this.state.error.lifecycleStageId}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Combobox
                  events={{onSelect: (event, data) => data.selection.length && this.handleChange("apm1Id", data.selection)}}
                  labels={{label: 'APM1'}}
                  name="apm1"
                  options={this.state.apm1s}
                  selection={this.state.program.apm1Id}
                  value="apm1"
                  variant="readonly"
                  errorText={this.state.error.apm1Id}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Combobox
                  events={{onSelect: (event, data) => data.selection.length && this.handleChange("apm2Id", data.selection)}}
                  labels={{label: 'APM2'}}
                  name="apm2"
                  options={this.state.apm2s}
                  selection={this.state.program.apm2Id}
                  value="apm2"
                  variant="readonly"
                  errorText={this.state.error.apm2Id}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Combobox
                  events={{onSelect: (event, data) => data.selection.length && this.handleChange("industryId", data.selection)}}
                  labels={{label: 'Industry'}}
                  name="industry"
                  options={this.state.industries}
                  selection={this.state.program.industryId}
                  value="industry"
                  variant="readonly"
                  errorText={this.state.error.industryId}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Combobox
                  events={{onSelect: (event, data) => data.selection.length && this.handleChange("segmentId", data.selection)}}
                  labels={{label: 'Segment'}}
                  name="segment"
                  options={this.state.segments}
                  selection={this.state.program.segmentId}
                  value="segment"
                  variant="readonly"
                  errorText={this.state.error.segmentId}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Combobox
                  events={{onSelect: (event, data) => data.selection.length && this.handleChange("personaId", data.selection)}}
                  labels={{label: 'Persona'}}
                  name="persona"
                  options={this.state.personas}
                  selection={this.state.program.personaId}
                  value="persona"
                  variant="readonly"
                  errorText={this.state.error.personaId}
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Textarea
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
              <div className="slds-col slds-size_1-of-1">
                <Button label="Save" variant="brand" onClick={() => this.validations() && this.handleSubmit()} />
              </div>
            </div>
          </Panel>
        </Container>
      </IconSettings>
    )
  };
};

export default withRouter(CreateProgramPage);