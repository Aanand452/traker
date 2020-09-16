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
              <strong>Program Owner:</strong>
              <p>{this.state.items.owner}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Budget:</strong>
              <p>{this.state.items.budget}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Metrics:</strong>
              <p>{this.state.items.metrics}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Parent Campaign ID:</strong>
              <p>{this.state.items.parentCampaignId }</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Region:</strong>
              <p>{this.state.items.targetRegion}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Lifecycle Stage:</strong>
              <p>{this.state.items.lifecycleStage}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>APM1:</strong>
              <p>{this.state.items.apm1}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>APM2:</strong>
              <p>{this.state.items.apm2}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Industry:</strong>
              <p>{this.state.items.industry}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Segment:</strong>
              <p>{this.state.items.segment}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Persona:</strong>
              <p>{this.state.items.persona}</p>
            </div>
          </div>
          {
            this.props.step === 1 && 
            <div>
              <Button label="Cancel" onClick={() => this.props.history.push('/home')} /> 
              <Button label="Select a program" variant="brand" onClick={this.nextStep} />
            </div>
          }
          
        </div>
      </Fragment>  
    )
  };
};

export default withRouter(Step1);