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
  GlobalNavigationBarRegion
} from '@salesforce/design-system-react';
import logo from '@salesforce-ux/design-system/assets/images/logo.svg';

import { NavContainer } from './styles';
import NavigationBarLink from './NavigationBarLink';

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

const NavBar = () => (
  <NavContainer>
    <IconSettings iconPath="/assets/icons">
      <GlobalHeader
        logoSrc={logo}
      >
        <GlobalHeaderButton>
          <Icon
            assistiveText={{ label: 'Add Registry' }}
            category="utility"
            name="add"
            size="x-small"
          />
        </GlobalHeaderButton>
        <GlobalHeaderButton>
          <Icon
            assistiveText={{ label: 'Upload CSV' }}
            category="utility"
            name="upload"
            size="x-small"
          />  
        </GlobalHeaderButton> 
        <GlobalHeaderButton>
          <Icon
            assistiveText={{ label: 'Error' }}
            category="utility"
            name="error"
            size="x-small"
          />
        </GlobalHeaderButton>
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
            triggerName="App Name"
          />
        </GlobalNavigationBarRegion>
        <GlobalNavigationBarRegion region="secondary" navigation>
          <NavigationBarLink to="/admin" title="Home" />
          <NavigationBarLink to="/mandatory-1" title="Mandatory 1" />
          <NavigationBarLink to="/mandatory-2" title="Mandatory 2" />
          <NavigationBarLink to="/mandatory-3" title="Mandatory 3" />
        </GlobalNavigationBarRegion>
      </GlobalNavigationBar>
    </IconSettings>
  </NavContainer>
);

export default NavBar;