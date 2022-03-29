import React, {Component} from 'react';
import {Button, Card, Icon, Modal, notification} from "antd";
import List from "./components/List";
import IntlMessages,{intlMessages} from "../../../../util/IntlMessages";
import ApiRequest from "../../../../services";
import api from '../../../../services/app'
const {getResume,deleteResume} = api;
class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: <strong>№</strong>,
          key: "№",
          width: 60,
          render: (text, record, index) => index + 1,
        },
        {
          title: <IntlMessages id={'fullName'}/>,
          key: "fullName",
          dataIndex: "fullName",
        },
        {
          title: <IntlMessages id={'email'}/>,
          key: "email",
          dataIndex: "email",
        },
        {
          title: <IntlMessages id={'phoneNumber'}/>,
          key: "phoneNumber",
          dataIndex: "phoneNumber",
        },
        {
          title: <IntlMessages id={'vacancy'}/>,
          key: 'vacancy',
          width: 100,
          render: (text, record, index) => (intlMessages({en:record.vacancy.titleEn,ru:record.vacancy.titleRu,uz:record.vacancy.titleUz})),
        },
        {
          title: <IntlMessages id={'file'}/>,
          key: 'file',
          align:"center",
          width: 100,
          render: (text, record, index) => (
            <React.Fragment>
              <button className="bg-transparent border-0 mx-2" onClick={()=>this.onDownloadFile(record.id,record.file.id)}><Icon type="cloud-download" /></button>
              {record.file.contentType === "application/pdf"?
                <button className="bg-transparent border-0 mx-2" onClick={()=>this.onDownloadFile(record.id,record.file.id)}>
                  {record.isStatus?<Icon type="eye" />:<Icon type="eye-invisible" />}
                </button>:
                <button className="bg-transparent border-0 mx-2" onClick={()=>{this.setState({fileModal:{showModal:true,currentData:record}})}}>
                  {record.isStatus?<Icon type="eye" />:<Icon type="eye-invisible" />}
                </button>
              }
            </React.Fragment>
          ),
        },
        {
          title: <IntlMessages id={'createAt'}/>,
          key: 'createdAt',
          align: "center",
          width: 100,
          render: (text, record, index) => {
            let date = new Date(record.createdAt);
            return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
          },
        },
      ],
      list: [],
      fileModal:null,
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
    this.getResume();
  }
  onDownloadFile=(id,fileId)=>{
    ApiRequest(`${getResume}/${id}/${fileId}`).then((result)=>{
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

  getResume = () => {
    ApiRequest(getResume).then((result)=>{
      if (result.success){
        this.setState((state, props) => ({
          list: result.object,
          pagination: {
            ...state.pagination,
            total: result.object.totalElements
          }
        }));
      }
    })
  };
  onRequestFunc = (path, data, message) => {
    ApiRequest(path, data).then((result => {
      if (result.success) {

        notification.success({
          key: message.key,
          message: message.messageSuccess,
          description: message.descriptionSuccess,
        });
        this.getResume()
      } else {
        notification.error({
          key: message.key,
          message: message.messageError,
          description: message.descriptionError,
        });
      }
    }))
  };

  onDelete = (dataItemId) => {
    let message = {
      key: "delete",
      messageError: intlMessages({en:"There was an error deleting",ru:"Произошла ошибка при удалении",uz:"O'chirishda xatolik yuz berdi"}),
      messageSuccess: intlMessages({en:"Successfully deleted",ru:"Успешно удален",uz:"Muvaffaqiyatli o'chirildi"}),
    };
    this.onRequestFunc(deleteResume, {id: dataItemId}, message)
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
              pagination={this.state.pagination.total >= 10 ? {
                ...this.state.pagination,
                onChange: this.onChange,
                onShowSizeChange: this.onShowSizeChange
              } : false}
              onDeleteItem={this.onDelete}/>
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
                        onClick={()=>this.onDownloadFile(this.state.fileModal.currentData.id,this.state.fileModal.currentData.file.id)}
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

export default Resume;
