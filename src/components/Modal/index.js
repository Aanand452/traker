import React, { Component } from 'react';
import moment from 'moment';
import {
  IconSettings,
  Modal,
  Button,
  Combobox,
  Datepicker
} from '@salesforce/design-system-react';

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
    asset: this.props.data.asset
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

	render() {
        
		return (
      <IconSettings iconPath="/assets/icons">
        <Modal
          isOpen={this.props.isOpen}
          footer={[
            <Button label="Cancel" onClick={this.props.toggleOpen} />,
            <Button label="Save" variant="brand" onClick={() => this.props.onSubmit({
              id: this.props.data.id,
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
              asset: this.state.asset
            })} />,
          ]}
          onRequestClose={this.props.toggleOpen}
          heading={this.props.title}
          ariaHideApp={false}
        >
          <section className="slds-p-around_large">
            <div className="slds-form-element slds-m-bottom_large">
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
          </section>
        </Modal>
      </IconSettings>
		);
	}
};

export default ModalComponent;