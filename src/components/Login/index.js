import React, { Component } from 'react';
import { getAPIUrl } from '../../config/config';
import { Input, Toast, ToastContainer, IconSettings } from '@salesforce/design-system-react';
import {
  SfdcFlexColum,
  SfdcFixedLogo,
  SfdcLoginContainer,
  SfdcCardLogin
} from './styles';

import Prompt from '../Prompt';

class Login extends Component {

  state = {
    username: '',
    password: '',
    isToastOpened: false
  }

  componentDidMount() {
    this.setupAndFetch();
  };

  setupAndFetch = async () => {
    if(window.location.hostname === 'localhost') this.API_URL =  "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();
  }

  login = async e => {
    e.preventDefault();
    let { username, password } = this.state;

    try {
      let body = { username, password }
      const config = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
      let response = await fetch(`${this.API_URL}/login`, config);
      let { result } = await response.json();
      
      localStorage.setItem("userId", result[0].userId);
      this.props.history.push('/home');

    } catch (err) {
      this.setState({isToastOpened: true});
      console.error(err);
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return(
      <SfdcLoginContainer className="slds-grid slds-wrap slds-align_absolute-center">
        <SfdcFlexColum>
        <IconSettings iconPath="/assets/icons">
          <ToastContainer>
            {this.state.isToastOpened && <Toast
              labels={{ heading:'Something went wrong'}}
              variant="error"
              onRequestClose={() => this.setState({isToastOpened: false})}
              duration={4000}
            />}
          </ToastContainer>
        </IconSettings>
          <SfdcFixedLogo className="slds-m-bottom_medium" src="assets/images/logo.svg" alt="Salesforce logo"/>
          <article className="slds-card">
            <SfdcCardLogin className="slds-card__body slds-card__body_inner">
              <form onSubmit={e => this.login(e)}>
                <div className="slds-form-element">
                  <Input
                    required
                    placeholder="Enter username"
                    onChange={this.handleChange}
                    value={this.state.username}
                    name="username"
                    label="Username"
                  />
                </div>
                <div className="slds-form-element slds-m-top_small">
                  <Input
                    required
                    placeholder="Enter username"
                    onChange={this.handleChange}
                    value={this.state.password}
                    type="password"
                    name="password"
                    label="Password"
                  />
                </div>
                <button type="submit" className="slds-button slds-button_brand slds-button_stretch slds-m-top_small">Login</button>
              </form>
            </SfdcCardLogin>
          </article>
        </SfdcFlexColum>
      </SfdcLoginContainer>
    )
  }
  
}

export default Login;