import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

export function PrivateRoute (props: RouteProps) {
    // Check user logged
    const isLogged = Boolean(localStorage.getItem('access_token_value'));

    if(!isLogged) return <Redirect to="/login"/>;

    return <Route {...props}/>;
}
