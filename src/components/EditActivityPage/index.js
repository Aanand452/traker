import React, { Component } from 'react';
import { Spinner } from '@salesforce/design-system-react';

import { Container } from './styles';
import ActivitiesTable from '../ActivitiesTable';

class EditActivityPage extends Component {
  state = {
    showLoader: false,
    activities: []
  }

  componentDidMount() {
    this.getActivities();
  }

  getActivities = async () => {
    this.setState({showLoader: true});

    try {
      const response = await fetch('assets/data/activities.json');
      const result = await response.json();
      this.setState({activities: result.result});
    } catch (error) {}

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