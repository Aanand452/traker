import React from 'react';
import {
  SLDSGlobalHeader,
  SLDSGlobalHeaderSearch,
  SLDSGlobalHeaderButton,
  SLDSGlobalHeaderDropdown,
  SLDSGlobalHeaderProfile
} from '@salesforce/design-system-react';

const NavBar = () => (
  <SLDSGlobalHeader>
    <SLDSGlobalHeaderSearch />
    <SLDSGlobalHeaderButton />
    <SLDSGlobalHeaderDropdown />
    <SLDSGlobalHeaderDropdown />
    <SLDSGlobalHeaderProfile />
  </SLDSGlobalHeader>
);

export default NavBar;