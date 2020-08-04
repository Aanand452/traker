import React from 'react';
import { css } from 'glamor';

/**
 * AnnualToggle Component:
 * Checkbox Anual/Toggle used in Pricelist
 * and Pricing Scratchpad
 */

let compStyles = css({
  ' .switch': {
    position: 'relative',
    display: 'inline-block',
    width: '48px',
    height: '26px'
  },
  ' .switch input': { display: 'none' },
  ' .slider': {
    position: 'absolute',
    cursor: 'pointer',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: '#F6F7F9',
    border: '1px solid #006CE1',
    boxShadow: '0px 0px 5px #006CE1',
    WebkitTransition: '.4s',
    transition: '.4s'
  },
  ' .slider:before': {
    position: 'absolute',
    content: '""',
    height: '20px',
    width: '20px',
    left: '2px',
    bottom: '2px',
    backgroundColor: '#006CE1 !important', //Needed to print
    WebkitTransition: '.4s',
    transition: '.4s'
  },
  ' input:checked + .slider:before': {
    WebkitTransform: 'translateX(22px)',
    MsTransform: 'translateX(22px)',
    transform: 'translateX(22px)'
  },
  ' .slider.round': {
    borderRadius: '34px'
  },
  ' .slider.round:before': {
    borderRadius: '50%'
  },
  ' .switch-toggle-label': {
    marginTop: '4px',
    color: '#52678F'
  }
});

/**
 * AnnualToggle component
 *
 * @param {Boolean} annual Checkbox input value
 * @param {function} toggleAnnual action for input onChange
 * @param {String} css classes to be applied to component
 */

export default function AnnualToggle({ annual, toggleAnnual, css }) {
  return (
    <div
      className={`slds-form-element slds-grid slds-grid_align-spread
      ${compStyles} ${css}`}
    >
      <label className="switch-toggle-label">Monthly</label>
      <label className="switch slds-m-horizontal_x-small">
        <input type="checkbox" checked={annual} onChange={toggleAnnual} />
        <span className="slider round" />
      </label>
      <label className="switch-toggle-label">Annual</label>
    </div>
  );
}
