import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Form, Modal, Popover, Row, Col, message} from 'antd'
import {FileUpload} from '../../../../../components/CustomComponents'
import IntlMessages, {intlMessages} from "../../../../../util/IntlMessages";
import config from "../../../../../util/config";

const {locales} = config;
const FormItem = Form.Item;
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
const ColProps = {
  xs: 24,
  sm: 24,
  md: 24,
  xl: 24,
  ld: 24
};
const modal = ({
                 currentItem,
                 onFormLocale,
                 onSubmit,
                 onCancel,
                 file,
                 onChangeFile,
                 modalVisible,
                 formItems,
                 selectedFormLocale,
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
        for (let i in errors) {
          if (i === "titleEn" || i === "descriptionEn") {
            return onFormLocale(locales[0])
          }
        }
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
      formData['titleRu'] = formData['titleRu'] === undefined ? formData['titleEn'] : formData['titleRu'];
      formData['titleUz'] = formData['titleUz'] === undefined ? formData['titleEn'] : formData['titleUz'];
      formData['descriptionRu'] = formData['descriptionRu'] === undefined ? formData['descriptionEn'] : formData['descriptionRu'];
      formData['descriptionUz'] = formData['descriptionUz'] === undefined ? formData['descriptionEn'] : formData['descriptionUz'];
      formData['file'] = file.file;
      formData['fileUpload'] = true;
      formData['type'] = true;
      if (actionType === "update") {
        formData['id'] = currentItem.id;
        if (file && file.fileStatus === "update")
          delete formData['fileId'];
        if (file && file.fileStatus === "delete") {
         delete formData['fileId'];
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
    <Col {...ColProps} key={formItem.name}
         hidden={!(formItem.locale === null || formItem.locale === selectedFormLocale.locale)}>
      <FormItem label={<Fragment>{formItem.locale !== null &&
      <i className="vertical-align-middle icon icon-check-circle-o mr-1"/>}{formItem.label}</Fragment>}
                className="mb-0 " hasFeedback {...formItemLayout}>
        {getFieldDecorator(formItem.name, {
          initialValue: currentItem[formItem.name],
          ...formItem
        })(formItem.obj)}
      </FormItem>
    </Col>
  );
  const languageMenu = () => (
    <div className="gx-popover-lang-scroll overflow-hidden">
      <ul className="gx-sub-popover">
        {locales.map(language =>
          <li className="gx-media gx-pointer" key={JSON.stringify(language)}
              onClick={(e) => onFormLocale(language)}>
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`}/>
            <span className="gx-language-text">{language.name}</span>
          </li>
        )}
      </ul>
    </div>);


  return (
    <Modal
      visible={modalVisible}
      title={actionType === "create" ?
        intlMessages({
          en: "Create new certificate",
          ru: "Создать новый сертификат",
          uz: "Yangi sertifikat yaratish"
        })
        :
        intlMessages({en: "Update certificate", ru: "Изменить сертификат", uz: "Sertifikatni tahrirlash"})}
      onOk={handleOk}
      bodyStyle={{height: 420, overflowY: "auto"}}
      destroyOnClose={true}
      width={700}
      onCancel={onCancel}
      wrapClassName={'vertical-center-modal'}
      cancelText={<IntlMessages id={'create'}/>}
      okText={<IntlMessages id={'save'}/>}
    >
      <Form layout="horizontal mt-5 text-left">
        <Row gutter={24}>
          <Col span={24}>
            <div className="#">
              <ul className="gx-header-notifications gx-ml-auto">
                <li className="gx-language">
                  <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                           content={languageMenu()} trigger="click"><span
                    className="gx-pointer gx-flex-row gx-align-items-center"><i
                    className={`flag flag-24 flag-${selectedFormLocale.icon}`}/><span
                    className={'gx-pl-2'}>{selectedFormLocale.name}</span><i
                    className={'icon icon-chevron-down gx-pl-2 d-block'}/></span></Popover>
                </li>
              </ul>
            </div>
          </Col>
          {dynamicFormItems}
          <FileUpload
            name={"file"}
            title={'File'}
            size={50}
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
