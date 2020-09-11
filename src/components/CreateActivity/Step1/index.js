import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Combobox,
  Button
} from '@salesforce/design-system-react';

class Step1 extends Component {
  state = {
    baseURL: 'http://localhost:3000',
    programs: [],
    program: [],
    items: {}
  };

  componentDidMount() {
    this.checkProgram();
  };

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

  async checkProgram() {
    try {
      let response = await fetch(`${this.state.baseURL}/api/v1/program`);
      let { result } = await response.json();
      let program = [result[0]];
      this.setState({ programs: result, program });
      this.checkProgramDetail(program[0].program_id);
    } catch(err) {
      console.error(err)
    }
  }

  async checkProgramDetail(id) {
    try {
      let response = await fetch(`${this.state.baseURL}/api/v1/program/${id}`);
      let { result } = await response.json();
      this.setState({ items: result });
    } catch(err) {
      console.error(err)
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
      <div className="slds-m-bottom_large slds-col slds-size_1-of-1">
        <Combobox
          id="program"
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
          {this.state.items.budget && <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
            <p>Budget:</p>
            <strong>{this.state.items.budget}</strong>
          </div>}
          {this.state.items.metrics && <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
            <p>Metrics:</p>
            <strong>{this.state.items.metrics}</strong>
          </div>}
          {this.state.items.parentCampaignId && <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
            <p>Parent Campaign ID:</p>
            <strong>{this.state.items.parentCampaignId }</strong>
          </div>}
          {this.state.items.targetRegion && <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
            <p>Region:</p>
            <strong>{this.state.items.targetRegion}</strong>
          </div>}
          {this.state.items.lifecycleStage && <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
            <p>Lifecycle Stage:</p>
            <strong>{this.state.items.lifecycleStage}</strong>
          </div>}
          {this.state.items.apm1 && <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
            <p>APM1:</p>
            <strong>{this.state.items.apm1}</strong>
          </div>}
          {this.state.items.apm2 && <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
            <p>APM2:</p>
            <strong>{this.state.items.apm2}</strong>
          </div>}
          {this.state.items.industry && <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
            <p>Industry:</p>
            <strong>{this.state.items.industry}</strong>
          </div>}
          {this.state.items.segment && <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
            <p>Segment:</p>
            <strong>{this.state.items.segment}</strong>
          </div>}
          {this.state.items.persona && <div className="slds-m-bottom_large slds-col slds-size_1-of-2 slds-large-size_1-of-4">
            <p>Persona:</p>
            <strong>{this.state.items.persona}</strong>
          </div>}
        </div>
        <Button label="Cancel" onClick={() => this.props.history.push('/home')} />
        <Button label="Next step" variant="brand" onClick={this.nextStep} />
      </div>
            
    )
  };
};

export default withRouter(Step1);