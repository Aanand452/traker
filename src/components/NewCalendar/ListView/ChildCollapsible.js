import React from "react";
import "./styles.css";
import {

    Icon,
} from "@salesforce/design-system-react";
class ChildCollapsible extends React.Component {
    state = {
        isOpen: false,
    };
    render() {
        return (
            <div className="expandable-section childcollapsible" >
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

                            <p className="childlabel">{this.props.label}</p>
                        </div>
                    </section>
                </button>

                <div className={this.state.isOpen ? "content childshow" : "content"}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default ChildCollapsible;