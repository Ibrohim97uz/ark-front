import React, {Component} from 'react';
import ApiRequest from "../../../../services";
import api from '../../../../services/app'
import IntlMessages, {intlMessages} from "../../../../util/IntlMessages";
import {Card, Icon, notification, Tag} from "antd";
import List from "./components/List";
import {connect} from "react-redux";
import {updateState} from "../../../../redux/setting/action";


const {getSuggestionAndQuestion, deleteSuggestionAndQuestion,putSuggestionAndQuestion} = api;

class SuggestionAndQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            columns: [
                {
                    title: <strong>№</strong>,
                    key: "№",
                    width: 60,
                    align:"center",
                    render: (text, record, index) => index + 1,
                },
                {
                    title: <IntlMessages id={'isActive'}/>,
                    key: 'isStatus',
                    width: 100,
                    align:"center",
                    render: (text, record, index) =>(
                        <div>
                            {record.isStatus === true ?
                                <Tag color="#87d068"> <Icon type="eye" className="mb-2"/></Tag>
                                :
                                <Tag color="#f50"> <Icon type="eye-invisible" className="mb-2"/></Tag>
                            }
                        </div>)
                },
                {
                    title: <IntlMessages id={'fullName'}/>,
                    key: 'fullName',
                    dataIndex: 'fullName'
                },
                {
                    title: <IntlMessages id={'email'}/>,
                    key: 'email',
                    align:"center",
                    dataIndex: 'email'
                },
                {
                    title: <IntlMessages id={'text'}/>,
                    key: 'text',
                    align:"center",
                    dataIndex: 'text'
                },
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
            pagination: {
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: total => `Total ${total} Items`,
                current: 1,
                total: 0,
                pageSize: 20,
            },
        }
    }

    componentDidMount() {
        this.getSuggestionAndQuestion({
            page: 0,
            size: 20
        })
    }

    onRequestFunc = (path, data, message) => {
        ApiRequest(path, data).then((result => {
            if (result.success) {
                notification.success({
                    key: message.key,
                    message: message.messageSuccess,
                    description: message.descriptionSuccess,
                });
         /*       this.getSuggestionAndQuestion({
                    page: 0,
                    size: 20
                })*/
            } else {
                notification.error({
                    key: message.key,
                    message: message.messageError,
                    description: message.descriptionError,
                });
            }
        }))
    };

    getSuggestionAndQuestion = () => {
        ApiRequest(getSuggestionAndQuestion).then((result) => {
            if (result.success) {
              this.props.updateState({suggestionAndQuestion:result.object});
                this.setState((state, props) => ({
                    list: result.object,
                    pagination: {
                        ...state.pagination,
                        total: result.totalElements || result.object.length,
                    }
                }));
            }
        })
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
        this.onRequestFunc(deleteSuggestionAndQuestion, {id: dataItemId}, message)
      this.getSuggestionAndQuestion({
        page: 0,
        size: 20
      })
    };
    onExpand = (expanded, dataItem) => {
        if (expanded && !dataItem.isStatus) {
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
            this.onRequestFunc(putSuggestionAndQuestion, {path: dataItem.id}, message)
        }
        if (!expanded){
                   this.getSuggestionAndQuestion({
                page: this.state.pagination.current-1,
                size: 20
            })
        }
    };


    onChange = (page) => {
        this.setState((state, props) => ({
            pagination: {
                ...state.pagination,
                current:page
            }
        }));
        this.onStartEvent({page:page-1});
    };
    onShowSizeChange = (current, size) => {
        this.onStartEvent({page:current-1,size:size});
        this.setState((state, props) => ({
            pagination: {
                ...state.pagination,
                current:current,
                pageSize:size
            }
        }));
    };

    render() {
        return (
            <Card>
                <List visibleColumns={this.state.columns}
                      dataSource={this.state.list}
                      onExpand={this.onExpand}
                      pagination={this.state.pagination.total >= 10 ? {
                          ...this.state.pagination,
                          onChange: this.onChange,
                          onShowSizeChange: this.onShowSizeChange
                      } : false}
                      onDeleteItem={this.onDelete}/>
            </Card>
        );
    }
}

export default connect(null, {updateState})(SuggestionAndQuestion);

