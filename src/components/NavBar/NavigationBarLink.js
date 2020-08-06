import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const SARANavigationBarLink = props => {
  const { title, to, match } = props;

  const isActive = () => {
    let active = false;
    
    if (match.path === to) 
      active = true

    return active;
  }

  return (
    <li className={`slds-context-bar__item ${isActive() && "slds-is-active"}`} key={`NavLink${title}`}>
      <Link to={to} className="slds-context-bar__label-action" title={title}>
        <span className="slds-truncate" title={title}>{title}</span>
      </Link>
    </li>
  );
};

export default withRouter(SARANavigationBarLink);