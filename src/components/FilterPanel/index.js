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
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      filters: { ...props.filters },
    };
  }

  handleChange = (name, value) => {
    if(name === "startDate" && value !== "") {
      this.setState({
        errors: {...this.state.errors, startDate: false, repeated: false}
      });
    } else if(name === "endDate" && value !== "") {
      this.setState({
        errors: {...this.state.errors, endDate: false, repeated: false}
      });
    }
    this.setState({ filters: { ...this.state.filters, [name]: value } });
  };

  checkEndDate = (date) => {
    const endDate = moment(this.state.filters.endDate,'DD/MM/YYYY');
    return endDate.isBefore(date.date)
  }
  
  checkStartDate = (date) => {
    const starDate = moment(this.state.filters.startDate,'DD/MM/YYYY');
    return starDate.isAfter(date.date)
  }

  onFilter = () => {
    const { onFilter } = this.props;
    const { filters } = this.state;
    const functionFilters = {};

    for (const property in filters) {

      if (property === "startDate" || property === "endDate") {
        const startMoment = moment(filters["startDate"], "DD/MM/YYYY");
        const endMoment = moment(filters["endDate"], "DD/MM/YYYY");
        
        if (filters["startDate"] && !filters["endDate"]) {
          this.setState({ errors: {...this.state.errors, endDate: true} })
          return;
        } else if (!filters["startDate"] && filters["endDate"]) {
          this.setState({ errors: {...this.state.errors, startDate: true} })
          return;
        } else if (filters["startDate"] && filters["endDate"]) {
          if(filters["startDate"] === filters["endDate"]) {
            this.setState({ errors: {...this.state.errors, repeated: true} })
            return;
          } else {
            functionFilters["startDate"] = (value) => {
              return moment(value.split("T")[0], "YYYY-MM-DD").isBetween(
                startMoment,
                endMoment,
                undefined,
                "[]"
              );
            };
          }
        }
          
      } else if (Array.isArray(filters[property]))
        functionFilters[property] = (value) =>
          filters[property][0].label === "All" ||
          value.includes(filters[property][0].label);
      else
        functionFilters[property] = (value) =>
          value.includes(filters[property]);
    }
    onFilter({ functionFilters, filters });
  };

  render() {
    const { regions = [], programs = [], formats = [] } = this.props;
    return (
      <PanelContainer>
        <Input
          onChange={(e) => this.handleChange("campaignId", e.target.value)}
          value={this.state.filters.campaignId}
          type="text"
          label="Search by campaign ID"
          className="slds-m-top_small"
        />
        <Input
          onChange={(e) => this.handleChange("title", e.target.value)}
          value={this.state.filters.title}
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
              this.handleChange("regionId", data.selection),
          }}
          labels={{ label: "Region" }}
          name="region"
          options={regions}
          selection={this.state.filters.regionId}
          variant="readonly"
        />
        <Combobox
          id="combobox-readonly-single-program"
          classNameContainer="slds-m-top_small"
          events={{
            onSelect: (event, data) =>
              data.selection.length &&
              this.handleChange("programId", data.selection),
          }}
          labels={{ label: "Program" }}
          name="program"
          options={programs}
          selection={this.state.filters.programId}
          variant="readonly"
        />
        <Combobox
          id="combobox-readonly-single-format"
          classNameContainer="slds-m-top_small"
          events={{
            onSelect: (event, data) =>
              data.selection.length &&
              this.handleChange("formatId", data.selection),
          }}
          labels={{ label: "Format" }}
          name="format"
          options={formats}
          selection={this.state.filters.formatId}
          variant="readonly"
        />
        <div className=" slds-m-top_small">
          <p>Select range of dates</p>
        </div>
        {this.state.errors.repeated && (
          <div className="slds-has-error">
            <div className="slds-form-element__help slds-has-error">
              Fields must be different
            </div>
          </div>
        )}
        <div className="slds-grid slds-gutters">
          <div
            className={`slds-col slds-size_1-of-2 ${
              this.state.errors.startDate && "slds-has-error"
            }`}
          >
            <Datepicker
              ref={this.startDate}
              labels={{ label: "Initial Date" }}
              triggerClassName="slds-size_1-of-1"
              onChange={(event, data) =>
                this.handleChange("startDate", data.formattedDate)
              }
              formatter={(date) =>
                date ? moment(date).format("DD/MM/YYYY") : ""
              }
              parser={(dateString) => moment(dateString, "DD/MM/YYYY").toDate()}
              formattedValue={this.state.filters.startDate}
              dateDisabled={this.state.filters.endDate ? this.checkEndDate.bind(this) :undefined}
            />
            {this.state.errors.startDate && (
              <div className="slds-form-element__help">
                This field is required
              </div>
            )}
          </div>
          <div
            className={`slds-size_1-of-2 ${
              this.state.errors.endDate && "slds-has-error"
            }`}
          >
            <Datepicker
              ref={this.endDate}
              labels={{ label: "Final Date" }}
              triggerClassName="slds-col slds-size_1-of-1"
              onChange={(event, data) =>
                this.handleChange("endDate", data.formattedDate)
              }
              formatter={(date) =>
                date ? moment(date).format("DD/MM/YYYY") : ""
              }
              parser={(dateString) => moment(dateString, "DD/MM/YYYY").toDate()}
              formattedValue={this.state.filters.endDate}
              dateDisabled={this.state.filters.startDate ? this.checkStartDate.bind(this) :undefined}
            />
            {this.state.errors.endDate && (
              <div className="slds-form-element__help">
                This field is required
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={this.onFilter}
          className="slds-m-top_small"
          label="Search"
          variant="brand"
        />
      </PanelContainer>
    );
  }
}

export default FilterPanel;
