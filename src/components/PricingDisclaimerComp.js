/*global ga */
import React from 'react';
import Icon from './Icon';
import { css } from 'glamor';

/**
 * Pricing Disclaimer Component:
 * Disclaimer shown when opening the Pricing Scratchpad
 */

let cmpStyles = css({
  ' .ps-modal': {
    color: '#142E5D'
  },
  ' .ps-header': {
    width: '235px',
    marginTop: '7px',
    textAlign: 'left'
  },
  ' .ps-disclaimer': {
    width: '80%',
    margin: 'auto'
  },
  ' .watermark-modal': {
    color: '#ababab',
    textAlign: 'center',
    width: '90%',
    position: 'absolute',
    left: '0'
  }
});

export default function PricingDisclaimer({
  acceptDMDisclaimer,
  togglePricingModal
}) {
  return (
    <div className={cmpStyles}>
      <section
        role="dialog"
        tabIndex="-1"
        aria-labelledby="modal-heading-01"
        aria-modal="true"
        aria-describedby="modal-content-id-1"
        className="slds-modal slds-modal_large slds-slide-up-open"
      >
        <div className="slds-modal__container ps-modal">
          <header className="slds-modal__header slds-grid slds-grid_align-spread slds-grid_vertical-align-center">
            <button
              className="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse"
              title="Close"
              onClick={e => togglePricingModal(null)}
            >
              <Icon
                type="utility"
                name="close"
                cleanCss="true"
                css="slds-button__icon slds-button__icon_large"
              />
              <span className="slds-assistive-text">Close</span>
            </button>
            <div className="slds-grid slds-grid_align-spread">
              <div className="slds-text-heading_medium ps-header">
                Pricing Scratchpad
              </div>
            </div>
          </header>
          <div className="slds-modal__content">
            <div
              className="slds-scrollable"
              style={{ width: '100%', maxHeight: '455px' }}
            >
              <div className="slds-p-around_xx-large slds-text-heading_small ps-disclaimer">
                <p>
                  The "Pricing Scratchpad" is for informational purposes only
                  and it is not a legally binding agreement or offer to sell
                  products or services. The sale of products or services will be
                  subject to an Order Form between you, the Customer, and SFDC
                  specifying the governing terms, including pricing. No
                  representations or warranties are made concerning the
                  completeness or accuracy of information contained in this
                  document. This information is confidential to SFDC and no part
                  of this document may be reproduced, in whole or in part,
                  unless specifically required for your internal use for the
                  consideration of SFDC services.
                </p>
                <br />
                <p className="slds-p-horizontal_xx-large">
                  1. Please note there is no legal obligation of confidentiality
                  from the customer without an NDA / MSA.<br />
                  2. Please ensure customer is informed that pricing proposals
                  do not represent official quotes.
                </p>
              </div>
            </div>
          </div>
          <footer className="slds-modal__footer">
            <span
              className={`watermark-modal slds-text-heading_medium slds-m-right_small`}
            >
              INTERNAL USE ONLY
            </span>
            <button
              className="slds-button slds-button_brand"
              onClick={e => {
                ga('send', 'event', {
                  eventCategory: 'button',
                  eventAction: 'click',
                  eventLabel: 'pricing-scratchpad-accept'
                });
                acceptDMDisclaimer();
              }}
            >
              I Accept
            </button>
          </footer>
        </div>
      </section>
      <div
        className="slds-backdrop slds-backdrop_open"
        onClick={e => togglePricingModal(null)}
      />
    </div>
  );
}
