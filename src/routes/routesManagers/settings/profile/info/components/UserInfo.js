import React from 'react'
import PropTypes from 'prop-types'
import {Form} from 'antd/lib/index'
import IntlMessages from "util/IntlMessages";
import {FileUpload} from "../../../../../../components/CustomComponents";
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
  offset: 6
};

const ColPropsAsFile = {
  span: 6,
  offset: 9
};

const UserInfo = ({
                    currentItem,
                    onSubmit,
                    formItems,
                    onChangeFile,
                    file,
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
      formData['id'] = currentItem.id;
      formData['file'] = file === null ? {} : file.file;
      formData['type'] = true;
      formData['fileUpload'] = true;
      formData['password'] = formData['nowPassword'];
      if (file && file.fileStatus === "delete") {
        formData['file'] = {};
      }
      if (file && file.fileStatus === "create") {
        formData['photoId'] = currentItem.photo && currentItem.photo.id;
      }
      if (file && !file.fileStatus) {
        formData['file'] = {};
        formData['photoId'] = currentItem.photo && currentItem.photo.id;
      }
      onSubmit(formData)
    })
  };

  const dynamicFormItems = formItems.map((formItem) =>
    <Col {...ColProps} key={formItem.name}>
      <FormItem className="mb-0" label={formItem.label} hasFeedback {...formItemLayout}>
        {getFieldDecorator(formItem.name, {
          initialValue: currentItem[formItem.name],
          ...formItem
        })(formItem.obj)}
      </FormItem>
    </Col>
  );

  return (
    <Card className="h-100 page-info">
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Col {...ColProps}>
          <FileUpload
            name={"file"}
            colLayout={ColPropsAsFile}
            title={<IntlMessages id={'attachment'}/>}
            types={["image/jpeg",
              "image/png",
              "image/jpg"]}
            size={50}
            file={file}
            onChangeFile={onChangeFile}
            formItemLayout={formItemLayout}
          />
        </Col>
        {dynamicFormItems}
        <Col {...ColProps} className={'mt-3'}>
          <Button type="primary" htmlType="submit" className="btn-block">
            <IntlMessages id={'updateInfo'}/>
          </Button>
        </Col>
      </Form>
    </Card>
  )
};

UserInfo.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default Form.create()(UserInfo)
