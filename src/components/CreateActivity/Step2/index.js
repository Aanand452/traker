import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
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

class Step2 extends Component {

  handleChange = async (value, data) => {
    this.props.handleChange(value, data);
  };

  render() {
    return (
      <Fragment>
        <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
          <Input
            placeholder="Enter Campaign Id"
            label="Campaign Id"
            onChange={(event, data) => this.handleChange("campaignId", data.value)}
            defaultValue={this.props.row.campaignId}
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
            options={this.props.regions}
            selection={this.props.row.region}
            value="region"
            variant="readonly"
            errorText={this.props.error.region}
          />
        </div>
        <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
          <Combobox
            id="tactic"
            events={{onSelect: (event, data) => data.selection.length && this.handleChange("tactic", data.selection)}}
            labels={{label: 'Tactic'}}
            name="tactic"
            options={this.props.tactics}
            selection={this.props.row.tactic}
            value="tactic"  
            variant="readonly"
            errorText={this.props.error.tactic}
          />
        </div>
        <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
          <Combobox
            id="format"
            events={{onSelect: (event, data) => data.selection.length && this.handleChange("format", data.selection)}}
            labels={{label: 'Format'}}
            name="format"
            options={this.props.formats}
            selection={this.props.row.format}
            value="format"  
            variant="readonly"
            errorText={this.props.error.format}
          />
        </div>
        <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
          <Input
            id="title"
            label="Title"
            errorText={this.props.error.title}
            placeholder="Enter title"
            value={this.props.row.title}
            onChange={(event) => this.handleChange("title", event.target.value)}
          />
        </div>
        <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
          <Textarea
            id="abstract"
            label="Abstract"
            errorText={this.props.error.abstract}
            placeholder="Enter abstract"
            value={this.props.row.abstract}
            onChange={(event) => this.handleChange("abstract", event.target.value)}
          />
        </div>
        <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
          <Datepicker
            id="startDate"
            labels={{label: 'Start Date'}}
            triggerClassName="slds-col slds-size_1-of-2"
            onChange={(event, data) => this.handleChange("startDate", data.formattedDate)}
            formatter={(date) => date ? moment(date).format('MM/DD/YYYY') : ''}
            parser={(dateString) => moment(dateString, 'MM-DD-YYYY').toDate()}
            value={this.props.row.startDate}
            errorText={this.props.error.startDate}
          />
          <Datepicker
            id="endDate"
            labels={{label: 'End Date'}}
            triggerClassName="slds-col slds-size_1-of-2"
            onChange={(event, data) => this.handleChange("endDate", data.formattedDate)}
            formatter={(date) => date ? moment(date).format('MM/DD/YYYY') : ''}
            parser={(dateString) => moment(dateString, 'MM-DD-YYYY').toDate()}
            value={this.props.row.endDate}
            errorText={this.props.error.endDate}
          />
        </div>
        <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
          <Input placeholder="Enter assets" onChange={(event, data) => this.handleChange("asset", data.value)} value={this.props.row.asset} id="asset" label="Asset" errorText={this.props.error.asset}/>
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