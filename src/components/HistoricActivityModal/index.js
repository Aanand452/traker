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
      delete errors["dates"];
      delete errors["sameDates"];
      delete errors[name];
      this.setState({ errors });
    }

    this.props.handleHistoricDate(name, value);
  }

  checkEndDate = date => {
    const endDate = moment(this.props.historicDate.endDate ,'DD/MM/YYYY');
    if(!date) return;
    return endDate.isBefore(date.date)
  }

  checkStartDate = date => {
    const starDate = moment(this.props.historicDate.startDate,'DD/MM/YYYY');
    if(!date) return;
    return starDate.isAfter(date.date)
  }

  compareDates = (a, b) => {
    var start = moment(a, 'DD/MM/YYYY');
    var end = moment(b, 'DD/MM/YYYY');
    if(end < start) return true;
  }

  validate = () => {
    let { startDate, endDate } = this.props.historicDate;
    let inputs = ["endDate", "startDate"];
    let errors = {}

    inputs.forEach(input => {
      if(!this.props.historicDate[input]) {
        errors = {...errors, [input]: true}
      }
    });

    if(this.compareDates(startDate, endDate)) {
      errors = {...errors, dates: true }
    }
    if(startDate && endDate && startDate === endDate) {
      errors = {...errors, sameDates: true }
    }

    this.setState({ errors });
    return errors
  }

  submit = () => {
    let { startDate, endDate } = this.props.historicDate;
    let errors = this.validate();
    
    if(Object.values(errors).some(el => el)) return;
    
    this.props.getActivities(startDate, endDate);
    this.props.resetHistoricDate();
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
              disabled={!startDate || !endDate}
            />,
          ]}
          onRequestClose={this.props.closeHistoricModal}
          heading="Search activities"
          ariaHideApp={false}
        >
          <section className="slds-p-around_large">
            <p>Select a date range</p>
            <div className={`slds-form-element slds-grid slds-gutters`}>
              <div className={`slds-col ${(this.state.errors.startDate || this.state.errors.dates || this.state.errors.sameDates) && "slds-has-error"}`}>
                <Datepicker
                  required
                  label="Start date"
                  triggerClassName="slds-size_1-of-1"
                  onChange={(event, data) => this.handleChange("startDate", data.formattedDate)}
                  formatter={(date) => date ? moment(date).format('DD/MM/YYYY') : ''}
                  parser={(dateString) => moment(dateString, 'DD/MM/YYYY').toDate()}
                  formattedValue={startDate}
                  dateDisabled={this.checkEndDate}
                />
                {this.state.errors.startDate && <div className="slds-form-element__help">This field is required</div>}
              </div>
              <div className={`slds-col ${(this.state.errors.endDate || this.state.errors.dates || this.state.errors.sameDates) && "slds-has-error"}`}>
                <Datepicker
                  required
                  label="End date"
                  triggerClassName="slds-size_1-of-1"
                  onChange={(event, data) => this.handleChange("endDate", data.formattedDate)}
                  formatter={(date) => date ? moment(date).format('DD/MM/YYYY') : ''}
                  parser={(dateString) => moment(dateString, 'DD/MM/YYYY').toDate()}
                  formattedValue={endDate}
                  dateDisabled={this.checkStartDate}
                />
                {this.state.errors.endDate && <div className="slds-form-element__help">This field is required</div>}
              </div>
            </div>
            {this.state.errors.dates && <div className={`slds-col ${this.state.errors.dates && "slds-has-error"}`}>
              <div className="slds-form-element__help">Both fields shouldn't be opposed</div>
            </div>}
            {this.state.errors.sameDates && <div className={`slds-col ${this.state.errors.sameDates && "slds-has-error"}`}>
              <div className="slds-form-element__help">Both fields must be different</div>
            </div>}
          </section>
        </Modal>
      </IconSettings>
		);
	}
};

export default HistoricActivityModal;
