import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Modal,
  Button
} from '@salesforce/design-system-react';

// ACTIONS
import {
  closeDeletePrompt,
  handleDeleteSelection
} from '../../actions/DataTable';

class Prompt extends Component {
  
  render() {

    let {item, items, selection} = this.props.dataTable;

		return (
      <Modal
        isOpen={true}
        onRequestClose={this.props.closeDeletePrompt}
      >
        <div className="slds-m-around_medium slds-text-align_center">
          <h2 className="slds-m-bottom_medium slds-text-color_destructive slds-text-heading_large">Warning!</h2>
          <p>Are you sure you want to delete this activity?</p>
          <div className="slds-m-top_x-large">
            <Button
              key="promptBtn"
              label="Cancel"
              onClick={this.props.closeDeletePrompt}
            />
            <Button
            variant="brand"
            key="promptBtn"
            label="Delete"
            onClick={() => this.props.handleDeleteSelection(items, item, selection)}
          />
          </div>
        </div>
      </Modal>
		);
	}
}

let mapState = ({ dataTable }) => ({
  dataTable
});

export default connect(mapState, { closeDeletePrompt, handleDeleteSelection })(Prompt);