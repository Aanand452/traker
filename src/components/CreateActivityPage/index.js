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

  onSubmit = async e => {
    e.preventDefault();
    
    this.setState({showLoader: true});
    const newRow = {
      id: 10000,
      campaignId: this.state.row.campaignId,
      theme: this.state.row.theme[0] && this.state.row.theme[0].label,
      program: this.state.row.program[0] && this.state.row.program[0].label,
      format: this.state.row.format[0] && this.state.row.format[0].label,
      persona: this.state.row.persona[0] && this.state.row.persona[0].label,
      region: this.state.row.region[0] && this.state.row.region[0].label,
      title: this.state.row.title,
      abstract: this.state.row.abstract,
      startDate: this.state.row.startDate,
      endDate: this.state.row.endDate,
      results: this.state.row.results,
      asset: this.state.row.asset,
      kpi: this.state.row.kpi 
    };

    try {
      const response = await fetch('API.json');
      this.props.history.push({
        pathname: '/my-view',
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

// const CreateActivityPage = () => {
//   const history = useHistory();
//   const [row, setRow] = useState({});
//   const [showLoader, setShowLoader] = useState(false);
//   const [showToast, setShowToast] = useState(false);

//   const getFormData = (data) => {
//     setRow({data})
//   };

//   const onSubmit = async () => {
//     setShowLoader(true);

//     await fetch('API.json').then(response => {
//       history.push({
//         pathname: '/my-view',
//         newRow:{
//           id: 10000,
//           campaignId: row.data.campaignId,
//           theme: row.data.theme[0] && row.data.theme[0].label,
//           program: row.data.program[0] && row.data.program[0].label,
//           format: row.data.format[0] && row.data.format[0].label,
//           persona: row.data.persona[0] && row.data.persona[0].label,
//           region: row.data.region[0] && row.data.region[0].label,
//           title: row.data.title,
//           abstract: row.data.abstract,
//           startDate: row.data.startDate,
//           endDate: row.data.endDate,
//           results: row.data.results,
//           asset: row.data.asset,
//           kpi: row.data.kpi
//         }
//       });
//     }).catch(error => {
//       setShowToast(true);
//     });

//     setShowLoader(false);
//   };

//   return (
//     <IconSettings iconPath="/assets/icons">
//       <SfdcFlexPaddingTop>
//         {showLoader && (
//           <SpinnerWrapper>
//             <Spinner
//               size="small"
//               variant="brand"
//               assistiveText={{ label: 'Main Frame Loading...' }}
//             />
//           </SpinnerWrapper>
//         )}
//         <section className="slds-grid slds-wrap">
//           <Panel>
//             <div className="slds-grid slds-wrap slds-p-around_medium slds_full-width">
//               <div className="slds-col slds-size_12-of-12">
//                   <Sfdch1NewRow>Create new activity</Sfdch1NewRow>
//                   <CreateActivity
//                     getFormData = {getFormData}
//                     handleSubmit={(e)=>onSubmit(e)}
//                     abstract = {'"To help infuse our Salesforce community with joy and inspiration, today we launched our #FeelGoodFridays series across our social channels. 🙌The aim of this series is to share how our community is keeping spirits high with positive vibes every week. Our first #FeelGoodFriday story is about one of our education Trailblazers, A Team Tuition. No doubt, many of us can relate to Hayden’s story of being stereotyped at school as a particular type of learner. Well, Hayden has turned this on its head with his business A Team Tuition."'}
//                   />
//               </div>
//             </div>
//           </Panel>
//         </section>
//         {showToast && (
//           <ToastContainer>
//             <Toast 
//               labels={{heading: ["Something went wrong, please try again"]}}
//               variant="error"
//               duration={5000}
//               onRequestClose={() => setShowToast(false)}
//             />
//           </ToastContainer>
//         )}
//       </SfdcFlexPaddingTop>
//     </IconSettings>
//   )
// }

export default withRouter(CreateActivityPage);