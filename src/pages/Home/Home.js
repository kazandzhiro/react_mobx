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
    render: (text, record) => (
      <span>
        <a href="">Update</a>
        <span className="ant-divider" />
        <a href="">Delete</a>
      </span>
    ),
  }];

  render() {
    return (<div>
          <Table dataSource={Array.from(this.props.store.products)} columns={this.columnDefinition()}/>
          <Button type="primary" className='addProductBtn' onClick={() => { this.props.history.push('/product/add');}}> Add Product </Button>
        </div>);
  }
}

export default withRouter(Home);
