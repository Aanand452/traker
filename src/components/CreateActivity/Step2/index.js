import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import {
  Combobox,
  Input,
  Datepicker,
  Button,
  Textarea,
  Toast,
  ToastContainer,
  IconSettings,
  Checkbox
} from '@salesforce/design-system-react';

import { getAPIUrl } from '../../../config/config';

class Step2 extends Component {

  state = {
    formats: [],
    toast: {
      variant: 'error',
      heading: 'Something went wrong',
      duration: 5000,
      active: false
    }
  };

  componentDidMount() {
    this.setupAndFetch();
  }

  setupAndFetch = async () => {
    if(window.location.hostname === 'localhost') this.API_URL =  "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();
    
    this.getFormats();
  }

  async getFormats() {
    try {
      const request = await fetch(`${this.API_URL}/format`);
      
      if(request.status === 200) {
        let { result } = await request.json();
        let formats = result.map(item => ({...item, id: item.format_id, label: item.name}));
        this.setState({ formats });
      } else throw new Error(request);
    } catch (err) {
      this.setState({toast: {...this.state.toast, active: true}});
      console.error(err);
    }
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
        <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
          <Input
            placeholder="Enter campaign id"
            label="Campaign Id"
            onChange={(event, data) => this.props.handleChange("campaignId", data.value)}
            value={this.props.row.campaignId}
            maxLength="18"
          />
        </div>
        <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
          <Combobox
            events={{onSelect: (event, data) => data.selection.length && this.props.handleChange("format", data.selection)}}
            labels={{label: 'Format'}}
            name="format"
            options={this.state.formats}
            selection={this.props.row.format}
            value="format"  
            variant="readonly"
            errorText={this.props.error.format}
          />
        </div>
        <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
          <Input
            label="Title"
            errorText={this.props.error.title}
            placeholder="Enter title"
            value={this.props.row.title}
            onChange={(event) => this.props.handleChange("title", event.target.value)}
          />
        </div>
        <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
          <Textarea
            label="Abstract"
            errorText={this.props.error.abstract}
            placeholder="Enter abstract"
            value={this.props.row.abstract}
            onChange={(event) => this.props.handleChange("abstract", event.target.value)}
          />
        </div>
        <div className={`slds-col slds-size_1-of-4 ${this.props.error.startDate && "slds-has-error"}`}>
          <Datepicker
            labels={{label: 'Start Date'}}
            triggerClassName="slds-col slds-size_1-of-1"
            onChange={(event, data) => this.props.handleChange("startDate", data.formattedDate)}
            formatter={(date) => date ? moment(date).format('DD/MM/YYYY') : ''}
            parser={(dateString) => moment(dateString, 'DD/MM/YYYY').toDate()}
            formattedValue={this.props.row.startDate}
          />
          {this.props.error.startDate && <div className="slds-form-element__help">{this.props.error.startDate}</div>}
        </div>
        <div className={`slds-col slds-size_1-of-4 ${this.props.error.endDate && "slds-has-error"}`}>
          <Datepicker
            labels={{label: 'End Date'}}
            triggerClassName="slds-col slds-size_1-of-1"
            onChange={(event, data) => this.props.handleChange("endDate", data.formattedDate)}
            formatter={(date) => date ? moment(date).format('DD/MM/YYYY') : ''}
            parser={(dateString) => moment(dateString, 'DD/MM/YYYY').toDate()}
            formattedValue={this.props.row.endDate}
          />
          {this.props.error.endDate && <div class="slds-form-element__help">{this.props.error.endDate}</div>}
        </div>
        <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
          <Input placeholder="Insert a valid URL here" onChange={(event, data) => this.props.handleChange("asset", data.value)} value={this.props.row.asset} label="Asset" errorText={this.props.error.asset}/>
        </div>
        <div className="slds-m-bottom_large slds-col slds-size_1-of-1">
          <Checkbox
            assistiveText={{
              label: 'Default',
            }}
            id="customer-mkt"
            labels={{
              label: 'Customer marketing',
            }}
            onChange={e => {
              this.props.handleChange("customerMarketing", e.target.checked)
            }}
          />
        </div>
        <div className="slds-col slds-size_1-of-1">
          <Button label="Go back" onClick={() => this.props.handleStep(1)} />
          <Button label="Save" variant="brand" type="submit" />
        </div>
      </Fragment>
    )
  };
};

export default withRouter(Step2);