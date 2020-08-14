import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const NavigationBarLink = props => {
  const { title, to, match, href } = props;

  const isActive = () => {
    let active = false;
    
    if (match.path === to) 
      active = true

    return active;
  }

  return (
    <li className={`slds-context-bar__item ${isActive() && "slds-is-active"}`} key={`NavLink${title}`}>
      {
        to &&
        <Link to={to} className="slds-context-bar__label-action" title={title}>
          <span className="slds-truncate" title={title}>{title}</span>
        </Link>
      }

      {   
        href &&
        <a href={href} className="slds-context-bar__label-action" title={title}  target="_blank">
          <span className="slds-truncate" title={title}>{title}</span>
        </a>
      }
    </li>
  );
};

export default withRouter(NavigationBarLink);