import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Form, Modal, Popover, Row, Select, Switch} from 'antd/lib/index'
import IntlMessages, {intlMessages} from "../../../../../util/IntlMessages";
import config from "../../../../../util/config";
import {Col} from "antd";
import {FileUpload} from "../../../../../components/CustomComponents";

const {locales} = config;
const Option = Select.Option;
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
  md: 12,
  xl: 12,
  ld: 12
};
const ColProps2 = {xs: 24, sm: 24, md: 6, xl: 6, ld: 6};

const modal = ({
                 currentItem,
                 onFormLocale,
                 onSubmit,
                 onCancel,
                 onChangeFile,
                 modalVisible,
                 formItems,
                 regions,
                 districts,
                 positionTypes,
                 selectedFormLocale,
                 actionType,
                 file,
                 getDistrictByRegionId,
                 form: {
                   getFieldDecorator,
                   validateFields,
                   getFieldsValue,
                 },
               }) => {

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        for (let i in errors) {
          if (i === "firstNameEn" || i === "lastNameEn" || i === "middleNameEn" || i === "tariffEn") {
            return onFormLocale(locales[0])
          }
        }
        return
      }
      let formData = getFieldsValue();
      formData['firstNameRu'] = formData['firstNameRu'] === undefined ? formData['firstNameEn'] : formData['firstNameRu'];
      formData['lastNameRu'] = formData['lastNameRu'] === undefined ? formData['lastNameEn'] : formData['lastNameRu'];
      formData['middleNameRu'] = formData['middleNameRu'] === undefined ? formData['middleNameEn'] : formData['middleNameRu'];
      formData['tariffRu'] = formData['tariffRu'] === undefined ? formData['tariffEn'] : formData['tariffRu'];
      formData['firstNameUz'] = formData['firstNameUz'] === undefined ? formData['firstNameEn'] : formData['firstNameUz'];
      formData['lastNameUz'] = formData['lastNameUz'] === undefined ? formData['lastNameEn'] : formData['lastNameUz'];
      formData['middleNameUz'] = formData['middleNameUz'] === undefined ? formData['middleNameEn'] : formData['middleNameUz'];
      formData['tariffUz'] = formData['tariffUz'] === undefined ? formData['tariffEn'] : formData['tariffUz'];
      formData['isStatus'] = formData['isStatus'] === undefined ? true : formData['isStatus'];
      formData['file'] = file.file;
      formData['fileUpload'] = true;
      if (actionType === "update") {
        formData['id'] = currentItem.id;
        formData['addressId'] = currentItem.address.id;
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
          initialValue: formItem.name === "streetAndHome" ? currentItem.address &&
            currentItem.address.streetAndHome : currentItem[formItem.name],
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

  const regionList = regions.map(item => {
    return <Option value={item.id} key={item.id}>{intlMessages({
      en: item.nameEn,
      ru: item.nameRu,
      uz: item.nameUz
    })}</Option>
  });

  const districtList = districts.map(item => {
    return <Option value={item.id} key={item.id}>{intlMessages({
      en: item.nameEn,
      ru: item.nameRu,
      uz: item.nameUz
    })}</Option>
  });
  const positionTypeList = positionTypes.map(item => {
    return <Option value={item.id} key={item.id}>{intlMessages({
      en: item.nameEn,
      ru: item.nameRu,
      uz: item.nameUz
    })}</Option>
  });

  return (
    <Modal
      visible={modalVisible}
      title={actionType === "create" ? intlMessages({
        en: "Create new employee",
        ru: "Создать нового сотрудника",
        uz: "Yangi xodim yaratish"
      }) : intlMessages({en: "Update employee", ru: "Изменить сотрудника", uz: "Xodimni tahrirlash"})}
      onOk={handleOk}
      width={800}
      bodyStyle={{height: 550, overflowY: "auto"}}
      style={{top: 20}}
      destroyOnClose={true}
      onCancel={onCancel}
      cancelText={<IntlMessages id={'cancel'}/>}
      okText={<IntlMessages id={'save'}/>}>
      <Form layout="horizontal" className="text-left">
        <Row gutter={24}>
          <Col span={24}>
            <div className="#">
              <ul className="gx-header-notifications gx-ml-auto">
                <li className="gx-language">
                  <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                           content={languageMenu()} trigger="click">
                                        <span className="gx-pointer gx-flex-row gx-align-items-center"><i
                                          className={`flag flag-24 flag-${selectedFormLocale.icon}`}/><span
                                          className={'gx-pl-2'}>{selectedFormLocale.name}</span><i
                                          className={'icon icon-chevron-down gx-pl-2 d-block'}/></span>
                  </Popover>
                </li>
              </ul>
            </div>
          </Col>

          {dynamicFormItems}

          <Col {...ColProps}>
            <FormItem key="regionId" className="mb-0" label={<IntlMessages id="region"/>}
                      hasFeedback {...formItemLayout}>
              {getFieldDecorator('regionId', {
                initialValue: currentItem && currentItem.address && currentItem.address.region && currentItem.address.region.id,
                rules: [{required: true, message: <IntlMessages id="E_ERROR"/>}]
              })
              (<Select
                name="regionId"
                placeholder={intlMessages({
                  en: "Select region",
                  ru: "Выберите регион",
                  uz: "Viloyatni tanlang"
                })}
                allowClear
                onSelect={getDistrictByRegionId}
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
          </Col>
          <Col {...ColProps}>
            <FormItem key="districtId" className="mb-0" label={<IntlMessages id="district"/>}
                      hasFeedback {...formItemLayout}>
              {getFieldDecorator('districtId', {
                initialValue: currentItem && currentItem.address && currentItem.address.district && currentItem.address.district.id,
                rules: [{required: true, message: <IntlMessages id="E_ERROR"/>}]
              })
              (<Select
                name="districtId"
                placeholder={intlMessages({
                  en: "Select district",
                  ru: "Выберите район",
                  uz: "Tumanni tanlang"
                })}
                allowClear
                disabled={districts.length === 0}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {districtList}
              </Select>)
              }
            </FormItem>
          </Col>
          <Col {...ColProps}>
            <FormItem key="positionTypeId" className="mb-0" label={<IntlMessages id="positionType"/>}
                      hasFeedback {...formItemLayout}>
              {getFieldDecorator('positionTypeId', {
                initialValue: currentItem && currentItem.positionType && currentItem.positionType.id,
                rules: [{required: true, message: <IntlMessages id="E_ERROR"/>}]
              })
              (<Select
                name="positionTypeId"
                placeholder={intlMessages({
                  en: "Select position type",
                  ru: "Выберите тип должность",
                  uz: "Lavozim turini tanlang"
                })}
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {positionTypeList}
              </Select>)}
            </FormItem>
          </Col>
          <FileUpload
            name={"file"}
            title={<IntlMessages id="file"/>}
            types={["image/jpeg",
              "image/png",
              "image/jpg"]}
            size={50}
            file={file}
            onChangeFile={onChangeFile}
            formItemLayout={formItemLayout}
            colLayout={ColProps2}
          />
          <Col {...ColProps2}>
            <FormItem key="isStatus" className="mb-0" label={<IntlMessages id="status"/>}
                      hasFeedback {...formItemLayout}>
              {getFieldDecorator('isStatus', {
                initialValue: actionType === "create" ? true : currentItem && currentItem.isStatus,
                valuePropName: "checked"
              })
              (<Switch/>)
              }
            </FormItem>
          </Col>

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
