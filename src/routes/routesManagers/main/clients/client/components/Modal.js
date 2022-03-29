import React from 'react'
import PropTypes from 'prop-types'
import { Col, DatePicker, Form, Modal, Select, } from 'antd'
import IntlMessages from "util/IntlMessages";
import { intlMessages } from "../../../../../../util/IntlMessages";
import moment from "moment";

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
};
const ColProps = { xs: 24, sm: 24, md: 24, xl: 24, lg: 24 };


const modal = ({
                   currentItem,
                   onSubmit,
                   onCancel,
                   countries,
                   modalVisible,
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
            formData['id'] = currentItem['id'];
            onSubmit(formData)
        })
    };

    const countryList = countries.map(item => {
        return <Option value={item.id} key={`from${item.id}`}>{intlMessages({
            en: item.nameEn,
            ru: item.nameRu,
            uz: item.nameUz
        })}</Option>
    });

    return (
        <Modal
            visible={modalVisible}
            onOk={handleOk}
            title={actionType === "create" ? intlMessages({
                en: "Create new position type",
                ru: "Создать новую тип должность",
                uz: "Yangi lavozim turi yaratish"
            }) : intlMessages({
                en: "Update position type",
                ru: "Изменить тип должность",
                uz: "Lavozim turini tahrirlash"
            })}
            destroyOnClose={true}
            onCancel={onCancel}
            maskClosable={true}
            closable={true}
            wrapClassName={'vertical-center-modal'}
            cancelText={<IntlMessages id={'cancel'} />}
            okText={<IntlMessages id={'save'} />}>
            <Form layout="horizontal">
                <Col {...ColProps}>
                    <FormItem key="date" className="mb-0" label={<IntlMessages id="date" />}
                              hasFeedback {...formItemLayout}>
                        {getFieldDecorator('date', {
                            initialValue: currentItem && moment(currentItem.date),
                            rules: [{
                                required: true,
                                message: <IntlMessages id="E_ERROR" />
                            }]
                        })
                        (<DatePicker />)
                        }
                    </FormItem>
                </Col>
                <Col {...ColProps}>
                    <FormItem key="fromCountry" className="mb-0" label={<IntlMessages id="fromCountry" />}
                              hasFeedback {...formItemLayout}>
                        {getFieldDecorator('fromCountry', {
                            initialValue: currentItem && currentItem.fromCountry && currentItem.fromCountry.id,
                            rules: [{
                                required: true,
                                message: <IntlMessages id="E_ERROR" />
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
                    <FormItem key="toCountry" className="mb-0" label={<IntlMessages id="toCountry" />}
                              hasFeedback {...formItemLayout}>
                        {getFieldDecorator('toCountry', {
                            initialValue: currentItem && currentItem.toCountry && currentItem.toCountry.id,
                            rules: [{
                                required: true,
                                message: <IntlMessages id="E_ERROR" />
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
