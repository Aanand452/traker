import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  IconSettings,
  Modal,
  Button,
  Combobox,
  Datepicker,
  Input,
  Textarea
} from '@salesforce/design-system-react';

// ACTIONS
import {
  editItem
} from '../../actions/DataTable';


class EditActivityModalComponent extends Component {

  state = {
    program: [],
    region: [],
    format: [],
    tactic: [],
    tacticSelection: [],
    programSelection: [],
    formatSelection: [],
    regionSelection: [],
    title: this.props.data.title,
    abstract: this.props.data.abstract,
    startDate: this.props.data.startDate,
    endDate: this.props.data.endDate,
    asset: this.props.data.asset,
    campaignId: this.props.data.campaignId,
    errors: {}
  };

  componentDidMount() {
    this.baseUrl = 'http://localhost:3000/api/v1'
    this.checkProgram();
    this.checkTactic();
    this.checkRegion();
  }

  checkTactic = async () => {
    try {
      let response = await fetch(`${this.baseUrl}/tactic`);
      let { result } = await response.json(); 
      this.setState({ tactic: result });
      this.checkFormat(result[0].tactic_id);
    } catch(err) {
      console.error(err)
    }
  }

  checkProgram = async () => {
    try {
      let response = await fetch(`${this.baseUrl}/program`);
      let { result } = await response.json()
      let formatSelection = result[0];
      this.setState({ program: result, formatSelection });
    } catch(err) {
      console.error(err)
    }
  }

  checkFormat = async (tacticId) => {
    try {
      let response = await fetch(`${this.baseUrl}/format/${tacticId}`);
      let { result } = await response.json();
      let formatSelection = result[0];
      
      this.setState({ format: result, formatSelection });
    } catch(err) {
      console.error(err)
    }
  }

  checkRegion = async () => {
    try {
      let response = await fetch(`${this.baseUrl}/region`);
      let { result } = await response.json();
      this.setState({ region: result });
    } catch(err) {
      console.error(err)
    }
  }

  handleStartDate = (event, data) => {
    this.setState({ startDate: data.formattedDate });
  }

  handleEndDate = (event, data) => {
    this.setState({ endDate: data.formattedDate });
  }

  handleChange = e => {
    if(e.target.value.length > 0) {
      let errors = {...this.state.errors, [e.target.id]: false};
      this.setState({errors})
    }
    this.setState({[e.target.id]: e.target.value});
  }

  editTable = async () => {
    let { title, abstract, campaignId } = this.state;
    let errors = {...this.state.errors};
    
    if(campaignId.length === 0 || campaignId.length < 18) {
      errors = {...errors, campaignId: true};
      this.setState({errors});
      return;
    }
    if(title.length === 0) {
      errors = {...errors, title: true};
      this.setState({errors});
      return;
    }
    if(abstract.length === 0) {
      errors = {...errors, abstract: true};
      this.setState({errors});
      return;
    }
    try {
      await fetch('/assets/data/edit_activity.json');

      this.props.editItem(this.props.dataTable.items, {
        campaignId: this.state.campaignId,
        program: this.state.programSelection[0] && this.state.programSelection[0].label,
        format: this.state.formatSelection[0] && this.state.formatSelection[0].label,
        region: this.state.regionSelection[0] && this.state.regionSelection[0].label,
        tactic: this.state.tacticSelection[0] && this.state.tacticSelection[0].label,
        title: this.state.title,
        abstract: this.state.abstract,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        asset: this.state.asset,
        id: this.props.data.id
      });
      this.props.toggleOpen();
      this.props.onToast(true, "The campaign was edited successfully", "success");
      
    } catch (err) {
      this.props.onToast(true, "Something went wrong, please try again", "error");
    }
  }

  idGenerator = len => {
    let maxlen = 8,
      min = Math.pow(16,Math.min(len,maxlen)-1) ,
      max = Math.pow(16,Math.min(len,maxlen)) - 1,
      n   = Math.floor( Math.random() * (max-min+1) ) + min,
      r   = n.toString(16);
    while ( r.length < len ) {
        r = r + this.idGenerator( len - maxlen );
    }
    return r;
  }

