import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Spinner, ToastContainer, Toast, IconSettings } from '@salesforce/design-system-react';

import { getAPIUrl } from '../../config/config';
import { Container } from './styles';
import ProgramsTable from '../ProgramsTable';
import ConfirmationDialog from '../Prompt';

class EditProgramPage extends Component {
  state = {
    showLoader: false,
    showConfirmationDialog: false,
    toast: {
      active: false
    },
    programs: [],
    selectedProgram: ''
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

  deleteProgram = async () => {
    console.log('hola')
  }

  onDelete = program => {
    this.setState({
      showConfirmationDialog: true,
      selectedProgram: program.programId,
    });
  };

  closeConfirmationDialog = () => {
    this.setState({showConfirmationDialog: false, selectedProgram: ''});
  }

  deleteProgram = async () => {
    this.setState({
      showConfirmationDialog: false,
      showLoader: true,
    });

    const config = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({programId: this.state.selectedProgram})
    }

    try {
      const response = await fetch(`${this.API_URL}/program`, config)
      if(response.status === 200) {
        await response.json();
        await this.getPrograms();

        this.setState({
          toast: {
            active: true,
            heading: "A program was deleted successfuly",
            variant: "success"
          },
          selectedProgram: ''
        });
      } else throw new Error(response);
    } catch (err) {
      console.error(err);

      this.setState({
        toast: {
          active: true,
          heading: "Something went wrong, please try again in a few seconds",
          variant: "error"
        },
        selectedProgram: ''
      });
    }

    this.setState({showLoader: false});
  }

  render() {
    return (
      <Container>
        <IconSettings iconPath="/assets/icons">
          <ConfirmationDialog isOpen={this.state.showConfirmationDialog} onClose={this.closeConfirmationDialog} onConfirm={this.deleteProgram} />
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
          <ProgramsTable onDelete={this.onDelete} data={this.state.programs} />
        </IconSettings>
      </Container>
    );
  }
}

export default withRouter(EditProgramPage);