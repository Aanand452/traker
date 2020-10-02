import React from 'react';
import image404 from '../../images/404.svg';
import { Fragment } from 'react';
import NavBar from '../NavBar';
import { NotFoundWrapper, Astro } from './styles'

export default function NotFound() {
  return (
    <Fragment>
      <NavBar />
      <NotFoundWrapper>
        <h1 className="slds-text-heading_large">404 page not found</h1>
        <h2 className="slds-text-heading_medium">
          We are sorry but the page you are looking for does not exist.
        </h2>
        <br />
        <h2 className="slds-text-heading_small">
          <a href="/home">Go to main page</a>
        </h2>
        <Astro src={image404} alt="" />
      </NotFoundWrapper>
    </Fragment>
  );
}
