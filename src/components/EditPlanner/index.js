import React, { Component, Fragment } from 'react';
import moment from 'moment';
import NavBar from '../NavBar';
import BudgetInput from '../BudgetInput/BudgetInput'
import update from 'immutability-helper';

import {
    Icon,
    Input,
    Datepicker,
    Button,
    Textarea,
    Expression,
    ToastContainer,
    IconSettings,
    Checkbox,
} from '@salesforce/design-system-react';


class EditPlanner extends Component {

  constructor(props){
    super(props)
    this.state = {
        offers:[{
          id:1,
          offer:'',
          activities:[{
            id:1,
            title:'',
            format:'',
            date: new Date()
          }]
        }]
    }
  }


    render() {
        return (<div>
            <div style={{fontSize:'50px'}}>FY22 H2 Master Program Plan: ESMB(ANZ)</div>
            <div style={{backgroundColor:'blue', width:'15%', fontSize:'20px', color:'white', paddingLeft:'20px', borderRadius:'0 20px 20px 0'}}>Owner</div>
        </div>);
    }
};

export default EditPlanner;