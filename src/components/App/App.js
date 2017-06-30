import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import { inject, observer } from 'mobx-react';
import './App.css';

@inject('store')
@observer
class App extends React.Component {

  componentDidMount() {
    const { store, match } = this.props;
    if (match.url === '/') return store.fetchAllProducts();
  }

  render() {
    const { Header, Content } = Layout
    return(
      <Layout>
      <Header className='header'>MobX CRUD</Header>
      <Layout>
        <Content className='content center'>
          {this.props.store.isLoading ? <Spin /> : this.props.children}
        </Content>
      </Layout>
    </Layout>
    );
  }
}

export default withRouter(App);
