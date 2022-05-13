import React from "react";
import "./styles.css";
import {
    Icon

} from "@salesforce/design-system-react";


class Collapsible extends React.Component {
    state = {
        isOpen: false,
    };
    render() {
        return (
            <div className="expandable-section">
                <button
                    className="toggle-button"
                    onClick={() => this.setState({ isOpen: !this.state.isOpen })}
                >
                    <section className="main-part">
                        <div className="title">
                            <span className="toggle-icon">
                                {this.state.isOpen ? <Icon
                                    assistiveText={{ label: 'chevrondown' }}
                                    category="utility"
                                    name="chevrondown"
                                    size="small"

                                /> : <Icon
                                    assistiveText={{ label: 'chevronright' }}
                                    category="utility"
                                    name="chevronright"
                                    size="small"

                                />}
                            </span>
                            <span className="calendar-icon"><Icon
                                assistiveText={{ label: 'event' }}
                                category="standard"
                                name="event"
                                size="small"

                            /></span>
                            <p className="label">{this.props.label}</p>
                        </div>
                        <section className="format-section">
                            {/* <p>Format: {this.props.format}</p> */}
                        </section>
                    </section>
                    <section className="main-part">
                        <p>{this.props.date}</p>
                        <span>{this.state.isOpen ? <Icon
                            assistiveText={{ label: 'down' }}
                            category="utility"
                            name="down"
                            size="small"

                        /> : <Icon
                            assistiveText={{ label: 'up' }}
                            category="utility"
                            name="up"
                            size="small"

                        />}</span>
                    </section>
                </button>

                <div className={this.state.isOpen ? "content show" : "content"}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Collapsible;