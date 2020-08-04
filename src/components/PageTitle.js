/*global ga */
import React from 'react';
import { css } from 'glamor';
import dateFormat from 'dateformat';
import slug from 'slug';
import Icon from './Icon';

/**
 * PageTitle Component:
 * Contains PriceList page title, buttons and watermarks
 */

let pageTitleStyle = css({
  position: 'fixed',
  top: '50px',
  width: '100%',
  minHeight: '80px',
  minWidth: '1180px',
  zIndex: '3',
  paddingTop: '1.5rem',
  paddingBottom: '7px',
  '@media(max-width: 767px)': {
    background: '#00C6F7',
    minHeight: '138px',
    zIndex: '2'
  },
  '@media print': {
    position: 'absolute'
  },
  ' .watermark-top': {
    position: 'fixed',
    top: '56px',
    right: '0',
    minWidth: '130px',
    '@media print': {
      position: 'absolute'
    },
  },
  ' .watermark-right': {
    position: 'fixed',
    right: '-7.6rem',
    top: '34rem',
    transform: 'rotate(90deg)',
    opacity: '0.8',
    '@media print': {
      position: 'absolute'
    },
  },
  ' .watermark-left': {
    position: 'fixed',
    left: '-7rem',
    top: '34rem',
    transform: 'rotate(-90deg)',
    opacity: '0.8',
    '@media print': {
      position: 'absolute'
    },
  },
  ' .mobile-actions': {
    height: '52px',
    background: 'white',
    padding: '0.5rem 1.5rem',
    width: '100%',
    position: 'fixed',
    bottom: '0',
    zIndex: '10',
    left: '0',
    minWidth: '305px'
  },
  ' .mobile-version': {
    display: 'inline-block'
  },
  ' .pdf-button': {
    width: '34px',
    height: '34px',
    marginTop: '-1px',
    marginRight: 'calc(0.75rem - 1px)',
    imageRendering: '-webkit-optimize-contrast',
    ':hover': {
      opacity: '0.93'
    }
  },
  ' .export-button': {
    width: '74px',
    height: '32px',
    ' .slds-spinner': {
      ':before,:after': {
        background: '#6d6d6d !important'
      },
      ' div:before, div:after': {
        background: '#6d6d6d !important'
      }
    }
  },
  ' .slds-dropdown': {
    minWidth: '10rem'
  },
  ' .slds-dropdown__item > button': {
    width: '100%',
    background: 'none',
    border: 'none',
    minHeight: '2rem',
    padding: '0 0.7rem',
    textAlign: 'left',
    ':hover': {
      backgroundColor: '#fafaf9'
    },
    ':focus': {
      outline: '0'
    }
  },
  ' .document-icon > svg': {
    fill: '#0070d2'
  },
  ' button': {
    '@media print': {
      display: 'none'
    }
  }
});

/**
 * Gets the title for the page according to the Price List Selected
 */

const getPriceListName = (selectedList, priceListTypes) => {
  for (let i = 0; i < priceListTypes.length; i++) {
    if (priceListTypes[i].value === selectedList) {
      return priceListTypes[i].label;
    }
  }
  return '';
};

/**
 * Opens links (This had to be done like this instead of using <a> elements
 * for avoiding a Safari Bug that crashes links after doing an export)
 */

const openLink = (uri, category) => {
  const cat = slug(`button-${category}`).toLowerCase();
  ga('send', 'event', {
    eventCategory: cat,
    eventAction: 'click',
    eventLabel: uri
  });
  window.open(uri);
};

/**
 * PageTitle Component
 */

