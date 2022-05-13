import React, { Component } from "react";
import moment from "moment";
import "./styles.css";

import {
  IconSettings,
  Icon,
  Dropdown,
  Button,
} from "@salesforce/design-system-react";

class Calendar extends Component {
  state = {
    calendar: [],
    value: moment(),
    day: "",
    startDate: null,
    endDate: null,
    years: [],
  };

  isToday = (day) => {
    return day.isSame(new Date(), "day");
  };

  onClickDate = (day) => {
    this.setState(day);
    if (!this.state.startDate && !this.state.endDate) {
      this.setState({ startDate: day }, () =>
        console.log(
          `Start Date: ${this.state.startDate},  End Date: ${this.state.endDate}}`
        )
      );
    } else if (this.state.startDate && !this.state.endDate) {
      if (this.state.startDate < day) {
        this.setState({ endDate: day }, () =>
          console.log(
            `Start Date: ${this.state.startDate},  End Date: ${this.state.endDate}}`
          )
        );
      } else {
        this.setState({ endDate: this.state.startDate, startDate: day }, () =>
          console.log(
            `Start Date: ${this.state.startDate},  End Date: ${this.state.endDate}}`
          )
        );
      }
    } else {
      if (
        Math.abs(this.state.startDate.diff(day, "days")) <
        Math.abs(this.state.endDate.diff(day, "days"))
      ) {
        if (this.state.startDate < day) {
          this.setState({ endDate: day }, () =>
            console.log(
              `Start Date: ${this.state.startDate},  End Date: ${this.state.endDate}}`
            )
          );
        } else {
          this.setState({ endDate: this.state.startDate, startDate: day }, () =>
            console.log(
              `Start Date: ${this.state.startDate},  End Date: ${this.state.endDate}}`
            )
          );
        }
      } else {
        if (this.state.startDate < day) {
          this.setState({ startDate: this.state.endDate, endDate: day }, () =>
            console.log(
              `Start Date: ${this.state.startDate},  End Date: ${this.state.endDate}}`
            )
          );
        } else {
          this.setState({ startDate: day }, () =>
            console.log(
              `Start Date: ${this.state.startDate},  End Date: ${this.state.endDate}}`
            )
          );
        }
      }
    }
  };

  componentDidMount() {
    this.generateCalender();
    this.setYearsForDropDown();
  }

  generateCalender = () => {
    const startDay = this.state.value.clone().startOf("month").startOf("week");
    const endDay = this.state.value.clone().endOf("month").endOf("week");
    const day = startDay.clone().subtract(1, "day");
    const a = [];

    while (day.isBefore(endDay, "day")) {
      a.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }

    this.setState({ calendar: a });
  };

  nextMonth = () => {
    //console.log("nextMonth")
    // this.setState({
    //       //currentMonth: moment(this.state.currentMonth).add(1, "months"),
    // });
    this.setState({ value: this.state.value.add(1, "months") }, () => {
      this.generateCalender();
    });
  };

  prevMonth = () => {
    //console.log("prevMonth")
    // this.setState({
    //   currentMonth: moment(this.state.currentMonth).subtract(1, "months"),
    // });
    this.setState({ value: this.state.value.subtract(1, "months") }, () => {
      this.generateCalender();
    });
  };

  // nextYear = ()=>{
  //   // console.log("this is clicked")
  //   this.setState({
  //     currentYear:moment(this.state.currentYear.add(12,"years"))
  //   })
  // };

  setYearsForDropDown = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    let allYears = [];
    for (let i = 3; i > 0; i--) {
      allYears.push({ label: currentYear - i, value: currentYear - i });
    }
    allYears.push({ label: currentYear, value: currentYear });
    for (let i = 1; i < 4; i++) {
      allYears.push({ label: currentYear + i, value: currentYear + i });
    }
    this.setState({ years: allYears });
  };
  onYearDropDownChange = () => { };

  render() {
    return (
      <div className="calendar">
        <IconSettings iconPath="/assets/icons">
          <div className="title--head">
            <div className="slds-col_padded ">
              <div className="logo--left">
                <Button
                  assistiveText={{ icon: "left" }}
                  iconCategory="utility"
                  iconName="left"
                  iconSize="medium"
                  iconVariant="bare"
                  onClick={this.prevMonth}
                  variant="icon"
                />
              </div>

              <div
                style={{ width: "25%", float: "left", marginTop: "10px" }}
                divclassName="month-string"
              >
                <h3>{this.state.value.format("MMMM")}</h3>
              </div>

              <div className="logo--right">
                <Button
                  assistiveText={{ icon: "right" }}
                  iconCategory="utility"
                  iconName="right"
                  iconSize="medium"
                  iconVariant="bare"
                  onClick={this.nextMonth}
                  variant="icon"
                />
              </div>

              <div className="dropdown-parent">
                <div className="dropdown">
                  <Dropdown
                    width="xx-small"
                    align="right"
                    iconCategory="utility"
                    iconName="down"
                    iconPosition="right"
                    label={this.state.value.get("year").toString()}
                    value={this.state.value.get("year").toString()}
                    onSelect={(item) => {
                      //console.log(item.value);
                      this.setState(
                        { value: this.state.value.set("year", item.value) },
                        () => {
                          this.generateCalender();
                        }
                      );
                    }}
                    options={this.state.years}
                  />
                </div>
              </div>
            </div>
          </div>
        </IconSettings>

        <div className="day--names">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div>{d}</div>
          ))}
        </div>
        {this.state.calendar.map((week) => (
          <div>
            {week.map((day) => (
              <div className={`day `} onClick={() => this.onClickDate(day)}>
                {/* { new css for showing todays date and selected  date} */}

                <div
                  className={
                    this.state.startDate === day ||
                      this.state.endDate === day ||
                      (this.state.startDate &&
                        this.state.endDate &&
                        moment(day).isBetween(
                          this.state.startDate,
                          this.state.endDate
                        ))
                      ? "first-day"
                      : this.isToday(day)
                        ? "today"
                        : "normal-day"
                  }

                >
                  {day.format("D")}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Calendar;

