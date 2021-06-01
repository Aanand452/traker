import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { getAPIUrl } from '../../config/config';
import { getCookie } from '../../utils/cookie';

import {
  IconSettings,
  Modal,
  Button,
  Combobox,
  Datepicker,
  Input,
  Textarea,
  Checkbox,
} from '@salesforce/design-system-react';

import { PillContianerStyled, InputIconStyled } from '../CreateActivity/styles';

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
    startDate: this.props.data.startDate,
    endDate: this.props.data.endDate,
    asset: '',
    assets: [],
    campaignId: this.props.data.campaignId,
    customerMarketing: this.props.data.customerMarketing,
    errors: {},
    programsFYstartDate: '',
    programsFYendDate: '',
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

    await this.getConfig();

    this.initDropdowns();
  }

  async getConfig(){
    try{
      const request = await fetch('/config');
      const data = await request.json();
      request.status === 200 && this.setState({
        programsFYstartDate: data.programsFYstartDate,
        programsFYendDate: data.programsFYendDate
        });

    } catch(e) {
      console.error('ERROR: cannot get the url config: ', e);
    }
  }

  initDropdowns = async () => {
    await this.checkProgram();
    await this.checkRegion();
    await this.checkFormat();

    this.getActicityById(this.props.data.activityId);
  }

  getActicityById = async id => {
    let token = getCookie('token').replaceAll('"','');
    const config = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
    let response = await fetch(`${this.API_URL}/activity/${id}`, config);
    let { result } = await response.json();

    try{
      var activityProgram = this.state.program.filter(el => el.program_id === result.programId);
      var activityRegion = this.state.region.filter(el => el.region_id === result.regionId);
      var activityFormat = this.state.format.filter(el => el.format_id === result.formatId);

      const assets = result.asset ? result.asset.split(', ').map(asset => ({
        id: asset,
        title: asset,
        label: asset,
      })) : [];
      this.setState({...this.state,
        title: result.title,
        abstract: result.abstract,
        startDate: this.parseDate(this.props.data.startDate),
        endDate: this.parseDate(this.props.data.endDate),
        asset: '',
        assets,
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
    console.log(this.props.historicDate)
    this.setState({ isProgramLoading: true });
    const { programsFYstartDate, programsFYendDate } = this.state;
    return new Promise(async (resolve, reject) => {
      try {
        let token = getCookie('token').replaceAll('"','');
        const config = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            programsStartDate: programsFYstartDate,
            programsEndDate:  programsFYendDate,
          })
        }
        let response = await fetch(`${this.API_URL}/programs`, config);
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
        let token = getCookie('token').replaceAll('"','');
        const config = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
        let response = await fetch(`${this.API_URL}/format`, config);
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
        let token = getCookie('token').replaceAll('"','');
        const config = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
        let response = await fetch(`${this.API_URL}/region`, config);
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
      errors = {...errors, asset: !this.isUrl(e.target.value), assetRepeat: false};
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

  parseDate = date => {
    let [y, m, d] = date.slice(0, 10).split('-');
    return `${d}/${m}/${y}`;
  }

  parseDatesGTM = row => {
    let [m1, d1, y1] = row.startDate.split('/');
    let [m2, d2, y2] = row.endDate.split('/');

    row.startDate = `${d1}/${m1}/${y1}`;
    row.endDate = `${d2}/${m2}/${y2}`;

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
      let asset = this.state.assets.map((asset) => asset.label).join(', ');

      if(this.state.asset) {
        if (this.state.assets.some(val => val.title.toLowerCase() === this.state.asset.toLowerCase())) {
          return this.setState((state) => ({
            errors: {
              ...state.errors,
              assetRepeat: true,
            },
          }));
        }
        let assetArr = asset.split(', ');
        asset = [...assetArr, this.state.asset].join(', ');
      }

      if(asset.startsWith(',')) {
        asset = asset.slice(1).trim();
      }

      let body = {
        title: this.state.title,
        campaignId: this.state.campaignId,
        formatId: this.state.formatSelection[0] && this.state.formatSelection[0].id,
        abstract: this.state.abstract,
        regionId: this.state.regionSelection[0] && this.state.regionSelection[0].id,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        asset,
        customerMarketing: this.state.customerMarketing || false,
        userId: localStorage.getItem('userId'),
        programId: this.state.programSelection[0] && this.state.programSelection[0].id,
      }
      let token = getCookie('token').replaceAll('"','');

      if(Object.values(this.validate(body)).some(el => el)) return;

      body = this.parseDatesGTM(body);

      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      }

      let response = await fetch(`${this.API_URL}/activity`, config);
      if(response.status === 200) {
        let { startDate, endDate } = this.props.historicDate;
        this.props.toggleOpen("cloneModalIsOPen");
        this.props.onToast(true, "Activity was created successfully", "success");
        if(this.props.isHistoric && startDate !== "" && endDate !== "") {
          this.props.reloadActivities(startDate, endDate);
        } else {
          this.props.reloadActivities();
        }
      } else throw new Error(response);
    } catch (err) {
      console.error(err);
      this.props.onToast(true, "Something went wrong, please try again", "error");
    }
  }

  addAsset = (asset) => {
    if (this.state.assets.some(val => val.title.toLowerCase() === asset.toLowerCase())) {
      return this.setState((state) => ({
        errors: {
          ...state.errors,
          assetRepeat: true,
        },
      }));
    }

    this.setState((state) => ({
      assets: [
        ...state.assets,
        {
          id: asset,
          label: asset,
          title: asset
        }
      ],
    }));
    this.handleChange({ target: { id: 'asset', value: '' }});
  }

  editAsset = (asset) => {
    this.setState((state) => ({
      asset,
      assets: state.assets.filter((val) => val.title !== asset),
    }));
  }

  deleteAsset = (asset) => {
    this.setState((state) => ({
      assets: state.assets.filter((val) => val.title !== asset),
    }));
  }

  checkEndDate = (date) => {
    const endDate = moment(this.state.endDate,'DD/MM/YYYY');
    if(!date) return;
    return endDate.isBefore(date.date)
  }

  checkStartDate = (date) => {
    const starDate = moment(this.state.startDate,'DD/MM/YYYY');
    if(!date) return;
    return starDate.isAfter(date.date)
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
                errorText={this.state.errors.programId ? "This field is required" : ""}
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
                errorText={this.state.errors.formatId ? "This field is required" : ""}
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
                errorText={this.state.errors.regionId ? "This field is required" : ""}
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
                formattedValue={this.parseDate(this.state.startDate)}
                autocomplete="off"
                dateDisabled={this.checkEndDate}
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
                formattedValue={this.parseDate(this.state.endDate)}
                autocomplete="off"
                dateDisabled={this.checkStartDate}
              />
              {this.state.errors.endDate && <div class="slds-form-element__help">This field is required</div>}
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Input
                id='asset'
                label="Asset"
                iconRight={
                  <InputIconStyled
                    assistiveText={{
                      icon: 'add',
                    }}
                    name="add"
                    category="utility"
                    onClick={() => {
                      this.addAsset(this.state.asset);
                    }}
                    disabled={this.state.errors.asset || !this.state.asset}
                  />
                }
                type='url'
                placeholder="Insert a valid URL here"
                value={this.state.asset}
                onChange={e => this.handleChange(e)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if(this.state.errors.asset || !this.state.asset) {
                      return;
                    }
                    this.addAsset(this.state.asset);
                  }
                }}
                errorText={(() => {
                  if (this.state.errors.asset) {
                    return 'This field must be a url';
                  }
                  if (this.state.errors.assetRepeat) {
                    return 'Repeated URL';
                  }
                })()}
              />
              {
                !!this.state.assets.length && (
                  <PillContianerStyled
                    options={this.state.assets}
                    onClickPill={(e, data) => {
                      this.editAsset(data.option.label);
                    }}
                    onRequestRemovePill={(e, data) => {
                      this.deleteAsset(data.option.label);
                    }}
                  />
                )
              }
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