export default function PageTitle({
  products,
  editions,
  currency,
  annual,
  checkedProducts,
  hiddenEditions,
  revisionNumber,
  revisionDate,
  selectedEdition,
  buttons,
  selectedList,
  priceListTypes,
  exportFile,
  exportInProgress,
  togglePricingModal,
  documentsOpened,
  toggleDocumentsMenu,
  closeAllDropDowns
}) {
  const pageTitle = getPriceListName(selectedList, priceListTypes);
  const documentsButtons = [
    buttons.pdf,
    buttons.pricingGuidance,
    buttons.discountMatrix
  ];

  const showDocumentsDropDown =
    buttons.pdf || buttons.pricingGuidance || buttons.discountMatrix;

  const watermark = cssClases => (
    <span
      className={`slds-text-color_inverse slds-float_right slds-m-right_small ${cssClases}`}
      key={cssClases}
    >
      INTERNAL USE ONLY
    </span>
  );

  const getHeaderButton = (button, mobile = false) =>
    button &&
    button.uri && (
      <button
        onClick={e => openLink(button.uri, button.label)}
        key={button.label}
        className={`slds-text-body_regular slds-button_neutral slds-button
        slds-float_right ${mobile ? '' : 'slds-m-right_small no-margin-left'}`}
      >
        {button.label}
      </button>
    );

  const getDocumentMenuItem = button =>
    button &&
    button.uri && (
      <li className="slds-dropdown__item" key={button.label}>
        <button
          onClick={e => openLink(button.uri, button.label)}
          className={`slds-text-body_regular slds-button_neutral slds-button
          slds-float_right`}
        >
          <span>{button.label}</span>
        </button>
      </li>
    );

  return (
    <div className="season-background slds-p-left_xx-large page-title"
      {...pageTitleStyle}
      onClick={e => closeAllDropDowns(e)}>
      <div className="slds-m-horizontal_xx-large slds-show_medium">
        <span className="slds-float_left">
          <span className="slds-text-heading_large responsive slds-text-color_inverse">
            {pageTitle && pageTitle + ' (Beta)'} <br />
          </span>
          <span className={`slds-text-heading_x-small slds-text-color_weak`}>
            {revisionNumber && <span>v{revisionNumber}</span>}
            {revisionDate && (
              <span> ({dateFormat(revisionDate, 'yyyy-mm-dd')})</span>
            )}
          </span>
        </span>
        <button
          className={`slds-text-body_regular slds-button_brand
          slds-button slds-float_right export-button`}
          disabled={exportInProgress}
          onClick={e =>
            exportFile(
              products,
              editions,
              currency,
              annual,
              checkedProducts,
              hiddenEditions,
              null
            )
          }
        >
          <span className={exportInProgress ? 'hidden' : ''}>Export</span>
          <div
            role="status"
            className={`slds-spinner slds-spinner_x-small ${
              exportInProgress ? '' : 'hidden'
            }`}
          >
            <span className="slds-assistive-text">Loading</span>
            <div className="slds-spinner__dot-a" />
            <div className="slds-spinner__dot-b" />
          </div>
        </button>
        {getHeaderButton(buttons.feedback)}
        <button
          className="slds-text-body_regular slds-button_neutral slds-button slds-show_medium slds-float_right slds-m-right_small no-margin-left"
          onClick={ e => {
            ga('send', 'event', {
              eventCategory: 'button',
              eventAction: 'click',
              eventLabel: 'pricing-scratchpad'
            });
            togglePricingModal(
              products,
              editions,
              currency,
              checkedProducts,
              hiddenEditions,
              selectedEdition
            );
          }}
        >
          Pricing Scratchpad
        </button>
        {showDocumentsDropDown && (
          <div
            className={`slds-dropdown-trigger slds-float_right slds-m-right_small
              slds-dropdown-trigger_click ${
                documentsOpened ? 'slds-is-open' : ''
              }`}
          >
            <button
              className="editions-button slds-button slds-size_1-of-1 slds-button_icon slds-button_icon-border-filled"
              aria-haspopup="true"
              title="Documents"
              onClick={e => toggleDocumentsMenu(e)}
            >
              <svg
                className="slds-button__icon slds-icon_small slds-m-horizontal_xx-small document-icon"
                aria-hidden="true"
              >
                <Icon type="standard" name="document" />
              </svg>
              <span className="slds-assistive-text">Documents</span>
            </button>
            <div className="slds-dropdown slds-is-open slds-dropdown_right">
              <ul className="slds-dropdown__list" role="menu">
                {documentsButtons.map(button => getDocumentMenuItem(button))}
              </ul>
            </div>
          </div>
        )}
        {[
          watermark('slds-text-heading_large responsive opacity-6'),
          watermark('slds-text-heading_large watermark-right'),
          watermark('slds-text-heading_large watermark-left')
        ]}
      </div>
      <div className={`slds-m-horitozontal_medium slds-hide_medium`}>
        <span
          className={`slds-text-heading_medium slds-text-color_default bold`}
        >
          World Wide Price List (Beta)
        </span>

        {watermark('slds-text-heading_x-small watermark-top opacity-6')}
      </div>
      <div className="mobile-actions slds-hide_medium">
        {/*
          <button
            className={`slds-text-body_regular slds-button_brand
            slds-button slds-float_right`}
            onClick={(e) => exportFile(
              products,
              editions,
              currency,
              checkedProducts,
              null,
              selectedEdition
            )}
          >
            Export
          </button>
        */}
        <div
          className={`slds-text-body_small opacity-6 mobile-version slds-float_left`}
        >
          {revisionNumber && <span>v{revisionNumber}</span>}
          <br />
          {revisionDate && (
            <span> ({dateFormat(revisionDate, 'yyyy-mm-dd')})</span>
          )}
        </div>
        {getHeaderButton(buttons.feedback, true)}
      </div>
    </div>
  );
}
