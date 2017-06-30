import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import ProductForm from './components/ProductForm';

@inject('store')
@observer
class Product extends React.Component {

  fetchProduct(store, id, readOnly) {
    store.fetchProduct(id);
    return <ProductForm readOnly={readOnly} productId={id} />;
  }

  deleteProduct(store, id) {
    store.delete(id);
    return <Redirect to='/' />;
  }
  // FIXME: We loading indicators here to improve UX
  renderStrategy(store, action, id) {
    switch(action) {
      case 'create': return <ProductForm />;
      case 'read': return this.fetchProduct(store, id, true);
      case 'update': return this.fetchProduct(store, id, false);
      case 'delete': return this.deleteProduct(store, id, false);
      default: break;
    }
  }

  render() {
    const { match: { params }, store } = this.props;
    const id = +params.id;
    const action = isNaN(id) ? params.id : (params.action || 'read');

    return this.renderStrategy(store, action, id);
  }
}

export default withRouter(Product);
