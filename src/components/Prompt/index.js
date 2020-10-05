import React, { Component } from 'react';
import { Modal, Button } from '@salesforce/design-system-react';

class Prompt extends Component {
  state = {
    isOpen: this.props.isOpen,
  };

  componentDidUpdate(prevProps) {
    if(prevProps.isOpen !== this.props.isOpen)
      this.setState({isOpen: this.props.isOpen})
  };

  render() {
		return (
      <Modal isOpen={this.state.isOpen} onRequestClose={this.props.onClose} ariaHideApp={false}>
        <div className="slds-m-around_medium slds-text-align_center">
          <h2 className="slds-m-bottom_medium slds-text-color_destructive slds-text-heading_large">{this.props.title ? this.props.title :'Warning!'}</h2>
          <p>{this.props.message ? this.props.message :'Are you sure you want to delete this activity?'}</p>
          <div className="slds-m-top_x-large">
            <Button
              key="promptBtnClose"
              label="Cancel"
              onClick={this.props.onClose}
            />
            <Button
            variant="brand"
            key="promptBtnConfirm"
            label={this.props.mainButtonLabel ? this.props.mainButtonLabel : "Delete"}
            onClick={this.props.onConfirm}
          />
          </div>
        </div>
      </Modal>
		);
	}
}

export default Prompt;