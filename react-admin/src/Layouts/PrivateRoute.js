import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default function PrivateRoute({onLogout, user, component: Component, ...rest}) {
  return (
    <Route  {...rest} render={props =>
      user ? <Component user={user} onLogout={onLogout}  {...props}/> : <Redirect to='/login' />     
    } />
  )
} 