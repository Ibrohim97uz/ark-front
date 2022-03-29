import React from 'react'
import PropTypes from 'prop-types'
import {Form} from 'antd/lib/index'
import IntlMessages from "util/IntlMessages";
import {Button, Card, Col} from "antd";

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};
const ColProps = {
    span: 12,
    offset:6
};

const UserPassword = ({
                   onSubmit,
                   formItems,
                   form: {
                       getFieldDecorator,
                       validateFields,
                       getFieldsValue,
                   },
               }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        validateFields((errors) => {
            if (errors) {
                return
            }
            let formData = getFieldsValue();
            onSubmit(formData)
        })
    };

    const dynamicFormItems = formItems.map((formItem) =>
    <Col {...ColProps}>
        <FormItem key={formItem.name} className="mb-0" label={formItem.label} hasFeedback {...formItemLayout}>
            {getFieldDecorator(formItem.name, {
                ...formItem
            })(formItem.obj)}
        </FormItem>
    </Col>
    );

    return (
      <Card className="h-100">
          <Form layout="horizontal" onSubmit={handleSubmit} className="mt-5">
              {dynamicFormItems}
              <Col {...ColProps} className={'mt-3'}>
                  <Button type="primary" htmlType="submit" className="btn-block">
                      <IntlMessages id={'updatePassword'}/>
                  </Button>
              </Col>
          </Form>
      </Card>
    )
};

UserPassword.propTypes = {
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    item: PropTypes.object,
    onSubmit: PropTypes.func,
};

export default Form.create()(UserPassword)
