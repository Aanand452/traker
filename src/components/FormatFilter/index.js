import React, { Component } from "react";
import { PanelContainer } from "./styles";
import moment from "moment";

import {
  Combobox,
  comboboxFilterAndLimit,
  Icon,
} from "@salesforce/design-system-react";

const defaultFormatNames = [{id:'1', label:'3rdParty-Virtual Event',subTitle:'3rdParty-Virtual Event', type: 'account'},
{id:'2', label:'Exec Engagement',subTitle:'Exec Engagement', type: 'account'}, 
{id:'3', label:'Executive Visit',subTitle:'Executive Visit', type: 'account'}, 
{id:'4', label:'F2F Event',subTitle:'F2F Event', type: 'account'}, 
{id:'5', label:'Webinar',subTitle:'Webinar', type: 'account'}, 
{id:'6', label:'Webinar - 3rd Party',subTitle:'Webinar - 3rd Party', type: 'account'}, 
{id:'7', label:'Virtual Event',subTitle:'Virtual Event', type: 'account'}, 
{id:'8', label:'SIC',subTitle:'SIC', type: 'account'}, 
{id:'9', label:'Launch',subTitle:'Launch', type: 'account'}]

const formatWithIcon = defaultFormatNames.map((elem) => ({
	...elem,
	...{
		icon: (
			<Icon
				assistiveText={{ label: 'Account' }}
				category="standard"
				name={elem.type}
			/>
		),
	},
}));

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
