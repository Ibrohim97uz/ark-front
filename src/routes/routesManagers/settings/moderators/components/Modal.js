import React from 'react'
import PropTypes from 'prop-types'
import {Col, Form, Modal, Switch,} from 'antd/lib/index'
import IntlMessages from "util/IntlMessages";
import {intlMessages} from "../../../../../util/IntlMessages";
import {FileUpload} from "../../../../../components/CustomComponents";

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
                 actionType,
                 formItems,
                 onChangeFile,
                 file,
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
      formData['enabled'] = formData['enabled'] === undefined ? true : formData['enabled'];
      formData['file'] = file === null ? {} : file.file;
      formData['fileUpload'] = true;
      if (actionType === "update") {
        formData['id'] = currentItem.id;
        if (file && file.fileStatus === "update")
          delete formData['fileId'];
        if (file && file.fileStatus === "delete") {
          delete  formData['fileId'];
          formData['file'] = {};
        }
        if (file && !file.fileStatus) {
          formData['file'] = {};
          formData['fileId'] = currentItem.attachment && currentItem.attachment.id;
        }
      }
      onSubmit(formData)
    })
  };

  const dynamicFormItems = formItems.map((formItem) =>
    <FormItem key={formItem.name} className="mb-0" label={formItem.label} hasFeedback {...formItemLayout}>
      {getFieldDecorator(formItem.name, {
        initialValue: currentItem[formItem.name],
        ...formItem
      })(formItem.obj)}
    </FormItem>
  );

  return (
    <Modal
      visible={modalVisible}
      title={actionType === "create" ? intlMessages({
        en: "Create new moderator",
        ru: "Создать новую модератор",
        uz: "Yangi moderator yaratish"
      }) : intlMessages({en: "Update moderator", ru: "Изменить модератор", uz: "Moderatorni tahrirlash"})}
      onOk={handleOk}
      destroyOnClose={true}
      onCancel={onCancel}
      maskClosable={true}
      wrapClassName={'vertical-center-modal'}
      cancelText={<IntlMessages id={'cancel'}/>}
      okText={<IntlMessages id={'save'}/>}>
      <Form layout="horizontal">
        {dynamicFormItems}

        <Col>
          <FormItem key="enabled" className="mb-0" label={<IntlMessages id="enabled"/>}
                    hasFeedback {...formItemLayout}>

            {getFieldDecorator('enabled', {
              initialValue: actionType === "create" ? true : currentItem && currentItem.enabled,
              valuePropName: "checked"
            })
            (<Switch/>)
            }
          </FormItem>
        </Col>
        <FileUpload
          name={"file"}
          title={<IntlMessages id={'file'}/>}
          types={["image/jpeg",
            "image/png",
            "image/jpg"]}
          size={50}
          file={file}
          onChangeFile={onChangeFile}
          formItemLayout={formItemLayout}
        />
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
