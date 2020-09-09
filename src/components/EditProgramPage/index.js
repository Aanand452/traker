import React, { Component } from 'react';
import { Spinner } from '@salesforce/design-system-react';
import { getAPIUrl } from '../../config/config';

import { Container } from './styles';
import ProgramsTable from '../ProgramsTable';

class EditProgramPage extends Component {
  state = {
    showLoader: false,
    programs: []
  }

  componentDidMount() {
    this.setupAndFetch();
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
        {this.state.showLoader && <Spinner size="small" variant="brand" assistiveText={{ label: "Loading..." }} />}
        <ProgramsTable data={this.state.programs} />
      </Container>
    );
  }
}

export default EditProgramPage;