import React from 'react';
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

const NavBar = () => {
  const history = useHistory();

  const toHome = e => {
    e.preventDefault();
    history.push('/home')
  }

  return (
  <NavContainer>
    <IconSettings iconPath="/assets/icons">
      <GlobalHeader
        logoSrc='assets/images/logo.svg'
      >
        <GlobalHeaderButton onClick={toHome}>
          <Icon
            assistiveText={{ label: 'Add Registry' }}
            category="utility"
            name="add"
            size="x-small"
          />
        </GlobalHeaderButton>
        <GlobalHeaderButton onClick={toHome}>
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
          <NavigationBarLink to="/my-report" title="My report" />
          <NavigationBarLink to="/team-report" title="Team report" />
          
        </GlobalNavigationBarRegion>
      </GlobalNavigationBar>
    </IconSettings>
  </NavContainer>
)};

export default NavBar;