import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import {
  IconSettings,
  Combobox,
  Input,
  Datepicker,
  Button,
  Textarea
} from '@salesforce/design-system-react';

import Prompt from '../Prompt';

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
    isDeletePromptOpen: false
  };

  componentDidMount() {
    this.getUser();
    this.checkTactic();
    this.checkRegion();
    this.checkProgram();
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

  async checkTactic() {
    try {
      let response = await fetch(`${this.state.baseURL}/api/v1/tactic`);
      let { result } = await response.json();
      let format = await this.populateTactic(result[0]);
      console.log(format)
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

  checkDataModel(model, modelSelection) {
    let selection = model.filter(el => el.label === modelSelection)
    return selection.length ? selection : [model[0]] 
  };

  createModelData(modelData) {
    const modelResult = modelData.map((el, index) => {
      const elementJson = {}
      elementJson.label = el
      elementJson.id = index.toString();
      return elementJson
    });
    return modelResult
  };

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
    const inputs = ["program", "title", "format", "region", "tactic", "abstract", "asset", "startDate", "endDate"];

    if (input) {
      if(inputs.includes(input) && !data) {
        errors = {...errors, [input]: "This field is required"};
      } else {
        delete errors[input];
      }
    } else {
      inputs.forEach((input) => {
        if(this.state.row[input]) {
          delete errors[input];
        } else {
          errors = {...errors, [input]: "This field is required"};
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

  render() {
    console.log()
    return (
      <IconSettings iconPath="assets/icons">
        {this.state.isDeletePromptOpen && <Prompt closeErrorHandler={() => this.setState({isDeletePromptOpen: false})} error={true} message='Interval server error' title='Error' />}
        <FormContainer>
          <form className="slds-grid slds-wrap" onSubmit={e => this.validateSubmit(e)}>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Input
                placeholder="Enter Campaign Id"
                label="Campaign Id"
                onChange={(event, data) => this.handleChange("campaignId", data.value)}
                defaultValue={this.state.row.campaignId}
                id="campaignId"
                maxLength="18"
              />
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Combobox
                id="region"
                events={{onSelect: (event, data) => data.selection.length && this.handleChange("region", data.selection)}}
                labels={{label: 'Region'}}
                name="region"
                options={this.state.regions}
                selection={this.state.row.region}
                value="region"
                variant="readonly"
                errorText={this.state.error.region}
              />
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Combobox
                id="tactic"
                events={{onSelect: (event, data) => data.selection.length && this.handleChange("tactic", data.selection)}}
                labels={{label: 'Tactic'}}
                name="tactic"
                options={this.state.tactics}
                selection={this.state.row.tactic}
                value="tactic"  
                variant="readonly"
                errorText={this.state.error.tactic}
              />
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Combobox
                id="format"
                events={{onSelect: (event, data) => data.selection.length && this.handleChange("format", data.selection)}}
                labels={{label: 'Format'}}
                name="format"
                options={this.state.formats}
                selection={this.state.row.format}
                value="format"  
                variant="readonly"
                errorText={this.state.error.format}
              />
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Textarea
                id="title"
                label="Title"
                errorText={this.state.error.title}
                placeholder="Enter title"
                defaultValue={this.state.title}
                onChange={(event) => this.handleChange("title", event.target.value)}
              />
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Textarea
                id="abstract"
                label="Abstract"
                errorText={this.state.error.abstract}
                placeholder="Enter abstract"
                defaultValue={this.state.row.abstract}
                onChange={(event) => this.handleChange("abstract", event.target.value)}
              />
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Combobox
                id="program"
                events={{onSelect: (event, data) => data.selection.length && this.handleChange("program", data.selection)}}
                labels={{label: 'Program'}}
                name="program"
                options={this.state.programs}
                selection={this.state.row.program}
                value="program"
                variant="readonly"
                errorText={this.state.error.program}
              />
            </div>
            <div className={`slds-m-bottom_large slds-col slds-size_1-of-4 ${this.state.error.startDate && "slds-has-error"}`}>
              <Datepicker
                id="startDate"
                labels={{label: 'Start Date'}}
                triggerClassName={`slds-col slds-size_1-of-1`}
                onChange={(event, data) => this.handleChange("startDate", data.formattedDate)}
                formatter={(date) => date ? moment(date).format('MM/DD/YYYY') : ''}
                parser={(dateString) => moment(dateString, 'MM-DD-YYYY').toDate()}
                value={this.state.row.startDate}
              />
              {this.state.error.startDate && <div class="slds-form-element__help">This field is required</div>}
            </div>
            <div className={`slds-m-bottom_large slds-col slds-size_1-of-4 ${this.state.error.endDate && "slds-has-error"}`}>
              <Datepicker
                id="endDate"
                labels={{label: 'Start Date'}}
                triggerClassName="slds-col slds-size_1-of-1"
                onChange={(event, data) => this.handleChange("endDate", data.formattedDate)}
                formatter={(date) => date ? moment(date).format('MM/DD/YYYY') : ''}
                parser={(dateString) => moment(dateString, 'MM-DD-YYYY').toDate()}
                value={this.state.row.endDate}
              />
              {this.state.error.endDate && <div class="slds-form-element__help">This field is required</div>}
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Input
                placeholder="Enter assets"
                onChange={(event, data) => this.handleChange("asset", data.value)}
                defaultValue={this.state.row.asset}
                id="asset"
                label="Asset"
                errorText={this.state.error.asset}
              />
            </div>
            <div className="slds-col slds-size_1-of-1">
              <Button label="Cancel" onClick={() => this.props.history.push('/home')} />
              <Button label="Save" variant="brand" type="submit" />
            </div>
          </form>
        </FormContainer>
      </IconSettings>
    )
  };
};

export default withRouter(CreateActivity);