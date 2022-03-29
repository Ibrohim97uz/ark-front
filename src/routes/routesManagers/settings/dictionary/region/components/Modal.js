import React from 'react'
import PropTypes from 'prop-types'
import {Form, Modal, Select,} from 'antd/lib/index'
import IntlMessages from "util/IntlMessages";
import {intlMessages} from "../../../../../../util/IntlMessages";

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


const modal = ({
                   currentItem,
                   onSubmit,
                   onCancel,
                   modalVisible,
                   actionType,
                   formItems,
                   countries,
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

    const dynamicFormItems = formItems.map((formItem) =>
        <FormItem key={formItem.name} className="mb-0" label={formItem.label} hasFeedback {...formItemLayout}>
            {getFieldDecorator(formItem.name, {
                initialValue: currentItem[formItem.name],
                ...formItem
            })(formItem.obj)}
        </FormItem>
    );

    const countryList = countries.map(item => {
        return <Option value={item.id}>{intlMessages({en: item.nameEn, ru: item.nameRu, uz: item.nameUz})}</Option>
    });

    return (
        <Modal
            title={actionType === "create" ? intlMessages({
                en: "Create new region",
                ru: "Создать новую регион",
                uz: "Yangi viloyat yaratish"
            }) : intlMessages({en: "Update region", ru: "Изменить регион", uz: "Viloyatni tahrirlash"})}
            visible={modalVisible}
            onOk={handleOk}
            destroyOnClose={true}
            onCancel={onCancel}
            wrapClassName={'vertical-center-modal'}
            cancelText={<IntlMessages id={'cancel'}/>}
            okText={<IntlMessages id={'save'}/>}
        >
            <Form layout="horizontal">
                {dynamicFormItems}
                <FormItem key="countryId" className="mb-0" label={<IntlMessages id="country"/>}
                          hasFeedback {...formItemLayout}>
                    {getFieldDecorator('countryId', {
                        initialValue: currentItem && currentItem.country && currentItem.country.id,
                        rules: [{
                            required: true,
                            message: <IntlMessages id="E_ERROR"/>
                        }]
                    })
                    (<Select
                        name="countryId"
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
