import React, { Component } from 'react';
import { Card, Input, notification, Tag } from "antd/lib/index";
import { EditorState, ContentState, convertFromHTML } from 'draft-js'

import ApiRequest from "../../../../services";
import api from '../../../../services/app'
import Filter from './components/Filter'
import Modal from './components/Modal'
import List from './components/List'
import IntlMessages, { intlMessages } from "../../../../util/IntlMessages";
import { FileView } from "../../../../components/CustomComponents";
import {apiFileUrl} from "../../../../util/constants";

const { getService, postService, putService, deleteService } = api;

class Certificates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actionType: 'create',
            modalVisible: false,
            columns: [{
                title: <strong>№</strong>,
                key: "№",
                align: "center",
                width: 60,
                render: (text, record, index) => index + 1,
            },
                {
                    title: <IntlMessages id={'attachment'} />,
                    key: "file",
                    align: "center",
                    width: 100,
                    render: (text, record, index) => (
                        <FileView fileId={record.mainAttachment && record.mainAttachment.id} defaultView={"picture"} />)

                },
                (intlMessages({
                    en: {
                        title: "Title",
                        dataIndex: 'titleEn',
                        align: "center",
                        key: 'titleEn',
                        width: 200,
                    }, ru: {
                        title: "Название",
                        dataIndex: 'titleRu',
                        align: "center",
                        key: 'titleRu',
                        width: 200,
                    },
                    uz: {
                        title: "Sarlavha",
                        dataIndex: 'titleUz',
                        align: "center",
                        key: 'titleUz',
                        width: 200,
                    }
                })),
                {
                    title: (intlMessages({ en: "Description", ru: "Описание", uz: "Ta'rif" })),
                    key: "text",
                    render: (text, record, index) => (<div className={'text-block-table'} dangerouslySetInnerHTML={{
                        __html: (intlMessages({
                            en: record.textEn,
                            ru: record.textRu,
                            uz: record.textUz
                        }))
                    }} />),
                },
                {
                    title: <IntlMessages id="isActive" />,
                    dataIndex: 'isActive',
                    align: "center",
                    key: 'isActive',
                    render: (text, record) => {
                        return (
                            <div>{record.isStatus === true ? <Tag color="#87d068"><IntlMessages id="enabled" /></Tag> :
                                <Tag color="#f50"><IntlMessages id="disabled" /></Tag>}</div>)
                    }
                },

            ],
            formItems: [
                {
                    label: "Title",
                    name: 'titleEn',
                    rules: [
                        {
                            required: true,
                            message: <IntlMessages id="E_ERROR" />

                        },
                    ],
                    locale: "en",
                    obj: <Input />
                },
                {
                    label: "Название",
                    name: 'titleRu',
                    locale: "ru",
                    obj: <Input />
                },
                {
                    label: "Sarlavha",
                    name: 'titleUz',
                    locale: "uz",
                    obj: <Input />
                },
            ],
            currentItem: {},
            list: [],
            pagination: {
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: total => `Total ${total} Items`,
                current: 1,
                total: 0,
                pageSize: 20,
            },
            selectedFormLocale: {
                languageId: 'nameEn',
                locale: 'en',
                name: 'English',
                icon: 'us',
            },
            file: null,
            files: [],
            videos: [],
            text: {
                en: "",
                ru: "",
                uz: "",
            }
        }
    }

    componentDidMount() {
        this.onStartEvent()
    }

    onStartEvent = (payload) => {
        ApiRequest(getService).then((result => {
            if (result.success) {
                this.setState((state, props) => ({
                    list: result.object,
                    pagination: {
                        ...state.pagination,
                        total: result.object.totalElements
                    }
                }));

            }
        }));
    };


    onRequestFunc = (path, data, message) => {
        ApiRequest(path, data).then((result => {
            if (result.success) {
                this.setState({
                    actionType: 'create',
                    modalVisible: false,
                    currentItem: {},
                    text: {
                        en: "",
                        ru: "",
                        uz: "",
                    },
                    file: null
                });
                notification.success({
                    key: message.key,
                    message: message.messageSuccess,
                    description: message.descriptionSuccess,
                });
                this.onCancel();
                this.onStartEvent();
            } else {
                notification.error({
                    key: message.key,
                    message: message.messageError,
                    description: message.descriptionError,
                });
            }
        }))
    };
    onFormLocale = (dataItem) => {
        return this.setState({
            selectedFormLocale: dataItem
        })
    };
    onSubmit = (data) => {
        let message = {};
        if (this.state.actionType === "create") {
            message = {
                key: "create",
                messageError: intlMessages({
                    en: "There was an error creating",
                    ru: "Произошла ошибка при создании",
                    uz: "Yaratishda xatolik yuz berdi"
                }),
                messageSuccess: intlMessages({
                    en: "Successfully created",
                    ru: "Успешно создан",
                    uz: "Muvaffaqqiyatli yaratildi"
                }),
            };

            this.onRequestFunc(postService, data, message)
        }
        if (this.state.actionType === "update") {
            message = {
                key: "update",
                messageError: intlMessages({
                    en: "There was an error updating",
                    ru: "Произошла ошибка при изменение",
                    uz: "Tahrirlashda xatolik yuz berdi"
                }),
                messageSuccess: intlMessages({
                    en: "Successfully updated",
                    ru: "Успешно изменено",
                    uz: "Muvaffaqqiyatli tahrirlandi"
                }),
            };
            this.onRequestFunc(putService, {
                id: this.state.currentItem.id, ...data
            }, message)
        }
    };
    onCancel = () => {
        this.setState({
                modalVisible: false,
                actionType: 'create',
                videos: [],
                files: [],
                file: null,
                text: {
                    en: "",
                    ru: "",
                    uz: "",
                },
                selectedFormLocale: {
                    languageId: 'nameEn',
                    locale: 'en',
                    name: 'English',
                    icon: 'us',
                }
            }
        )
    };
    onAdd = () => {
        this.setState({ modalVisible: true, actionType: 'create' })
    };
    onDelete = (dataItemId) => {
        let message = {
            key: "delete",
            messageError: intlMessages({
                en: "There was an error deleting",
                ru: "Произошла ошибка при удалении",
                uz: "O'chirishda xatolik yuz berdi"
            }),
            messageSuccess: intlMessages({
                en: "Successfully deleted",
                ru: "Успешно удален",
                uz: "Muvaffaqqiyatli o'chirildi"
            }),
        };
        this.onRequestFunc(deleteService, { id: dataItemId }, message)
    };
    onChangeFile = (file) => {
        this.setState({
            file: file
        })
    };
    onChangeAnyFile = (files) => {
        this.setState({
            files: files
        })
    };
    onChangeAnyFileVideo = (files) => {
        this.setState({
            videos: files
        })
    };
    onEditItem = (dataItem) => {
        let files = [];
        let videos = [];
        if (dataItem['otherAttachmentList'].length !== 0) {
            dataItem['otherAttachmentList'].map((item) => {
                return files.push({
                    fileUrl: apiFileUrl + item.id,
                    file: item,
                    fileStatus: "create"
                })
            })
        }
        if (dataItem['videos'].length !== 0) {
            dataItem['videos'].map((item) => {
                return videos.push({
                    fileUrl: apiFileUrl + item.id,
                    file: item,
                    fileStatus: "create"
                })
            })
        }
        this.setState({
            actionType: "update",
            text: {
                en: EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(dataItem.textEn)
                    )
                )
                ,
                ru: EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(dataItem.textRu)
                    )
                ),
                uz: EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(dataItem.textUz)
                    )
                ),
            },
            currentItem: dataItem,
            files: files,
            videos: videos,
            file: dataItem.mainAttachment ? {
                fileUrl: apiFileUrl + dataItem.mainAttachment.id,
                file: dataItem.mainAttachment,
                fileStatus: "create"
            } : null,
            modalVisible: true,
        })
    };
    onTextChange = (e) => {
        let { text, selectedFormLocale } = this.state;
        text[selectedFormLocale['locale']] = e;
        this.setState({
            text: text
        })
    };

    render() {
        const { currentItem, modalVisible, text, file, files, videos, columns, formItems, list, actionType, pagination, selectedFormLocale } = this.state;
       return (
            <Card>
                <Filter onAdd={this.onAdd} />
                <List visibleColumns={columns}
                      dataSource={list}
                      onEditItem={this.onEditItem}
                      pagination={pagination.total >= 10 ? {
                          ...pagination,
                      } : false}
                      onDeleteItem={this.onDelete} />
                <Modal
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                    onChangeFile={this.onChangeFile}
                    onChangeAnyFile={this.onChangeAnyFile}
                    onChangeAnyFileVideo={this.onChangeAnyFileVideo}
                    onFormLocale={this.onFormLocale}
                    onTextChange={this.onTextChange}
                    file={file}
                    files={files}
                    videos={videos}
                    text={text}
                    modalVisible={modalVisible}
                    selectedFormLocale={selectedFormLocale}
                    formItems={formItems}
                    actionType={actionType}
                    currentItem={actionType === 'create' ? {} : currentItem}
                />
            </Card>
        );
    }
}


export default Certificates;
