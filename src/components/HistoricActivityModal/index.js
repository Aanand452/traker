import React, { Component } from 'react';
import moment from 'moment-timezone';
import {
  IconSettings,
  Modal,
  Button,
  Datepicker
} from '@salesforce/design-system-react';

import './styles.css'


class HistoricActivityModal extends Component {

  state = {
    errors: {}
  }

  handleChange = (name, value) => {
    let errors = {...this.state.errors};

    if(value) {
      delete errors[name];
    }

    this.props.handleHistoricDate(name, value);
  }

  validate = () => {
    let inputs = ["endDate", "startDate"];
    let errors = {}
    inputs.forEach(input => {
      if(!this.props.historicDate[input]) {
        errors = {...errors, [input]: true}
      }
    });
    this.setState({ errors });
    return errors
  }

  submit = () => {
    let { startDate, endDate } = this.props.historicDate;
    let errors = this.validate();
    if(Object.values(errors).some(el => el)) return;

    this.props.getActivities(startDate, endDate);
    this.props.closeHistoricModal();
  }

	render() {

    let { startDate, endDate } = this.props.historicDate;
    
		return (
      <IconSettings iconPath="/assets/icons">
        <Modal
          contentClassName="overflow-unset"
          isOpen={true}
          footer={[
            <Button
              label="Cancel"
              onClick={this.props.closeHistoricModal}
              key="CancelButton"
            />,
            <Button
              type="submit"
              label="Search"
              variant="brand"
              onClick={this.submit}
              key="SubmitButton"
              disabled={startDate === '' || endDate === ''}
            />,
          ]}
          onRequestClose={this.props.closeHistoricModal}
          heading="Search activities"
          ariaHideApp={false}
        >
          <section className="slds-p-around_large">
            <p>Select a date range</p>
            <div className="slds-form-element slds-m-bottom_large slds-grid slds-gutters">
              <div className={`slds-col ${this.state.errors.startDate && "slds-has-error"}`}>
                <Datepicker
                  required
                  label="Start date"
                  triggerClassName="slds-size_1-of-1"
                  onChange={(event, data) => this.handleChange("startDate", data.formattedDate)}
                  formatter={(date) => date ? moment(date).format('DD/MM/YYYY') : ''}
                  parser={(dateString) => moment(dateString, 'DD/MM/YYYY').toDate()}
                  formattedValue={this.state.startDate}
                />
                {this.state.errors.startDate && <div className="slds-form-element__help">This field is required</div>}
              </div>
              <div className={`slds-col ${this.state.errors.endDate && "slds-has-error"}`}>
                <Datepicker
                  required
                  label="End date"
                  triggerClassName="slds-size_1-of-1"
                  onChange={(event, data) => this.handleChange("endDate", data.formattedDate)}
                  formatter={(date) => date ? moment(date).format('DD/MM/YYYY') : ''}
                  parser={(dateString) => moment(dateString, 'DD/MM/YYYY').toDate()}
                  formattedValue={this.state.endDate}
                />
                {this.state.errors.endDate && <div className="slds-form-element__help">This field is required</div>}
              </div>
            </div>
          </section>
        </Modal>
      </IconSettings>
		);
	}
};

export default HistoricActivityModal;
