import React from 'react'
import PropTypes from 'prop-types'
import {Form, Modal,} from 'antd/lib/index'
import IntlMessages from "util/IntlMessages";
import {intlMessages} from "../../../../../../util/IntlMessages";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};


const modal = ({
                 currentItem,
                 onSubmit,
                 onCancel,
                 modalVisible,
                 formItems,
                 actionType,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                 },
               }) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      let formData = getFieldsValue();
      formData['id']=currentItem['id'];
      onSubmit(formData)
    })
  };

  const dynamicFormItems = formItems.map((formItem) =>
    <FormItem key={formItem.name}  className="mb-0" label={formItem.label} hasFeedback {...formItemLayout}>
      {getFieldDecorator(formItem.name, {
        initialValue: currentItem[formItem.name],
        ...formItem
      })(formItem.obj)}
    </FormItem>
  );

  return (
    <Modal
           visible={modalVisible}
           onOk={handleOk}
           title={actionType==="create"? intlMessages({en:"Create new position type",ru:"Создать новую тип должность",uz:"Yangi lavozim turi yaratish"}):intlMessages({en:"Update position type",ru:"Изменить тип должность",uz:"Lavozim turini tahrirlash"})}
           destroyOnClose={true}
           onCancel={onCancel}
           maskClosable={true}
           closable={true}
           wrapClassName={'vertical-center-modal'}
           cancelText={<IntlMessages id={'cancel'}/>}
           okText={<IntlMessages id={'save'}/>}>
      <Form layout="horizontal">
        {dynamicFormItems}
      </Form>
    </Modal>
  )
};

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default Form.create()(modal)
