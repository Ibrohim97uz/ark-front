import React, {Component} from 'react';
import {Link} from "react-router-dom";
import trackingImg from '../../../assets/images/ark-client/images/tracking.webp'
import IntlMessages, {intlMessages} from "../../../util/IntlMessages";
import ApiRequest from "../../../services";
import api from '../../../services/app'
import { Col, Icon, Modal, Row } from "antd";
import {Steps} from 'antd';

const {Step} = Steps;
const {getClientPoint} = api;

class Tracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {},
      isValid: false,
      trackingNumber: "",
      showModal: false,
      hasTrackingNumber: false
    }
  }

  onChange = (e) => {
    let isValid = false;
    if (e === "") {
      isValid = true
    }
    this.setState({
      trackingNumber: e,
      isValid: isValid
    })
  };

  onSubmit = () => {
    if (this.state.trackingNumber === "") {
      this.setState({
        isValid: true
      })
    } else {
      ApiRequest(getClientPoint, {trackingNumber: this.state.trackingNumber}).then((result => {
        if (result.success) {
          this.setState((state, props) => ({
            client: result.object,
            showModal: true,
            hasTrackingNumber: true
          }));
        } else {
          this.setState((state, props) => ({
            showModal: true,
            hasTrackingNumber: false
          }));
        }
      }))
    }
  };
  getPointList = () => {
    const {client} = this.state;
    if (client && client.points && client.points.length !== 0) {
      return this.state.client.points.map((item, index) => (
          <ul key={item.id}>
            <li className="d-inline-block font-weight-bold mx-3">{index + 1}</li>
            <li className="d-inline-block mx-3">{item.date.substring(0, 10)}</li>
            <li className="d-inline-block mx-3">{item.fromCountry && intlMessages({
              en: item.fromCountry.nameEn,
              ru: item.fromCountry.nameRu,
              uz: item.fromCountry.nameUz
            })}</li>
            <li className="d-inline-block mx-3">{item.toCountry && intlMessages({
              en: item.toCountry.nameEn,
              ru: item.toCountry.nameRu,
              uz: item.toCountry.nameUz
            })}</li>
          </ul>
        )
      )
    }
  };

  getAction() {
    let action = 0;
    if (this.state.client) {
      if (this.state.client.actionStatus === null) {
        action = 0
      }
      if (this.state.client.actionStatus === "READYTODELEVER") {
        action = 1
      }
      if (this.state.client.actionStatus === "ONROAD") {
        action = 2
      }
      if (this.state.client.actionStatus === "FINISH") {
        action = 3
      }
    }
    return action
  }

  render() {
    const {client} = this.state;
    return (
      <React.Fragment>
        <div className=" slz-title-command slz-title-command-tracking page-title-area ">
          <div className="container">
            <div className="title-command-wrapper">
              <h1 className="title"><IntlMessages id={'tracking'}/></h1>
              <div className="breadcrumb-wrapper">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link className="breadcrumb-link" to={'/home'}>
                      <IntlMessages id={'home'}/>
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link className="breadcrumb-active" to={'/tracking'}>
                      <IntlMessages id={'tracking'}/>
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="slz-woocommerce-setting" data-show="4"/>
        <div className="slz-main-content ">
          <div className="container">
            <div className="slz-blog-detail slz-posts ">
              <div className="row">
                <div className="tracking">
                  <div className="tracking-block" style={{height: "100px"}}>
                    <div className="container">
                      <div className="container__item">
                        <form className="form">
                          <div className="d-inline-block">
                            <input type="email" onChange={(e) => this.onChange(e.target.value)} className="form__field"
                                   placeholder={intlMessages({
                                     en: "Please, enter your tracking number",
                                     ru: "Пожалуйста, введите номер для отслеживания",
                                     uz: "Iltimos, kuzatuv raqamingizni kiriting"
                                   })}/>
                            <div className={this.state.isValid ? "input-error-msg text-danger" : "input-error-msg hide"}
                                 id="email-err-required">
                              {intlMessages({
                                en: "Please enter your tracking number",
                                ru: "Пожалуйста, введите ваш номер для отслеживания",
                                uz: "Iltimos, kuzatuv raqamingizni kiriting"
                              })}
                            </div>
                          </div>
                          <button type="button" className="btn btn--primary btn--inside uppercase"
                                  onClick={this.onSubmit}>
                            <IntlMessages id={'send'}/></button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="img-block">
                    <img src={trackingImg} alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          footer={null}
          visible={this.state.showModal}
          width={900}
          onCancel={() => this.setState({showModal: false, client: {}})}
        >
          {this.state.hasTrackingNumber ?
            <div className="has-tracking">
              <Col span={24}>
              <Steps current={this.getAction()}>
                <Step title={<IntlMessages id={'preParing'}/>} icon={
                  <Icon type="pic-left"/>}/>
                <Step title={<IntlMessages id={'ready'}/>} icon={
                  <Icon type="right-circle"/>}/>
                <Step title={<IntlMessages id={'onRoad'}/>} icon={
                  <Icon type="login"/>}/>
                <Step title={<IntlMessages id={'finished'}/>}icon={
                  <Icon type="check-circle"/>}/>
              </Steps>
              </Col>
              <div className="list my-3">
                <Row>
                  <Col md={12} sm={24} lg={12} xl={12}>
                    <ul className="mb-3">
                      <li className="d-block">
                        <h3 className="d-inline-block mr-2"><IntlMessages id={'companyName'}/>:</h3>
                        {client && client.companyName}
                      </li>
                      <li className="d-block">
                        <h3 className="d-inline-block mr-2"><IntlMessages id={'companyStir'}/>:</h3>
                        {client && client.companyStir}
                      </li>
                      <li className="d-block">
                        <h3 className="d-inline-block mr-2"><IntlMessages id={'serviceType'}/>:</h3>
                        {client && client.serviceType && intlMessages({
                          en: client.serviceType.titleEn,
                          ru: client.serviceType.titleRu,
                          uz: client.serviceType.titleUz
                        })}
                      </li>
                    </ul>
                  </Col>
                  <Col md={12} sm={24} lg={12} xl={12}>
                    <ul className="mb-3">
                      <li className="d-block"><h3 className="d-inline-block mr-2">
                        <IntlMessages id={'date'}/>:
                      </h3>{client && client.dateOfAgreement && client.dateOfAgreement.substring(0, 10)}
                      </li>
                      <li className="d-block">
                        <h3 className="d-inline-block mr-2"><IntlMessages id={'fromCountry'}/>:</h3>
                        {client && client.fromCountry && intlMessages({
                          en: client.fromCountry.nameEn,
                          ru: client.fromCountry.nameRu,
                          uz: client.fromCountry.nameUz
                        })}
                      </li>
                      <li className="d-block"><h3 className="d-inline-block mr-2">
                        <IntlMessages id={'toCountry'}/>:
                      </h3>{client && client.toCountry && intlMessages({
                        en: client.toCountry.nameEn,
                        ru: client.toCountry.nameRu,
                        uz: client.toCountry.nameUz
                      })}
                      </li>
                    </ul>
                  </Col>
                </Row>

                {this.getPointList()}
              </div>
            </div>
            :
            <div style={{height: "50px"}}>
              <div className="text-center"><h1><IntlMessages id={'e_tracking'}/></h1></div>
            </div>}
        </Modal>
      </React.Fragment>
    );
  }
}

export default Tracking;
