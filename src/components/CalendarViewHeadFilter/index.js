import React, { Component } from "react";
import {
    Pill,
    Icon
  } from "@salesforce/design-system-react";
import "./styles.css";


class CalendarViewHeadFilter extends Component {

    constructor(props) {
          super(props);
          this.state = {
              data: [],
              selectedFormats: [],
              isExecEngagementSelected: false,
              execEngagementBGC: 'c9c5068c',
              execEngagementSelectedIcon:'task2',
              isVirtualEvent3rdPartySelected:false,
              virtualEvent3rdPartyBGC : '02d4308c',
              virtualEvent3rdPartySelectedIcon:'task2',
              isExecutiveVisitSelected: false,
              executiveVisitBGC: '058eb88c',
              executiveVisitSelectedIcon:'task2',
              isF2FEventSelected:false,
              f2FEventBGC: '0520b88c',
              f2FEventSelectedIcon:'task2',
              isWebinarSelected: false,
              webinarBGC: 'e081048c',
              webinarSelectedIcon:'task2',
              isWebinar3rdParty: false,
              Webinar3rdPartyBGC: '4405b88c', 
              Webinar3rdPartySelectedIcon:'task2',
              isVirtualEventSelected: false,
              VirtualEventBGC: 'a905b88c',
              VirtualEventSelectedIcon:'task2',
              isSICSelected: false,
              SICBGC: 'b805148c',
              SICSelectedIcon:'task2',
              isLaunchSelected: false,
              launchBGC: '5983598c',
              launchSelectedIcon:'task2',
              selectedIcon:'task2',
              unSelectIcon:'unmatched',
          };
      }
  
    componentWillMount() {
      this.setState({data:this.props.defaultFormats, selectedFormats:this.props.defaultFormats})    
    }
    
    componentDidUpdate(prevProps, prevState){   
      if (this.props.defaultFormats !== prevProps.defaultFormats) {
        this.setState({data:this.props.defaultFormats, selectedFormats:this.props.defaultFormats})       
      }
  }
  addFormat = (format) => {
    if(!this.state.selectedFormats.some((el)=> el.id.indexOf(format.id) > -1)){
        this.state.selectedFormats=[format, ...this.state.selectedFormats]
    }
    this.props.modifyFilter(this.state.selectedFormats)
  }

  removeFormat = (format) => {
      const remainingFormats = this.state.selectedFormats.filter(el => el.id !== format.id)
      this.state.selectedFormats= remainingFormats
      this.props.modifyFilter(this.state.selectedFormats)
    }

  slelectPill = (event, format) => {
    if(format.label === '3rdParty-Virtual Event'){
        this.setState({isVirtualEvent3rdPartySelected:!this.state.isVirtualEvent3rdPartySelected})
        this.state.isVirtualEvent3rdPartySelected ? (this.setState({virtualEvent3rdPartyBGC:'02d4308c', virtualEvent3rdPartySelectedIcon:this.state.selectedIcon}), this.addFormat(format)) : (this.setState({virtualEvent3rdPartyBGC:'fafafa', virtualEvent3rdPartySelectedIcon:this.state.unSelectIcon}), this.removeFormat(format))
        
        };
    if(format.label === 'Webinar') {
        this.setState({isWebinarSelected:!this.state.isWebinarSelected})
        this.state.isWebinarSelected ? (this.setState({webinarBGC:'e081048c', webinarSelectedIcon:this.state.selectedIcon}), this.addFormat(format)) : (this.setState({webinarBGC:'fafafa', webinarSelectedIcon:this.state.unSelectIcon}), this.removeFormat(format))
        
        };
    if(format.label === 'Exec Engagement') {
        this.setState({isExecEngagementSelected:!this.state.isExecEngagementSelected})
        this.state.isExecEngagementSelected ? (this.setState({execEngagementBGC:'c9c5068c', execEngagementSelectedIcon:this.state.selectedIcon}), this.addFormat(format)) : (this.setState({execEngagementBGC:'fafafa', execEngagementSelectedIcon:this.state.unSelectIcon}), this.removeFormat(format))

    };
    if(format.label === 'Executive Visit') {
        this.setState({isExecutiveVisitSelected:!this.state.isExecutiveVisitSelected})
        this.state.isExecutiveVisitSelected ? (this.setState({executiveVisitBGC:'058eb88c', executiveVisitSelectedIcon:this.state.selectedIcon}), this.addFormat(format)) : (this.setState({executiveVisitBGC:'fafafa', executiveVisitSelectedIcon:this.state.unSelectIcon}), this.removeFormat(format))
        };
    if(format.label === 'F2F Event') {
        this.setState({isF2FEventSelected:!this.state.isF2FEventSelected})
        this.state.isF2FEventSelected ? (this.setState({f2FEventBGC:'0520b88c', f2FEventSelectedIcon:this.state.selectedIcon}), this.addFormat(format)) : (this.setState({f2FEventBGC:'fafafa', f2FEventSelectedIcon:this.state.unSelectIcon}), this.removeFormat(format))
        };
    if(format.label === 'Webinar - 3rd Party') {
        this.setState({isWebinar3rdParty:!this.state.isWebinar3rdParty})
        this.state.isWebinar3rdParty ? (this.setState({Webinar3rdPartyBGC:'4405b88c', Webinar3rdPartySelectedIcon:this.state.selectedIcon}), this.addFormat(format)) : (this.setState({Webinar3rdPartyBGC:'fafafa', Webinar3rdPartySelectedIcon:this.state.unSelectIcon}), this.removeFormat(format))
        };
    if(format.label === 'Virtual Event') {
        this.setState({isVirtualEventSelected:!this.state.isVirtualEventSelected})
        this.state.isVirtualEventSelected ? (this.setState({VirtualEventBGC:'a905b88c', VirtualEventSelectedIcon:this.state.selectedIcon}), this.addFormat(format)) : (this.setState({VirtualEventBGC:'fafafa',VirtualEventSelectedIcon:this.state.unSelectIcon}), this.removeFormat(format))
        };
    if(format.label === 'SIC') {
        this.setState({isSICSelected:!this.state.isSICSelected})
        this.state.isSICSelected ? (this.setState({SICBGC:'b805148c', SICSelectedIcon:this.state.selectedIcon}), this.addFormat(format)) : (this.setState({SICBGC:'fafafa', SICSelectedIcon:this.state.unSelectIcon}), this.removeFormat(format))
        };
    if(format.label === 'Launch') {
        this.setState({isLaunchSelected:!this.state.isLaunchSelected})
        this.state.isLaunchSelected ? (this.setState({launchBGC:'5983598c', launchSelectedIcon:this.state.selectedIcon}), this.addFormat(format)) : (this.setState({launchBGC:'fafafa', launchSelectedIcon:this.state.unSelectIcon}), this.removeFormat(format))
        };

  }

