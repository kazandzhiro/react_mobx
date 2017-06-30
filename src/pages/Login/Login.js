import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { inject , observer} from 'mobx-react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import './Login.css';

const FormItem = Form.Item;

@inject('store')
@observer
class Login extends React.Component {
  handleSubmit = (e) => {
    const { store } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        return store.fetchUser(values)
          .then(() => store.errors.map(errMsg => message.error(errMsg)));
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { store } = this.props;
    const form = (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-btn">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    );
    return store.isLoggedIn ? <Redirect to='/' /> : form;
  }
}
export default withRouter(Form.create()(Login));

Login.PropTypes = {
  store: PropTypes.object,
  form: PropTypes.object,
  history: PropTypes.object
}
