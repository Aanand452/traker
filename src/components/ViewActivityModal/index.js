import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
import { IconSettings, Modal, Button } from "@salesforce/design-system-react";

import "./styles.css";
import CloneModal from "../CloneActivityModal";
import EditModal from "../EditActivityModal";
import { setItem } from "../../actions/DataTable";

class ViewActivityModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editItem: {},
      cloneModalIsOPen: false,
      editModalIsOPen: false,
      detailModalIsOpen: false,
      deleteModalIsOpen: false,
      toast: {
        show: false,
      },
    };
  }

  editData = () => {
    this.setState({ editItem: this.props.item });
    this.toggleOpen("editModalIsOPen");
  };
  cloneData = () => {
    this.setState({ editItem: this.props.item });
    this.toggleOpen("cloneModalIsOPen");
  };
  deleteData = () => {
    this.setState({ deleteModalIsOpen: true });
    this.props.onDelete(this.props.item);
  };
  onToast = (show, message, variant) => {
    this.props.onToast(show, message, variant);
  };
  toggleOpen = (state) => {
    this.setState({ [state]: !this.state[state] });
  };
  render() {
    return (
      <IconSettings iconPath="/assets/icons">
        {this.state.cloneModalIsOPen && (
          <CloneModal
            data={this.state.editItem}
            onToast={this.onToast}
            toggleOpen={this.toggleOpen}
            reloadActivities={this.props.reloadActivities}
            historicDate={this.props.historicDate}
            isHistoric={this.props.isHistoric}
            closeDetailModal={this.props.closeDetailModal}
          />
        )}
        {this.state.editModalIsOPen && (
          <EditModal
            data={this.state.editItem}
            onToast={this.onToast}
            toggleOpen={this.toggleOpen}
            reloadActivities={this.props.reloadActivities}
            closeDetailModal={this.props.closeDetailModal}
          />
        )}

        <Modal
          dismissOnClickOutside={false}
          contentClassName="activity-modal-overflow"
          isOpen={this.props.isOpen && !this.state.deleteModalIsOpen}
          size="medium"
          onRequestClose={this.props.closeDetailModal}
          heading="Activity details"
          ariaHideApp={false}
          footer={[
            <Button
              key="Edit"
              label="Edit"
              variant="brand"
              onClick={this.editData}
            />,
            <Button
              key="Clone"
              label="Clone"
              onClick={this.props.closeDetailModal && this.cloneData}
            />,
            <Button
              key="Delete"
              label="Delete"
              variant="destructive"
              onClick={this.deleteData}
            />,
          ]}
        >
          <section className="slds-p-around_large">
            <div className="slds-m-bottom_small">
              <div className="slds-text-title">Title</div>
              <div className="slds-text-heading_small">
                {this.props.item.title ? this.props.item.title : "-"}
              </div>
            </div>
            <div className="slds-m-bottom_small">
              <div className="slds-text-title">Abstract</div>
              <div className="slds-text-heading_small">
                {this.props.item.abstract ? this.props.item.abstract : "-"}
              </div>
            </div>
            <div style={{ display: "table", width: "100%" }}>
              <div style={{ float: "left", width: "25%" }}>
                <div className="slds-m-bottom_small">
                  <div className="slds-text-title">Format</div>
                  <div className="slds-text-heading_small">
                    {this.props.item.formatId ? this.props.item.formatId : "-"}
                  </div>
                </div>
              </div>
              <div style={{ float: "left", width: "25%" }}>
                <div className="slds-m-bottom_small">
                  <div className="slds-text-title">Start date</div>
                  <div className="slds-text-heading_small">
                    {this.props.item.startDate
                      ? moment(this.props.item.startDate)
                          .utc()
                          .format("DD/MM/YYYY")
                      : "-"}
                  </div>
                </div>
              </div>
              <div style={{ float: "left", width: "25%" }}>
                <div className="slds-m-bottom_small">
                  <div className="slds-text-title">Program</div>
                  <div className="slds-text-heading_small">
                    {this.props.item.programId
                      ? this.props.item.programId
                      : "-"}
                  </div>
                </div>
              </div>
              <div style={{ float: "left", width: "25%" }}>
                <div className="slds-m-bottom_small">
                  <div className="slds-text-title">Campaign ID</div>
                  <div className="slds-text-heading_small">
                    {this.props.item.campaignId
                      ? this.props.item.campaignId
                      : "-"}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "table", width: "100%" }}>
              <div style={{ float: "left", width: "25%" }}>
                <div className="slds-m-bottom_small">
                  <div className="slds-text-title">Region</div>
                  <div className="slds-text-heading_small">
                    {this.props.item.regionId ? this.props.item.regionId : "-"}
                  </div>
                </div>
              </div>
              <div style={{ float: "left", width: "25%" }}>
                <div className="slds-m-bottom_small">
                  <div className="slds-text-title">End date</div>
                  <div className="slds-text-heading_small">
                    {this.props.item.endDate
                      ? moment(this.props.item.endDate)
                          .utc()
                          .format("DD/MM/YYYY")
                      : "-"}
                  </div>
                </div>
              </div>
              <div style={{ float: "left", width: "25%" }}>
                <div className="slds-m-bottom_small">
                  <div className="slds-text-title">Owner</div>
                  <div className="slds-text-heading_small">
                    {this.props.item.userId ? this.props.item.userId : "-"}
                  </div>
                </div>
              </div>
            </div>
            <div className="slds-m-bottom_small">
              <div className="slds-text-title">Assets</div>
              {!this.props.item.asset ? (
                "-"
              ) : this.props.item.asset.length > 1 ? (
                this.props.item.asset.split(",").map((el) => (
                  <div
                    key={el}
                    className="slds-text-heading_small slds-m-bottom_x-small"
                  >
                  <a href={el} target="_blank" rel="noopener noreferrer">  {el} </a>
                  </div>
                ))
              ) : (
                <div className="slds-text-heading_small">
                  <a href={this.props.item.asset} target="_blank" rel="noopener noreferrer">{this.props.item.asset}</a>
                </div>
              )}
            </div>
          </section>
        </Modal>
      </IconSettings>
    );
  }
}

let mapState = ({ dataTable }) => ({
  item: dataTable.item,
});

export default withRouter(connect(mapState, { setItem })(ViewActivityModal));
