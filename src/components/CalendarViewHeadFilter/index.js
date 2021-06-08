import React, { Component } from "react";
import {
    Pill,
  } from "@salesforce/design-system-react";
import "./styles.css";


class CalendarViewHeadFilter extends Component {

    constructor(props) {
          super(props);
          this.state = {
              data: [],
              selectedFormats: [],
              isExecEngagementSelected: true,
              execEngagementBGC: 'c9c5068c',
              isVirtualEvent3rdPartySelected:true,
              virtualEvent3rdPartyBGC : '02d4308c',
              isExecutiveVisitSelected: true,
              executiveVisitBGC: '058eb88c',
              isF2FEventSelected:true,
              f2FEventBGC: '0520b88c',
              isWebinarSelected: true,
              webinarBGC: 'e081048c',
              isWebinar3rdParty: true,
              Webinar3rdPartyBGC: '4405b88c', 
              isVirtualEventSelected: true,
              VirtualEventBGC: 'a905b88c',
              isSICSelected: true,
              SICBGC: 'b805148c',
              isLaunchSelected: true,
              launchBGC: '5983598c',
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
    if(!this.state.selectedFormats.some((el)=> el.label.indexOf(format.label) > -1)){
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
        this.state.isVirtualEvent3rdPartySelected ? (this.setState({virtualEvent3rdPartyBGC:'02d4308c'}), this.addFormat(format)) : (this.setState({virtualEvent3rdPartyBGC:'fafafa'}), this.removeFormat(format))
        
        };
    if(format.label === 'Webinar') {
        this.setState({isWebinarSelected:!this.state.isWebinarSelected})
        this.state.isWebinarSelected ? (this.setState({webinarBGC:'e081048c'}), this.addFormat(format)) : (this.setState({webinarBGC:'fafafa'}), this.removeFormat(format))
        
        };
    if(format.label === 'Exec Engagement') {
        this.setState({isExecEngagementSelected:!this.state.isExecEngagementSelected})
        this.state.isExecEngagementSelected ? (this.setState({execEngagementBGC:'c9c5068c'}), this.addFormat(format)) : (this.setState({execEngagementBGC:'fafafa'}), this.removeFormat(format))
        
        };
    if(format.label === 'Executive Visit') {
        this.setState({isExecutiveVisitSelected:!this.state.isExecutiveVisitSelected})
        this.state.isExecutiveVisitSelected ? (this.setState({executiveVisitBGC:'058eb88c'}), this.addFormat(format)) : (this.setState({executiveVisitBGC:'fafafa'}), this.removeFormat(format))
        };
    if(format.label === 'F2F Event') {
        this.setState({isF2FEventSelected:!this.state.isF2FEventSelected})
        this.state.isF2FEventSelected ? (this.setState({f2FEventBGC:'0520b88c'}), this.addFormat(format)) : (this.setState({f2FEventBGC:'fafafa'}), this.removeFormat(format))
        };
    if(format.label === 'Webinar - 3rd Party') {
        this.setState({isWebinar3rdParty:!this.state.isWebinar3rdParty})
        this.state.isWebinar3rdParty ? (this.setState({Webinar3rdPartyBGC:'4405b88c'}), this.addFormat(format)) : (this.setState({Webinar3rdPartyBGC:'fafafa'}), this.removeFormat(format))
        };
    if(format.label === 'Virtual Event') {
        this.setState({isVirtualEventSelected:!this.state.isVirtualEventSelected})
        this.state.isVirtualEventSelected ? (this.setState({VirtualEventBGC:'a905b88c'}), this.addFormat(format)) : (this.setState({VirtualEventBGC:'fafafa'}), this.removeFormat(format))
        };
    if(format.label === 'SIC') {
        this.setState({isSICSelected:!this.state.isSICSelected})
        this.state.isSICSelected ? (this.setState({SICBGC:'b805148c'}), this.addFormat(format)) : (this.setState({SICBGC:'fafafa'}), this.removeFormat(format))
        };
    if(format.label === 'Launch') {
        this.setState({isLaunchSelected:!this.state.isLaunchSelected})
        this.state.isLaunchSelected ? (this.setState({launchBGC:'5983598c'}), this.addFormat(format)) : (this.setState({launchBGC:'fafafa'}), this.removeFormat(format))
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
          icon={format.icon}
          onClick={(event)=>this.slelectPill(event, format)}
          style={{cursor: 'pointer', backgroundColor:'#'+this.getBackgroundColor(format)}}
        />
      )
      )
    }

}

export default CalendarViewHeadFilter