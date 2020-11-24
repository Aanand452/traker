import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { getCookie } from '../../utils/cookie';

const PrivateRoute = ({...rest}) => {

    let token = getCookie('token');
    let { user_id } = jwt.decode(token) || '';

    if(!user_id) return <Redirect to='/' />
    return <Route {...rest} />
}

export default PrivateRoute
