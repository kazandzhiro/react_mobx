import React, { Component } from 'react';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import './App.css';

@inject('store')
@observer
class App extends Component {

  componentDidUpdate(prevProps) {
    // const { redirectUrl } = this.props
    const isLoggingOut = this.props.store.isLoggedIn && !this.props.isLoggedIn
    const isLoggingIn = !this.props.store.isLoggedIn && this.props.isLoggedIn

    if (isLoggingIn) {
      // redirectUrl
    } else if (isLoggingOut) {
      // do any kind of cleanup or post-logout redirection here
    }
  }

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
