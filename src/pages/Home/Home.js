import React from 'react';
import { inject , observer} from 'mobx-react';
import { Table, Button } from 'antd';
import './Home.css';
// {
//   "key": 4,
//   "name" : "16GB RAM",
//   "price" : 200,
//   "currency" : "USD"
// }
@inject('store')
@observer
class Home extends React.Component {
  columns = () => [{
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
    render: (text, record) => (
      <span>
        <a href="">Update</a>
        <span className="ant-divider" />
        <a href="">Delete</a>
      </span>
    ),
  }];

  componentDidMount() {
    this.props.store.fetchAllProducts();
  }

  render() {
    return (
      <div>
        <Table dataSource={Array.from(this.props.store.products)} columns={this.columns()}/>
        <Button type="primary" className='addProductBtn'> Add Product </Button>
      </div>
      );
  }
}

export default Home;
