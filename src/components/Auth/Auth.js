import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

//FIXME: It will be nice to have a working redirection
const Auth = inject('store', 'routing')(observer(({ component: Component, store, routing, ...rest }) => {
    store.setRedirectUrl(routing.location.pathname);
    return (<Route {...rest } render={
      props => (
        store.isLoggedIn ? (<Component {...props}/>)
          : (<Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>)
      )}/>
    )
  }
));

export default Auth;

Auth.PropTypes = {
  store: PropTypes.object,
  Component: PropTypes.object,
  routing: PropTypes.string,
}
