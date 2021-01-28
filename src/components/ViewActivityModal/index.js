import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  IconSettings,
  Modal,
  Button
} from '@salesforce/design-system-react';

import './styles.css';


class ViewActivityModal extends Component {

	render() {
    
		return (
      <IconSettings iconPath="/assets/icons">
        <Modal
          contentClassName="activity-modal-overflow"
          isOpen={true}
          footer={[
            <Button
              label="Close"
              onClick={this.props.closeDetailModal}
              key="CancelButton"
            />
          ]}
          onRequestClose={this.props.closeDetailModal}
          heading="Activity detail"
          ariaHideApp={false}
        >
          <section className="slds-p-around_large">
            <div className="slds-m-bottom_small">
              <div className="slds-text-title">Owner</div>
              <div className="slds-text-heading_small">{this.props.item.userId ? this.props.item.userId : "-"}</div>
            </div>
            <div className="slds-m-bottom_small">
              <div className="slds-text-title">Program</div>
              <div className="slds-text-heading_small">{this.props.item.programId ? this.props.item.programId : "-"}</div>
            </div>
            <div className="slds-m-bottom_small">
              <div className="slds-text-title">Campaign ID</div>
              <div className="slds-text-heading_small">{this.props.item.campaignId ? this.props.item.campaignId : "-"}</div>
            </div>
            <div className="slds-m-bottom_small">
              <div className="slds-text-title">Title</div>
              <div className="slds-text-heading_small">{this.props.item.title ? this.props.item.title : "-"}</div>
            </div>
            <div className="slds-m-bottom_small">
              <div className="slds-text-title">Format</div>
              <div className="slds-text-heading_small">{this.props.item.formatId ? this.props.item.formatId : "-"}</div>
            </div>
            <div className="slds-m-bottom_small">
              <div className="slds-text-title">Abstract</div>
              <div className="slds-text-heading_small">{this.props.item.abstract ? this.props.item.abstract : "-"}</div>
            </div>
            <div className="slds-m-bottom_small">
              <div className="slds-text-title">Region</div>
              <div className="slds-text-heading_small">{this.props.item.regionId ? this.props.item.regionId : "-"}</div>
            </div>
            <div className="slds-m-bottom_small">
              <div className="slds-text-title">Start date</div>
              <div className="slds-text-heading_small">{this.props.item.startDate ? moment(this.props.item.startDate).utc().format('DD/MM/YYYY') :"-"}</div>
            </div>
            <div className="slds-m-bottom_small">
              <div className="slds-text-title">End date</div>
              <div className="slds-text-heading_small">{this.props.item.endDate ? moment(this.props.item.endDate).utc().format('DD/MM/YYYY') : "-"}</div>
            </div>
            <div className="slds-m-bottom_small">
              <div className="slds-text-title">Assets</div>
              {
                !this.props.item.asset ? "-" : (this.props.item.asset.length > 1
                  ? this.props.item.asset.split(',').map(el => <div key={el} className="slds-text-heading_small slds-m-bottom_x-small">{el}</div>)
                  : <div className="slds-text-heading_small">{this.props.item.asset}</div> )
              }
            </div>
          </section>
        </Modal>
      </IconSettings>
		);
	}
};

let mapState = ({ dataTable }) => ({
  item: dataTable.item,
});

export default connect(mapState)(ViewActivityModal);