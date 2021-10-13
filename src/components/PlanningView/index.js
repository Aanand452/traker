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


class PlanningView extends Component {

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
        <div class="grid-container">
            <NavBar />
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
        <div class="item5">
        <div className="card-footer">
                <div className="card-head"><div className="owner">Owner</div>
 
                    <div className="card-head-value">S8M</div>
                </div>
                <hr className="hr1"/>
            </div>
        </div>
        </div>
        );
    }
};

export default PlanningView;