import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Button, InputNumber } from 'antd';
import { inject, observer } from 'mobx-react';
import { withRouter} from 'react-router-dom';

@inject('store')
@observer
class ProductForm  extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const { store, productId } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        store.update(productId, values);
        this.props.history.push('/');
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const readOnly = this.props.readOnly;
    const { store } = this.props;
    const submitBtn = readOnly ? null :
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
      <Button type="primary" onClick={() => this.props.history.push('/')}>Back</Button>
      {submitBtn}
    </Form>
    return form;
  }
}

export default withRouter(Form.create()(ProductForm));

ProductForm.PropTypes = {
  form: PropTypes.object,
  store: PropTypes.object,
  readOnly: PropTypes.bool,
  productId: PropTypes.number,
}
