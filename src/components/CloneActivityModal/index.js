import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { getAPIUrl } from '../../config/config';

import {
  IconSettings,
  Modal,
  Button,
  Combobox,
  Datepicker,
  Input,
  Textarea,
  Checkbox
} from '@salesforce/design-system-react';


class CloneActivityModalComponent extends Component {

  state = {
    isProgramLoading: false,
    isRegionLoading: false,
    isFormatLoading: false,
    program: [],
    region: [],
    format: [],
    programSelection: [],
    formatSelection: [],
    regionSelection: [],
    activityId: this.props.data.activityId,
    title: this.props.data.title,
    abstract: this.props.data.abstract,
    startDate: moment(new Date(this.props.data.startDate)).format('DD/MM/YYYY'),
    endDate: moment(new Date(this.props.data.endDate)).format('DD/MM/YYYY'),
    asset: this.props.data.asset,
    campaignId: this.props.data.campaignId,
    customerMarketing: this.props.data.customerMarketing,
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
    await this.checkRegion();
    await this.checkFormat();

    this.getActicityById(this.props.data.activityId);
  }

  getActicityById = async id => {
    let response = await fetch(`${this.API_URL}/activity/${id}`);
    let { result } = await response.json();

    try{
      var activityProgram = this.state.program.filter(el => el.program_id === result.programId);
      var activityRegion = this.state.region.filter(el => el.region_id === result.regionId);
      var activityFormat = this.state.format.filter(el => el.format_id === result.formatId);

      this.setState({...this.state,
        title: result.title,
        abstract: result.abstract,
        startDate: moment(new Date(result.startDate)).format('DD/MM/YYYY'),
        endDate: moment(new Date(result.endDate)).format('DD/MM/YYYY'),
        asset: result.asset,
        campaignId: result.campaignId,
        programSelection: activityProgram,
        regionSelection: activityRegion,
        formatSelection: activityFormat,
      });
    } catch(err) {
      console.error(err);
    }
  }

