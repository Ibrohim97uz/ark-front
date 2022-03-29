import React, {Component} from 'react';
import {Card, Input, notification, Tag} from "antd";
import ApiRequest from "../../../../services";
import api from '../../../../services/app'
import Filter from './components/Filter'
import Modal from './components/Modal'
import List from './components/List'
import IntlMessages, {intlMessages} from "../../../../util/IntlMessages";
import {MaskedInput} from "antd-mask-input";
import {FileView} from "../../../../components/CustomComponents";
import {apiFileUrl} from "../../../../util/constants";

const {getModerator, postModerator, putModerator, deleteModerator} = api;

class Moderators extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actionType: 'create',
            modalVisible: false,
            formItems: [
                {
                    label: <IntlMessages id="firstName"/>,
                    name: 'firstName',
                    rules: [
                        {
                            required: true,
                            message: <IntlMessages id="E_ERROR"/>
                        },
                    ],
                    obj: <Input placeholder={intlMessages({
                      en: "Enter name",
                      ru: "Введите имя",
                      uz: "Ismingizni kiriting"
                    })}/>
                },
                {
                    label: <IntlMessages id="lastName"/>,
                    name: 'lastName',
                    rules: [
                        {
                            required: true,
                            message: <IntlMessages id="E_ERROR"/>
                        },
                    ],
                    obj: <Input placeholder={intlMessages({
                      en: "Enter last name",
                      ru: "Введите фамилия",
                      uz: "Familiyangizni kiriting"
                    })}/>
                },
                {
                    label: <IntlMessages id="phoneNumber"/>,
                    name: 'phoneNumber',
                    rules: [
                        {
                            required: true,
                            message: <IntlMessages id="E_ERROR"/>
                        },
                    ],
                    obj:
                        (<MaskedInput mask="+998111111111" name={'phoneNumber'}/>)
                },
            ],
            columns: [{
                title: <strong>№</strong>,
                key: "№",
                align: "center",
                width: 60,
                render: (text, record, index) => index + 1,
            },
                {
                    title: <IntlMessages id={'attachment'}/>,
                    key: "file",
                    align: "center",
                    width: 100,
                    render: (text, record, index) => (
                        <FileView fileId={record.photo && record.photo.id} defaultView={"user"}/>),
                },
                {
                    title: <IntlMessages id="lastName"/>,
                    dataIndex: 'lastName',
                    key: 'lastName',
                },
                {
                    title: <IntlMessages id="firstName"/>,
                    dataIndex: 'firstName',
                    key: 'firstName',
                },
                {
                    title: <IntlMessages id="phoneNumber"/>,
                    dataIndex: 'phoneNumber',
                    align: "center",
                    key: 'phoneNumber',
                },
                {
                    title: <IntlMessages id="status"/>,
                    dataIndex: 'enabled',
                    align: "center",
                    key: 'enabled',
                    render: (text, record) => {
                        return (
                            <div>{record.enabled === true ? <Tag color="#87d068"><IntlMessages id="enabled"/></Tag> :
                                <Tag color="#f50"><IntlMessages id="disabled"/></Tag>}</div>)
                    }
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
            file: null

        }
    }

    componentDidMount() {
        this.onStartEvent(
            {
                page: 0,
                size: 20
            }
        )
    }

    onStartEvent = (payload) => {
        ApiRequest(getModerator, payload).then((result => {
            if (result.success) {
                this.setState((state, props) => ({
                    list: result.object,
                    pagination: {
                        ...state.pagination,
                        total: result.totalElements || result.object.length,
                    }
                }));

            }
        }))
    };


    onRequestFunc = (path, data, message) => {
        ApiRequest(path, data).then((result => {
            if (result.success) {
                this.setState({
                    actionType: 'create',
                    currentItem: {},
                    modalVisible: false
                });
                this.onCancel();
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
        }))
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
            this.onRequestFunc(postModerator, data, message)
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
            this.onRequestFunc(putModerator, data, message)
        }
    };
    onCancel = () => {
        this.setState({modalVisible: false, actionType: 'create', file: null})
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
        this.onRequestFunc(deleteModerator, {id: dataItemId}, message)
    };
    onEditItem = (dataItem) => {
        this.setState({
            actionType: "update",
            currentItem: dataItem,
            file: dataItem.photo ? {
                fileUrl: apiFileUrl + dataItem.photo.id,
                file: dataItem.photo,
                fileStatus: "create"
            } : null,

            modalVisible: true,
        })
    };

    onChange = (page) => {
        this.setState((state, props) => ({
            pagination: {
                ...state.pagination,
                current: page
            }
        }));
        this.onStartEvent({page: page - 1});
    };
    onShowSizeChange = (current, size) => {
        this.onStartEvent({page: current - 1, size: size});
        this.setState((state, props) => ({
            pagination: {
                ...state.pagination,
                current: current,
                pageSize: size
            }
        }));
    };

    onChangeFile = (file) => {
        this.setState({
            file: file
        })
    };

    render() {
        const {currentItem, modalVisible, file, columns, formItems, list, actionType, pagination} = this.state;
        return (
            <Card>
                <Filter onAdd={this.onAdd}/>
                <List visibleColumns={columns}
                      dataSource={list}
                      onEditItem={this.onEditItem}
                      pagination={pagination.total >= 10 ? {
                          ...pagination,
                          onChange: this.onChange,
                          onShowSizeChange: this.onShowSizeChange
                      } : false}
                      onDeleteItem={this.onDelete}/>
                <Modal
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                    modalVisible={modalVisible}
                    onChangeFile={this.onChangeFile}
                    file={file}
                    actionType={actionType}
                    currentItem={actionType === 'create' ? {} : currentItem}
                    formItems={formItems}
                />
            </Card>
        );
    }
}


export default Moderators;
