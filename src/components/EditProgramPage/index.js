import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Spinner, ToastContainer, Toast, IconSettings } from '@salesforce/design-system-react';

import { getAPIUrl } from '../../config/config';
import { Container } from './styles';
import ProgramsTable from '../ProgramsTable';

class EditProgramPage extends Component {
  state = {
    showLoader: false,
    toast: {
      active: false
    },
    programs: []
  }

  componentDidMount() {
    this.setupAndFetch();
    if(this.props.location.state && this.props.location.state.newProgram) {
      this.setState({toast: {
        active: true,
        variant: 'success',
        heading: 'The program was added successfuly'
      }})
    }
  }

  setupAndFetch = async () => {
    if(window.location.hostname === 'localhost') this.API_URL =  "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();
    
    this.getPrograms();
  }

  getPrograms = async () => {
    this.setState({showLoader: true});
    const user = localStorage.getItem('userId');

    try {
      const request = await fetch(`${this.API_URL}/programs/${user}`);
      const response = await request.json();

      this.setState({programs: response.result});
    } catch (error) {}

    this.setState({showLoader: false});  
  }

  render() {
    return (
      <Container>
        <IconSettings iconPath="/assets/icons">
          {this.state.showLoader && <Spinner size="small" variant="brand" assistiveText={{ label: "Loading..." }} />}
          {this.state.toast.active && (
            <ToastContainer>
              <Toast
                labels={{heading: this.state.toast.heading}}
                variant={this.state.toast.variant}
                duration={5000}
                onRequestClose={() => this.setState({toast: {active: false}})}
              />
            </ToastContainer>
          )}
          <ProgramsTable data={this.state.programs} />
        </IconSettings>
      </Container>
    );
  }
}

export default withRouter(EditProgramPage);