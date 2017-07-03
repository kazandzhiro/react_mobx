import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter, Link} from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer

class Auth extends React.Component {

  constructor(props) {
    super();
    this.redirect = false;
  }

  determineIntent() {
    const { computedMatch: { params } } = this.props;
    const id = +params.id;
    const action = params.id && isNaN(id) ? params.id : (params.action || 'read');

    return { action, id};
  }

  render() {
    const { store, component: Component, location, ...rest } = this.props;
    if (store.user.name) {
      const { action, id } = this.determineIntent();
      const permissions = store.user.permissions;

      if(!~permissions.indexOf(action.toUpperCase())) {
        return <Link to='/'> You do not have permission for this resource! </Link>;
      }

      return <Route {...rest }
        render={ props => <Component {...props} action={action} id={id} /> }
      />;
    }

    return (<Redirect to={{ pathname: '/login', state: {'redirectUrl': location.pathname}}}/>)
  }
}

export default withRouter(Auth);

Auth.PropTypes = {
  store: PropTypes.object,
  Component: PropTypes.object,
  routing: PropTypes.string,
}
