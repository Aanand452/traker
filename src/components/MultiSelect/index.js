import React, { Component,} from "react";
import { withRouter } from 'react-router-dom';
import { Combobox,
        comboboxFilterAndLimit,
        Icon} from "@salesforce/design-system-react";
import { slide as Menu } from 'react-burger-menu'

class MultiSelect extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: [],
            selectedData : [],
            isOpen:false,
            inputValue: '',
        }
    }
    componentWillMount() {
        this.setState({data:this.props.data,
             selectedData:this.props.selectedData, 
             inputValue:this.props.inputValue})    
    }
      
    componentDidUpdate(prevProps, prevState){   
        if (this.props.defaultFormats !== prevProps.defaultFormats) {
            this.setState({data:this.props.data,
                selectedData:this.props.selectedData, 
                isOpen:this.props.isOpen, 
                inputValue:this.props.inputValue})}    
    }

    render() {
        return (
            <Combobox 
                multiple
                labels={{
                label: this.props.label,
                placeholder: this.props.placeholder,
                }}
                isOpen={this.state.isOpen}
                events={{
                onRequestClose: () => {
                    this.setState({isOpen:false})
                },
                onRequestOpen: () => {
                    this.setState({isOpen:true})
                },
                onChange:(event, {value}) => {
                    this.setState({inputValue:value})
                },
                onRequestRemoveSelectedOption: (event, data) => {
                    this.setState({
                    inputValue:'',
                    selectedData:data.selection
                    })
                },
                onSubmit: (event, { value }) => {
                    this.setState({
                    inputValue:'',
                    selectedData:[
                        ...this.state.selectedData,
                        {
                        label:value,
                        icon:(<Icon assistiveText={{ label: 'Account' }} category="standard" name="campaign" />)
                        }
                    ]
                    })
                },
                onSelect: (event, data) => {
                    this.setState({
                    inputValue: '',
                    selectedData:data.selection
                    })
                }
                }}
                // menuPosition="relative"
                selection={this.state.selectedData}
                // value={'one'}
                menuItemVisibleLength={10}
                options={comboboxFilterAndLimit({
                inputValue:this.state.inputValue,
                limit: 50,
                options:this.state.data,
                selection:this.state.selectedData,
                })}
              />
        )
    }

}

export default withRouter(MultiSelect);