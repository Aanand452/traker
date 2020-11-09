import React, { Component } from 'react';

import {
  Button,
  Input
} from '@salesforce/design-system-react';

import { PanelContainer } from './styles.js';

class PanelComponent extends Component {

  state = {
    search: {
      owner: '',
      name: ''
    }
  }

  handleChange = (key, value) => this.setState({ search: {...this.state.search, [key]: value} })

	render() {
		return (
      <PanelContainer>
        <Input
          onChange={e => this.handleChange("owner", e.target.value)} 
          type='text'
          label="Search by owner" />
        <Input
          onChange={e => this.handleChange("name", e.target.value)} 
          type='text'
          label="Enter search text" />
        <Button
          onClick={() => this.props.onSearch(this.state.search)}
          className="slds-m-top_small"
          label="Search"
          variant="brand"
        />
      </PanelContainer>
		);
	}
}

export default PanelComponent;