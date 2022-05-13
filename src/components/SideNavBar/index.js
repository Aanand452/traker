import React, { Component } from "react";

import {
    IconSettings,
    Icon,
    Dropdown,
    Combobox,
    Popover,
    Checkbox,
    Button,
    comboboxFilterAndLimit

} from "@salesforce/design-system-react";
//import comboboxFilterAndLimit from '@salesforce/design-system-react';

import "./style.css";
import Calendar from "../Calendar";
import moment from "moment";


class SideNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: moment(),
            regions: [{ title: "firstvalue", isChecked: false },
            { title: "secondvalue", isChecked: false },
            { title: "thirdvalue", isChecked: false },
            { title: "fourthvalue", isChecked: false },
            ],
            programs: [{ title: "firstprogram", isChecked: false },
            { title: "secondprogram", isChecked: false },
            { title: "thirdprogram", isChecked: false },
            { title: "fourthprogram", isChecked: false },
            ],
            events: [{ title: "Event", isChecked: false },
            { title: "Campaign", isChecked: false },
            { title: "Digital", isChecked: false },
            { title: "Webnair", isChecked: false },
            { title: "Exec Engagement", isChecked: false },
            { title: "SIC", isChecked: false },
            { title: "Content", isChecked: false },
            ],

            inputValue: '',
            isLoadingMenuItems: false,
            selection: [],

            value: '',
            checkedOptions: []
        }
    }

    getEventColor = (category) => {
        switch (category) {
            case "Event":
                return "ff0000";
            case "Campaign":
                return "ff8000";
            case "Exec Engagement":
                return "0099ff";
            case "Digital":
                return "b5d7a8";
            case "Webinar":
                return "3e6a85";
            case "SIC":
                return "cc00ff";
            case "Content":
                return "eb34d2";

        }
    };

    onResetFilter = () => {
        this.setState({
            regions: [
                { title: "firstvalue", isChecked: false },
                { title: "secondvalue", isChecked: false },
                { title: "thirdvalue", isChecked: false },
                { title: "fourthvalue", isChecked: false },
            ],
        });
        this.setState({
            programs: [
                { title: "firstprogram", isChecked: false },
                { title: "secondprogram", isChecked: false },
                { title: "thirdprogram", isChecked: false },
                { title: "fourthprogram", isChecked: false },
            ],
        });
        this.setState({
            events: [{ title: "Event", isChecked: false },
            { title: "Campaign", isChecked: false },
            { title: "Digital", isChecked: false },
            { title: "webnair", isChecked: false },
            { title: "Exec Engagement", isChecked: false },
            { title: "SIC", isChecked: false },
            { title: "Content", isChecked: false },
            ],
        })
    };


    handleClick = () => {
        console.log("this button is clicked")
        alert("this button is clicked")
    }


    getIsChecked = (reg) => {
        console.log(reg)

    }

    handleSubEventsCheckbox = (index) => {
        const subevents = this.state.subevents;
        subevents[index].isChecked = !subevents[index].isChecked;
        this.setState({ subevents: subevents }, () => {
            if (subevents[index].isChecked) {
                console.log(subevents[index].title);
            }
        });
    };
    handleEventsCheckbox = (index) => {
        const events = this.state.events;
        events[index].isChecked = !events[index].isChecked;
        this.setState({ events: events }, () => {
            if (events[index].isChecked) {
                console.log(events[index].title);
            }
        });
    };

    handleCheckboxChange = (index) => {
        const regions = this.state.regions;
        regions[index].isChecked = !regions[index].isChecked;
        this.setState({ regions: regions }, () => {
            console.log(this.state.regions.filter(reg => reg.isChecked).map(region => region.title));
        });

    }
    handleProgramCheckboxChange = (index) => {
        const programs = this.state.programs;
        programs[index].isChecked = !programs[index].isChecked;
        this.setState({ programs: programs }, () => {
            console.log(this.state.programs.filter(reg => reg.isChecked).map(program => program.title));
        });
    }
    render() {

        const search = ["Event", "Campaign", "Digital", "Webnair", "Exec Engagement", "SIC", "ContentContent"]
        return (
            <div className="sidenavbar">
                <Calendar />
                <div className="sub--title">
                    <Button
                        label="Today"
                        onClick={() => {
                            console.log('Base Button e.target:', e.target);
                        }}
                        variant="base"
                    />


                </div>
                <div className="down--firstbar">
                    <IconSettings iconPath="/assets/icons">
                        <div className="title">
                            <div className="slds-col_padded flex_0">
                                <Icon
                                    assistiveText={{ label: 'location' }}
                                    category="standard"
                                    name="location"
                                    size="medium"
                                />

                                <div className="text">
                                    <h5>Region</h5>
                                </div>
                            </div>

                            <div className="downbar--box">
                                <Combobox
                                    assistiveText={{
                                        popoverLabel: 'region options',
                                    }}
                                    labels={{
                                        label: '',
                                        placeholder: this.state.regions.filter(reg => reg.isChecked).length + ' Selected',
                                    }}
                                    popover={
                                        <Popover
                                            body={
                                                <div className="slds-form-element__control">

                                                    {this.state.regions.map((region, i) => (

                                                        <Checkbox

                                                            {...(region.isChecked ? { indeterminate: false } : { indeterminate: true })}

                                                            id={`checkbox-${i}`}
                                                            key={`checkbox-${i + 1}`}
                                                            value={region.isChecked}
                                                            labels={{ label: region.title }}
                                                            {...(region.isChecked ? { checked: true } : { checked: false })}
                                                            onChange={() => {
                                                                this.handleCheckboxChange(i);
                                                            }}
                                                        />

                                                    ))}
                                                </div>

                                            }
                                        />

                                    }
                                    selection={[]}
                                    value={""}
                                    variant="popover"
                                />
                            </div>
                        </div>
                    </IconSettings>
                </div>
                <div className="second-downbar">
                    <IconSettings iconPath="/assets/icons">
                        <div className="title-two">
                            <div className="slds-col_padded flex_0">
                                <Icon
                                    assistiveText={{ label: 'Channel_programs' }}
                                    category="standard"
                                    name="channel_programs"
                                    size="medium"
                                />

                                <div className="text">
                                    <h5>Programs</h5>
                                </div>
                            </div>

                            <div className="second-bar">
                                <Combobox
                                    assistiveText={{
                                        popoverLabel: 'program options',
                                    }}
                                    labels={{
                                        label: '',
                                        placeholder: this.state.programs.filter(reg => reg.isChecked).length + ' Selected',
                                    }}
                                    popover={
                                        <Popover
                                            body={
                                                <div className="slds-form-element__control">
                                                    {this.state.programs.map((program, i) => (

                                                        <Checkbox

                                                            {...(program.isChecked ? { indeterminate: false } : { indeterminate: true })}

                                                            id={`checkbox-${i}`}
                                                            key={`checkbox-${i + 1}`}
                                                            value={program.isChecked}
                                                            labels={{ label: program.title }}
                                                            {...(program.isChecked ? { checked: true } : { checked: false })}
                                                            onChange={() => {
                                                                this.handleProgramCheckboxChange(i);
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                            }
                                        />

                                    }
                                    selection={[]}
                                    value={""}
                                    variant="popover"
                                />
                            </div>
                        </div>
                    </IconSettings>

                </div>

                <div className="Category">
                    <IconSettings iconPath="/assets/icons">
                        <div className="title--three">
                            <div className="slds-col_padded flex_0">
                                <Icon
                                    assistiveText={{ label: 'lead_list' }}
                                    category="standard"
                                    name="lead_list"
                                    size="medium"
                                />
                                <div className="text">
                                    <h5 >Category</h5>
                                </div>

                            </div>





                        </div>
                    </IconSettings>
                </div>



                <div className="last--checkbox">
                    {this.state.events.map((item, index) => (
                        <div className={`slds-col_padded ${item.title.replace(/ /g, "")}_checkbox`}>

                            <Checkbox className="mycheckbox"
                                indeterminate
                                assistiveText={{
                                    label: item.title,
                                }}
                                labels={{
                                    label: item.title,
                                }}
                                {...(item.isChecked
                                    ? { indeterminate: false }
                                    : { indeterminate: true })}
                                {...(item.isChecked
                                    ? { checked: true }
                                    : { checked: false })}

                                value={item.isChecked}
                                onChange={(e) => {
                                    // const index = this.state.events.indexOf(
                                    //     (ev) => ev.title === item.title
                                    // );
                                    this.handleEventsCheckbox(index)
                                    console.log(index)
                                }}
                            />
                        </div>
                    ))}




                </div>





                <div className="button--save">
                    <IconSettings iconPath="/assets/icons">
                        <div className="slds-x-small-button">
                            <Button onClick={this.handleClick}
                                iconCategory="utility"
                                iconName="save"
                                iconSize="large"
                                iconPosition="left"
                                // iconVariant="save"
                                label="Save The Current Filter"

                                variant="neutral "
                            />


                        </div>

                    </IconSettings>

                </div>
                <div className="reset--button">
                    <IconSettings iconPath="/assets/icons">
                        <div className="slds-x-small-buttons_horizontal">
                            <Button
                                iconCategory="utility"
                                iconName="skip_back"
                                iconSize="large"
                                iconPosition="left"
                                // iconVariant="save"
                                label="Reset Filters"
                                variant="icon"
                                onClick={this.onResetFilter}
                            />

                            <div style={{}}>

                            </div>

                        </div>

                    </IconSettings>

                </div>








            </div >
        )
    }
}
export default SideNavBar;