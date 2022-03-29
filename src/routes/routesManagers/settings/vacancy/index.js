import React, {Component} from 'react';
import {Card, Input, notification} from "antd/lib/index";
import ApiRequest from "../../../../services";
import api from '../../../../services/app'
import Filter from './components/Filter'
import Modal from './components/Modal'
import List from './components/List'
import IntlMessages, {intlMessages} from "../../../../util/IntlMessages";
import {FileView} from "../../../../components/CustomComponents";
import {apiFileUrl} from "../../../../util/constants";

const {getVacancy, postVacancy, putVacancy, deleteVacancy, putVacancyView} = api;
const {TextArea} = Input;

class Vacancy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actionType: 'create',
            modalVisible: false,
            columns: [{
                title: <strong>№</strong>,
                key: "№",
                align:"center",
                width: 60,
                render: (text, record, index) => index + 1,
            },
                // {
                //     title: <IntlMessages id={'attachment'}/>,
                //     key: "file",
                //     align: "center",
                //     width: 100,
                //     render: (text, record, index) => (
                //         <FileView fileId={record.attachment && record.attachment.id} defaultView={"picture"}/>),
                // },
                (intlMessages({
                    en: {
                        title: "Title",
                        dataIndex: 'titleEn',
                        align: "center",
                        key: 'titleEn'
                    }, ru: {
                        title: "Название",
                        dataIndex: 'titleRu',
                        align: "center",
                        key: 'titleRu'
                    },
                    uz: {
                        title: "Sarlavha",
                        dataIndex: 'titleUz',
                        align: "center",
                        key: 'titleUz'
                    }
                })),
                (intlMessages({
                    en: {
                        title: "Description",
                        dataIndex: 'descriptionEn',
                        key: 'descriptionEn'
                    }, ru: {
                        title: "Описание",
                        dataIndex: 'descriptionRu',
                        key: 'descriptionRu'
                    },
                    uz: {
                        title: "Ta'rif",
                        dataIndex: 'descriptionUz',
                        key: 'descriptionUz'
                    }
                })),
                {
                    title: <IntlMessages id={'createAt'}/>,
                    key: 'createdAt',
                    align:"center",
                    width: 100,
                    render: (text, record, index) => {
                        let date = new Date(record.createdAt);
                        return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
                    },
                }

            ],
            formItems: [
                {
                    label: "Title",
                    name: 'titleEn',
                    rules: [
                        {
                            required: true,
                            message: <IntlMessages id="E_ERROR"/>

                        },
                    ],
                    locale: "en",
                    obj: <Input/>
                },
                {
                    label: "Description",
                    name: 'descriptionEn',
                    rules: [
                        {
                            required: true,
                            message: <IntlMessages id="E_ERROR"/>

                        },
                    ],
                    locale: "en",
                    obj: <TextArea rows={4} autoSize allowClear/>
                },
                {
                    label: "Название",
                    name: 'titleRu',
                    locale: "ru",
                    obj: <Input/>
                },
                {
                    label: "Описание",
                    name: 'descriptionRu',
                    locale: "ru",
                    obj: <TextArea rows={4} autoSize allowClear/>
                },
                {
                    label: "Sarlavha",
                    name: 'titleUz',
                    locale: "uz",
                    obj: <Input/>
                },
                {
                    label: "Ta'rif",
                    name: 'descriptionUz',
                    locale: "uz",
                    obj: <TextArea rows={4} autoSize allowClear/>
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
            tableLoading:false
        }
    }

    componentDidMount() {
        this.onStartEvent()
    }

    onStartEvent = (payload) => {
        ApiRequest(getVacancy, payload).then((result => {
            if (result.success) {
                this.setState({
                    list: result.object,
                })
            }
        }));
    };
    onRequestFunc = (path, data, message) => {
        this.setState({
          tableLoading:true
        })
        ApiRequest(path, data).then((result => {
            if (result.success) {
                this.setState({
                    actionType: 'create',
                    modalVisible: false,
                    currentItem: {},
                    file: null
                });
                notification.success({
                    key: message.key,
                    message: message.messageSuccess,
                    description: message.descriptionSuccess,
                });
                this.onStartEvent()
            } else {
                notification.error({
                    key: message.key,
                    message: message.messageError,
                    description: message.descriptionError,
                });
            }
        })).finally(()=>{
          this.setState({
            tableLoading:false
          })
        })
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
            this.onRequestFunc(postVacancy, data, message)
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
            this.onRequestFunc(putVacancy, {
                id: this.state.currentItem.id, ...data
            }, message)
        }
    };
    onCancel = () => {
        this.setState({
                modalVisible: false,
                actionType: 'create',
                file: null,
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
        this.setState({modalVisible: true, actionType: 'create'})
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
                uz: "Muvaffaqiyatli o'chirildi"
            }),
        };
        this.onRequestFunc(deleteVacancy, {id: dataItemId}, message)
    };
    onUpdateView = (dataItemId) => {
        let message = {
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
        this.onRequestFunc(putVacancyView, {path: dataItemId}, message)
    };
    onEditItem = (dataItem) => {
        this.setState({
            actionType: "update",
            currentItem: dataItem,
            file: dataItem.attachment ? {
                fileUrl: apiFileUrl + dataItem.attachment.id,
                file: dataItem.attachment
            } : null,
            modalVisible: true,
        })
    };
    onChangeFile = (file) => {
        this.setState({
            file: file
        })
    };

    render() {
        const {currentItem, modalVisible, file, columns, formItems, list, actionType, pagination, selectedFormLocale,tableLoading} = this.state;
        return (
            <Card>
                <Filter onAdd={this.onAdd}/>
                <List
                  visibleColumns={columns}
                      dataSource={list}
                      loading={tableLoading}
                      onUpdateView={this.onUpdateView}
                      onEditItem={this.onEditItem}
                      pagination={pagination.total >= 10 ? {
                          ...pagination,
                      } : false}
                      onDeleteItem={this.onDelete}/>
                <Modal
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                    onChangeFile={this.onChangeFile}
                    onFormLocale={this.onFormLocale}
                    file={file}
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


export default Vacancy;
