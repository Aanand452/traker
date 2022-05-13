import React, { Component } from 'react'
import {

    Input,
    Textarea,
    ExpandableSection,

} from "@salesforce/design-system-react";
import Combobox from "./Combobox"
import Picker from "./DatePicker";
import "./styles.css"

const regions = [
    {
        id: '1',
        label: 'Query',

    },
    {
        id: '2',
        label: 'Webnair',

    },
    {
        id: '3',
        label: "Webniar 3rd party",

    },
    {
        id: '4',
        label: 'launch',

    },
    {
        id: '5',
        label: 'Exec Enagement',

    },

];
export default class Index extends Component {
    render() {
        return (




            <div className="new-activity">


                <section className="activity-body">

                    <section className="form-fields">
                        <div className="row-flex">
                            <Combobox items={regions} label="Region" placeholder="Region" />
                            <Combobox items={regions} label="Program" placeholder="Program" />
                        </div>
                        <Input id="base-id" label="Title" />
                        <div className="row-flex">
                            <Picker label="Start Date" />
                            <Picker label="End Date" />
                        </div>
                        <div className="row-flex">
                            <Input id="row-input" label="Campaign ID" placeholder="Campaign ID" />
                            <Input id="row-input" label="Asset" placeholder="URL" />
                        </div>
                        <Textarea id="unique-id-1" label="Description" placeholder="Description" /></section>
                    <section className="program-details">
                        <p>Program Details</p>
                        <div className="program-details-box">
                            <div className="first-items">
                                <div className="column">
                                    <div className="details-item">
                                        <p>Program Owner</p>
                                        <span>Alanna Woodrow</span>
                                    </div>
                                    <div className="details-item">
                                        <p>Industry</p>
                                        <span>All</span>
                                    </div>
                                    <div className="details-item">
                                        <p>Segment</p>
                                        <span>-</span>
                                    </div>
                                    <div className="details-item">
                                        <p>MP Target</p>
                                        <span>$0.00</span>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="details-item">
                                        <p>Region</p>
                                        <span>ANC</span>
                                    </div>
                                    <div className="details-item">
                                        <p>Lifecycle Stage</p>
                                        <span>-</span>
                                    </div>
                                    <div className="details-item">
                                        <p>Persona</p>
                                        <span>All</span>
                                    </div>
                                    <div className="details-item">
                                        <p>Budget</p>
                                        <span>$1,500,000.00</span>
                                    </div>
                                </div>
                            </div>
                            <ExpandableSection title="APM1">
                                Analytics,Sales,Customer 360 Platfrom,Integration, Other,Commerce,Premier,Marketing,Services
                            </ExpandableSection>
                            <ExpandableSection title="Customer Message">
                                Analytics,Sales,Customer 360 Platfrom,Integration, Other,Commerce,Premier,Marketing,Services
                            </ExpandableSection>
                        </div>


                    </section>

                </section>

            </div>


        )
    }
}
