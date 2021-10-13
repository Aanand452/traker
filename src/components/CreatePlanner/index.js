import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
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
import { FormContainer, Container, Sfdch1NewRow } from './styles';


class CreatePlanner extends Component {

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

  addOffer = () => {
    this.setState({offers:[...this.state.offers, {id:this.state.offers.length+1, offer: '', activities:[{id:1, title:'', format:'', date: new Date()}]}]})
  }
  addActivity = (id) => {
    var offer = this.state.offers.find(item  => {return item.id === id})
    var newOffer = offer.activities.push({id:offer.activities.length+1, title:'', format:'', date: new Date()})
    this.setState(update(this.state.offers, {$splice:[[this.state.offers.findIndex((item) => item.id === id), 1, newOffer]]}))
  }
  removeActivity = (offer, activity) => {
    console.log(offer, activity)
  }

    render() {
        return (
        <div style={{padding:'1%', paddingTop:'5.6rem'}}>
          <NavBar />

        <div style={{border: 'groove', padding:'2%'}}>
        <div style={{fontSize:'40px', textAlign:'center'}}> Program Planner</div>
          <div  style={{width: '100%', overflow: 'hidden'}}>
            <div>
              <div style={{width: '50%', float: 'left'}}>
                <div style={{padding: '1%'}}>
                  <Input
                      required
                      placeholder="Enter program name"
                      label="Program Name"
                    />
                </div>
                <div style={{padding: '1%'}}>
                  <Input
                    required
                    placeholder="Enter program name"
                    label="Program Name"
                  />
                </div>
              </div>
              <div style={{float:'right', width:'50%'}}> 
              <div style={{padding: '1%'}}>
                <Input
                    required
                    placeholder="Program Owner"
                    label="Owner"
                  />
                  </div>
                  <div style={{padding: '1%'}}>
                  <Input
                    required
                    placeholder="Enter program name"
                    label="Program Name"
                  />
                  </div>
              </div>
              <div style={{textAlign:'center', paddingTop: '2%'}}>
                <Link to="/planner-view">
                  <Button>Save</Button>
                </Link>
                <Button>Reset</Button>
              </div>
            </div>
            </div>
          </div>
        <div>
          {this.state.offers.map((x, i) => console.log(x)),this.state.offers.map((offer, i) => {
                return (
                <div style={{border: 'groove', padding:'2%'}}>
                  <div style={{width : '50%', paddingBottom: '1%'}}>
                  <Input
                    required
                    placeholder="Offer Name"
                    label="Offer Name"
                    value={offer.offer}
                  />

                  </div>
                  {offer.activities.map((activity, i) => {
                  return(
                    <div>
                    <div style={{border: 'groove', padding:'1%', display: 'inline-block', width: '95%'}}>
                          <div style={{width: '50%',display: 'inline-block'}}>   
                            <Input
                              required
                              placeholder="Title"
                              label="Title"
                              value={activity.title}
                            />
                        </div>
                        <div style={{width: '30%',display: 'inline-block'}}> 
                            <Input
                              required
                              placeholder="Format"
                              label="Format"
                              value={activity.format}
                            />
                        </div>
                        <div style={{width: '15%',display: 'inline-block'}}>
                          <Datepicker
                              required
                              label="Tentative Date"
                              formatter={(date) => date ? moment(date).format('DD/MM/YYYY') : ''}
                              parser={(dateString) => moment(dateString, 'DD/MM/YYYY').toDate()}
                              value={activity.date}
                            />
                        </div>
                  <div >
                  
                  </div>
                  <div >
                  
                  </div>
                  
                </div>
                <div style={{width: '5%',display: 'inline-block'}}>
                        <Button
                              label="-"
                              variant="destructive"
                              onClick={() => this.removeActivity(offer.id, activity.id)}
                              />
                        </div>
                  </div>
                  )
                  
                  })}
                <div style={{paddingLeft:'1.5%'}}>
                  <Button
                  label="add Activity" variant="brand"
                  onClick={() => this.addActivity(offer.id)}
                  />
                </div>
                </div>
                )
                
              })
              
              }
              <div style={{paddingLeft:'0.5%', paddingBottom:'2%'}}>
                    <Button
                    label="add Offer" variant="brand"
                    onClick={this.addOffer}
                    />
              </div>

              <div >
              <Link to="/planner-view">
                  <Button label="Save" variant="brand" />
                </Link>
              </div>
        </div>
      
      </div>

        )
    }
};

export default CreatePlanner;