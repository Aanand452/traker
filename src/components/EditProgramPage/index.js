import React, { Component } from 'react';
import { Spinner } from '@salesforce/design-system-react';
import { API_URL } from '../../config/config';

import { Container } from './styles';
import ProgramsTable from '../ProgramsTable';

class EditProgramPage extends Component {
  state = {
    showLoader: false,
    programs: []
  }

  componentDidMount() {
    this.getPrograms();
  }

  getPrograms = async () => {
    this.setState({showLoader: true});

    try {
      const response = await fetch(`${API_URL}/programs`);
      const result = await response.json();

      this.setState({programs: result.result});
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