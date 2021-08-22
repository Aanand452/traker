import React, { Component,} from "react";
import { withRouter } from 'react-router-dom';
import { Combobox,
        comboboxFilterAndLimit,
        Icon} from "@salesforce/design-system-react";

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
    UNSAFE_componentWillMount() {
        console.log('this.is called')
        this.setState({data:this.props.data,
             selectedData:this.props.selectedData, 
             inputValue:this.props.inputValue})    
    }
      
    componentDidUpdate(prevProps, prevState){   
        if (this.props.selectedData !== prevProps.selectedData || this.props.data !== prevProps.data) {
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
                    this.props.setSelectedData(this.state.selectedData)
                    if(this.state.selectedData.length > 1){
                        this.setState({selectedData: this.state.selectedData.filter(x => {return x.id !== 'all'})})
                    }
                    if(this.state.selectedData.length === 0){
                        this.setState({selectedData: this.state.data.filter(x => {return x.id === 'all'})})
                    }
                    
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
                    this.state.selectedData = data.selection
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
                    var all = this.state.data.find(x => x.id === 'all')
                    if(data.selection.indexOf(all) > 0){
                        this.setState({inputValue: '', selectedData: [all]})
                    }else{
                        this.setState({inputValue: '', selectedData:data.selection})
                    }
                    this.props.setSelectedData(this.state.selectedData)

                }
                }}
                // menuPosition="relative"
                selection={this.state.selectedData}
                // value={'one'}
                menuItemVisibleLength={10}
                options={comboboxFilterAndLimit({
                inputValue:this.state.inputValue,
                limit: 250,
                options:this.state.data,
                selection:this.state.selectedData,
                })}
              />
        )
    }

}

export default withRouter(MultiSelect);