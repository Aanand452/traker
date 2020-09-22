import React, { Component } from 'react';
import { IconSettings, Panel, Spinner, ToastContainer, Toast } from '@salesforce/design-system-react';
import { withRouter  } from 'react-router-dom';

import CreateActivity from '../CreateActivity';
import { SfdcFlexPaddingTop, Sfdch1NewRow, SpinnerWrapper } from './styles';

class CreateActivityPage extends Component {
  state = {
    row: {},
    showLoader: false,
    showToast: false 
  };

  getFormData = data => {
    this.setState({row: data});
  };

  onSubmit = async () => {
    
    this.setState({showLoader: true});
    const newRow = {
      id: 10000,
      campaignId: this.state.row.campaignId,
      program: this.state.row.program[0] && this.state.row.program[0].label,
      format: this.state.row.format[0] && this.state.row.format[0].label,
      region: this.state.row.region[0] && this.state.row.region[0].label,
      title: this.state.row.title,
      abstract: this.state.row.abstract,
      startDate: this.state.row.startDate,
      endDate: this.state.row.endDate,
      asset: this.state.row.asset
    };

    try {
      this.props.history.push({
        pathname: '/my-activities',
        newRow: newRow
      });
    } catch (error) {
      this.setState({showToast: true});
    }

    this.setState({showLoader: false});
  };

  render() {
    return (
      <IconSettings iconPath="/assets/icons">
        <SfdcFlexPaddingTop>
          {this.state.showLoader && (
            <SpinnerWrapper>
              <Spinner
                size="small"
                variant="brand"
                assistiveText={{ label: 'Main Frame Loading...' }}
              />
            </SpinnerWrapper>
          )}
          <section className="slds-grid slds-wrap">
            <Panel>
              <div className="slds-grid slds-wrap slds-p-around_medium slds_full-width">
                <div className="slds-col slds-size_12-of-12">
                    <Sfdch1NewRow>Create new activity</Sfdch1NewRow>
                    <CreateActivity
                      getFormData = {this.getFormData}
                      handleSubmit={this.onSubmit}
                      abstract = {'"To help infuse our Salesforce community with joy and inspiration, today we launched our #FeelGoodFridays series across our social channels. 🙌The aim of this series is to share how our community is keeping spirits high with positive vibes every week. Our first #FeelGoodFriday story is about one of our education Trailblazers, A Team Tuition. No doubt, many of us can relate to Hayden’s story of being stereotyped at school as a particular type of learner. Well, Hayden has turned this on its head with his business A Team Tuition."'}
                    />
                </div>
              </div>
            </Panel>
          </section>
          {this.state.showToast && (
            <ToastContainer>
              <Toast 
                labels={{heading: ["Something went wrong, please try again"]}}
                variant="error"
                duration={5000}
                onRequestClose={() => this.setState({showToast: false})}
              />
            </ToastContainer>
          )}
        </SfdcFlexPaddingTop>
      </IconSettings>
    );
  }
};

export default withRouter(CreateActivityPage);