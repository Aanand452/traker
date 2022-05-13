import React, { Component } from "react";
import moment from "moment";
import "./styles.css";
import {
    Button,
    Icon,
    IconSettings
} from "@salesforce/design-system-react";

class Date extends Component {
    state = {
        calendar: [],
        value: moment(),
        day: "",
        selected: null,
    };
    isToday = (day) => {
        return day.isSame(new Date(), "day");
    };

    prevWeek = () => {
        this.setState({ value: this.state.value.subtract(1, "week") }, () => {
            this.generateCalender();
        });
    };

    nextWeek = () => {
        this.setState({ value: this.state.value.add(1, "week") }, () => {
            this.generateCalender();
        });
    };

    componentDidMount() {
        this.generateCalender();
    }

    generateCalender = () => {
        const startDay = this.state.value.clone().startOf("week");
        const endDay = this.state.value.clone().endOf("week");
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

    render() {
        return (
            <div className="week-calendar">
                <div className="btn-gp">
                    {/* <button onClick={this.prevWeek}>Prev</button> */}
                    <IconSettings iconPath="/assets/icons">

                        <Button
                            assistiveText={{ icon: "left" }}
                            iconCategory="utility"
                            iconName="left"
                            iconSize="medium"
                            iconVariant="bare"
                            onClick={this.prevWeek}
                            variant="icon"
                        />
                        {/* <Icon
                                assistiveText={{ label: 'Region' }}
                                category="standard"
                                name="location"
                                size="small"

                            /> */}

                        <Button
                            assistiveText={{ icon: "right" }}
                            iconCategory="utility"
                            iconName="right"
                            iconSize="medium"
                            iconVariant="bare"
                            onClick={this.nextWeek}
                            variant="icon"
                        />
                    </IconSettings>
                    {/* <button onClick={this.nextWeek}>Next</button> */}
                </div>
                <table className="day-names">
                    <tr>
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                            <th className="week">{d}</th>
                        ))}
                    </tr>
                    {this.state.calendar.map((week) => (
                        <tr>
                            {week.map((day) => (
                                <td>
                                    <span
                                        className={
                                            (this.isToday(day) && !this.state.selected) ||
                                                this.state.selected === day
                                                ? "selected"
                                                : ""
                                        }
                                        onClick={() => this.setState({ selected: day })}
                                    >
                                        {day.format("D")}
                                    </span>
                                </td>
                            ))}
                        </tr>
                    ))}
                </table>
            </div>
        );
    }
}

export default Date;
