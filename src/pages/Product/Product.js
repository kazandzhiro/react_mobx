import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import ProductForm from './components/ProductForm';

@inject('store')
@observer
class Product extends React.Component {

  fetchProduct(store, id, readOnly) {
    store.fetchProduct(id);
    return <ProductForm readOnly productId={id} />;
  }

  deleteProduct(store, id) {
    store.delete(id);
    return <Redirect to='/' />;
  }

  renderStrategy(store, action, id) {
    switch(action) {
      case 'add': return <ProductForm />;
      case 'edit': return this.fetchProduct(store, id);
      case 'delete': return this.deleteProduct(store, id);
      case 'get': return this.fetchProduct(store, id, true);
      default: break;
    }
  }

  render() {
    const { match, store } = this.props;
    const id = match.params.id;
    const action = isNaN(+id) ? id : (match.params.action || 'get');

    return this.renderStrategy(store, action, id);
  }
}

export default withRouter(Product);
