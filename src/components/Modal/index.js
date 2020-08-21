import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  IconSettings,
  Modal,
  Button,
  Combobox,
  Datepicker
} from '@salesforce/design-system-react';

// ACTIONS
import {
  editItem
} from '../../actions/DataTable';


class ModalComponent extends Component {

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
    kpi: this.props.data.kpi,
    campaignId: this.props.data.campaignId,
    kpiValue: '',
    kpiKey: '',
    editValue: '',
    editKey: '',
    campaignError: {
      empty: false,
      char: false
    }
  };

  componentDidMount() {
    this.checkProgram();
    this.checkTactic();
    this.checkFormat();
    this.checkRegion();
  }

  checkTactic = async () => {
    try {
      let response = await fetch('/assets/data/tactic.json');
      let { result } = await response.json()
      let tacticSelection = result.filter(el => el.label === this.props.data.tactic);
      this.setState({ tacticSelection, tactic: result });
    } catch(err) {
      console.log(err)
    }
  }

  checkProgram = async () => {
    try {
      let response = await fetch('/assets/data/program.json');
      let { result } = await response.json()
      let programSelection = result.filter(el => el.label === this.props.data.program);
      this.setState({ programSelection, program: result });
    } catch(err) {
      console.log(err)
    }
  }

  populateTactic = async selection => {
    let response = await fetch('/assets/data/format.json');
    let { result } = await response.json();
    let format = result.filter(el => el.tactic === selection[0].label);
    this.setState({ tacticSelection: selection, format, formatSelection: [format[0]] });
  }

  checkFormat = async () => {
    try {
      let response = await fetch('/assets/data/format.json');
      let { result } = await response.json();
      let format = result.filter(el => el.tactic === this.state.tacticSelection[0].label);
      let formatSelection = result.filter(el => el.label === this.props.data.format);
      this.setState({ formatSelection, format });
    } catch(err) {
      console.log(err)
    }
  }

  checkRegion = async () => {
    try {
      let response = await fetch('/assets/data/region.json');
      let { result } = await response.json()
      let regionSelection = result.filter(el => el.label === this.props.data.region);
      this.setState({ regionSelection, region: result });
    } catch(err) {
      console.log(err)
    }
  }

  handleCampaignId = e => {
    this.setState({campaignId: e.target.value});  
    if(this.state.campaignId.length > 0) {
      this.setState({campaignError:{empty: false}});
      return;
    } else if(this.state.campaignId.length === 18) {
      this.setState({campaignError:{char: false}});
      return;
    }
  }

  handleStartDate = (event, data) => {
    this.setState({ startDate: data.formattedDate });
  }

  handleEndDate = (event, data) => {
    this.setState({ endDate: data.formattedDate });
  }

  editTable = () => {
    if(this.state.campaignId.length === 0) {
      this.setState({campaignError:{empty: true}});
      return;
    } else if(this.state.campaignId.length < 18) {
      this.setState({campaignError:{char: true}});
      return;
    }
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
      kpi: this.state.kpi,
      id: this.props.data.id,
      campaignError: {
        empty: false,
        char: false
      }
    });
    this.props.toggleOpen();
  }

  addKpi = () => {
    if(this.state.kpiKey === '' || this.state.kpiValue === '') return;
    let kpi = [...this.state.kpi, {key: this.state.kpiKey, value: this.state.kpiValue, edit: false}];
    this.setState({kpi, kpiKey: '', kpiValue: ''});
  }

  deleteKpi = idx => {
    let kpi = this.state.kpi.filter((el, i) => idx !== i)
    this.setState({kpi});
  }

  setEditKpi = idx => {
    let kpi = this.state.kpi.map(el => ({...el, edit: false}));
    let item = kpi[idx];
    item.edit = true;
    kpi.splice(idx, 1, item);
    this.setState({kpi, editValue: item.value, editKey: item.key});
  }

  cancelEdit = () => {
    let kpi = this.state.kpi.map(el => ({...el, edit: false}));
    this.setState({kpi});
  }

  editKpi = idx => {
    let kpi = [...this.state.kpi];
    let item = {key: this.state.editKey, value: this.state.editValue, edit: false};
    kpi.splice(idx, 1, item);
    this.setState({kpi, editValue: '', editKey: ''});
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
            <Button label="Save" variant="brand" onClick={this.editTable} />,
          ]}
          onRequestClose={this.props.toggleOpen}
          heading={this.props.title}
          ariaHideApp={false}
        >
          <section className="slds-p-around_large">
            <div className="slds-form-element slds-m-bottom_large">
              <label className="slds-form-element__label">
                Campaign ID
              </label>
              <div className="slds-form-element__control slds-grid slds-gutters">
                <div className={`slds-col slds-size_11-of-12 ${(this.state.campaignError.empty || this.state.campaignError.char) && 'slds-has-error'}`}>
                  <div className="slds-form-element__control">
                    <input
                      className="slds-input"
                      type="text"
                      placeholder="Enter campaign id"
                      value={this.state.campaignId}
                      maxLength="18"
                      onChange={this.handleCampaignId}
                    />
                  </div>
                  {this.state.campaignError.empty && <div className="slds-form-element__help">This field is required</div>}
                  {this.state.campaignError.char && <div className="slds-form-element__help">This field must contain 18 characters</div>}
                </div>
                <div className="slds-col slds-size_1-of-12">
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
                events={{
                  onSelect: (event, data) => {
                    const selection =
                      data.selection.length === 0
                        ? this.state.programSelection
                        : data.selection;
                    console.log('selected: ', selection[0].label);
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
              <label className="slds-form-element__label">
                Title
              </label>
              <div className="slds-form-element__control">
                <input
                  className="slds-input"
                  type="text"
                  placeholder="Enter title"
                  defaultValue={this.state.title}
                  onChange={e => this.setState({title: e.target.value})}
                />
              </div>
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                events={{
                  onSelect: (event, data) => {
                    const selection =
                      data.selection.length === 0
                        ? this.state.tacticSelection
                        : data.selection;
                    console.log('selected: ', selection[0].label);
                    this.populateTactic(selection)
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
                events={{
                  onSelect: (event, data) => {
                    const selection =
                      data.selection.length === 0
                        ? this.state.formatSelection
                        : data.selection;
                    console.log('selected: ', selection[0].label);
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
              <label className="slds-form-element__label">
                Abstract
              </label>
              <div className="slds-form-element__control">
                <input
                  className="slds-input"
                  type="text"
                  placeholder="Enter abstract"
                  defaultValue={this.state.abstract}
                  onChange={e => this.setState({abstract: e.target.value})}
                />
              </div>
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                events={{
                  onSelect: (event, data) => {
                    const selection =
                      data.selection.length === 0
                        ? this.state.regionSelection
                        : data.selection;
                    console.log('selected: ', selection[0].label);
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
              <div className="slds-col slds-size_1-of-2">
                <Datepicker
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
              </div>
              <div className="slds-col slds-size_1-of-2">
                <Datepicker
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
            <label className="slds-form-element__label">
              KPI
            </label>
            {
              this.state.kpi.map((el, i) => {
                return(
                  <div key={i} className="slds-grid slds-gutters slds-m-bottom_large">
                    {
                      el.edit === false ? (
                        <Fragment>
                          <div className="slds-col slds-size_2-of-5">
                            {el.key}
                          </div>
                          <div className="slds-col slds-size_2-of-5">
                            {el.value}
                          </div>
                        </Fragment>
                      ) : (
                        <Fragment>
                        <div className="slds-col slds-size_1-of-3">
                          <div className="slds-form-element__control">
                            <input
                              className="slds-input"
                              type="text"
                              defaultValue={this.state.editKey}
                              placeholder="Enter kpi key"
                              onChange={e => this.setState({editKey: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="slds-col slds-size_1-of-3">
                          <div className="slds-form-element__control">
                            <input
                              className="slds-input"
                              type="text"
                              defaultValue={this.state.editValue}
                              placeholder="Enter kpi value"
                              onChange={e => this.setState({editValue: e.target.value})}
                            />
                          </div>
                        </div>
                        </Fragment>
                      )
                    }
                    
                    <div className={`slds-col slds-size_${el.edit === false ? '1-of-5' : '1-of-3'}`}>
                      {
                        el.edit ? (
                          <Button 
                            onClick={() => this.editKpi(i)}
                            label="Save"
                            variant="brand" />
                        ) : (
                          <Button 
                            onClick={() => this.setEditKpi(i)}
                            assistiveText={{ icon: 'Icon Border-filled medium' }}
                            iconCategory="utility"
                            iconName="edit"
                            iconVariant="border-filled"
                            variant="icon" />
                        )
                      }
                      {
                        el.edit ? (
                          <Button 
                            onClick={this.cancelEdit}
                            label="Cancel"
                            variant="neutral" />
                        ) : (
                          <Button 
                            onClick={() => this.deleteKpi(i)}
                            assistiveText={{ icon: 'Icon Border-filled medium' }}
                            iconCategory="utility"
                            iconName="delete"
                            iconVariant="border-filled"
                            variant="icon" />
                        )
                      }
                      
                    </div>
                  </div>
                )
              })
            }
            <div className="slds-grid slds-gutters slds-m-bottom_large">
              <div className="slds-col slds-size_2-of-5">
                <div className="slds-form-element__control">
                  <input
                    className="slds-input"
                    type="text"
                    value={this.state.kpiKey}
                    placeholder="Enter kpi key"
                    onChange={e => this.setState({kpiKey: e.target.value})}
                  />
                </div>
              </div>
              <div className="slds-col slds-size_2-of-5">
                <div className="slds-form-element__control">
                  <input
                    className="slds-input"
                    type="text"
                    value={this.state.kpiValue}
                    placeholder="Enter kpi value"
                    onChange={e => this.setState({kpiValue: e.target.value})}
                  />
                </div>
              </div>
              <div className="slds-col slds-size_1-of-5">
                <Button onClick={this.addKpi} className="slds-button_stretch" label="Add" disabled={this.state.kpiKey && this.state.kpiValue ? false : true} variant="brand" />  
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

export default connect(mapState, { editItem })(ModalComponent);