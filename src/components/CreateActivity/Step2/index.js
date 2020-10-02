import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import {
  Combobox,
  Input,
  Datepicker,
  Button,
  Textarea
} from '@salesforce/design-system-react';

class Step2 extends Component {

  render() {
    return (
      <Fragment>
        <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
          <Input
            placeholder="Enter Campaign Id"
            label="Campaign Id"
            onChange={(event, data) => this.props.handleChange("campaignId", data.value)}
            value={this.props.row.campaignId}
            maxLength="18"
          />
        </div>
        <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
          <Combobox
            events={{onSelect: (event, data) => data.selection.length && this.props.handleChange("tactic", data.selection)}}
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
            events={{onSelect: (event, data) => data.selection.length && this.props.handleChange("format", data.selection)}}
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
          {this.props.error.startDate && <div class="slds-form-element__help">{this.props.error.startDate}</div>}
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
        <div className="slds-col slds-size_1-of-1">
          <Button label="Go back" onClick={() => this.props.handleStep(1)} />
          <Button label="Save" variant="brand" type="submit" />
        </div>
      </Fragment>
    )
  };
};

export default withRouter(Step2);