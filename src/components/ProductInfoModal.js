import React from 'react';
import Icon from './Icon';
import { css } from 'glamor';

/**
 * ProductInfoModal Component:
 * Product information modal shown in mobiles when clicking the
 * info icon in a product (Replaces the footnotes tooltip for desktop)
 */

let cmpStyles = css({
  ' .export-button': {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem'
  },
  ' .upload-button': {
    minHeight: '32px',
    minWidth: '78px'
  },
  ' .sub-header': {
    background: '#ececec',
    borderRadius: '7px',
    padding: '0 9px',
    margin: '0 -8px'
  }
});

/**
 * Formats string replacing the '\n' replacing them with <p> elements
 * for displaying correctly in the HTML
 */

const formatString = description => {
  const lines = description.split('\n');
  return lines.map((line, index) => <p key={index}>{line}</p>);
};

/**
 * ProductInfoModal main component
 */

export default function ProductInfoModal({
  productInfoModalOpen,
  toggleProductInfoModal,
  product
}) {
  return (
    <div className={cmpStyles}>
      <div className={productInfoModalOpen ? '' : 'hidden'}>
        <section
          role="dialog"
          tabIndex="-1"
          aria-labelledby="modal-heading-01"
          aria-modal="true"
          aria-describedby="modal-content-id-1"
          className="slds-modal slds-slide-up-open"
        >
          <div className="slds-modal__container">
            <header className="slds-modal__header">
              <button
                className="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse"
                title="Close"
                onClick={e => toggleProductInfoModal(null)}
              >
                <Icon
                  type="utility"
                  name="close"
                  cleanCss="true"
                  css="slds-button__icon slds-button__icon_large"
                />
                <span className="slds-assistive-text">Close</span>
              </button>
              <h2
                id="modal-heading-01"
                className="slds-text-heading_medium slds-hyphenate"
              >
                {product && product.name}
              </h2>
            </header>
            {product && (
              <div
                className="slds-modal__content slds-p-around_medium"
                id="modal-content-id-1"
              >
                {product.additionalResourcesLink &&
                  product.additionalResourcesLink.uri && (
                    <div>
                      <div className="sub-header slds-text-color_weak slds-text-body_small">
                        ADDITIONAL RESOURCES
                      </div>
                      <div>
                        {product.additionalResourcesLink ? (
                          <a
                            href={product.additionalResourcesLink.uri}
                            target="_blank"
                          >
                            {product.additionalResourcesLink.label}
                          </a>
                        ) : (
                          ''
                        )}
                      </div>
                      {(product.description ||
                        (product.footnotes &&
                          Boolean(product.footnotes.length))) && <br />}
                    </div>
                  )}
                {product.description && (
                  <div>
                    <div className="sub-header slds-text-color_weak slds-text-body_small">
                      DESCRIPTION
                    </div>
                    <div>{formatString(product.description)}</div>
                    {product.footnotes &&
                      Boolean(product.footnotes.length) && <br />}
                  </div>
                )}
                {product.footnotes &&
                  Boolean(product.footnotes.length) && (
                    <div>
                      <div className="sub-header slds-text-color_weak slds-text-body_small">
                        FOOTNOTES
                      </div>
                      <div>
                        {product.footnotes.map(note => (
                          <div className="tooltip-footnote" key={note.number}>
                            {formatString(note.text)}
                            <br />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>
        </section>
        <div
          className="slds-backdrop slds-backdrop_open"
          onClick={e => toggleProductInfoModal(null)}
        />
      </div>
    </div>
  );
}
