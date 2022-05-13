import React from 'react';
import moment from 'moment';

import {

    IconSettings,
    Datepicker,

} from "@salesforce/design-system-react";

class Picker extends React.Component {
    static displayName = 'DatepickerExample';

    constructor() {
        super();
        this.state = {
            value: undefined,
        };
    }

    handleChange = (event, data) => {
        this.setState({ value: data.date });
    };

    render() {
        return (
            <IconSettings iconPath="/assets/icons">
                <Datepicker
                    labels={{
                        label: this.props.label,
                    }}
                    onChange={(event, data) => {
                        this.handleChange(event, data);

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
                        return date ? moment(date).format('M/D/YYYY') : '';
                    }}
                    parser={(dateString) => {
                        return moment(dateString, 'MM-DD-YYYY').toDate();
                    }}
                    value={this.state.value}
                />
            </IconSettings>
        );
    }
}
export default Picker