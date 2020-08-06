import React, { useState, useEffect } from 'react';
import {
  IconSettings,
  Dropdown,
  DropdownTrigger,
  Button
} from '@salesforce/design-system-react';

const Mandatory = () => {

    return (
      <section class="slds-grid slds-wrap">
        <div class="slds-grid slds-wrap slds-p-around_medium slds_full-width">
          <div class="slds-col slds-size_12-of-12">
            <div className="slds-admin-view">
              <form >
              <IconSettings iconPath="assets/icons">
                <Dropdown
                  tabIndex="-1"
                  align="right"
                  options={[
                    { label: 'Menu Item One', value: 'A0' },
                    { label: 'Menu Item Two', value: 'B0' },
                    { label: 'Menu Item Three', value: 'C0' },
                    { type: 'divider' },
                    { label: 'Menu Item Four', value: 'D0' },
                    { label: 'Menu Item Five', value: 'E0' },
                    { label: 'Menu Item Six', value: 'F0' },
                    { type: 'divider' },
                    { label: 'Menu Item Seven', value: 'G0' },
                  ]}
                >
                  <DropdownTrigger>
                    <Button
                      iconCategory="utility"
                      iconName="down"
                      iconPosition="right"
                      label="Artificial Intelligence"
                    />
                  </DropdownTrigger>
                </Dropdown>
              </IconSettings>
              </form>
              <ul className="slds-button-group-row slds-m-top_x-small">
                <li className="slds-button-group-item">
                  <button className="slds-button slds-button_brand">Upload CSV</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Mandatory;