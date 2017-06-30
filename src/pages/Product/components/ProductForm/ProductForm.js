import React from 'react';
import { Form, Input, Select, Button, InputNumber } from 'antd';
import { inject, observer } from 'mobx-react';
import { withRouter, Redirect} from 'react-router-dom';

@inject('store', 'routing')
@observer
class ProductForm  extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { store, id } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        store.update(id, values);
        this.props.history.push('/');
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const readOnly = this.props.readOnly;
    const { store } = this.props;
    const button = readOnly ? <Button type="primary" onClick={() => this.props.history.push('/')}>Back</Button> :
    (<Button type="primary" htmlType="submit">Submit</Button>);
    const form = <Form onSubmit={this.handleSubmit}>
      <Form.Item
        label="Name"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
      >
        {getFieldDecorator('name', {
          initialValue: store.product.name,
          rules: [{ required: !readOnly, message: 'Please input a valid product name!' }],
        })(
          <Input placeholder="Name" disabled={readOnly} />
        )}
      </Form.Item>
      <Form.Item
        label="Price"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
      >
        {getFieldDecorator('price', {
          initialValue: store.product.price,
          rules: [{ required: !readOnly, message: 'Please input a valid Price!' }],
        })(
          <InputNumber placeholder="0" min={0} disabled={readOnly} />
        )}
      </Form.Item>
      <Form.Item
        label="Currency"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
      >
        {getFieldDecorator('currency', {
          initialValue: store.product.currency,

          rules: [{ required: !readOnly, message: 'Please select a currency!' }],
        })(
          <Select
            placeholder="Currency"
            disabled={readOnly}
          >
            <Select.Option value="USD">USD</Select.Option>
            <Select.Option value="EUR">EUR</Select.Option>
            <Select.Option value="BGN">BGN</Select.Option>
          </Select>
        )}
      </Form.Item>
      {button}
    </Form>
    return form;
  }
}

export default withRouter(Form.create()(ProductForm));