	render() {        
		return (
      <IconSettings iconPath="/assets/icons">
        <Modal
          isOpen={true}
          footer={[
            <Button label="Cancel" onClick={this.props.toggleOpen} />,
            <Button type="submit" label="Save" variant="brand" onClick={this.editTable} />,
          ]}
          onRequestClose={this.props.toggleOpen}
          heading={this.props.title}
          ariaHideApp={false}
        >
          <section className="slds-p-around_large">
            <div className="slds-form-element slds-m-bottom_large">
              <div className="slds-form-element__control slds-grid slds-gutters">
                <div className="slds-col slds-size_11-of-12">
                  <Input
                    id="campaignId"
                    label="Campaign ID"
                    errorText={(this.state.errors.campaignId && "This field is required") || (this.state.campaignId.length < 18 && "This field must contain 18 characters")}
                    placeholder="Placeholder Text"
                    value={this.state.campaignId}
                    maxLength="18"
                    minLength="18"
                    onChange={e => this.handleChange(e)}
                  />
                </div>
                <div className="slds-col slds-size_1-of-12 slds-m-top_large">
                  <Button
                    onClick={() => this.setState({campaignId: this.idGenerator(18)})}
                    assistiveText={{ icon: 'Icon Border-filled medium' }}
                    iconCategory="utility"
                    iconName="refresh"
                    iconVariant="border-filled"
                    title="Generate new Campaign ID"
                    variant="icon" />
                </div>
              </div>
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                required
                events={{
                  onSelect: (event, data) => {
                    const selection =
                      data.selection.length === 0
                        ? this.state.programSelection
                        : data.selection;
                    this.setState({ programSelection: selection });
                  },
                }}
                labels={{
                  label: 'Program',
                  placeholder: 'Enter program',
                }}
                menuPosition="relative"
                options={this.state.program}
                selection={this.state.programSelection}
                variant="readonly"
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Textarea
                required
                id="title"
                label="Title"
                errorText={this.state.errors.title && "This field is required"}
                placeholder="Enter title"
                defaultValue={this.state.title}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                required
                events={{
                  onSelect: (event, data) => {
                    const selection =
                      data.selection.length === 0
                        ? this.state.tacticSelection
                        : data.selection;
                    
                    this.setState({ tacticSelection: selection });
                    console.log('MILLER', selection[0].tactic_id);
                    this.checkFormat(selection[0].tactic_id);
                  }
                }}
                labels={{
                  label: 'Tactics',
                  placeholder: 'Enter tactic',
                }}
                menuPosition="relative"
                options={this.state.tactic}
                selection={this.state.tacticSelection}
                variant="readonly"
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                required
                events={{
                  onSelect: (event, data) => {
                    const selection =
                      data.selection.length === 0
                        ? this.state.formatSelection
                        : data.selection;
                    this.setState({ formatSelection: selection });
                  }
                }}
                labels={{
                  label: 'Format',
                  placeholder: 'Enter format',
                }}
                menuPosition="relative"
                options={this.state.format}
                selection={this.state.formatSelection}
                variant="readonly"
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Textarea
                required
                id="abstract"
                label="Abstract"
                errorText={this.state.errors.abstract && "This field is required"}
                placeholder="Enter abstract"
                defaultValue={this.state.abstract}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                required
                events={{
                  onSelect: (event, data) => {
                    const selection =
                      data.selection.length === 0
                        ? this.state.regionSelection
                        : data.selection;
                    this.setState({ regionSelection: selection });
                  },
                }}
                labels={{
                  label: 'Region',
                  placeholder: 'Enter region',
                }}
                menuPosition="relative"
                options={this.state.region}
                selection={this.state.regionSelection}
                variant="readonly"
              />
            </div>
            <div className="slds-grid slds-gutters slds-m-bottom_large">
                <Datepicker
                  required
                  triggerClassName="slds-col slds-size_1-of-2"
                  labels={{
                    label: 'Start date',
                  }}
                  onChange={(event, data) => {
                    this.handleStartDate(event, data);

                    if (this.props.action) {
                      const dataAsArray = Object.keys(data).map((key) => data[key]);
                      this.props.action('onChange')(event, data, ...dataAsArray);
                    } else if (console) {
                      console.log('onChange', event, data);
                    }
                  }}
                  onCalendarFocus={(event, data) => {
                    if (this.props.action) {
                      const dataAsArray = Object.keys(data).map((key) => data[key]);
                      this.props.action('onCalendarFocus')(event, data, ...dataAsArray);
                    } else if (console) {
                      console.log('onCalendarFocus', event, data);
                    }
                  }}
                  formatter={(date) => {
                    return date ? moment(date).format('MM/DD/YYYY') : '';
                  }}
                  parser={(dateString) => {
                    return moment(dateString, 'MM-DD-YYYY').toDate();
                  }}
                  value={this.state.startDate}
                />
                <Datepicker
                  required
                  triggerClassName="slds-col slds-size_1-of-2"
                  labels={{
                    label: 'End date',
                  }}
                  onChange={(event, data) => {
                    this.handleEndDate(event, data);

                    if (this.props.action) {
                      const dataAsArray = Object.keys(data).map((key) => data[key]);
                      this.props.action('onChange')(event, data, ...dataAsArray);
                    } else if (console) {
                      console.log('onChange', event, data);
                    }
                  }}
                  onCalendarFocus={(event, data) => {
                    if (this.props.action) {
                      const dataAsArray = Object.keys(data).map((key) => data[key]);
                      this.props.action('onCalendarFocus')(event, data, ...dataAsArray);
                    } else if (console) {
                      console.log('onCalendarFocus', event, data);
                    }
                  }}
                  formatter={(date) => {
                    return date ? moment(date).format('MM/DD/YYYY') : '';
                  }}
                  parser={(dateString) => {
                    return moment(dateString, 'MM-DD-YYYY').toDate();
                  }}
                  value={this.state.endDate}
                />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <label className="slds-form-element__label">
                Assets
              </label>
              <div className="slds-form-element__control">
                <input
                  className="slds-input"
                  type="url"
                  placeholder="Enter assets"
                  defaultValue={this.state.asset}
                  onChange={e => this.setState({asset: e.target.value})}
                />
              </div>
            </div>
          </section>
        </Modal>
      </IconSettings>
		);
	}
};

let mapState = ({ dataTable }) => ({
  dataTable
});

export default connect(mapState, { editItem })(EditActivityModalComponent);