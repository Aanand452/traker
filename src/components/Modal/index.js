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

const theme = [
  { id: 1, label: 'State of" Research', value: 'State of" Research' },
  { id: 2, label: '#FeelGoodFriday', value: '#FeelGoodFriday' },
  { id: 3, label: '1 Million Conversations', value: '1 Million Conversations' },
  { id: 4, label: 'Career Series', value: 'Career Series' },
  { id: 5, label: 'CSG- Ask an Expert (Success)', value: 'CSG- Ask an Expert (Success)' },
  { id: 6, label: 'CSG- Circles of Success', value: 'CSG- Circles of Success' },
  { id: 7, label: 'CSG- How To (Success)', value: 'CSG- How To (Success)' },
  { id: 8, label: 'CSG- Lightning Adoption (Success)', value: 'CSG- Lightning Adoption (Success)' },
  { id: 9, label: 'Customer Engagement', value: 'Customer Engagement' },
  { id: 10, label: 'Database Health', value: 'Database Health' },
  { id: 11, label: 'Digital Transformation', value: 'Digital Transformation' },
  { id: 12, label: 'Employee Engagement', value: 'Employee Engagement' },
  { id: 13, label: 'Future of Work', value: 'Future of Work' },
  { id: 14, label: 'Getting Started (Success)', value: 'Getting Started (Success)' },
  { id: 15, label: 'Industries in Dynamic Times', value: 'Industries in Dynamic Times' },
  { id: 16, label: 'Reimagine your Path to Growth (SMB)', value: 'Reimagine your Path to Growth (SMB)' },
  { id: 17, label: 'Salesforce CARE', value: 'Salesforce CARE' },
  { id: 18, label: 'Salesforce Culture', value: 'Salesforce Culture' },
  { id: 19, label: 'Salesforce Live for Financial Services', value: 'Salesforce Live for Financial Services' },
  { id: 20, label: 'Salesforce Live for Retail', value: 'Salesforce Live for Retail' },
  { id: 21, label: 'Salesforce Live: Asia', value: 'Salesforce Live: Asia' },
  { id: 22, label: 'Salesforce Live: Australia & New Zealand', value: 'Salesforce Live: Australia & New Zealand' },
  { id: 23, label: 'Small Business Relief', value: 'Small Business Relief' },
  { id: 24, label: 'Work.com', value: 'Work.com' }
];

const program = [
  { id: 1, label: 'Artificial Intelligence', value: 'Artificial Intelligence' },
  { id: 2, label: 'Business as a Platform for Change', value: 'Business as a Platform for Change' },
  { id: 3, label: 'Customer Engagement', value: 'Customer Engagement' },
  { id: 4, label: 'Digital Transformation', value: 'Digital Transformation' },
  { id: 5, label: 'Future of Work', value: 'Future of Work' },
  { id: 6, label: 'Grow Your Business', value: 'Grow Your Business' },
  { id: 7, label: 'Reopen Your Workplace', value: 'Reopen Your Workplace' },
  { id: 8, label: 'Stablise Your Company', value: 'Stablise Your Company' }
];

const region = [
  { id: 1, label: 'ANZ', value: 'ANZ' },
  { id: 2, label: 'APAC', value: 'APAC' },
  { id: 3, label: 'ASEAN', value: 'ASEAN' },
  { id: 4, label: 'GCR', value: 'GCR' },
  { id: 5, label: 'INDIA', value: 'INDIA' },
];

const persona = [
  { id: 1, label: 'Admin/Ops', value: 'Admin/Ops' },
  { id: 2, label: 'All', value: 'All' },
  { id: 3, label: 'Analytics', value: 'Analytics' },
  { id: 4, label: 'Digital Marketing', value: 'Digital Marketing' },
  { id: 5, label: 'Executive', value: 'Executive' },
  { id: 6, label: 'Financial Services', value: 'Financial Services' },
  { id: 7, label: 'IT', value: 'IT' },
  { id: 8, label: 'Marketing', value: 'Marketing' },
  { id: 9, label: 'Not Applicable', value: 'Not Applicable' },
  { id: 10, label: 'Platform', value: 'Platform' },
  { id: 11, label: 'Sales', value: 'Sales' },
  { id: 12, label: 'Service', value: 'Service' },
  { id: 13, label: 'HR/Employees', value: 'HR/Employees' }
];

const format = [
  { id: 1, label: 'Organic Social', value: 'Organic Social' },
  { id: 2, label: 'ABM', value: 'ABM' },
  { id: 3, label: 'Blog', value: 'Blog' },
  { id: 4, label: 'Content', value: 'Content' },
  { id: 5, label: 'Creative', value: 'Creative' },
  { id: 6, label: 'Customer Story', value: 'Customer Story' },
  { id: 7, label: 'Data Purchase', value: 'Data Purchase' },
  { id: 8, label: 'Demo', value: 'Demo' },
  { id: 9, label: 'Digital', value: 'Digital' },
  { id: 10, label: 'Direct Mail', value: 'Direct Mail' },
  { id: 11, label: 'eBook', value: 'eBook' },
  { id: 12, label: 'Email', value: 'Email' },
  { id: 13, label: '3rd Party - Virtual Event', value: '3rd Party - Virtual Event' },
  { id: 14, label: '3rd Party - Email', value: '3rd Party - Email' },
  { id: 15, label: 'Exec Engagement', value: 'Exec Engagement' },
  { id: 16, label: 'Executive Visit', value: 'Executive Visit' },
  { id: 17, label: 'Keynote', value: 'Keynote' },
  { id: 18, label: 'Launch', value: 'Launch' },
  { id: 19, label: 'Lead Buy', value: 'Lead Buy' },
  { id: 20, label: 'Organic Social', value: 'Organic Social' },
  { id: 21, label: 'Paid Social', value: 'Paid Social' },
  { id: 22, label: 'Podcast', value: 'Podcast' },
  { id: 23, label: 'Report', value: 'Report' },
  { id: 24, label: 'Research', value: 'Research' },
  { id: 25, label: 'SIC', value: 'SIC' },
  { id: 26, label: 'Telenuture', value: 'Telenuture' },
  { id: 27, label: 'Video', value: 'Video' },
  { id: 28, label: 'Virtual Event', value: 'Virtual Event' },
  { id: 29, label: 'Webinar', value: 'Webinar' },
  { id: 30, label: 'Webinar - 3rd Party', value: 'Webinar - 3rd Party' },
  { id: 31, label: 'Website', value: 'Website' }
];


