import React from 'react'
import PropTypes from 'prop-types'
import {Form, Modal, Select,} from 'antd/lib/index'
import IntlMessages,{intlMessages} from "../../../../../../util/IntlMessages";

const Option = Select.Option;
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
                 regions,
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
    <FormItem key={formItem.name} className="mb-0"  label={formItem.label} hasFeedback {...formItemLayout}>
      {getFieldDecorator(formItem.name, {
        initialValue: currentItem[formItem.name],
        ...formItem
      })(formItem.obj)}
    </FormItem>
  );

  const regionList = regions.map(item => {
    return <Option value={item.id}>{intlMessages({en:item.nameEn,ru:item.nameRu,uz:item.nameUz})}</Option>
  });
  return (
    <Modal
           visible={modalVisible}
           title={actionType==="create"? intlMessages({en:"Create new district",ru:"Создать новую район",uz:"Yangi tuman yaratish"}):intlMessages({en:"Update district",ru:"Изменить район",uz:"Tumanni tahrirlash"})}
           onOk={handleOk}
           destroyOnClose={true}
           onCancel={onCancel}
           wrapClassName={'vertical-center-modal'}
           cancelText={<IntlMessages id={'cancel'}/>}
           okText={<IntlMessages id={'save'}/>}
    >
      <Form layout="horizontal">
        {dynamicFormItems}
        <FormItem key="regionId" className="mb-0" label={<IntlMessages id="region"/>} hasFeedback {...formItemLayout}>
          {getFieldDecorator('regionId', {
            initialValue: currentItem &&  currentItem.region && currentItem.region.id ,
            rules: [{
              required: true,
              message: <IntlMessages id="E_ERROR"/>
            }]
          })
          (<Select
            name="regionId"
            allowClear
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {regionList}
          </Select>,)
          }
        </FormItem>
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
