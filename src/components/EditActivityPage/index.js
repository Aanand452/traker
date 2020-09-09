import React, { Component } from 'react';
import { Spinner } from '@salesforce/design-system-react';

import { Container } from './styles';
import ActivitiesTable from '../ActivitiesTable';
import { getAPIUrl } from '../../config/config';

class EditActivityPage extends Component {
  state = {
    showLoader: false,
    activities: []
  }

  componentDidMount() {
    this.setupAndFetch();
  }

  setupAndFetch = async () => {
    if(window.location.hostname === 'localhost') this.API_URL =  "http://localhost:3000/api/v1";
    else this.API_URL = await getAPIUrl();
    
    this.getActivities();
  }

  getActivities = async () => {
    this.setState({showLoader: true});

    try {
      const response = await fetch(`${this.API_URL}/activities`);
      const result = await response.json();
      this.setState({activities: result.result});
    } catch (error) {
      console.error(error);
    }

    this.setState({showLoader: false});  
  }

  render() {
    return (
      <Container>
        {this.state.showLoader && <Spinner size="small" variant="brand" assistiveText={{ label: "Loading..." }} />}
        <ActivitiesTable data={this.state.activities} />
      </Container>
    );
  }
}

export default EditActivityPage;