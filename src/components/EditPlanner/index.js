import React, { Component, Fragment } from 'react';
import moment from 'moment';
import NavBar from '../NavBar';
import BudgetInput from '../BudgetInput/BudgetInput'
import update from 'immutability-helper';
import {BoxShadow} from './styles'
import './styles.css'

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
        return (
        // <div>
        //     <div style={{fontSize:'50px'}}>FY22 H2 Master Program Plan: ESMB(ANZ)</div>
        //     <div style={{backgroundColor:'blue', width:'15%', fontSize:'20px', color:'white', paddingLeft:'20px', borderRadius:'0 20px 20px 0'}}>Owner</div>
        //     <div style={{fontSize:'20px', paddingLeft:'20px'}}>Cat Prestipino</div>
        //     <div style={{paddingLeft:'20%', paddingBottom:'80%'}}><BoxShadow>Hi</BoxShadow></div>
        // </div>
        <div class="grid-container">
        <div class="item1">FY22 H2 Master Program Plan: ESMB(ANZ)</div>
        <div class="item2">
            <div className="owner">Owner</div>
            <div className="owner-name">Cat Prestipino</div>

            <div className="owner">Owner</div>
            <div className="owner-name">Cat Prestipino</div>
        </div>
        <div class="item3">
            <div className="card">
                <div className="card-head">MP Target : 
                    <div className="card-head-value">S8M</div>
                </div>
                <hr className="hr1"/>
            </div>
            <div className="card">
                <div className="card-head">MP Target : 
                    <div className="card-head-value">S8M</div>
                </div>
                <hr className="hr1"/>
            </div>
            <div className="card">
                <div className="card-head">MP Target : 
                    <div className="card-head-value">S8M</div>
                </div>
                <hr className="hr1"/>
            </div>
            <div className="card">
                <div className="card-head">MP Target : 
                    <div className="card-head-value">S8M</div>
                </div>
                <hr className="hr1"/>
            </div>
        </div> 
        <div class="item5">Footer</div>
        </div>
        );
    }
};

export default EditPlanner;