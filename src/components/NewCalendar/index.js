import React, { Component, Fragment } from "react";
import "./styles.css";
import {
  Card,
} from "@salesforce/design-system-react";
import MainCalendar from "./MainCalendar";
import OngoingActivities from "../OngoingActivities";
import {Container} from "./styles"


class Calendar extends Component {

  render() {
    return (
      <Container id="outer-container">
        <Card>
          <OngoingActivities />
          <MainCalendar />
        </Card>

      </Container>

    );

  }

}


export default Calendar;