  checkProgram = async () => {
    this.setState({ isProgramLoading: true });
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(`${this.API_URL}/program`);
        let { result } = await response.json();

        //salesforce datepicker requires id key
        result = result.map(el => {
          el.id = el.program_id;
          return el;
        });

        this.setState({ program: result, isProgramLoading: false });
        resolve();
      } catch(err) {
        console.error(err);
        this.setState({ isProgramLoading: false });
        reject(err);
      }
    })

  }

  checkFormat = async () => {
    this.setState({ isFormatLoading: true });
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(`${this.API_URL}/format`);
        let { result } = await response.json();

        //salesforce datepicker requires id key
        result = result.map(el => ({...el, id: el.format_id, label: el.name}));

        this.setState({ format: result, isFormatLoading: false });
        resolve();
      } catch(err) {
        console.error(err);
        this.setState({ isFormatLoading: false });
        reject(err);
      }
    });
  }

  checkRegion = async () => {
    this.setState({ isRegionLoading: true });
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(`${this.API_URL}/region`);
        let { result } = await response.json();
        result = result.map(el => {
          el.id = el.region_id;
          return el;
        });

        this.setState({ region: result, isRegionLoading: false });
        resolve();
      } catch(err) {
        console.error(err);
        this.setState({ isRegionLoading: false });
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
    if(e.target.id === 'asset') {
      errors = {...errors, asset: !this.isUrl(e.target.value)};
    } else if(e.target.value && e.target.id !== 'campaignId') {
      errors = {...errors, [e.target.id]: false};
    } else {
      errors = {...errors, [e.target.id]: true};
    }

    delete errors.campaignId;
    delete errors.customerMarketing;
    if(e.target.id === "customerMarketing") {
      this.setState({customerMarketing: e.target.checked, errors});
    } else {
      this.setState({[e.target.id]: e.target.value, errors});
    }
  }

  isUrl = data => {
    if (!data) {
      return true;
    }
    const regexp = new RegExp(/^((ftp|http|https):\/\/)?(?:www\.|(?!www\.))[A-z0-9-_]+\.[A-z]{2,}(.*)?$/);
    return regexp.test(data);
  }

  parseDatesGTM = row => {
    row.startDate = moment(row.startDate, 'DD/MM/YYYY').format();
    row.endDate = moment(row.endDate, 'DD/MM/YYYY').format();

    return row;
  }

  validate = body => {
    let errors = {...this.state.errors}
    const requiredFields = [
      'abstract',
      'endDate',
      'formatId',
      'programId',
      'regionId',
      'startDate',
      'title',
      'userId',
    ];

    requiredFields.forEach((reqField) => {
      if(!body[reqField]) {
        errors = {...errors, [reqField]: true};
      }
    })

    this.setState({ errors });
    return errors;
  }

  cloneTable = async e => {
    e.preventDefault();

    try {
      let body = {
        title: this.state.title,
        campaignId: this.state.campaignId,
        formatId: this.state.formatSelection[0] && this.state.formatSelection[0].id,
        abstract: this.state.abstract,
        regionId: this.state.regionSelection[0] && this.state.regionSelection[0].id,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        asset: this.state.asset,
        customerMarketing: this.state.customerMarketing || false,
        userId: localStorage.getItem('userId'),
        programId: this.state.programSelection[0] && this.state.programSelection[0].id,
      }

      if(Object.values(this.validate(body)).some(el => el)) return;

      body = this.parseDatesGTM(body);

      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }

      let response = await fetch(`${this.API_URL}/activity`, config);
      if(response.status === 200) {
        this.props.toggleOpen("cloneModalIsOPen");
        this.props.onToast(true, "Activity was created successfully", "success");
        this.props.reloadActivities();
      } else throw new Error(response);
    } catch (err) {
      console.error(err);
      this.props.onToast(true, "Something went wrong, please try again", "error");
    }
  }

	render() {
		return (
      <IconSettings iconPath="/assets/icons">
        <Modal
          isOpen={true}
          footer={[
            <Button
              label="Cancel"
              onClick={() => this.props.toggleOpen("cloneModalIsOPen")}
              key="CancelButton"
            />,
            <Button
              type="submit"
              label="Create"
              variant="brand"
              onClick={this.cloneTable}
              key="SubmitButton"
              disabled={
                this.state.isProgramLoading ||
                this.state.isRegionLoading ||
                this.state.isFormatLoading
              }
            />,
          ]}
          onRequestClose={() => this.props.toggleOpen("cloneModalIsOPen")}
          heading="Clone activity"
          ariaHideApp={false}
        >
          <section className="slds-p-around_large">
            <div className="slds-form-element slds-m-bottom_large">
              <Input
                id="campaignId"
                label="Campaign ID"
                placeholder="Enter campaign id"
                value={this.state.campaignId}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                id="programId"
                required
                events={{
                  onSelect: (event, data) => {
                    const selection =
                      data.selection.length === 0
                        ? this.state.programSelection
                        : data.selection;
                    this.setState({ programSelection: selection, errors: {programId: false} });
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
                errorText={this.state.errors.programId && "This field is required"}
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
                id='formatId'
                events={{
                  onSelect: (event, data) => {
                    const selection =
                      data.selection.length === 0
                        ? this.state.formatSelection
                        : data.selection;
                    this.setState({ formatSelection: selection, errors: {formatId: false} });
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
                errorText={this.state.errors.formatId && "This field is required"}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Textarea
                required
                id="abstract"
                label="Abstract"
                errorText={this.state.errors.abstract ? "This field is required" : ""}
                placeholder="Enter abstract"
                value={this.state.abstract}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                required
                id='regionId'
                events={{
                  onSelect: (event, data) => {
                    const selection =
                      data.selection.length === 0
                        ? this.state.regionSelection
                        : data.selection;
                    this.setState({ regionSelection: selection, errors: {regionId: false} });
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
                errorText={this.state.errors.regionId && "This field is required"}
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
                formatter={(date) => date ? moment(date).format('DD/MM/YYYY') : ''}
                parser={(dateString) => moment(dateString, 'DD/MM/YYYY').toDate()}
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
                formatter={(date) => date ? moment(date).format('DD/MM/YYYY') : ''}
                parser={(dateString) => moment(dateString, 'DD/MM/YYYY').toDate()}
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
                placeholder="Insert a valid URL here"
                value={this.state.asset}
                onChange={e => this.handleChange(e)}
                errorText={this.state.errors.asset && "This field must be a url"}
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Checkbox
                assistiveText={{
                  label: 'Default',
                }}
                id="customerMarketing"
                labels={{
                  label: 'Customer marketing',
                }}
                checked={this.state.customerMarketing}
                onChange={e => this.handleChange(e)}
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

export default connect(mapState)(CloneActivityModalComponent);
