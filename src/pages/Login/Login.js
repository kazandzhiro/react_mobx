import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { inject , observer} from 'mobx-react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import './Login.css';

const FormItem = Form.Item;

@inject('store', 'routing')
@observer
class Login extends React.Component {
  handleSubmit = (e) => {
    const { store } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // FIXME: invalidate fields and set error with custom validator func
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
          <a className="loginFormForgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="loginFormBtn">
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
