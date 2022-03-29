import React, {Component} from 'react';
import {Card, Input, notification} from "antd";
import ApiRequest from "../../../../../services";
import api from '../../../../../services/app'
import Filter from './components/Filter'
import Modal from './components/Modal'
import List from './components/List'
import IntlMessages, {intlMessages} from "../../../../../util/IntlMessages";

const {getDistrict, postDistrict, deleteDistrict,getRegionList,searchDistrict} = api;

class District extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionType: 'create',
      modalVisible: false,
      searchText:"",
      columns: [{
        title: <strong>№</strong>,
        key: "№",
        width: 60,
        align: "center",
        render: (text, record, index) => index + 1,
      },
        (intlMessages({
          en: {
            title: "District",
            dataIndex: 'nameEn',
            key: 'nameEn'
          }, ru: {
            title: "Район",
            dataIndex: 'nameRu',
            key: 'nameRu'
          },
          uz: {
            title: "Tumanlar",
            dataIndex: 'nameUz',
            key: 'nameUz'
          }
        }))

      ],
      formItems: [
        {
          label: "English",
          name: 'nameEn',
          rules: [
            {
              required: true,
              message: <IntlMessages id="E_ERROR"/>

            },
          ],
          obj: <Input/>
        },
        {
          label: "Русский",
          name: 'nameRu',
          rules: [
            {
              required: true,
              message: <IntlMessages id="E_ERROR"/>

            },
          ],
          obj: <Input/>
        },

        {
          label: "O'zbek",
          name: 'nameUz',
          rules: [
            {
              required: true,
              message: <IntlMessages id="E_ERROR"/>
            },
          ],
          obj: <Input/>
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
      regions:[]

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
    ApiRequest(getDistrict, payload).then((result => {
      if (result.success) {
        this.setState((state, props) => ({
          list: result.object,
          pagination: {
            ...state.pagination,
            total: result.totalElements || result.object.length,
          }
        }));

      }
    }));
    this.getRegion();
  };
  getRegion=()=>{
    ApiRequest(getRegionList).then((result)=>{
     if (result.success){
       this.setState({
         regions:result.object
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
          currentItem: {},
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


  onSubmit = (data) => {
    let message = {};
    if (this.state.actionType === "create") {
      message = {
        key: "create",

        messageError: intlMessages({en:"There was an error creating",ru:"Произошла ошибка при создании",uz:"Yaratishda xatolik yuz berdi"}),
        messageSuccess: intlMessages({en:"Successfully created",ru:"Успешно создан",uz:"Muvaffaqqiyatli yaratildi"}),
      };
      this.onRequestFunc(postDistrict, data, message)
    }
    if (this.state.actionType === "update") {
      message = {
        key: "update",

        messageError: intlMessages({en:"There was an error updating",ru:"Произошла ошибка при изменение",uz:"Tahrirlashda xatolik yuz berdi"}),
        messageSuccess: intlMessages({en:"Successfully updated",ru:"Успешно изменено",uz:"Muvaffaqqiyatli tahrirlandi"}),
      };
      this.onRequestFunc(postDistrict, data, message)
    }
  };
  onCancel = () => {
    this.setState({modalVisible: false, actionType: 'create'})
  };
  onAdd = () => {
    this.setState({modalVisible: true, actionType: 'create'})
  };
  onDelete = (dataItemId) => {
    let message = {
      key: "delete",

      messageError: intlMessages({en:"There was an error deleting",ru:"Произошла ошибка при удалении",uz:"O'chirishda xatolik yuz berdi"}),
      messageSuccess: intlMessages({en:"Successfully deleted",ru:"Успешно удален",uz:"Muvaffaqiyatli o'chirildi"}),
    };
    this.onRequestFunc(deleteDistrict, {id: dataItemId}, message)
  };
  onEditItem = (dataItem) => {
    this.setState({
      actionType: "update",
      currentItem: dataItem,
      modalVisible: true,
    })
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
    })
  };

  handleSubmitSearch = () => {
    ApiRequest(searchDistrict, {word: this.state.searchText}).then((result) => {
      if (result.success) {
        this.setState({
          list: result.object,
        })
      }
    })
  };

  render() {
    const {currentItem, modalVisible,searchText, columns, formItems, list, actionType, pagination,regions} = this.state;

    return (
      <Card>
        <Filter
            searchText={searchText}
            handleResetSearch={this.handleResetSearch}
            handleSubmitSearch={this.handleSubmitSearch}
            onChangeSearch={this.onChangeSearch}
            onAdd={this.onAdd}/>
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
          regions={regions}
          actionType={actionType}
          modalVisible={modalVisible}
          currentItem={actionType === 'create' ? {} : currentItem}
          formItems={formItems}
        />
      </Card>
    );
  }
}




export default District;
