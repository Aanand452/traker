import React , {Component}from 'react';
import {
  Icon,
  IconSettings,
  AppLauncher,
  Popover,
  GlobalHeader,
  GlobalHeaderButton,
  GlobalHeaderProfile,
  GlobalNavigationBar,
  GlobalNavigationBarRegion,
  GlobalNavigationBarDropdown
} from '@salesforce/design-system-react';

import { NavContainer } from './styles';
import NavigationBarLink from './NavigationBarLink';
import { useHistory  } from 'react-router-dom';

const HeaderProfileCustomContent = (props) => (
  <div id="header-profile-custom-popover-content">
    <div className="slds-m-around_medium">
      <div className="slds-tile slds-tile_board slds-m-horizontal_small">
        <p className="tile__title slds-text-heading_small">User Name</p>
        <div className="slds-tile__detail">
            <p className="slds-truncate">
            <a
              className="slds-m-right_medium"
              href="javascript:void(0)"
              onClick={props.onClick}
            >
              Settings
            </a>
            <a href="javascript:void(0)" onClick={props.onClick}>
              Log Out
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
);
HeaderProfileCustomContent.displayName = 'HeaderProfileCustomContent';


class NavBar extends Component{
  state = {
    tableauUrl: '/'
  };

  configUrls(data){
    this.setState({
      tableauUrl: data.tablaeu
    },
    ...this.state);
  }

  async componentDidMount() {
    try{
      let response = await fetch('http://localhost:3001/config');
      let data = await response.json();
      response.status === 200 && this.configUrls(data);

    } catch(e) {
      console.error('Error getting the cconfig: ', e);
    }
  }

  render(){
    return (
      <NavContainer>
        <IconSettings iconPath="/assets/icons">
          <GlobalHeader
            logoSrc='assets/images/logo.svg'
          >
            <GlobalHeaderButton onClick={() => this.props.history.push('/home')}>
              <Icon
                assistiveText={{ label: 'Add Registry' }}
                category="utility"
                name="add"
                size="x-small"
              />
            </GlobalHeaderButton>
            <GlobalHeaderButton onClick={() => this.props.history.push('/home')}>
              <Icon
                assistiveText={{ label: 'Upload CSV' }}
                category="utility"
                name="upload"
                size="x-small"
              />  
            </GlobalHeaderButton> 
            {/*<GlobalHeaderButton>
              <Icon
                assistiveText={{ label: 'Error' }}
                category="utility"
                name="error"
                size="x-small"
              />
            </GlobalHeaderButton>
            */}
            <GlobalHeaderProfile 
              popover={
                <Popover
                  body={<HeaderProfileCustomContent />}
                  id="header-profile-popover-id"
                />
            } />
          </GlobalHeader>
          <GlobalNavigationBar>
            <GlobalNavigationBarRegion region="primary">
              <AppLauncher
                triggerName="SARA"
              />
            </GlobalNavigationBarRegion>
            <GlobalNavigationBarRegion region="secondary" navigation>
              <NavigationBarLink to="/home" title="Home" />
              <NavigationBarLink to="/my-view" title="My view" />
              <NavigationBarLink to="/team-view" title="Team view" />
              {this.state.tableauUrl !== '/' && <NavigationBarLink title="Go to reports" href={this.state.tableauUrl}/>}
              
            </GlobalNavigationBarRegion>
          </GlobalNavigationBar>
        </IconSettings>
      </NavContainer>
    )
  }
}

export default NavBar;