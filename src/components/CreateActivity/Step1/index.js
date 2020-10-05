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

import { currencyFormatter } from "../../../utils/fomatters";

class Step1 extends Component {
  state = {
    programs: [],
    items: {},
    toast: {
      variant: 'error',
      heading: 'Something went wrong',
      duration: 5000,
      active: false
    }
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
            events={{onSelect: (event, data) => data.selection.length && this.props.handleChange("region", data.selection)}}
            labels={{label: 'Region'}}
            name="region"
            options={this.props.regions}
            selection={this.props.row.region}
            value="region"
            variant="readonly"
            errorText={this.props.error.region}
          />
        </div>
        {this.props.programs.length > 0 && <div className="slds-m-bottom_large slds-col slds-size_1-of-1">
          <Combobox
            events={{onSelect: (event, data) => data.selection.length && this.props.handleChange("program", data.selection)}}
            labels={{label: 'Program'}}
            name="program"
            options={this.props.programs}
            selection={this.props.row.program}
            value="program"
            variant="readonly"
            errorText={this.props.error.program}
          />
          <div className="slds-grid slds-wrap slds-m-left_xx-small slds-m-top_large">
            <div className="slds-m-bottom_large slds-col slds-size_1-of-1">
                <strong>MP Target:</strong>
                <p>{this.props.items.metrics}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-1">
                <strong>Customer Message:</strong>
                <p>{this.props.items.customerMessage}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Program Owner:</strong>
              <p>{this.props.items.owner}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Budget:</strong>
              <p>{currencyFormatter(this.props.items.budget)}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Parent Campaign ID:</strong>
              <p>{this.props.items.parentCampaignId }</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Region:</strong>
              <p>{this.props.items.targetRegion}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Lifecycle Stage:</strong>
              <p>{this.props.items.lifecycleStage}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>APM1:</strong>
              <p>{this.props.items.apm1}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>APM2:</strong>
              <p>{this.props.items.apm2}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Industry:</strong>
              <p>{this.props.items.industry}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Segment:</strong>
              <p>{this.props.items.segment}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Persona:</strong>
              <p>{this.props.items.persona}</p>
            </div>
          </div>
          {
            this.props.step === 1 && 
            <div>
              <Button label="Cancel" onClick={() => this.props.history.push('/home')} /> 
              <Button label="Select program" variant="brand" onClick={this.nextStep} />
            </div>
          }
          
        </div>}
      </Fragment>  
    )
  };
};

export default withRouter(Step1);