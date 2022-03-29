import React, {Component} from 'react';
import {Card, notification} from "antd";
import ApiRequest from "../../../../../services";
import api from '../../../../../services/app'
import Filter from './components/Filter'
import Modal from './components/Modal'
import List from './components/List'
import IntlMessages, {intlMessages} from "../../../../../util/IntlMessages";
import { connect } from "react-redux";
import { onAuthUser } from "../../../../../redux/auth/action";

const {getClientPoint, postClientPoint,getCountry} = api;

class Region extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionType: 'create',
      align: "center",
      modalVisible: false,
      columns: [{
        title: <strong>№</strong>,
        key: "№",
        width: 60,
        render: (text, record, index) => index + 1,
      },
        {
          title: <IntlMessages id={'date'} />,
          key: "date",
          align: "center",
          render: (text, record, index) => record.date.substring(0,10)
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
        }
      ],
      currentItem: {},
      countries: [],
      list: [],
    }
  }

  componentDidMount() {
    this.getInit()
  }

  getInit = () => {
    if (this.props.location.state.id){
      this.getPoints()
    }

    ApiRequest(getCountry).then((result => {
      if (result.success) {
        this.setState((state, props) => ({
          countries: result._embedded.list,
        }));
      }
    }))
  };

  getPoints(){
    ApiRequest(getClientPoint,{clientId:this.props.location.state.id}).then((result => {
      if (result.success) {
        this.setState((state, props) => ({
          list: result.object.points,
        }));
      }
    }))
  }

  onRequestFunc = (path, data, message) => {
    ApiRequest(path, data).then((result => {
      if (result.success) {
        this.getPoints();
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
    data['clientId']=this.props.location.state.id;
    if (this.state.actionType === "create") {
      message = {
        key: "create",
        messageError: intlMessages({en:"There was an error creating",ru:"Произошла ошибка при создании",uz:"Yaratishda xatolik yuz berdi"}),
        messageSuccess: intlMessages({en:"Successfully created",ru:"Успешно создан",uz:"Muvaffaqqiyatli yaratildi"}),
      };
      this.onRequestFunc(postClientPoint, data, message)
    }
    if (this.state.actionType === "update") {
      message = {
        key: "update",
        messageError: intlMessages({en:"There was an error updating",ru:"Произошла ошибка при изменение",uz:"Tahrirlashda xatolik yuz berdi"}),
        messageSuccess: intlMessages({en:"Successfully updated",ru:"Успешно изменено",uz:"Muvaffaqqiyatli tahrirlandi"}),
      };
      this.onRequestFunc(postClientPoint, data, message)
    }
  };
  onCancel = () => {
    this.setState({modalVisible: false, actionType: 'create'})
  };
  onAdd = () => {
    this.setState({modalVisible: true, actionType: 'create'})
  };
  onEditItem = (dataItem) => {
    this.setState({
      actionType: "update",
      currentItem: dataItem,
      modalVisible: true,
    })
  };




  render() {

    const {currentItem, modalVisible, columns, countries, list, actionType} = this.state;
    return (
      <Card>
        <Filter
            onAdd={this.onAdd}

        />
        <List visibleColumns={columns}
              dataSource={list}
              onEditItem={this.onEditItem}
              pagination={list && list.length>20}
             />
        <Modal
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          countries={countries}
          actionType={actionType}
          modalVisible={modalVisible}
          currentItem={actionType === 'create' ? {} : currentItem}
        />
      </Card>
    );
  }
}



const mapStateToProps = ({routing}) => {
  return routing.location;
};

export default connect(mapStateToProps, {onAuthUser})(Region);
