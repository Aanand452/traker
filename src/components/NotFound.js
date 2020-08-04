import React from 'react';
import { css } from 'glamor';
import image404 from '../images/404.svg';

/**
 * NotFound Component:
 * Page shown for unknown URLs in the App
 */

const compStyles = css({
  paddingTop: '6rem',
  position: 'fixed',
  top: '0',
  width: '100%',
  height: '100%',
  background: '#f6f7f8',
  color: '#333',
  paddingLeft: '2em'
});

const imgStyle = css({
  maxWidth: '50%',
  maxHeight: '50%',
  marginLeft: '20%'
});

export default function NotFound() {
  return (
    <div {...compStyles}>
      <h1 className="slds-text-heading_large">404 page not found</h1>
      <h2 className="slds-text-heading_medium">
        We are sorry but the page you are looking for does not exist.
      </h2>
      <br />
      <h2 className="slds-text-heading_small">
        <a href="/">Go to main page</a>
      </h2>
      <img src={image404} alt="" {...imgStyle} />
    </div>
  );
}
