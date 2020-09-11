import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  IconSettings,
  Breadcrumb
} from '@salesforce/design-system-react';

import Prompt from '../Prompt';
import Step1 from './Step1';
import Step2 from './Step2';

import { FormContainer } from './styles';

class CreateActivity extends Component {
  state = {
    baseURL: 'http://localhost:3000',
    loggedUser: '',
    row: {
      format: [],
      region: [],
      tactic: [],
      program: [],
      title: "",
      abstract: "",
      startDate: "",
      endDate: "",
      asset: "",
      campaignId: ""
    },
    regions: [],
    programs: [],
    tactics: [],
    formats: [],
    error: {},
    isDeletePromptOpen: false,
    expandedPanels: {},
    items: {},
    steps: [
      {
        step: 1,
        trail: <Link onClick={() => this.handleStep(1)}>Select program</Link>,
        active: true
      },
      {
        step: 2,
        trail: <Link>Create activity</Link>,
        active: false
      }
    ]
  };

  componentDidMount() {
    this.getUser();
    this.checkTactic();
    this.checkRegion();
    this.checkProgram();
    this.checkProgramDetail();
    this.props.getFormData(this.state.row);
  };

  getUser = () => {
    let loggedUser = localStorage.getItem("userId");
    this.setState({ loggedUser });
  }

  async getBaseUrl() {
    try {
      let response = await fetch('/config');
      let data = await response.json();
      this.setState({
        baseURL: data.api
      });
    } catch (err) {
      console.error('ERROR: cannot get the url config: ', err);
    }
  }

  async checkRegion() {
    try {
      let response = await fetch(`${this.state.baseURL}/api/v1/region`);
      let { result } = await response.json();
      this.setState({ regions: result, row: {...this.state.row, region: [result[0]]}});
    } catch(err) {
      console.error(err)
    }
  }

  async checkProgram() {
    try {
      let response = await fetch(`${this.state.baseURL}/api/v1/program`);
      let { result } = await response.json();
      this.setState({ programs: result, row: {...this.state.row, program: [result[0]]}});
    } catch(err) {
      console.error(err)
    }
  }

  async checkProgramDetail() {
    try {
      // let response = await fetch('/assets/data/program_details.json');
      let response = await fetch(`${this.state.baseURL}/api/v1/program/${this.state.row.program[0].program_id}`);
      let { result } = await response.json();
      this.setState({ items: result });
    } catch(err) {
      console.error(err)
    }
  }

  async checkTactic() {
    try {
      let response = await fetch(`${this.state.baseURL}/api/v1/tactic`);
      let { result } = await response.json();
      let format = await this.populateTactic(result[0]);
      this.setState({ formats: format, tactics: result, row: {...this.state.row, tactic: [result[0]], format: [format[0]] } });
    } catch(err) {
      console.error(err)
    }
  }

  async populateTactic(selection) {
    try {
      let response = await fetch(`${this.state.baseURL}/api/v1/format/${selection.tactic_id}`);
      let { result } = await response.json();
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  handleChange = async (value, data) => {
    let newRow = {};
    let formats = this.state.formats;
    
    if(value === "tactic") {
      formats = await this.populateTactic(data[0]);
      newRow = {...this.state.row, tactic: data, format: [formats[0]]};
    } else {
      newRow = {...this.state.row, [value]: data};
    }

    this.validations(value, data);
    this.setState({row: newRow, formats})
    this.props.getFormData(newRow);
  };

  validations = (input, data) => {
    let errors = {...this.state.error};
    const inputs = ["program", "title", "format", "region", "tactic", "abstract"];

    if (input) {
      if(inputs.includes(input) && !data) {
        errors = {...errors, [input]: `Enter ${input === "abstract" ? "an" : "a"} ${input}`};
      } else {
        delete errors[input];
      }
    } else {
      inputs.forEach((input) => {
        if(this.state.row[input]) {
          delete errors[input];
        } else {
          errors = {...errors, [input]: `Enter ${input === "abstract" ? "an" : "a"} ${input}`};
        }
      })
    }

    this.setState({error: errors});
    return errors;
  };

  validateSubmit = (e) => {
    e.preventDefault();
    const errors = this.validations();
    let { loggedUser } = this.state;
    let { abstract, asset, format, endDate, program, region, startDate, tactic, title, campaignId } = this.state.row;
    let row = {
      userId: loggedUser,
      abstract,
      asset,
      formatId: format[0].format_id,
      endDate,
      programId: program[0].program_id,
      regionId: region[0].region_id,
      startDate,
      tacticId: tactic[0].tactic_id,
      title,
      campaignId
    }

    if (Object.keys(errors).length === 0) {
      this.onSubmit(row);
      return this.props.handleSubmit(e);
    }
    
    return false;
  };

  onSubmit = async body => {
    try {
      const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
      const response = await fetch(`http://localhost:3000/api/v1/activity`, config);
    } catch (err) {
      this.setState({isDeletePromptOpen: true});
      console.error(err);
    }
  }
  
  handleStep = step => {
    let steps = this.state.steps.map(el => el.step <= step ? {...el, active: true} : {...el, active: false});
    this.setState({ steps });
  }

  render() {
    return (
      <IconSettings iconPath="assets/icons">
        <div className="slds-m-left_xx-small slds-m-bottom_small">
          <Breadcrumb trail={this.state.steps.filter(el => el.active).map(el => el.trail)} />
        </div>
        {this.state.isDeletePromptOpen && <Prompt closeErrorHandler={() => this.setState({isDeletePromptOpen: false})} error={true} message='Interval server error' title='Error' />}
        <FormContainer>
          <form className="slds-grid slds-wrap" onSubmit={e => this.validateSubmit(e)}>
            {
              this.state.steps.filter(el => el.active).length === 1 ?
                <Step1
                  row={this.state.row}
                  handleStep={this.handleStep}
                  handleChange={this.handleChange}
                  error={this.state.error}
                /> :
                <Step2
                  row={this.state.row}
                  handleStep={this.handleStep}
                  getFormData={this.props.getFormData}
                  handleChange={this.handleChange}
                  error={this.state.error}
                  regions={this.state.regions}
                  tactics={this.state.tactics}
                  formats={this.state.formats}
                />
            }
          </form>
        </FormContainer>
      </IconSettings>
    )
  };
};

export default withRouter(CreateActivity);