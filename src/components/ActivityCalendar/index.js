import "./styles.css";
import React, { Component, Fragment } from "react";
import { withRouter } from 'react-router-dom';
import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import moment from 'moment';
import { Container, CalendarContainer } from './styles';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import container from "@salesforce/design-system-react/lib/components/alert/container";

moment.locale('en-GB');
const localizer = momentLocalizer(moment)

const myEvents = [
    {
        'title': 'My event',
        'allDay': false,
        'start': new Date(), // 10.00 AM
        'end': new Date(), // 2.00 PM 
    }
]
class ActivityCalendar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cal_events: [],
        }
    }
        //We will populate this function later
    componentDidMount() {
        //We will populate this function later
    }

    render() {
        return (
            <Container>
                <CalendarContainer>
                <Calendar localizer={localizer}
                    events={myEvents}
                    step={60}
                    startAccessor="start"
                    endAccessor="end"
                    /></CalendarContainer>
                    {/* <div style={{ height: 700 }}>
                    </div> */}
                
                
            </Container>
            
            
        );
    }

}

export default withRouter(ActivityCalendar);