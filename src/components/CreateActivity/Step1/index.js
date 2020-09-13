import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { getAPIUrl } from '../../../config/config';
import {
  Combobox,
  Button,
  Toast,
  ToastContainer,
  IconSettings
} from '@salesforce/design-system-react';

class Step1 extends Component {
  state = {
    baseURL: 'http://localhost:3000',
    programs: [],
    program: [],
    items: {},
    toast: {
      variant: 'error',
      heading: 'Something went wrong',
      duration: 5000,
      active: false
    }
  };

  componentDidMount() {
    this.setupAndFetch();
  };

  setupAndFetch = async () => {
    if(window.location.hostname === 'localhost') this.API_URL = "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();
    
    this.checkProgram();
  }

  async checkProgram() {
    try {
      let response = await fetch(`${this.API_URL}/program`);
      
      if(response.status === 404) {
        this.setState({toast: {heading: 'Programs not found', active: true, variant: 'error', duration: 5000}});
      } else if(response.status === 500) {
        this.setState({toast: {heading: 'Server error', active: true, variant: 'error', duration: 5000}});
      } else {
        let { result } = await response.json();
        let program = [result[0]];
        this.setState({ programs: result, program });
        this.checkProgramDetail(program[0].program_id);
      }
    } catch(err) {
      console.error(err.message);
    }
  }

  async checkProgramDetail(id) {
    try {
      let response = await fetch(`${this.API_URL}/program/${id}`);

      if(response.status === 404) {
        this.setState({toast: {heading: 'Program details not found', active: true, variant: 'error', duration: 5000}});
      } else if(response.status === 500) {
        this.setState({toast: {heading: 'Server error', active: true, variant: 'error', duration: 5000}});
      } else {
        let { result } = await response.json();
        this.setState({ items: result });
      }
    } catch(err) {
      console.error(err.message);
    }
  }

  handleChange = async (value, data) => {
    this.checkProgramDetail(data[0].program_id);
    this.props.handleChange(value, data);
  };

  nextStep = () => {
    this.props.handleStep(2);
  }

  render() {
    return (
      <Fragment>
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
        <div className="slds-m-bottom_large slds-col slds-size_1-of-1">
          <Combobox
            events={{onSelect: (event, data) => data.selection.length && this.handleChange("program", data.selection)}}
            labels={{label: 'Program'}}
            name="program"
            options={this.state.programs}
            selection={this.props.row.program}
            value="program"
            variant="readonly"
            errorText={this.props.error.program}
          />
          <div className="slds-grid slds-wrap slds-m-left_xx-small slds-m-top_large">
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <p>Program Owner:</p>
              <strong>{this.state.items.owner}</strong>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <p>Budget:</p>
              <strong>{this.state.items.budget}</strong>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <p>Metrics:</p>
              <strong>{this.state.items.metrics}</strong>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <p>Parent Campaign ID:</p>
              <strong>{this.state.items.parentCampaignId }</strong>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <p>Region:</p>
              <strong>{this.state.items.targetRegion}</strong>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <p>Lifecycle Stage:</p>
              <strong>{this.state.items.lifecycleStage}</strong>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <p>APM1:</p>
              <strong>{this.state.items.apm1}</strong>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <p>APM2:</p>
              <strong>{this.state.items.apm2}</strong>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <p>Industry:</p>
              <strong>{this.state.items.industry}</strong>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <p>Segment:</p>
              <strong>{this.state.items.segment}</strong>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <p>Persona:</p>
              <strong>{this.state.items.persona}</strong>
            </div>
          </div>
          <Button label="Cancel" onClick={() => this.props.history.push('/home')} />
          <Button label="Next step" variant="brand" onClick={this.nextStep} />
        </div>
      </Fragment>  
    )
  };
};

export default withRouter(Step1);