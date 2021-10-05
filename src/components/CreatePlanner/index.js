import React, { Component, Fragment } from 'react';
import moment from 'moment';
import NavBar from '../NavBar';
import BudgetInput from '../BudgetInput/BudgetInput'

import {
    Combobox,
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
          offer:'',
          activities:[{
            activity:''
          }]
        }]
    }
  }

  addOffer = () => {
    this.setState({offers:[...this.state.offers, {offer: '', activities:[{activity:''}]}]})
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
              
              {this.state.offers.map((x, i) => console.log(x)),this.state.offers.map((x, i) => {
                return (
                <div>
                  <div>
                  <Input
                    required
                    placeholder="Quarter"
                    label="Quarter"
                    value={x.offer}
                  />

                  </div>
                  {x.activities.map((x, i) => {
                  return(
                    <div>
                  <Input
                    required
                    placeholder="Quarter"
                    label="Quarter"
                    value={x.activity}
                  />

                  </div>
                  )
                  })}
                </div>
                )
                
              })
              
              }
              <div className="slds-col slds-size_1-of-1">
                    <Button
                    label="add" variant="brand"
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