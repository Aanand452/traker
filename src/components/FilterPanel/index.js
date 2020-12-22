import React, { Component } from "react";
import { PanelContainer } from "./styles";
import moment from "moment";

import {
  Button,
  Combobox,
  Datepicker,
  Input,
} from "@salesforce/design-system-react";


class FilterPanel extends Component {

  onKeyPress = e => {
    if(e.key === "Enter") {
      this.props.onFilter();
    }
  }

  checkEndDate = (date) => {
    const endDate = moment(this.props.filters.endDate,'DD/MM/YYYY');
    return endDate.isBefore(date.date)
  }

  checkStartDate = (date) => {
    const starDate = moment(this.props.filters.startDate,'DD/MM/YYYY');
    return starDate.isAfter(date.date)
  }

  render() {
    const { regions = [], programs = [], formats = [] } = this.props;
    return (
      <PanelContainer>
        <Input
          onKeyPress={e => this.onKeyPress(e)}
          onChange={(e) => this.props.handleChange("userId", e.target.value)}
          value={this.props.filters.userId}
          type="text"
          label="Search by owner"
          className="slds-m-top_small"
        />
        <Input
          onKeyPress={e => this.onKeyPress(e)}
          onChange={(e) => this.props.handleChange("campaignId", e.target.value)}
          value={this.props.filters.campaignId}
          type="text"
          label="Search by campaign ID"
          className="slds-m-top_small"
        />
        <Input
          onKeyPress={e => this.onKeyPress(e)}
          onChange={(e) => this.props.handleChange("title", e.target.value)}
          value={this.props.filters.title}
          type="text"
          label="Search by title"
          className="slds-m-top_small"
        />
        <Combobox
          id="combobox-readonly-single-region"
          classNameContainer="slds-m-top_small"
          events={{
            onSelect: (event, data) =>
              data.selection.length &&
              this.props.handleChange("regionId", data.selection),
          }}
          labels={{ label: "Region" }}
          name="region"
          options={regions}
          selection={this.props.filters.regionId}
          variant="readonly"
        />
        <Combobox
          id="combobox-readonly-single-program"
          classNameContainer="slds-m-top_small"
          events={{
            onSelect: (event, data) =>
              data.selection.length &&
              this.props.handleChange("programId", data.selection),
          }}
          labels={{ label: "Program" }}
          name="program"
          options={programs}
          selection={this.props.filters.programId}
          variant="readonly"
        />
        <Combobox
          id="combobox-readonly-single-format"
          classNameContainer="slds-m-top_small"
          events={{
            onSelect: (event, data) =>
              data.selection.length &&
              this.props.handleChange("formatId", data.selection),
          }}
          labels={{ label: "Format" }}
          name="format"
          options={formats}
          selection={this.props.filters.formatId}
          variant="readonly"
        />
        <div className=" slds-m-top_small">
          <p>Select range of dates</p>
        </div>
        {this.props.errors.repeated && (
          <div className="slds-has-error">
            <div className="slds-form-element__help slds-has-error">
              Fields must be different
            </div>
          </div>
        )}
        <div className="slds-grid slds-gutters">
          <div
            className={`slds-col slds-size_1-of-2 ${
              this.props.errors.startDate && "slds-has-error"
            }`}
          >
            <Datepicker
              ref={this.startDate}
              labels={{ label: "Initial Date" }}
              triggerClassName="slds-size_1-of-1"
              onChange={(event, data) =>
                this.props.handleChange("startDate", data.formattedDate)
              }
              formatter={(date) =>
                date ? moment(date).format("DD/MM/YYYY") : ""
              }
              parser={(dateString) => moment(dateString, "DD/MM/YYYY").toDate()}
              formattedValue={this.props.filters.startDate}
              dateDisabled={this.props.filters.endDate ? this.checkEndDate.bind(this) :undefined}
            />
            {this.props.errors.startDate && (
              <div className="slds-form-element__help">
                This field is required
              </div>
            )}
          </div>
          <div
            className={`slds-size_1-of-2 ${
              this.props.errors.endDate && "slds-has-error"
            }`}
          >
            <Datepicker
              ref={this.endDate}
              labels={{ label: "Final Date" }}
              triggerClassName="slds-col slds-size_1-of-1"
              onChange={(event, data) =>
                this.props.handleChange("endDate", data.formattedDate)
              }
              formatter={(date) =>
                date ? moment(date).format("DD/MM/YYYY") : ""
              }
              parser={(dateString) => moment(dateString, "DD/MM/YYYY").toDate()}
              formattedValue={this.props.filters.endDate}
              dateDisabled={this.props.filters.startDate ? this.checkStartDate.bind(this) :undefined}
            />
            {this.props.errors.endDate && (
              <div className="slds-form-element__help">
                This field is required
              </div>
            )}
          </div>
        </div>

        <Button
          buttonRef={this.onKeyPress}
          onClick={this.props.onFilter}
          className="slds-m-top_small"
          label="Search"
          variant="brand"
        />
      </PanelContainer>
    );
  }
}

export default FilterPanel;
