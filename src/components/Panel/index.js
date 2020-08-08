import React, { Component } from 'react';

import {
    Input
  } from '@salesforce/design-system-react';

import { PanelContainer } from './styles.js';

class PanelComponent extends Component {

	render() {
		return (
            <PanelContainer>
                <Input onChange={e => this.props.handleSearch(e.target.value)} type='text' defaultValue={this.props.searchByTitle} label='Search by title' />
            </PanelContainer>
		);
	}
}

export default PanelComponent;