class ModalComponent extends Component {

  state = {
    themeSelection: [theme[0]],
    programSelection: [program[0]],
    formatSelection: [format[0]],
    personaSelection: [persona[0]],
    regionSelection: [region[0]],
    title: this.props.data.title,
    abstract: this.props.data.abstract,
    startDate: this.props.data.startDate,
    endDate: this.props.data.endDate,
    results: this.props.data.results,
    asset: this.props.data.asset,
    kpi: this.props.data.kpi,
    campaignId: this.props.data.campaignId,
    kpiValue: '',
    kpiKey: '',
    editValue: '',
    editKey: ''
  };

  componentDidMount() {
    this.checkTheme();
    this.checkProgram();
    this.checkFormat();
    this.checkPersona();
    this.checkRegion();
  }

  checkTheme = () => {
    let themeSelection = theme.filter(el => el.label === this.props.data.theme)
    this.setState({themeSelection});
  }

  checkProgram = () => {
    let programSelection = program.filter(el => el.label === this.props.data.program)
    this.setState({programSelection});
  }

  checkFormat = () => {
    let formatSelection = format.filter(el => el.label === this.props.data.format)
    this.setState({formatSelection});
  }

  checkPersona = () => {
    let personaSelection = persona.filter(el => el.label === this.props.data.persona)
    this.setState({personaSelection});
  }

  checkRegion = () => {
    let regionSelection = region.filter(el => el.label === this.props.data.region)
    this.setState({regionSelection});
  }

  handleStartDate = (event, data) => {
    this.setState({ startDate: data.formattedDate });
  }

  handleEndDate = (event, data) => {
    this.setState({ endDate: data.formattedDate });
  }

  editTable = () => {
    this.props.editItem(this.props.dataTable.items, {
      campaignId: this.state.campaignId,
      theme: this.state.themeSelection[0] && this.state.themeSelection[0].label,
      program: this.state.programSelection[0] && this.state.programSelection[0].label,
      format: this.state.formatSelection[0] && this.state.formatSelection[0].label,
      persona: this.state.personaSelection[0] && this.state.personaSelection[0].label,
      region: this.state.regionSelection[0] && this.state.regionSelection[0].label,
      title: this.state.title,
      abstract: this.state.abstract,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      results: this.state.results,
      asset: this.state.asset,
      kpi: this.state.kpi,
      id: this.props.data.id
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
            <div className="slds-form-element slds-m-bottom_large">
              <label className="slds-form-element__label">
                Campaign ID
              </label>
              <div className="slds-form-element__control slds-grid slds-gutters">
                <div className="slds-col slds-size_11-of-12">
                  <div className="slds-form-element__control">
                    <input
                      className="slds-input"
                      type="text"
                      placeholder="Enter campaign id"
                      value={this.state.campaignId}
                      onChange={e => this.setState({campaignId: e.target.value})}
                    />
                  </div>
                </div>
                <div className="slds-col slds-size_1-of-12">
                  <Button
                    onClick={() => this.setState({campaignId: this.idGenerator(12)})}
                    assistiveText={{ icon: 'Icon Border-filled medium' }}
                    iconCategory="utility"
                    iconName="refresh"
                    iconVariant="border-filled"
                    title="Generate new Campaign ID"
                    variant="icon" />
                </div>
              </div>
            </div>
              <Combobox
                events={{
                  onSelect: (event, data) => {
                    const selection =
                      data.selection.length === 0
                        ? this.state.themeSelection
                        : data.selection;
                    console.log('selected: ', selection[0].label);
                    this.setState({ themeSelection: selection });
                  },
                }}
                labels={{
                  label: 'Theme',
                  placeholder: 'Enter theme',
                }}
                menuPosition="relative"
                options={theme}
                selection={this.state.themeSelection}
                variant="readonly"
              />
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
                options={program}
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
                        ? this.state.formatSelection
                        : data.selection;
                    console.log('selected: ', selection[0].label);
                    this.setState({ formatSelection: selection });
                  },
                }}
                labels={{
                  label: 'Format',
                  placeholder: 'Enter format',
                }}
                menuPosition="relative"
                options={format}
                selection={this.state.formatSelection}
                variant="readonly"
              />
            </div>
            <div className="slds-form-element slds-m-bottom_large">
              <Combobox
                events={{
                  onSelect: (event, data) => {
                    const selection =
                      data.selection.length === 0
                        ? this.state.personaSelection
                        : data.selection;
                    console.log('selected: ', selection[0].label);
                    this.setState({ personaSelection: selection });
                  },
                }}
                labels={{
                  label: 'Persona',
                  placeholder: 'Enter persona',
                }}
                menuPosition="relative"
                options={persona}
                selection={this.state.personaSelection}
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
                options={region}
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
                Results
              </label>
              <div className="slds-form-element__control">
                <input
                  className="slds-input"
                  type="text"
                  placeholder="Enter results"
                  defaultValue={this.state.results}
                  onChange={e => this.setState({results: e.target.value})}
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
                  type="text"
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