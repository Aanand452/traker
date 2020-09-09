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
    activityId: null,
    title: null,
    abstract: null,
    startDate: null,
    endDate: null,
    asset: null,
    campaignId: null,
    errors: {}
  }

  constructor(props){
    super(props);

    this.API_URL = 'http://localhost:3000/api/v1';
  }

  componentDidMount() {
    this.setupAndFetch();
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
        startDate: moment(result.startDate).format('MM/DD/YYYY'),
        endDate: moment(result.endDate).format('MM/DD/YYYY'),
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
    this.setState({ startDate: data.formattedDate });
  }

  handleEndDate = (event, data) => {
    this.setState({ endDate: data.formattedDate });
  }

  handleChange = e => {
    this.setState({[e.target.id]: e.target.value});
  }

  editTable = async () => {
    /*let { title, abstract, campaignId } = this.state;
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
    }*/

    try {
      let body = {
        title: this.state.title,
        campaignId: this.state.campaignId,
        tacticId: this.state.tacticSelection[0].tactic_id,
        formatId: this.state.formatSelection[0].format_id,
        abstract: this.state.abstract,
        regionId: this.state.regionSelection[0].region_id,
        startDate: this.state.startDate,
        endDate: this.state.endtDate,
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
              <Input
                id="campaignId"
                label="Campaign ID"
                placeholder="Placeholder Text"
                defaultValue={this.state.campaignId}
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
              <Input
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
                    }
                  }}
                  onCalendarFocus={(event, data) => {
                    if (this.props.action) {
                      const dataAsArray = Object.keys(data).map((key) => data[key]);
                      this.props.action('onCalendarFocus')(event, data, ...dataAsArray);
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
                    }
                  }}
                  onCalendarFocus={(event, data) => {
                    if (this.props.action) {
                      const dataAsArray = Object.keys(data).map((key) => data[key]);
                      this.props.action('onCalendarFocus')(event, data, ...dataAsArray);
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