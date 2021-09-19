import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { endSession, checkSession } from '../services';

function PrivateRoute({ isAuthenticated, component: Component, ...rest }) {
    return (

        <Route {...rest} render={(props) => (
            isAuthenticated === true
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
        )} />
    )

}
export default PrivateRoute;