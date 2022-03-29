import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Popover, Row, Col, message, Switch } from 'antd'
import { FileUpload, MultipleFileUpload, MultipleFileVideoUpload } from '../../../../../components/CustomComponents'
import { convertToRaw } from "draft-js";

import IntlMessages, { intlMessages } from "../../../../../util/IntlMessages";
import config from "../../../../../util/config";
import draftToHtml from "draftjs-to-html";
import Editor from "../../../../../components/WYSISWYG";


const { locales } = config;
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

const ColProp2 = {
    xs: 24,
    sm: 24,
    md: 8,
    xl: 8,
    ld: 8
};


const modal = ({
                   currentItem,
                   onFormLocale,
                   onSubmit,
                   onCancel,
                   file,
                   files,
                   videos,
                   text,
                   onChangeFile,
                   onChangeAnyFile,
                   onChangeAnyFileVideo,
                   modalVisible,
                   onTextChange,
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
            if (errors || file == null || file.file == null || text.en === "") {
                for (let i in errors) {
                    if (i === "titleEn" || i === "textEn") {
                        return onFormLocale(locales[0])
                    }
                }

                if (text && text.en === "") {
                    message.error(intlMessages({
                        en: "The problem with the text!",
                        ru: "Проблема с текстом!",
                        uz: "Matn bilan bog'liq muammo!"
                    }));
                }

                if (file === null || file.file == null) {
                    message.error(intlMessages({
                        en: "File problem!",
                        ru: "Проблема с файлом!",
                        uz: "Fayl bilan bog'liq muammo!"
                    }));
                }

                return;
            }
            let formData = getFieldsValue();
            let currentFileList = [];
            formData['titleRu'] = formData['titleRu'] === undefined ? formData['titleEn'] : formData['titleRu'];
            formData['titleUz'] = formData['titleUz'] === undefined ? formData['titleEn'] : formData['titleUz'];
            formData['textEn'] = draftToHtml(convertToRaw(text.en.getCurrentContent()));
            formData['textRu'] = text.ru === "" ? formData['textEn'] : draftToHtml(convertToRaw(text.ru.getCurrentContent()));
            formData['textUz'] = text.uz === "" ? formData['textEn'] : draftToHtml(convertToRaw(text.uz.getCurrentContent()));
            formData['isStatus'] = formData['isStatus'] === undefined ? true : formData['isStatus'];

            formData['fileUpload'] = true;
            formData['type'] = true;
            formData['otherAttachmentId'] = [];
            formData['files'] = [];
            formData['videosId'] = [];
            formData['videos'] = [];
            if (actionType === "create") {
                if (files.length !== 0) {
                    files.map((item) => {
                        if (item.fileStatus === "update") {
                            return formData['files'].push(item)
                        }
                        return item;
                    });
                }
                if (videos !== 0) {
                    videos.map((item) => {
                        if (item.fileStatus === "update") {
                            return formData['videos'].push(item)
                        }
                        return item;
                    })
                }
            }
            if (actionType === "update") {
                formData['id'] = currentItem.id;
                if (files.length !== 0) {
                    files.map((item) => {
                        if (item.fileStatus === "create") {
                            return formData['otherAttachmentId'].push(item.file.id)
                        }
                        if (item.fileStatus === "update") {
                            return formData['files'].push(item)
                        }
                        return item;
                    })
                }
                if (videos.length !== 0) {
                    videos.map((item) => {
                        if (item.fileStatus === "create") {
                            return formData['videosId'].push(item.file.id)
                        }
                        if (item.fileStatus === "update") {
                            return formData['videos'].push(item)
                        }
                        return item;
                    })
                }
            }
            if (file && file.fileStatus === "update") {
                currentFileList.push({ name: "mainFile", file: file.file })
            }
            if (file && file.fileStatus === "create") {
                formData['mainAttachmentId'] = currentItem.mainAttachment.id;
                currentFileList.push({ name: "mainFile", file: {} })
            }
            if (file && file.fileStatus === "delete") {
                currentFileList.push({ name: "mainFile", file: {} })
            }
            currentFileList.push({ name: "file1", file: formData['files'][0] ? { 0: formData['files'][0].file } : {} });
            currentFileList.push({ name: "file2", file: formData['files'][1] ? { 0: formData['files'][1].file } : {} });
            currentFileList.push({ name: "file3", file: formData['files'][2] ? { 0: formData['files'][2].file } : {} });
            currentFileList.push({
                name: "video1",
                file: formData['videos'][0] ? { 0: formData['videos'][0].file } : {}
            });
            currentFileList.push({
                name: "video2",
                file: formData['videos'][1] ? { 0: formData['videos'][1].file } : {}
            });
            currentFileList.push({
                name: "video3",
                file: formData['videos'][2] ? { 0: formData['videos'][2].file } : {}
            });
            formData['file'] = currentFileList;
            onSubmit(formData)
        })
    };

    const dynamicFormItems = formItems.map((formItem) =>
        <Col {...ColProps} key={formItem.name}
             hidden={!(formItem.locale === null || formItem.locale === selectedFormLocale.locale)}>
            <FormItem label={<Fragment>{formItem.locale !== null &&
            <i className="vertical-align-middle icon icon-check-circle-o mr-1" />}{formItem.label}</Fragment>}
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
                        <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
                        <span className="gx-language-text">{language.name}</span>
                    </li>
                )}
            </ul>
        </div>);

    const onEditorChange = (e) => {
        onTextChange(e)
    };


    return (
        <Modal
            visible={modalVisible}
            title={actionType === "create" ?
                intlMessages({
                    en: "Create new service",
                    ru: "Создать новый сервис",
                    uz: "Yangi xizmat yaratish"
                }) :
                intlMessages({
                        en: "Update service",
                        ru: "Изменить сервис",
                        uz: "Xizmatni tahrirlash"
                    }
                )}
            onOk={handleOk}
            bodyStyle={{ height: 550, overflowY: "auto" }}
            destroyOnClose={true}
            width={900}
            style={{ top: 20 }}
            onCancel={onCancel}
            cancelText={<IntlMessages id={'cancel'} />}
            okText={<IntlMessages id={'save'} />}>
            <Form layout="horizontal">
                <Row gutter={24}>
                    <Col span={24}>
                        <div className="#">
                            <ul className="gx-header-notifications gx-ml-auto">
                                <li className="gx-language">
                                    <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                                             content={languageMenu()} trigger="click">
              <span className="gx-pointer gx-flex-row gx-align-items-center">
                <i className={`flag flag-24 flag-${selectedFormLocale.icon}`} />
                <span className={'gx-pl-2'}>{selectedFormLocale.name}</span>
                <i className={'icon icon-chevron-down gx-pl-2 d-block'} />
              </span>
                                    </Popover>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    {dynamicFormItems}
                    <Editor
                        title={"field.text"}
                        text={text[selectedFormLocale['locale']]}
                        onEditorChange={onEditorChange}
                    />
                    <Col {...ColProps}>
                        <FormItem key="isStatus" className="mb-0" label={<IntlMessages id="status" />}
                                  hasFeedback {...formItemLayout}>

                            {getFieldDecorator('isStatus', {
                                initialValue: actionType === "create" ? true : currentItem && currentItem.isStatus,
                                valuePropName: "checked"
                            })
                            (<Switch />)
                            }
                        </FormItem>
                    </Col>
                    <FileUpload
                        name={"main-img"}
                        title={<IntlMessages id="mainFile" />}
                        types={["image/jpeg",
                            "image/png",
                            "image/jpg"]}
                        size={50}
                        file={file}
                        onChangeFile={onChangeFile}
                        formItemLayout={formItemLayout}
                        colLayout={ColProps}
                    />
                    <MultipleFileUpload
                        name={"other-img"}
                        files={files}
                        types={["image/jpeg",
                            "image/png",
                            "image/jpg"]}
                        size={50}
                        fileUploadCount={3}
                        title={<IntlMessages id="otherImg" />}
                        formItemLayout={formItemLayout}
                        colLayout={ColProp2}
                        onChangeFile={onChangeAnyFile}
                    />
                    <MultipleFileVideoUpload
                        name={"videos"}
                        files={videos}
                        types={["video/mp4",
                            "video/webm",
                            "video/ogg"]}
                        size={500}
                        fileUploadCount={3}
                        title={<IntlMessages id="video" />}
                        formItemLayout={formItemLayout}
                        colLayout={ColProp2}
                        onChangeFile={onChangeAnyFileVideo}
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
