import React from 'react';
import { css } from 'glamor';

const compStyles = css({
  ' .slds-button': {
    minHeight: '2rem'
  },
  ' .login-error': {
    color: '#C23934',
    marginBottom: '14px',
    fontSize: '12px'
  },
  ' .login-page': {
    position: 'fixed',
    top: '0',
    width: '100%',
    height: '100%',
    background: '#F4F6F9'
  },
  ' .login-wrap': {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10%',
    width: '340px',
    padding: '1.25rem',
    textAlign: 'center'
  },
  ' .login-logo': {
    width: '180px',
    marginBottom: '1rem'
  },
  ' .login-form': {
    background: '#fff',
    textAlign: 'left',
    width: '100%',
    padding: '1.25rem',
    borderRadius: '0.25rem',
    border: '1px solid #D8DDE6',
    color: '#16325c'
  }
});

/**
 * Login Component:
 * Component visible only for devs when running the app with 'yarn start'
 * for having a screen being able to set the browser cookie for UI testing
 */

export default function Login({ authenticate }) {
  return (
    <form onSubmit={e => authenticate(e)} className={`${compStyles}`}>
      <div className="login-page">
        <div className="login-wrap">
          <div className="slds-text-heading_large slds-m-bottom_small slds-text-color_default">
            World Wide Price List (Beta)
          </div>
          <div className="slds-form-element login-form">
            <button
              type="submit"
              className="slds-button slds-button_brand slds-size_1-of-1"
            >
              Single Sign-On
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
