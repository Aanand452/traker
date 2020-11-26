import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({...rest}) => {
    if(!localStorage.getItem("userId")) return <Redirect to='/' />
    return <Route {...rest} />
}

export default PrivateRoute
