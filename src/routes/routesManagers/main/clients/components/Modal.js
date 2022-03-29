import React from 'react'
import PropTypes from 'prop-types'
import {Form, Modal, Row, Col, Select, Input, DatePicker, message} from 'antd'
import {FileUpload} from '../../../../../components/CustomComponents'
import IntlMessages, {intlMessages} from "../../../../../util/IntlMessages";
import moment from "moment";

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: 24,
    justify: "center"
  },
  wrapperCol: {
    justify: "center",
    xs: 24,
  },
};
const ColProps = {xs: 24, sm: 24, md: 12, xl: 12, lg: 12};
const modal = ({
                 currentItem,
                 onSubmit,
                 onCancel,
                 file,
                 onChangeFile,
                 modalVisible,
                 services,
                 countries,
                 actionType,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                 },
               }) => {

  const handleOk = () => {
    validateFields((errors) => {
      if (errors || file == null || file.file == null) {
        if (file === null || file.file === null) {
          message.error(intlMessages({
            en: "File problem!",
            ru: "Проблема с файлом!",
            uz: "Fayl bilan bog'liq muammo!"
          }));
        }
        return;
      }
      let formData = getFieldsValue();
      formData['file'] = file.file;
      formData['fileUpload'] = true;
      formData['type'] = true;
      if (actionType === "update") {
        formData['id'] = currentItem.id;
        if (file && file.fileStatus === "delete") {
          formData['file'] = {};
        }
        if (file && file.fileStatus === "create") {
          formData['attachmentId'] = currentItem.attachment && currentItem.attachment.id;
          formData['file'] = {};
        }
        if (file && !file.fileStatus) {
          formData['file'] = {};
          formData['fileId'] = currentItem.attachment && currentItem.attachment.id;
        }
      }
      formData['trackingNumber'] = formData['trackingNumber'] === undefined || formData['trackingNumber'] === null ? "" : formData['trackingNumber'];
      onSubmit(formData)
    })
  };

  const countryList = countries && countries.length !== 0 ? countries.map(item => {
    return <Option value={item.id} key={`from${item.id}`}>{intlMessages({
      en: item.nameEn,
      ru: item.nameRu,
      uz: item.nameUz
    })}</Option>
  }) : [];
  const serviceList = services && services.length !== 0 ? services.map(item => {
    return <Option value={item.id} key={`to${item.id}`}>{intlMessages({
      en: item.titleEn,
      ru: item.titleRu,
      uz: item.titleUz
    })}</Option>
  }) : [];
  return (
    <Modal
      visible={modalVisible}
      title={actionType === "create" ?
        intlMessages({
          en: "Create new client",
          ru: "Создать новый клиент",
          uz: "Yangi mijoz yaratish"
        })
        :
        intlMessages({en: "Update client", ru: "Изменить клиент", uz: "Mijozni tahrirlash"})}
      onOk={handleOk}
      bodyStyle={{height: 550, overflowY: "auto"}}
      destroyOnClose={true}
      width={800}
      onCancel={onCancel}
      style={{top: 20}}
      cancelText={<IntlMessages id={'cancel'}/>}
      okText={<IntlMessages id={'save'}/>}
    >
      <Form layout="horizontal">
        <Row gutter={24}>
          <Col span={24}>
            <FormItem key="companyName" className="mb-0" label={<IntlMessages id="companyName"/>}
                      hasFeedback {...formItemLayout}>
              {getFieldDecorator('companyName', {
                initialValue: currentItem && currentItem.companyName,
                rules: [{
                  required: true,
                  message: <IntlMessages id="E_ERROR"/>
                }]
              })
              (<Input/>)
              }
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem key="companyStir" className="mb-0" label={<IntlMessages id="companyStir"/>}
                      hasFeedback {...formItemLayout}>
              {getFieldDecorator('companyStir', {
                initialValue: currentItem && currentItem.companyStir,
                rules: [{
                  required: true,
                  message: <IntlMessages id="E_ERROR"/>
                }]
              })
              (<Input/>)
              }
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem key="trackingNumber" className="mb-0" label={<IntlMessages id="trackingNumber"/>}
                      hasFeedback {...formItemLayout}>
              {getFieldDecorator('trackingNumber', {
                initialValue: currentItem && currentItem.trackingNumber,
              })
              (<Input disabled={actionType === "update" && currentItem.actionStatus !== null}/>)
              }
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem key="serviceType" className="mb-0" label={<IntlMessages id="serviceType"/>}
                      hasFeedback {...formItemLayout}>
              {getFieldDecorator('serviceType', {
                initialValue: currentItem && currentItem.serviceType && currentItem.serviceType.id,
                rules: [{
                  required: true,
                  message: <IntlMessages id="E_ERROR"/>
                }]
              })
              (<Select
                name="serviceType"
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {serviceList}
              </Select>,)
              }
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem key="dateOfAgreement" className="mb-0" label={<IntlMessages id="dateOfAgreement"/>}
                      hasFeedback {...formItemLayout}>
              {getFieldDecorator('dateOfAgreement', {
                initialValue: currentItem && moment(currentItem.dateOfAgreement),
                rules: [{
                  required: true,
                  message: <IntlMessages id="E_ERROR"/>
                }]
              })
              (<DatePicker/>)
              }
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem key="fromCountry" className="mb-0" label={<IntlMessages id="fromCountry"/>}
                      hasFeedback {...formItemLayout}>
              {getFieldDecorator('fromCountry', {
                initialValue: currentItem && currentItem.fromCountry && currentItem.fromCountry.id,
                rules: [{
                  required: true,
                  message: <IntlMessages id="E_ERROR"/>
                }]
              })
              (<Select
                name="fromCountry"
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {countryList}
              </Select>,)
              }
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem key="toCountry" className="mb-0" label={<IntlMessages id="toCountry"/>}
                      hasFeedback {...formItemLayout}>
              {getFieldDecorator('toCountry', {
                initialValue: currentItem && currentItem.toCountry && currentItem.toCountry.id,
                rules: [{
                  required: true,
                  message: <IntlMessages id="E_ERROR"/>
                }]
              })
              (<Select
                name="toCountry"
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {countryList}
              </Select>,)
              }
            </FormItem>
          </Col>


          <FileUpload
            name={"file"}
            title={<IntlMessages id="file"/>}
            size={50}
            types={["application/pdf",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              "file.type application/msword"]}
            fileTypeMessage={[" .doc", " .docx ", " .pdf"]}
            file={file}
            onChangeFile={onChangeFile}
            formItemLayout={formItemLayout}
            colLayout={ColProps}
          />
        </Row>
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
