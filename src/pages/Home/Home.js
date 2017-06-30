import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject , observer} from 'mobx-react';
import { Table, Button } from 'antd';
import './Home.css';

@inject('store', 'routing')
@observer
class Home extends React.Component {

  columnDefinition = () => [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="">{text}</a>,
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
        <Button type="primary" onClick={() => { this.props.history.push(`/product/update/${record.key}`)}}>Update</Button>
        <span className="ant-divider" />
        <Button type="primary" onClick={() => { this.props.history.push(`/product/delete/${record.key}`)}}>Delete</Button>
      </span>
    ),
  }];

  render() {
    return (<div>
          <Table dataSource={Array.from(this.props.store.products)} columns={this.columnDefinition()}/>
          <Button
            type="primary"
            className='add-product-btn'
            onClick={() => { this.props.history.push('/product/create');}}>
              Add Product
            </Button>
        </div>);
  }
}

export default withRouter(Home);