  getBackgroundColor = (format) => {

    switch(format.label){
      case '3rdParty-Virtual Event': return this.state.virtualEvent3rdPartyBGC
      case 'Webinar': return this.state.webinarBGC
      case 'Exec Engagement': return this.state.execEngagementBGC
      case 'Executive Visit': return this.state.executiveVisitBGC
      case 'F2F Event': return this.state.f2FEventBGC
      case 'Webinar - 3rd Party': return this.state.Webinar3rdPartyBGC
      case 'Virtual Event': return this.state.VirtualEventBGC
      case 'SIC': return this.state.SICBGC
      case 'Launch': return this.state.launchBGC
      default : return '04f7398c'
  }

  }

  getEventColor = (format) => {
    switch(format){
        case '3rdParty-Virtual Event': return '02d4308c'
        case 'Webinar': return 'e081048c'
        case 'Exec Engagement': return 'c9c5068c'
        case 'Executive Visit': return '058eb88c'
        case 'F2F Event': return '0520b88c'
        case 'Webinar - 3rd Party': return '4405b88c'
        case 'Virtual Event': return 'a905b88c'
        case 'SIC': return 'b805148c'
        case 'Launch': return '5983598c'
        default : return '04f7398c'
    }
}

  geticon = (format) => {

    switch(format.label){
      case '3rdParty-Virtual Event': return this.state.VirtualEventSelectedIcon
      case 'Webinar': return this.state.webinarSelectedIcon
      case 'Exec Engagement': return this.state.execEngagementSelectedIcon
      case 'Executive Visit': return this.state.executiveVisitSelectedIcon
      case 'F2F Event': return this.state.f2FEventSelectedIcon
      case 'Webinar - 3rd Party': return this.state.Webinar3rdPartySelectedIcon
      case 'Virtual Event': return this.state.VirtualEventSelectedIcon
      case 'SIC': return this.state.SICSelectedIcon
      case 'Launch': return this.state.launchSelectedIcon
      default : return this.state.selectedIcon
  }

  }
  
    render() {
      return(
        this.state.data.map((format) => 
        <Pill 
          variant='option'
          bare
          key={format.id}
          labels={{
            label:format.label,
            title:format.label
          }}
          icon={(<Icon assistiveText={{ label: 'Task' }} category="standard" name={this.geticon(format)} style={{background:'#'+this.getEventColor(format.label)}}/>)}
          onClick={(event)=>this.slelectPill(event, format)}
          style={{cursor: 'pointer', backgroundColor:'#'+this.getBackgroundColor(format)}}
        />
      )
      )
    }

}

export default CalendarViewHeadFilter