import React, { Component } from "react";
import moment from "moment";

import {
  Pill,
  Popover,
  Button,
  Icon,
} from "@salesforce/design-system-react";
import {Main} from "./styles"
import "./styles.css"
import {getColor} from "../colorUtil"

class EventPills extends Component {

  state = {
    activities:[],
  }

  getCatagoryByFormat = (format) => {
    let ff = !!format ? this.props.formats.find((f) => f.label === format).category: "Empty";
    ff = format !== '' || ff !== null ? ff : "Empty";
    let color = getColor(ff);
    return color
  }


  getTemplate = (activity) => {
    return (
      <div>
        <div>
          Description
        </div>
        <div>
          {activity.abstract}
        </div>

        <div className="headding-1">
          <div className="logo">
            <Icon
							assistiveText={{ label: 'Location' }}
							category="standard"
							name="location"
							size="xx-small"
						/>
          </div>
          <div className="title">Region</div>
        </div>
        <div className="result">{activity.regionId}</div>

        <div className="headding-1">
          <div className="logo">
            <Icon
							assistiveText={{ label: 'Program' }}
							category="standard"
							name="channel_programs"
							size="xx-small"
						/>
          </div>
          <div className="title">Program</div>
        </div>
        <div className="result">{activity.programId}</div>

        <div className="headding-1">
          <div className="logo">
            <Icon
							assistiveText={{ label: 'owner' }}
							category="standard"
							name="avatar"
							size="xx-small"
						/>
          </div>
          <div className="title">Owner</div>
        </div>
        <div className="result">{activity.userId}</div>

        <div className="headding-1">
          <div className="logo">
            <Icon
							assistiveText={{ label: 'Format' }}
							category="standard"
							name="lead_list"
							size="xx-small"
						/>
          </div>
          <div className="title">Format</div>
        </div>
        <div className="result">{activity.formatId}</div>



      </div>
    )
  }

  render() {
    const popoverBtns = [{label:"", iconCategory:"utility", iconName:"copy", variant:"icon"},
    {label:"Delete", iconCategory:"utility", iconName:"delete", variant:"neutral"},
    {label:"Edit", iconCategory:"utility", iconName:"edit", variant:"neutral"}];
    return (
      <Main>
      {this.props.activities
        .slice(0,3)
        .map((activity) => (
        <Popover
          body={this.getTemplate(activity)}
          id="popover-heading"
          footer={
            <div className="slds-x-small-buttons_horizontal">
            {popoverBtns.map((btn) => (
              <Button
                iconCategory={btn.iconCategory}
                iconName={btn.iconName}
                iconPosition="left"
                label={btn.label}
                iconVariant={btn.label!== ""? "" :"border"}
                onClick={() => console.log(btn)}
                variant={btn.variant}
              />
            ))}
            </div>
          }
        >
          <Pill
          variant="option"
          labels={{
            label: activity.title,
            title: activity.title,
                  }}
            style={{borderRadius:"25px", fontWeight: "bold", fontSize: "0.75rem",
            width: this.props.isMenuOpen ? "180px" : "250px",
            cursor: 'pointer', backgroundColor:'#'+this.getCatagoryByFormat(activity.formatId)}}
          /></Popover>
      ))}
      {this.props.activities.length - 3 > 3 && <div>
        <Popover
          body={<p>This is the body </p>}
          heading={this.props.day.format("LL")}
          id="popover-heading"
        >
        <Pill
          variant="option"
          labels={{
            label: '+ ' + (this.props.activities.length - 3) + ' more'
                  }}
          style={{color:"blue"}}
          />
          </Popover>
      </div>}
      </Main>
    )
  }

}
export default EventPills;
