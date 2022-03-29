import React, {Component} from 'react';
import {Card, Input, notification, Tag} from "antd";
import ApiRequest from "../../../../services";
import api from '../../../../services/app'
import Filter from './components/Filter'
import Modal from './components/Modal'
import List from './components/List'
import IntlMessages, {intlMessages} from "../../../../util/IntlMessages";
import {FileView} from "../../../../components/CustomComponents";
import {apiFileUrl} from "../../../../util/constants";

const {getStaff, postStaff, deleteStaff, postIsActiveStaff, getRegion, getDistrictByRegionId, getPositionType, putStaff, searchStaff} = api;

class Staffs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionType: 'create',
      modalVisible: false,
      isActive: true,
      searchText: "",
      columns: [{
        title: <strong>№</strong>,
        key: "№",
        align: "center",
        width: 60,
        render: (text, record, index) => index + 1,
      },
        {
          title: <IntlMessages id={'userinfo'}/>,
          children: [
            {
              title: <IntlMessages id={'attachment'}/>,
              key: "file",
              align: "center",
              width: 100,
              render: (text, record, index) => (
                <FileView fileId={record.attachment && record.attachment.id} defaultView={"user"}/>),
            },
            intlMessages({
              en: {
                title: "First name",
                dataIndex: 'firstNameEn',
                key: 'firstNameEn'
              }, ru: {
                title: "Имя",
                dataIndex: 'firstNameRu',
                key: 'firstNameRu'
              },
              uz: {
                title: "Ism",
                dataIndex: 'firstNameUz',
                key: 'firstNameUz'
              }
            }),
            intlMessages({
              en: {
                title: "Last name",
                dataIndex: 'lastNameEn',
                key: 'lastNameEn'
              }, ru: {
                title: "Фамилия",
                dataIndex: 'lastNameRu',
                key: 'lastNameRu'
              },
              uz: {
                title: "Familiya",
                dataIndex: 'lastNameUz',
                key: 'lastNameUz'
              }
            }),
            intlMessages({
              en: {
                title: "MiddleName",
                dataIndex: 'middleNameEn',
                key: 'middleNameEn'
              }, ru: {
                title: "Отчество",
                dataIndex: 'middleNameRu',
                key: 'middleNameRu'
              },
              uz: {
                title: "Otasining ismi",
                dataIndex: 'middleNameUz',
                key: 'middleNameUz'
              }
            })
          ]
        },
        {
          title: <IntlMessages id={'positionType'}/>,
          key: "positionType",
          align: "center",
          render: (text, record, index) => (record.positionType && intlMessages({
            en: record.positionType.nameEn,
            ru: record.positionType.nameRu,
            uz: record.positionType.nameUz
          })),
        },
        {
          title: <IntlMessages id={'communication'}/>,
          children: [
            {
              title: <IntlMessages id={'email'}/>,
              key: "email",
              align: "center",
              dataIndex: "email",
            },
            {
              title: <IntlMessages id={'telegram'}/>,
              key: "telegram",
              align: "center",
              dataIndex: "telegram",
            },
            {
              title: <IntlMessages id={'phoneNumber'}/>,
              key: "phoneNumber",
              align: "center",
              dataIndex: "phoneNumber",
            }
          ]
        },
        {
          title: <IntlMessages id={'address'}/>,
          children: [
            {
              title: <IntlMessages id={'region'}/>,
              key: "region",
              align: "center",
              render: (text, record, index) => (
                record.address && record.address.region && intlMessages({
                  en: record.address.region.nameEn,
                  ru: record.address.region.nameRu,
                  uz: record.address.region.nameUz
                })
              ),
            },
            {
              title: <IntlMessages id={'district'}/>,
              key: "district",
              align: "center",
              render: (text, record, index) => (
                record.address && record.address.district && intlMessages({
                  en: record.address.district.nameEn,
                  ru: record.address.district.nameRu,
                  uz: record.address.district.nameUz
                })
              ),
            },
            {
              title: <IntlMessages id={'streethome'}/>,
              key: "streetAndHome",
              align: "center",
              render: (text, record, index) => (
                record.address && record.address.streetAndHome
              ),
            },
            {
              title: <IntlMessages id="isActive"/>,
              dataIndex: 'isActive',
              key: 'isActive',
              align: "center",
              render: (text, record) => {
                return (
                  <div>
                    {record.isStatus === true ?
                      <Tag color="#87d068"><IntlMessages id="enabled"/></Tag>
                      :
                      <Tag color="#f50"><IntlMessages id="disabled"/></Tag>
                    }
                  </div>)
              }
            },
          ]
        },
      ],
      formItems: [
        {
          label: "Name",
          name: 'firstNameEn',
          rules: [
            {
              required: true,
              message: <IntlMessages id="E_ERROR"/>

            },
          ],
          locale: "en",
          obj: <Input placeholder="Enter name"/>
        },
        {
          label: "Surname",
          name: 'lastNameEn',
          rules: [
            {
              required: true,
              message: <IntlMessages id="E_ERROR"/>

            },
          ],
          locale: "en",
          obj: <Input placeholder="Enter last name"/>
        },
        {
          label: "Father's name",
          name: 'middleNameEn',
          rules: [
            {
              required: true,
              message: <IntlMessages id="E_ERROR"/>

            },
          ],
          locale: "en",
          obj: <Input placeholder="Enter father name"/>
        },
        {
          label: "Definition",
          name: 'definitionEn',
          rules: [
            {
              required: true,
              message: <IntlMessages id="E_ERROR"/>

            },
          ],
          locale: "en",
          obj: <Input placeholder="Enter last definition"/>
        },


        {
          label: "Имя",
          name: 'firstNameRu',
          locale: "ru",
          obj: <Input placeholder="Введите имя"/>
        },
        {
          label: "Фамилия",
          name: 'lastNameRu',
          locale: "ru",
          obj: <Input placeholder="Введите фамилия"/>
        },
        {
          label: "Отчество",
          name: 'middleNameRu',
          locale: "ru",
          obj: <Input placeholder="Введите отчество"/>
        },
        {
          label: "Описание",
          name: 'definitionRu',
          locale: "ru",
          obj: <Input placeholder="Введите описание"/>
        },

        {
          label: "Ism",
          name: 'firstNameUz',
          locale: "uz",
          obj: <Input placeholder="Ismingizni kiriting"/>
        },
        {
          label: "Familiya",
          name: 'lastNameUz',
          locale: "uz",
          obj: <Input placeholder="Familiyangizni kiriting"/>
        },
        {
          label: "Otasining ismi",
          name: 'middleNameUz',
          locale: "uz",
          obj: <Input placeholder="Otangizni ismini kiriting"/>
        },
        {
          label: "Ta'rif",
          name: 'definitionUz',
          locale: "uz",
          obj: <Input placeholder="Ta'rif kiriting"/>
        },

        {
          label: intlMessages({en: "Email", ru: "Эл.почта", uz: "Elektron pochta"}),
          name: 'email',
          locale: null,
          obj: <Input placeholder={intlMessages({
            en: "Enter email",
            ru: "Введите эл.почта",
            uz: "Emailni kiriting"
          })}/>
        },
        {
          label: intlMessages({en: "Telegram", ru: "Телеграмма", uz: "Telegram"}),
          name: 'telegram',
          locale: null,
          obj: <Input placeholder={intlMessages({
            en: "Enter telegram",
            ru: "Введите телеграмма",
            uz: "Telegram kiriting"
          })}/>
        },

        {
          label: intlMessages({en: "Phone number", ru: "Номер телефона", uz: "Telefon raqam"}),
          name: 'phoneNumber',
          locale: null,
          obj: <Input placeholder={intlMessages({
            en: "Enter phone",
            ru: "Введите телефон номер",
            uz: "Telefon raqamingizni kiriting"
          })}/>
        },
        {
          label: intlMessages({en: "Street And home", ru: "Улица и дом", uz: "Ko'cha va uy"}),
          name: 'streetAndHome',
          rules: [
            {
              required: true,
              message: <IntlMessages id="E_ERROR"/>

            },
          ],
          locale: null,
          obj: <Input placeholder={intlMessages({
            en: "Enter street and home number",
            ru: "Введите улица и дом",
            uz: "Ko'cha va uy raqamini kiriting"
          })}/>
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
      regions: [],
      districts: [],
      positionTypes: [],
      selectedFormLocale: {
        languageId: 'nameEn',
        locale: 'en',
        name: 'English',
        icon: 'us',
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
    ApiRequest(getStaff, payload).then((result => {
      if (result.success) {
        this.setState((state, props) => ({
          list: result.object.object,
          pagination: {
            ...state.pagination,
            total: result.object.object || result.object.object.length,
          }
        }));

      }
    }));
    this.getRegion();
    this.getPositionType();
  };

  getRegion = () => {
    ApiRequest(getRegion).then((result) => {
      if (result.success) {
        this.setState({
          regions: result.object
        })
      }
    })
  };

  getDistrictByRegionId = (id) => {
    ApiRequest(getDistrictByRegionId, {path: id}).then((result) => {
      if (result.success) {
        this.setState({
          districts: result.object
        })
      }
    })
  };

  getPositionType = () => {
    ApiRequest(getPositionType).then((result) => {
      if (result.success) {
        this.setState({
          positionTypes: result._embedded.list
        })
      }
    })
  };

  onRequestFunc = (path, data, message) => {
    ApiRequest(path, data).then((result => {
      if (result.success) {
        this.setState({
          actionType: 'create',
          modalVisible: false,
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
          en: "There was an error sending",
          ru: "Произошла ошибка отправки",
          uz: "Yaratishda xatolik yuz berdi"
        }),
        messageSuccess: intlMessages({
          en: "Successfully sended",
          ru: "Успешно отправлено",
          uz: "Muvaffaqiyatli yuborildi"
        }),
      };
      this.onRequestFunc(postStaff, data, message)
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
      this.onRequestFunc(putStaff, data, message)
    }
  };

  onCancel = () => {
    this.setState({
        modalVisible: false,
        actionType: 'create',
        file: null,
        districts: [],
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
    this.onRequestFunc(deleteStaff, {id: dataItemId}, message)
  };

  onEditItem = (dataItem) => {
    if (dataItem && dataItem.address && dataItem.address.region && dataItem.address.region.id) {
      this.getDistrictByRegionId();
    }
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

  onChangeSearch = (text) => {
    this.setState({
      searchText: text
    })
  };

  handleResetSearch = () => {
    this.onStartEvent(
      {
        page: 0,
        size: 20
      }
    );
    this.setState({
      searchText: "",
      isActive: true
    })
  };

  handleSubmitSearch = (text) => {
    ApiRequest(searchStaff, {word: this.state.searchText, isActive: this.state.isActive}).then((result) => {
      if (result.success) {
        this.setState({
          list: result.object,
        })
      }
    })
  };

  onActive = (e) => {
    ApiRequest(postIsActiveStaff, {isActive: e}).then((result) => {
      if (result.success) {
        this.setState((state, props) => ({
          list: result.object,
          isActive: !state.isActive
        }))
      } else {
        this.setState((state, props) => ({
          isActive: !state.isActive
        }))
      }
    });

  };

  render() {

    const {currentItem, modalVisible, isActive, columns, searchText, formItems, list, file, actionType, pagination, regions, districts, selectedFormLocale, positionTypes} = this.state;
    return (
      <Card>
        <Filter onAdd={this.onAdd}
                isActive={isActive}
                searchText={searchText}
                onActive={this.onActive}
                handleResetSearch={this.handleResetSearch}
                handleSubmitSearch={this.handleSubmitSearch}
                onChangeSearch={this.onChangeSearch}
        />
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
          onFormLocale={this.onFormLocale}
          getDistrictByRegionId={this.getDistrictByRegionId}
          modalVisible={modalVisible}
          regions={regions}
          districts={districts}
          positionTypes={positionTypes}
          selectedFormLocale={selectedFormLocale}
          formItems={formItems}
          actionType={actionType}
          file={file}
          onChangeFile={this.onChangeFile}
          currentItem={actionType === 'create' ? {} : currentItem}
        />
      </Card>
    );
  }
}


export default Staffs;
