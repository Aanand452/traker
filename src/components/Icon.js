import React from 'react';
import utility from '@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg';
import standard from '@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg';

const types = {
  utility,
  standard
};

/**
 * Icon Component:
 * Handles lightning icons
 */

export default function Icon({ type, name, css, cleanCss }) {
  const cssClasses = cleanCss
    ? css
    : 'slds-icon slds-input__icon ' +
      'slds-input__icon_left slds-icon-text-default ' +
      css;
  return (
    <svg
      className={`${cssClasses}`}
      aria-hidden="true"
      dangerouslySetInnerHTML={{
        __html: `
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="${
            types[type]
          }#${name}" />
        `
      }}
    />
  );
}
