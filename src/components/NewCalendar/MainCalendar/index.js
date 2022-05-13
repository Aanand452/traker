import React, { Component } from "react";
import moment from "moment";
import "./styles.css"
import {
  Badge,
  Pill,
  Modal,
  Popover,
  Button
} from "@salesforce/design-system-react";
import {Main, Day} from "./styles"
import EventPill from "../EventPills"


class MainCalendar extends Component {

  state = {
    calendar:[],
    isOpen:false,
  }

  isToday = (day) => {
      return day.isSame(new Date(), "day");
  };
  getTodayActivities = (day) => {
    const dayActivities = []
    this.props.activities.forEach((item) => {
      if(day.isSame(new Date(item.startDate), "day") && day.isSame(new Date(item.endDate), "day")){
        dayActivities.push(item)
      }
    });
    return dayActivities;
  }
  getDailyOngoingActivities = (day) => {
    const dayActivities = []
    this.props.activities.forEach((item) => {
      if(day.isSame(new Date(item.startDate), "day") && !day.isSame(new Date(item.endDate), "day")){
        dayActivities.push(item)
      }
    });
    return dayActivities;
  }
  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  componentDidMount() {


  }

  render() {
    return (
      <Main style={{
        width: this.props.isMenuOpen ? "80%" : "100%"}}>
      <div className="body">
      <div className="day-name">
      {
        [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d) => (
          <div className="week">{d}</div>
        ))
      }
      </div>
      {this.props.calendar.map((week) => (
        <div>
          {week.map((day) => (
            <Day>
              <div className={this.isToday(day) ? "selected" : ''}>
                {day.format("D")}
              </div>
              <div className="activity-block">
                <div onClick={this.toggleOpen}
                  className={`bg-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
                >
                <EventPill
                activities={this.getTodayActivities(day)}
                ongoingActivities={this.getDailyOngoingActivities(day)}
                day={day}
                isMenuOpen={this.state.openMenuBar}
                formats={this.props.formats}
                />


                </div>
                <div className="day-footer" >
                  <div className="line"></div>
                  <div className="footer-activities">
                    <div className="tab"></div>
                  </div>
                  <div className="footer-title">Ongoing Activities</div>

                </div>
              </div>


            </Day>
          ))}
        </div>
      ))
      }
      </div>

      </Main>
    )
  }
}

export default MainCalendar;
