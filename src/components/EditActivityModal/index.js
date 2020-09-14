import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getAPIUrl } from '../../config/config';

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
    activityId: this.props.data.activityId,
    title: this.props.data.title,
    abstract: this.props.data.abstract,
    startDate: moment(new Date(this.props.data.startDate)).format('L'),
    endDate: moment(new Date(this.props.data.endDate)).format('L'),
    asset: this.props.data.asset,
    campaignId: this.props.data.campaignId,
    errors: {}
  }

  constructor(props){
    super(props);

    this.API_URL = 'http://localhost:3000/api/v1';
  }

  componentDidMount() {
    this.setupAndFetch();
  }

  componentDidUpdate() {
    console.log("STATE =======> ", this.state);
  }

  setupAndFetch = async () => {
    if(window.location.hostname === 'localhost') this.API_URL =  "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();
    
    this.initDropdowns();
  }

  initDropdowns = async () => {
    await this.checkProgram();
    await this.checkTactic();
    await this.checkRegion();

    this.getActicityById(this.props.data.activityId);
  }

  getActicityById = async id => {
    let response = await fetch(`${this.API_URL}/activity/${id}`);
    let { result } = await response.json();

    try{
      var activityProgram = this.state.program.filter(el => el.program_id === result.programId);
      var activityTactic = this.state.tactic.filter(el => el.tactic_id === result.tacticId);
      var activityRegion = this.state.region.filter(el => el.region_id === result.regionId);

      this.setState({...this.state,
        title: result.title,
        abstract: result.abstract,
        startDate: moment(new Date(result.startDate)).format('L'),
        endDate: moment(new Date(result.endDate)).format('L'), 
        asset: result.asset,
        campaignId: result.campaignId,
        programSelection: activityProgram,
        tacticSelection: activityTactic,
        regionSelection: activityRegion,
      });
      
      await this.checkFormat(this.state.tacticSelection[0].tactic_id);
      var activityFormat = this.state.format.filter(el => el.format_id === result.formatId);

      this.setState({...this.state, 
        formatSelection: activityFormat,
      });
    } catch(err) {
      console.error(err);
    }
  }

  checkTactic = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(`${this.API_URL}/tactic`);
        let { result } = await response.json(); 
  
        //salesforce datepicker requires id key
        result = result.map(el => {
          el.id = el.tactic_id;
          return el;
        });
  
        this.setState({ tactic: result });
        this.checkFormat(result[0].tactic_id);
        resolve();
      } catch(err) {
        console.error(err)
        reject(err);
      }
    });
    
  }

  checkProgram = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(`${this.API_URL}/program`);
        let { result } = await response.json()
  
        //salesforce datepicker requires id key
        result = result.map(el => {
          el.id = el.program_id;
          return el;
        });
  
        this.setState({ program: result });
        resolve();
      } catch(err) {
        console.error(err)
        reject(err);
      }
    })
    
  }

  checkFormat = async (tacticId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(`${this.API_URL}/format/${tacticId}`);
        let { result } = await response.json();
        let formatSelection = result[0];
        
        //salesforce datepicker requires id key
        result = result.map(el => {
          el.id = el.format_id;
          return el;
        });
        
        this.setState({ format: result, formatSelection });
        resolve();
      } catch(err) {
        console.error(err);
        reject(err);
      }
    });
  }

  checkRegion = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(`${this.API_URL}/region`);
        let { result } = await response.json();
        result = result.map(el => {
          el.id = el.region_id;
          return el;
        });
  
        this.setState({ region: result });
        resolve();
      } catch(err) {
        console.error(err)
        reject();
      }
    });
  }

  handleStartDate = (event, data) => {
    let errors = {...this.state.errors};
    if(data.formattedDate) {
      errors = {...this.state.errors, startDate: false};
    } else {
      errors = {...this.state.errors, startDate: true};
    }
    this.setState({ startDate: data.formattedDate, errors });
  }

  handleEndDate = (event, data) => {
    let errors = {...this.state.errors};
    if(data.formattedDate) {
      errors = {...this.state.errors, endDate: false};
    } else {
      errors = {...this.state.errors, endDate: true};
    }
    this.setState({ endDate: data.formattedDate, errors });
  }

  handleChange = e => {
    let errors = {...this.state.errors};
    if(e.target.value && e.target.id !== 'campaignId') {
      errors = {...this.state.errors, [e.target.id]: false};
    } else {
      errors = {...this.state.errors, [e.target.id]: true};
    }
    delete errors.campaignId;
    console.log(e.target.value)
    this.setState({[e.target.id]: e.target.value, errors});
  }

  editTable = async () => {

    if(Object.values(this.state.errors).some(el => el)) return;

    try {
      let body = {
        title: this.state.title,
        campaignId: this.state.campaignId,
        tacticId: this.state.tacticSelection[0].tactic_id,
        formatId: this.state.formatSelection[0].format_id,
        abstract: this.state.abstract,
        regionId: this.state.regionSelection[0].region_id,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        asset: this.state.asset,
        userId: localStorage.getItem('userId'),
        programId: this.state.programSelection[0].program_id,
      }

      const config = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
      debugger
      const response = await fetch(`${this.API_URL}/activity/${this.props.data.activityId}`, config);
      
      this.props.editItem(this.props.dataTable.items, {
        campaignId: this.state.campaignId,
        program: this.state.programSelection[0] && this.state.programSelection[0].program_id,
        format: this.state.formatSelection[0] && this.state.formatSelection[0].format_id,
        region: this.state.regionSelection[0] && this.state.regionSelection[0].region_id,
        tactic: this.state.tacticSelection[0] && this.state.tacticSelection[0].tactic_id,
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
              <Input
                id="campaignId"
                label="Campaign ID"
                placeholder="Placeholder Text"
                value={this.state.campaignId}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                id="program"
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
                errorText={this.state.errors.program && "This field is required"}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Input
                required
                id="title"
                label="Title"
                errorText={this.state.errors.title && "This field is required"}
                placeholder="Enter title"
                value={this.state.title}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                required
                id='tactic'
                events={{
                  onSelect: (event, data) => {
                    const selection =
                      data.selection.length === 0
                        ? this.state.tacticSelection
                        : data.selection;
                    
                    this.setState({ tacticSelection: selection });
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
                errorText={this.state.errors.tactic && "This field is required"}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                required
                id='format'
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
                errorText={this.state.errors.format && "This field is required"}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Textarea
                required
                id="abstract"
                label="Abstract"
                errorText={this.state.errors.abstract && "This field is required"}
                placeholder="Enter abstract"
                value={this.state.abstract}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                required
                id='region'
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
                errorText={this.state.errors.region && "This field is required"}
              />
            </div>
            <div className={`slds-m-bottom_large slds-col slds-size_1-of-1 ${this.state.errors.startDate && "slds-has-error"}`}>
              <Datepicker
                required
                id='startDate'
                triggerClassName="slds-col slds-size_1-of-1"
                labels={{label: 'Start date'}}
                onChange={(event, data) => {
                  this.handleStartDate(event, data);
                  if (this.props.action) {
                    const dataAsArray = Object.keys(data).map((key) => data[key]);
                    this.props.action('onChange')(event, data, ...dataAsArray);
                  }
                }}
                onCalendarFocus={(event, data) => {
                  if (this.props.action) {
                    const dataAsArray = Object.keys(data).map((key) => data[key]);
                    this.props.action('onCalendarFocus')(event, data, ...dataAsArray);
                  }
                }}
                formatter={(date) => date ? moment(date).format('L') : ''}
                parser={(dateString) => moment(dateString, 'L').toDate()}
                formattedValue={this.state.startDate}
                autocomplete="off"
              />
              {this.state.errors.startDate && <div class="slds-form-element__help">This field is required</div>}
            </div>
            <div className={`slds-m-bottom_large slds-col slds-size_1-of-1 ${this.state.errors.endDate && "slds-has-error"}`}>
              <Datepicker
                required
                triggerClassName="slds-col slds-size_1-of-1"
                labels={{label: 'End date',}}
                onChange={(event, data) => {
                  this.handleEndDate(event, data);
                  if (this.props.action) {
                    const dataAsArray = Object.keys(data).map((key) => data[key]);
                    this.props.action('onChange')(event, data, ...dataAsArray);
                  }
                }}
                onCalendarFocus={(event, data) => {
                  if (this.props.action) {
                    const dataAsArray = Object.keys(data).map((key) => data[key]);
                    this.props.action('onCalendarFocus')(event, data, ...dataAsArray);
                  }
                }}
                formatter={(date) => date ? moment(date).format('L') : ''}
                parser={(dateString) => moment(dateString, 'L').toDate()}
                formattedValue={this.state.endDate}
                autocomplete="off"
              />
              {this.state.errors.endDate && <div class="slds-form-element__help">This field is required</div>}
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Input
                id='asset'
                label="Asset"
                type='url'
                required
                placeholder="Enter assets"
                value={this.state.asset}
                onChange={e => this.handleChange(e)}
                errorText={this.state.errors.asset && "This field is required"}
              />
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