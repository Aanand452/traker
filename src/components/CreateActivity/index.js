import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment-timezone';
import {
  IconSettings,
  Breadcrumb,
  ToastContainer,
  Toast,
} from '@salesforce/design-system-react';

import { getAPIUrl } from '../../config/config';
import Prompt from '../Prompt';
import Step1 from './Step1';
import Step2 from './Step2';

import { FormContainer } from './styles';

class CreateActivity extends Component {
  state = {
    loggedUser: '',
    row: {
      format: [],
      region: [],
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
    formats: [],
    error: {},
    isDeletePromptOpen: false,
    items: {},
    steps: [
      {
        step: 1,
        active: true
      },
      {
        step: 2,
        active: false
      }
    ],
    toast: {
      variant: 'error',
      heading: 'Something went wrong',
      duration: 5000,
      active: false
    }
  }

  componentDidMount() {
    this.setupAndFetch();
  }

  getUser = () => {
    let loggedUser = localStorage.getItem("userId");
    this.setState({ loggedUser });
  }

  setupAndFetch = async () => {
    if(window.location.hostname === 'localhost') this.API_URL =  "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();
    
    this.getUser();
    this.checkRegion();
    this.props.getFormData(this.state.row);
  }

  async checkRegion() {
    try {
      let response = await fetch(`${this.API_URL}/region`);
      if(response.status === 200) {
        let { result } = await response.json();
        result = result.map(item => ({...item, id: item.region_id}))
        
        this.setState({ regions: result, row: {...this.state.row, region: [result[0]]}});
        this.handleChange("region", [result[0]]);
      } else {
        throw new Error(response);
      }
    } catch(err) {
      this.setState({toast: {...this.state.toast, active: true}});
      console.error(err);
    }
  }

  async checkProgramByRegion(id) {
    try {
      let response = await fetch(`${this.API_URL}/programs/region/${id}`);
      if(response.status === 200) {
        let { result } = await response.json();
        let programs = result.map(el => ({...el, label: el.name, id: el.programId}));

        if(programs.length <= 0) this.handleStep(1);
        else this.checkProgramDetail(programs[0].programId);

        this.setState({ programs, row: {...this.state.row, program: [programs[0]]}});
      } else {
        throw new Error(response);
      }
    } catch (err) {
      this.setState({toast: {...this.state.toast, active: true}});
      console.error(err);
    }
  }
  
  async checkProgramDetail(id) {
    try {
      let response = await fetch(`${this.API_URL}/program/${id}`);

      if(response.status === 200) {
        let { result } = await response.json();
        this.setState({ items: result });
      } else {
        throw new Error(response);
      }
    } catch(err) {
      this.setState({toast: {...this.state.toast, active: true}});
      console.error(err);
    }
  }

  async checkProgram() {
    try {
      let response = await fetch(`${this.API_URL}/program`);
      if(response.status === 200) {
        let { result } = await response.json();
        this.setState({ programs: result, row: {...this.state.row, program: [result[0]]}});
      } else {
        throw new Error(response);
      }
    } catch(err) {
      this.setState({toast: {...this.state.toast, active: true}});
      console.error(err)
    }
  }

  handleChange = async (value, data) => {
    let newRow = {};
    let formats = this.state.formats;

    if(value === "region") {
      await this.checkProgramByRegion(data[0].region_id);
      newRow = {...this.state.row, region: data };
    } else if(value === "program") {
      this.checkProgramDetail(data[0].programId);
      newRow = {...this.state.row, program: data};
    } else {
      newRow = {...this.state.row, [value]: data};
    }

    this.validations(value, data);
    this.setState({row: newRow, formats});
    this.props.getFormData(newRow);
  };

  isUrl = data => {
    let regexp = new RegExp(
      /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/
    );
    return data === "" || regexp.test(data);
  }

  validations = (input, data) => {
    let errors = {...this.state.error};
    const inputs = ["program", "title", "format", "region", "abstract", "startDate", "endDate"];

    if (input) {
      if (inputs.includes(input) && !data) {
        errors = { ...errors, [input]: "This field is required" };
      } else {
        delete errors[input];
      }
    } else {
      inputs.forEach((input) => {
        if (this.state.row[input]) {
          delete errors[input];
        } else {
          errors = { ...errors, [input]: "This field is required" };
        }
      });
    }

    this.setState({ error: errors });
    return errors;
  };

  validateSubmit = (e) => {
    e.preventDefault();
    const errors = this.validations();
    let { loggedUser } = this.state;
    let { abstract, asset, format, endDate, program, region, startDate, title, campaignId } = this.state.row;
    let row = {
      userId: loggedUser,
      abstract,
      asset,
      formatId: format.length ? format[0].format_id : "",
      endDate,
      programId: program.length ? program[0].programId : "",
      regionId: region.length ? region[0].region_id : "",
      startDate,
      title,
      campaignId
    }

    if (Object.keys(errors).length === 0) {
      this.onSubmit(row);
    }
    
    return false;
  };

  parseDatesGTM = row => {
    row.startDate = moment(row.startDate, 'DD/MM/YYYY').format();
    row.endDate = moment(row.endDate, 'DD/MM/YYYY').format();

    return row;
  }

  onSubmit = async body => {
    try {
      body = this.parseDatesGTM(body);
      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
      let response = await fetch(`${this.API_URL}/activity`, config);
      if(response.status === 200) {
        this.props.handleSubmit();
      } else throw new Error(response);
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
        {
          this.state.toast.active && (<IconSettings iconPath="/assets/icons">
            <ToastContainer>
              <Toast
                labels={{ heading: this.state.toast.heading }}
                variant={this.state.toast.variant}
                duration={this.state.toast.duration}
                onRequestClose={() => this.setState({toast: {active: false}})}
              />
            </ToastContainer>
          </IconSettings>)
        }
        <div className="slds-m-left_xx-small slds-m-bottom_small">
          <Breadcrumb trail={this.state.steps.filter(el => el.active).map(el => el.trail)} />
        </div>
        {this.state.isDeletePromptOpen && <Prompt closeErrorHandler={() => this.setState({isDeletePromptOpen: false})} error={true} message='Interval server error' title='Error' />}
        <FormContainer>
          <form className="slds-grid slds-wrap" onSubmit={e => this.validateSubmit(e)}>
            <Step1
              row={this.state.row}
              handleStep={this.handleStep}
              handleChange={this.handleChange}
              getFormats={this.getFormats}
              error={this.state.error}
              step={this.state.steps.filter(el => el.active).length}
              programs={this.state.programs}
              items={this.state.items}
              regions={this.state.regions}
            />
            {
              this.state.programs.length > 0 && this.state.steps.filter(el => el.active).length === 2  && 
              <Step2
                row={this.state.row}
                handleStep={this.handleStep}
                handleChange={this.handleChange}
                error={this.state.error}
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