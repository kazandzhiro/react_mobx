import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { inject , observer} from 'mobx-react';
import { Table, Button } from 'antd';
import './Home.css';

@inject('store')
@observer
class Home extends React.Component {
  createActionBtn(action, label, id) {
    let route = id ? `/product/${action}/${id}` : `/product/${action}`;
    const permissions = this.props.store.user.permissions;
    return (
      ~permissions.indexOf(action.toUpperCase()) ?
      <Button
        type="primary"
        onClick={() => { this.props.history.push(route);}}>
          {label}
        </Button> : null);
  }
  columnDefinition = () => [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <a onClick={e => {
        e.preventDefault();
        this.props.history.push(`/product/${record.key}`);}
      }>{record.name}</a>
    )
  }, {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  }, {
    title: 'Currency',
    dataIndex: 'currency',
    key: 'currency',
  }, {
    title: 'Action',
    key: 'action',
    render: (record) => (
      <span>
        {this.createActionBtn('update', 'Update', record.key)}
        {this.createActionBtn('delete', 'Delete', record.key)}
      </span>
    ),
  }];

  render() {
    return (<div>
          <Table dataSource={Array.from(this.props.store.products)} columns={this.columnDefinition()}/>
          {this.createActionBtn('create', 'Add Product')}
        </div>);
  }
}

export default withRouter(Home);

Home.PropTypes = {
  store: PropTypes.object,
  history: PropTypes.object
}
