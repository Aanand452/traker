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
    items: {},
    toast: {
      variant: 'error',
      heading: 'Something went wrong',
      duration: 5000,
      active: false
    }
  };

  onSelectProgram = data => {
    data.selection.length && this.props.handleChange("program", data.selection);
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
            events={{onSelect: (event, data) => this.onSelectProgram(data)}}
            labels={{label: 'Program'}}
            name="program"
            options={this.props.programs}
            selection={this.props.row.program}
            value="program"
            variant="readonly"
            errorText={this.props.error.program}
          />
          <div className="slds-grid slds-wrap slds-m-left_xx-small slds-m-top_large">
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Program Owner:</strong>
              <p>{this.props.items.owner}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Region:</strong>
              <p>{this.props.items.targetRegion}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
                <strong>MP Target:</strong>
                <p>{currencyFormatter(this.props.items.metrics)}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Budget:</strong>
              <p>{currencyFormatter(this.props.items.budget)}</p>
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Industry:</strong>
              {this.props.items.industry && this.props.items.industry.map((el, i) => <p key={i}>{el}</p>)}
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Lifecycle Stage:</strong>
              {this.props.items.lifecycleStage && this.props.items.lifecycleStage.map((el, i) => <p key={i}>{el}</p>)}
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>APM1:</strong>
              {this.props.items.apm1 && this.props.items.apm1.map((el, i) => <p key={i}>{el}</p>)}
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>APM2:</strong>
              {this.props.items.apm2 && this.props.items.apm2.map((el, i) => <p key={i}>{el}</p>)}
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Segment:</strong>
              {this.props.items.segment && this.props.items.segment.map((el, i) => <p key={i}>{el}</p>)}
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
              <strong>Persona:</strong>
              {this.props.items.persona && this.props.items.persona.map((el, i) => <p key={i}>{el}</p>)}
            </div>
            <div className="slds-m-bottom_large slds-col slds-size_1-of-1">
                <strong>Customer Message:</strong>
                <p>{this.props.items.customerMessage}</p>
            </div>
          </div>
          {
            this.props.step === 1 && 
            <div>
              <Button label="Cancel" onClick={() => this.props.history.push('/home')} />
            </div>
          }
          
        </div>}
      </Fragment>  
    )
  };
};

export default withRouter(Step1);