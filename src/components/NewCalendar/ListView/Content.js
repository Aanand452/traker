import React, { Component } from "react";
import "./styles.css";

import {
    IconSettings,
    ExpandableSection,
    Icon,
} from "@salesforce/design-system-react";

class Content extends Component {




    render() {
        return (

            <div className="expandable-section-content">





                <section className="box">
                    <section className="first">
                        <div className="content-gp">
                            <div className="icon-text-gp">
                                <span className="icon">
                                    <Icon
                                        assistiveText={{ label: 'Region' }}
                                        category="standard"
                                        name="location"
                                        size="small"

                                    />
                                </span>
                                <span className="title">Region</span>
                            </div>
                            <p>{this.props.region}</p>
                        </div>
                        <div className="content-gp">
                            <div className="icon-text-gp">
                                <span className="icon">

                                    <Icon
                                        assistiveText={{ label: 'lead_list' }}
                                        category="standard"
                                        name="lead_list"
                                        size="small"
                                    />
                                </span>
                                <span className="title">Format</span>
                            </div>
                            <p>{this.props.format2}</p>
                        </div>
                    </section>
                    <section className="first">
                        <div className="content-gp">
                            <div className="icon-text-gp">
                                <span className="icon">
                                    <Icon
                                        assistiveText={{ label: 'Channel_programs' }}
                                        category="standard"
                                        name="channel_programs"
                                        size="small"
                                    />
                                </span>
                                <span className="title">Program</span>
                            </div>
                            <p>{this.props.program}</p>
                        </div>
                        <div className="content-gp">
                            <div className="icon-text-gp">
                                <span className="icon">
                                    <Icon
                                        assistiveText={{ label: 'user' }}
                                        category="utility"
                                        name="user"
                                        size="small"
                                    />
                                </span>
                                <span className="title">Owner</span>
                            </div>
                            <p>{this.props.owner}</p>
                        </div>
                    </section>
                    <section className="description">
                        <div className="icon-text-gp">
                            <span className="title">Description</span>
                        </div>
                        <p>{this.props.description}</p>
                    </section>
                </section>
            </div>
        );
    }
}
export default Content;







