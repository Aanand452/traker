import React, { Component } from "react";

import {
  Combobox,
  comboboxFilterAndLimit,
  Icon,
} from "@salesforce/design-system-react";

class FormatFilterPanel extends Component {

  constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
			selection: [],
      formats: [],
      isFilterOpen:false
		};
	}

  componentWillMount() {
    this.setState({selection:this.props.defaultFormats, formats:this.props.defaultFormats})       
  }
  
  componentDidUpdate(prevProps, prevState){    
    if (this.props.defaultFormats !== prevProps.defaultFormats) {
      this.setState({selection:this.props.defaultFormats, formats:this.props.defaultFormats})       
    }
}

  render() {
    return(
      <Combobox
      isOpen={this.state.isFilterOpen}
      events={{
        onChange: (event, { value }) => {
          this.setState({ inputValue: value });
        },
        onRequestRemoveSelectedOption: (event, data) => {
          this.props.modifyFilter(data)
          this.setState({
            inputValue: '',
            selection: data.selection,
          });
        },
        onRequestClose: () => {
          this.setState({isFilterOpen:false})
        },
        onRequestOpen: () => {
          this.setState({isFilterOpen:true})
        },
        onSubmit: (event, { value }) => {
          this.setState({
            inputValue: '',
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
          this.props.modifyFilter(data)
          this.setState({
            inputValue: '',
            selection: data.selection,
          });
        },
      }}
      labels={{
        placeholder: 'Select Format',
      }}
      multiple
      menuItemVisibleLength={5}
      options={comboboxFilterAndLimit({
        inputValue: this.state.inputValue,
        limit: 10,
        options: this.state.formats,
        selection: this.state.selection,
      })}
      selection={this.state.selection}
      value={this.state.inputValue}
    />)
  }
}

export default FormatFilterPanel;
