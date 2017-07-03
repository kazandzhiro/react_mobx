import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { inject, observer , PropTypes} from 'mobx-react';
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

  render() {
    const { store, action, id } = this.props;
    switch(action) {
      case 'create': return <ProductForm />;
      case 'read': return this.fetchProduct(store, id, true);
      case 'update': return this.fetchProduct(store, id, false);
      case 'delete': return this.deleteProduct(store, id, false);
      default: return <Redirect to='/404' />;
    }
  }
}

export default withRouter(Product);

Product.PropTypes = {
  store: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.string,
}
