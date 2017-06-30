import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { inject, observer , PropTypes} from 'mobx-react';
import ProductForm from './components/ProductForm';

@inject('store')
@observer
class Product extends React.Component {

  createIntent() {
    const { match: { params }, store } = this.props;
    const id = +params.id;
    const action = isNaN(id) ? params.id : (params.action || 'read');
    return {store, action, id};
  }

  componentWillMount() {
    const { action, store } = this.createIntent();
    const permissions = store.user.permissions;

    if(!~permissions.indexOf(action.toUpperCase())) {
      this.props.history.push('/forbidden')
    }
  }

  fetchProduct(store, id, readOnly) {
    store.fetchProduct(id);
    return <ProductForm readOnly={readOnly} productId={id} />;
  }

  deleteProduct(store, id) {
    store.delete(id);
    return <Redirect to='/' />;
  }
  // FIXME: We loading indicators here to improve UX
  renderStrategy({store, action, id}) {
    switch(action) {
      case 'create': return <ProductForm />;
      case 'read': return this.fetchProduct(store, id, true);
      case 'update': return this.fetchProduct(store, id, false);
      case 'delete': return this.deleteProduct(store, id, false);
      default: return <Redirect to='/404' />;
    }
  }

  render() {
    return this.renderStrategy(this.createIntent());
  }
}

export default withRouter(Product);

Product.PropTypes = {
  store: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.string,
}
