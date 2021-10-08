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
            <Fragment>
            <NavBar/>
            <Container>
            <Sfdch1NewRow>Create new Planner</Sfdch1NewRow>

            <FormContainer>
                <form className="slds-grid slds-wrap" onSubmit={e => this.validateSubmit(e)}>
                <div className="slds-grid slds-wrap slds-p-around_medium slds_full-width">
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Input
                  required
                  placeholder="Enter program name"
                  label="Program Name"
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Input
                  required
                  placeholder="Enter program owner"
                  label="Program Owner"
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <BudgetInput
                  required
                  label="Budget"
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <BudgetInput
                  required
                  label="MP target"
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Input
                  required
                  placeholder="Region"
                  label="Region"
                  maxLength="4"
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Input
                  required
                  placeholder="Lifecycle Stage"
                  label="Lifecycle Stage"
                  maxLength="4"
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Input
                  required
                  placeholder="AMP1"
                  label="AMP1"
                  maxLength="4"
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Input
                  required
                  placeholder="APM2"
                  label="APM2"
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Input
                  required
                  placeholder="Industry"
                  label="Industry"
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Input
                  required
                  placeholder="Segment"
                  label="Segment"
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
              <Input
                  required
                  placeholder="Persona"
                  label="Persona"
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Textarea
                  required
                  label="Customer Message"
                  placeholder="Enter customer message"
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-2">
                <Textarea
                  label="Other KPI's"
                  placeholder="Enter kpi's"
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-4 slds-form-element">
                <Input
                  required
                  placeholder="Enter fiscal year"
                  label="Fiscal year"
                  maxLength="4"
                />
              </div>
              <div className="slds-m-bottom_large slds-col slds-size_1-of-4 slds-form-element">
              <Input
                  required
                  placeholder="Quarter"
                  label="Quarter"
                  maxLength="4"
                />
              </div>
              
              {this.state.offers.map((x, i) => console.log(x)),this.state.offers.map((offer, i) => {
                return (
                <Fragment key={i}>
                  <div key={i} className="slds-m-bottom_large slds-col slds-size_1-of-1" style={{paddingLeft:'0.5%'}}>
                  <Input
                    required
                    placeholder="Offer Name"
                    label="Offer Name"
                    value={offer.offer}
                  />

                  </div>
                  {offer.activities.map((activity, i) => {
                  return(
                    <Fragment key={i}>
                    <div key={i} className="slds-m-bottom_large slds-col slds-size_1-of-2" style={{paddingLeft:'1%'}}>
                  <Input
                    required
                    placeholder="Title"
                    label="Title"
                    value={activity.title}
                  />

                  </div>

                  <div className="slds-m-bottom_large slds-col slds-size_1-of-4 slds-form-element">
                  <Input
                    required
                    placeholder="Format"
                    label="Format"
                    value={activity.format}
                    maxLength="4"
                  />
                  </div>
                  <div className="slds-m-bottom_large slds-col slds-size_1-of-4 slds-form-element">
                  <Datepicker
                    required
                    label="Tentative Date"
                    formatter={(date) => date ? moment(date).format('DD/MM/YYYY') : ''}
                    parser={(dateString) => moment(dateString, 'DD/MM/YYYY').toDate()}
                    value={activity.date}
                    maxLength="4"
                  />
                  <Button
                  label="-"
                  variant="destructive"
                  onClick={() => this.removeActivity(offer.id, activity.id)}
                  />
                  </div>
                  
                </Fragment>
                  )
                  
                  })}
                <div className="slds-m-bottom_large slds-col slds-size_1-of-4 slds-form-element" style={{paddingLeft:'1.5%'}}>
                  <Button
                  label="add Activity" variant="brand"
                  onClick={() => this.addActivity(offer.id)}
                  />
                </div>
                </Fragment>
                )
                
              })
              
              }
              <div className="slds-col slds-size_1-of-1" style={{paddingLeft:'0.5%', paddingBottom:'2%'}}>
                    <Button
                    label="add Offer" variant="brand"
                    onClick={this.addOffer}
                    />
              </div>

              <div className="slds-col slds-size_1-of-1">
                <Button label="Save" variant="brand" />
              </div>
            </div>
            </form>
            </FormContainer></Container></Fragment>
        )
    }
};

export default CreatePlanner;