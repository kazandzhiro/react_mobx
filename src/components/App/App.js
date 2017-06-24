import React, { Component } from 'react';
import { Layout } from 'antd';
import './App.css';

class App extends Component {
  render() {
    const { Header, Content } = Layout
    return (
      <Layout>
      <Header className='header'>MobX CRUD</Header>
      <Layout>
        <Content className='content center'>{this.props.children}</Content>
      </Layout>
    </Layout>
    );
  }
}

export default App;
