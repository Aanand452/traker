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
        footer={[
          <Button
            key="promptBtn"
            label="Cancel"
            onClick={this.props.closeDeletePrompt}
          />,
          <Button
            variant="brand"
            key="promptBtn"
            label="Delete"
            onClick={() => this.props.handleDeleteSelection(items, item, selection)}
          />,
        ]}
        isOpen={true}
        onRequestClose={this.props.closeDeletePrompt}
        prompt="error"
        size="small"
        title={<span>Warning!</span>}
      >
        <div className="slds-m-around_medium">
          Are you sure you want to delete this activity?
        </div>
      </Modal>
		);
	}
}

let mapState = ({ dataTable }) => ({
  dataTable
});

export default connect(mapState, { closeDeletePrompt, handleDeleteSelection })(Prompt);