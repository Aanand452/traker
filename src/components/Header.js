import React from 'react';
import logo from '@salesforce-ux/design-system/assets/images/logo-noname.svg';
import { css } from 'glamor';

/**
 * Header Component:
 * Top salesforce logo white header
 */

let headerStyes = css({
  minWidth: '330px'
});

export default function Header() {
  return (
    <header className={`slds-global-header_container ${headerStyes}`}>
      <a className="slds-assistive-text slds-assistive-text_focus">
        Skip to Navigation
      </a>
      <a className="slds-assistive-text slds-assistive-text_focus">
        Skip to Main Content
      </a>
      <div className="slds-global-header slds-grid slds-grid_align-spread">
        <div className="slds-global-header__item">
          <div className="slds-global-header__logo">
            <img src={logo} alt="" />
          </div>
        </div>
      </div>
    </header>
  );
}
