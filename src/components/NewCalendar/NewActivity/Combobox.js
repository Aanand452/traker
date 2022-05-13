import React from 'react';
import {
    IconSettings,
    Combobox,
    Icon,
    comboboxFilterAndLimit
} from "@salesforce/design-system-react";




class Example extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
            selection: [],
        };
    }
    accountsWithIcon = this.props.items.map((elem) => ({
        ...elem,

    }));
    render() {
        return (
            <IconSettings iconPath="/assets/icons">
                <Combobox
                    id="combobox-base"
                    disabled={this.props.disabled}
                    events={{
                        onChange: (event, { value }) => {
                            if (this.props.action) {
                                this.props.action('onChange')(event, value);
                            } else if (console) {
                                console.log('onChange', event, value);
                            }
                            this.setState({ inputValue: value });
                        },
                        onRequestRemoveSelectedOption: (event, data) => {
                            this.setState({
                                inputValue: '',
                                selection: data.selection,
                            });
                        },
                        onSubmit: (event, { value }) => {
                            if (this.props.action) {
                                this.props.action('onChange')(event, value);
                            } else if (console) {
                                console.log('onChange', event, value);
                            }
                            this.setState({
                                inputValue: value,
                                selection: [
                                    ...this.state.selection,
                                    {
                                        label: value,
                                        icon: (
                                            <Icon
                                                assistiveText={{ label: 'Account' }}
                                                category="standard"
                                                name="account"
                                            />
                                        ),
                                    },
                                ],
                            });
                        },
                        onSelect: (event, data) => {
                            if (this.props.action) {
                                this.props.action('onSelect')(
                                    event,
                                    ...Object.keys(data).map((key) => data[key])
                                );
                            } else if (console) {
                                console.log('onSelect', event, data);
                            }
                            this.setState({
                                inputValue: data.selection[0].label,
                                selection: data.selection,
                            });
                        },
                    }}
                    labels={{
                        label: this.props.label,
                        placeholder: this.props.placeholder,
                    }}

                    options={comboboxFilterAndLimit({
                        inputValue: this.state.inputValue,
                        limit: 10,
                        options: this.accountsWithIcon,
                        selection: this.state.selection,
                    })}
                    // selection={this.state.selection}
                    value={this.state.inputValue}
                />
            </IconSettings>
        );
    }
}
export default Example