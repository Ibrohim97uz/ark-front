import React, { Component } from 'react';
import { Card, notification } from "antd/lib/index";
import {Button, Modal} from "antd";

import ApiRequest from "../../../../services";
import api from '../../../../services/app'
import Filter from './components/Filter'
import FormModal from './components/Modal'
import List from './components/List'
import IntlMessages, { intlMessages } from "../../../../util/IntlMessages";
import { Redirect } from "react-router-dom";
import {Icon} from "antd";
import {apiFileUrl} from "../../../../util/constants";

const { getClient,getClientFile, postClient, putClient, deleteClient, getService, getCountry, getClientFinish,searchClient} = api;

class Certificates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actionType: 'create',
            modalVisible: false,
            searchText:"",
          fileModal:null,
          columns: [
                {
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
                      record.attachment.contentType === "application/pdf"?
                          <button className="bg-transparent border-0 mx-2" onClick={()=>this.onDownloadFile(record.attachment.id)}><Icon type="eye" /></button>:
                          <button className="bg-transparent border-0 mx-2" onClick={()=>{this.setState({fileModal:{showModal:true,fileId:record.attachment.id,file:record.attachment}})}}><Icon type="eye" /></button>)

                },
                {
                    title: <IntlMessages id={'companyName'} />,
                    key: "companyName",
                    align: "center",
                    dataIndex: "companyName"
                },
                {
                    title: <IntlMessages id={'companyStir'} />,
                    key: "companyStir",
                    align: "center",
                    dataIndex: "companyStir"
                },
                {
                    title: <IntlMessages id={'trackingNumber'} />,
                    key: "trackingNumber",
                    align: "center",
                    dataIndex: "trackingNumber"
                },
                {
                    title: <IntlMessages id={'serviceType'} />,
                    key: "serviceType",
                    align: "center",
                    render: (text, record, index) => intlMessages({
                        en: record.serviceType && record.serviceType.titleEn,
                        ru: record.serviceType && record.serviceType.titleRu,
                        uz: record.serviceType && record.serviceType.titleUz
                    })
                },
                {
                    title: <IntlMessages id={'date'} />,
                    key: "date",
                    align: "center",
                    render: (text, record, index) => record.dateOfAgreement.substring(0, 10)
                },
                {
                    title: <IntlMessages id={'fromCountry'} />,
                    key: "fromCountry",
                    align: "center",
                    render: (text, record, index) => intlMessages({
                        en: record.fromCountry && record.fromCountry.nameEn,
                        ru: record.fromCountry && record.fromCountry.nameRu,
                        uz: record.fromCountry && record.fromCountry.nameUz
                    })
                },
                {
                    title: <IntlMessages id={'toCountry'} />,
                    key: "toCountry",
                    align: "toCountry",
                    render: (text, record, index) => intlMessages({
                        en: record.toCountry && record.toCountry.nameEn,
                        ru: record.toCountry && record.toCountry.nameRu,
                        uz: record.toCountry && record.toCountry.nameUz
                    })
                },
            ],
            currentItem: {},
            list: [],

            services: [],
            countries: [],
            pagination: {
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: total => `Total ${total} Items`,
                current: 1,
                total: 0,
                pageSize: 20,
            },
            file: null,
            addPoint: null
        }
    }

    componentDidMount() {
        this.getInit();
        this.getClients()
    }

  onDownloadFile=(fileId)=>{
    ApiRequest(getClientFile,{path:fileId}).then((result)=>{
      if (result.success){
        let a = document.createElement("a");
        a.href = result.object;
        document.body.appendChild(a);
        a.target = "_blank";
        a.click();
        document.body.removeChild(a);
      }
    })

  };

    getInit = () => {
        ApiRequest(getService).then((result) => {
            if (result.success) {
                this.setState({
                    services: result.object
                })
            }
        });
        ApiRequest(getCountry).then((result => {
            if (result.success) {
                this.setState((state, props) => ({
                    countries: result._embedded.list,
                }));

            }
        }))
    };

    getClients = (payload) => {
        ApiRequest(getClient, payload).then((result => {
            if (result.success) {
                this.setState((state,props)=>({
                    list: result.object,
                    pagination: {
                        ...state.pagination,
                        total: result.totalElements + '||' + result.object + '&&' + result.object.length,
                    }
                }))
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
                    file: null
                });
                notification.success({
                    key: message.key,
                    message: message.messageSuccess,
                    description: message.descriptionSuccess,
                });
                this.getClients()
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
            this.onRequestFunc(postClient, data, message)
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
            this.onRequestFunc(putClient, {
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
                uz: "Muvaffaqiyatli o'chirildi"
            }),
        };
        this.onRequestFunc(deleteClient, { id: dataItemId }, message)
    };

    onEditItem = (dataItem) => {
        this.setState({
            actionType: "update",
            currentItem: dataItem,
            file: dataItem.attachment ? {
                fileUrl: apiFileUrl + dataItem.attachment.id,
                file: dataItem.attachment,
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

        this.getClients({ page: page - 1 });
    };

    onShowSizeChange = (current, size) => {
        this.getClients({ page: current - 1, size: size });
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

    addPoint = (e) => {
        this.setState({
            addPoint: e
        })
    };

    onFinish = (dataItemId) => {
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
        this.onRequestFunc(getClientFinish, { path: dataItemId }, message)
    };

    onChangeSearch = (text) => {
        this.setState({
            searchText: text
        })
    };

    handleResetSearch = () => {
        this.getClients();
        this.setState({
            searchText: "",
        })
    };

    handleSubmitSearch = (text) => {
        ApiRequest(searchClient, { word: this.state.searchText }).then((result) => {
            if (result.success) {
                this.setState({
                    list: result.object,
                })
            }
        })
    };

    render() {
      if (this.state.addPoint !== null) {
            return <Redirect to={{
                pathname: `/main/client/${this.state.addPoint}`,
                state: { id: this.state.addPoint }
            }} />
        }

        const { currentItem, modalVisible, countries, services, file, searchText, columns, list, actionType, pagination } = this.state;
        return (
            <Card>
                <Filter onAdd={this.onAdd}
                        searchText={searchText}
                        handleResetSearch={this.handleResetSearch}
                        handleSubmitSearch={this.handleSubmitSearch}
                        onChangeSearch={this.onChangeSearch}
                />
                <List visibleColumns={columns}
                      dataSource={list}
                      onFinish={this.onFinish}
                      addPoint={this.addPoint}
                      onEditItem={this.onEditItem}
                      pagination={pagination.total >= 10 ? {
                          ...pagination,
                          onChange: this.onChange,
                          onShowSizeChange: this.onShowSizeChange
                      } : false}
                      onDeleteItem={this.onDelete} />
                <FormModal
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                    onChangeFile={this.onChangeFile}
                    file={file}
                    countries={countries}
                    modalVisible={modalVisible}
                    services={services}
                    actionType={actionType}
                    currentItem={actionType === 'create' ? {} : currentItem}
                />
              {this.state.fileModal && this.state.fileModal.showModal && (
                <Modal
                  footer={null}
                  width={800}
                  visible={this.state.fileModal.showModal}
                  onCancel={() => this.setState({fileModal:null})}
                >
                  <div>
                    <div style={{textAlign:'center'}}>
                   <span>
                      {
                        intlMessages({en:"Sorry, no view",ru:"Извините, нет просмотра",uz:"Kechirasiz, ko'rinish yo'q"})
                      }
                   </span>

                    </div>
                    <div  style={{textAlign:'center',marginTop:"25px"}}>
                      <Button type="primary"
                              className="margin-right btn-sm"
                              onClick={()=>this.onDownloadFile(this.state.fileModal.fileId)}
                              icon="cloud-download">
                        <IntlMessages id="download"/>
                      </Button>
                    </div>
                  </div>
                </Modal>
              )}
            </Card>
        );
    }
}

export default Certificates;
