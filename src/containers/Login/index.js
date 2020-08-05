import React from 'react';

import { useHistory  } from 'react-router-dom'

const Login = () => {

    const history = useHistory();


    const login = e => {
      e.preventDefault();
      history.push('/admin')
    }

    return(
      <section className="slds-heigh_100vh slds-grid slds-wrap slds-align_absolute-center">
        <div className="slds-flex_column">
          <img class="slds-m-bottom_medium slds-img-width_15rem" src="assets/images/logo.svg" alt="Salesforce logo"/>
          <article className="slds-card">
            <div className="slds-card__body slds-card__body_inner slds-login-card-body">
              <form onSubmit={e => login(e)}>
                <div className="slds-form-element">
                  <label className="slds-form-element__label" htmlFor="text-input-id-1">
                    Username
                  </label>
                  <div className="slds-form-element__control">
                    <input type="text" required className="slds-input" />
                  </div>
                </div>
                <div className="slds-form-element slds-m-top_small">
                  <label className="slds-form-element__label" htmlFor="text-input-id-1">
                    Password
                  </label>
                  <div className="slds-form-element__control">
                    <input type="password" required className="slds-input" />
                  </div>
                </div>
                <button type="submit" className="slds-button slds-button_brand slds-button_stretch slds-m-top_small">Login</button>
              </form>
            </div>
            <footer className="slds-card__footer">
              <a className="slds-card__footer-action" href="#">¿Forgot password?
              </a>
            </footer>
          </article>
        </div>
      </section>
    )
}

export default Login;