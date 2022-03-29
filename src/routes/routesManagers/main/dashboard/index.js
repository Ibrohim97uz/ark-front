import React, {Component} from 'react';
import ApiRequest from "../../../../services";
import {connect} from "react-redux";
import {onUpdateMenus} from "../../../../redux/setting/action";
import {onAuthUser} from "../../../../redux/auth/action";
import api from "../../../../services/app"
import {Card, Col, Row} from "antd";
import IntlMassages, {intlMessages} from "../../../../util/IntlMessages";
import {Link} from "react-router-dom";
import {apiFileUrl} from '../../../../util/constants'

const {getResume, getVacancy, getSuggestionAndQuestion, getStaff, getNews, getService, getModerator, getClient} = api;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resume: [],
      vacancy: [],
      suggestionAndQuestion: [],
      staffs: [],
      news: [],
      services: [],
      moderators: [],
      clients: [],
    }
  }

  componentDidMount() {
    this.getInit();
  }

  getInit = () => {
    // ApiRequest(getResume).then((result) => {
    //   if (result.success) {
    //     this.setState({
    //       resume: result.object
    //     })
    //   }
    // });

    ApiRequest(getVacancy).then((result) => {
      if (result.success) {
        this.setState({
          vacancy: result.object
        })
      }
    });

    // ApiRequest(getSuggestionAndQuestion).then((result) => {
    //   if (result.success) {
    //     this.setState({
    //       suggestionAndQuestion: result.object,
    //     })
    //   }
    // });

    ApiRequest(getStaff).then((result) => {
      if (result.success) {
        this.setState({
          staffs: result.object.object
        })
      }
    });

    // ApiRequest(getNews, {page: 0, size: 1000}).then((result) => {
    //   if (result.success) {
    //     this.setState({
    //       news: result.object
    //     })
    //   }
    // });

    ApiRequest(getNews).then((result) => {
      if (result.success) {
        this.setState({
          news: result.object
        })
      }
    });

    ApiRequest(getService).then((result) => {
      if (result.success) {
        this.setState({
          services: result.object
        })
      }
    });

    ApiRequest(getModerator).then((result) => {
      if (result.success) {
        this.setState({
          moderators: result.object
        })
      }
    });

    ApiRequest(getClient).then((result) => {
      if (result.success) {
        this.setState({
          clients: result.object
        })
      }
    });

  };
  getNewsList = () => {
    const {news} = this.state;
    if (news && news.length !== 0) {
      let list = [];
      news.map((item, index) => {
        if (index < 2) {
          list.push(
            <div className="gx-news-item" key={item.id}>
              <div className="gx-news-thumb">
                <img className="gx-width-175 gx-rounded-lg" src={apiFileUrl + item.mainAttachment.id} alt="..." />
              </div>
              <div className="gx-news-content">
                <h4 className="gx-mt-0">{intlMessages({
                    en: item.titleEn,
                    ru: item.titleRu,
                    uz: item.titleUz,
                })}</h4>
                <div className="gx-news-tags-row">
                  <div className="gx-news-tags-left">
                    <p className="gx-text-primary gx-pointer gx-mb-0">
                      <Link to={'/news/' + item.id}><IntlMassages id={'readMore'}/></Link>
                      <i
                        className={`icon icon-long-arrow-right gx-fs-xl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle`}/>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        return item;
      })
      return list;
    } else {
      return <IntlMassages id={'empty'}/>
    }
  };

  render() {
    const {resume=[],suggestionAndQuestion=[]} = this.props;
    console.log("this.props",this.props)
    return (
      <Row>
        <Col lg={16} md={24} sm={24} xs={24}>
          <Card className="gx-card-widget nnb-card-widget">
            <div className="#">
              <h2 className="h4 gx-mb-3 d-inline-block">{intlMessages({
                en: "Home news",
                ru: "Главная новости",
                uz: "Bosh sahifa yangiliklari"
              })}</h2>
              <p className="gx-mb-1 d-inline-block ml-4">
                <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1"/>
                {intlMessages({en: "Is active", ru: "Активен", uz: "Faol"})}
                {/*<span className="gx-text-success ml-2">{this.state.news.filter(item => item.isStatus === true).length}</span>*/}

              </p>
              <p className="gx-mb-1 d-inline-block ml-4">
                <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1"/>
                {intlMessages({en: "No  active", ru: "Нет активных", uz: "Faol emas"})}
                {/*<span className="gx-text-danger ml-2">{this.state.news.filter(item => item.isStatus === false).length}</span>*/}

              </p>
            </div>
            {this.getNewsList()}
          </Card>
        </Col>
        <Col lg={8} md={24} sm={24} xs={24}>
          <Row>
            <Col lg={24} md={12} sm={12} xs={24}>
              <Card className="gx-card-widget nnb-card-widget">
                <h2 className="h4 gx-text-capitalize gx-mb-0">{intlMessages({
                  en: 'Clients',
                  ru: 'Клиенты',
                  uz: 'Mijozlar'
                })}</h2>
                <div className="gx-currentplan-row mt-3">
                  <div className="gx-currentplan-col text-center" style={{width: "30%"}}>
                    <h2
                      className="gx-text-primary gx-fs-xlxl gx-font-weight-medium gx-mb-1">{this.state.clients.length}</h2>

                  </div>
                  <div className="gx-currentplan-col gx-currentplan-right text-left" style={{width: "70%"}}>
                    <div className="gx-currentplan-right-content align-items-start">
                      <p className="gx-mb-1">
                        <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1"/>
                        {intlMessages({en: "Delivered", ru: "Доставлен", uz: "Yetkazib berildi"})}
                        <span
                          className="gx-text-success ml-2">{this.state.clients.filter(item => item.actionStatus === "FINISH").length}</span>

                      </p>
                      <p className="gx-mb-1">
                        <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1"/>
                        {intlMessages({en: "On the road", ru: "На дороге", uz: "Yo'lda"})}
                        <span
                          className="gx-text-red ml-2">{this.state.clients.filter(item => item.actionStatus === "ONROAD").length}</span>

                      </p>
                      <p>
                        <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1"/>
                        {intlMessages({
                          en: "Ready to deliver",
                          ru: "Готовы доставить",
                          uz: "Yetkazib berishga tayyor"

                        })}
                        <span
                          className="gx-text-primary ml-2">{this.state.clients.filter(item => item.actionStatus === "READYTODELEVER").length}</span>

                      </p>
                      <span
                        className="gx-text-primary gx-fs-md gx-pointer  gx-oth-plans-up m-0"><Link
                        to={'/main/suggestion-and-question'}><IntlMassages id={'goPage'}/></Link> <i
                        className="icon icon-long-arrow-right gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/></span>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col lg={24} md={12} sm={12} xs={24}>
              <Card className="gx-card-widget nnb-card-widget">
                <h2 className="h4 gx-text-capitalize gx-mb-0">{intlMessages({
                  en: 'Suggestion and Question',
                  ru: 'Предложение и вопрос',
                  uz: 'Taklif va savol'
                })}</h2>
                <div className="gx-currentplan-row mt-3">
                  <div className="gx-currentplan-col text-center" style={{width: "30%"}}>
                    <h2
                      className="gx-text-primary gx-fs-xlxl gx-font-weight-medium gx-mb-1">{suggestionAndQuestion.length}</h2>

                  </div>
                  <div className="gx-currentplan-col gx-currentplan-right text-left" style={{width: "70%"}}>
                    <div className="gx-currentplan-right-content align-items-start">
                      <p className="gx-mb-1">
                        <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1"/>
                        {intlMessages({en: "Viewed", ru: "Рассматриваемый", uz: "Ko'rilgan"})}
                        <span
                          className="gx-text-success ml-2">{suggestionAndQuestion.filter(item => item.isStatus === true).length}</span>

                      </p>
                      <p>
                        <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1"/>
                        {intlMessages({
                          en: "No Viewed",
                          ru: "Нет просмотра",
                          uz: "Ko'rilmagan"
                        })}
                        <span
                          className="gx-text-red ml-2">{suggestionAndQuestion.filter(item => item.isStatus === false).length}</span>

                      </p>
                      <span
                        className="gx-text-primary gx-fs-md gx-pointer  gx-oth-plans-up m-0"><Link
                        to={'/main/suggestion-and-question'}><IntlMassages id={'goPage'}/></Link> <i
                        className="icon icon-long-arrow-right gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/></span>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>

          </Row>
        </Col>
        <Col lg={8} md={12} sm={12} xs={24}>
          <Card className="gx-card-widget nnb-card-widget">
            <h2 className="h4 gx-text-capitalize gx-mb-0">{intlMessages({
              en: 'Resume',
              ru: 'Резюме',
              uz: 'Rezyume'
            })}</h2>
            <div className="gx-currentplan-row mt-3">
              <div className="gx-currentplan-col text-center" style={{width: "30%"}}>
                <h2
                  className="gx-text-primary gx-fs-xlxl gx-font-weight-medium gx-mb-1">{resume.length}</h2>

              </div>
              <div className="gx-currentplan-col gx-currentplan-right text-left" style={{width: "70%"}}>
                <div className="gx-currentplan-right-content align-items-start">
                  <p className="gx-mb-1">
                    <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1"/>
                    {intlMessages({en: "Viewed", ru: "Рассматриваемый", uz: "Ko'rilgan"})}
                    <span
                      className="gx-text-success ml-2">{resume.filter(item => item.isStatus === true).length}</span>
                  </p>
                  <p>
                    <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1"/>
                    {intlMessages({
                      en: "No Viewed",
                      ru: "Нет просмотра",
                      uz: "Ko'rilmagan"
                    })}
                    <span
                      className="gx-text-red ml-2">{resume.filter(item => item.isStatus === false).length}</span>

                  </p>
                  <span
                    className="gx-text-primary gx-fs-md gx-pointer  gx-oth-plans-up m-0"><Link
                    to={'/hr/resume'}><IntlMassages id={'goPage'}/></Link> <i
                    className="icon icon-long-arrow-right gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/></span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={8} md={12} sm={12} xs={24}>
          <Card className="gx-card-widget nnb-card-widget">
            <h2 className="h4 gx-text-capitalize gx-mb-0">{intlMessages({
              en: 'Staffs',
              ru: 'Сотрудники',
              uz: 'Xodimlar'
            })}</h2>
            <div className="gx-currentplan-row mt-3">
              <div className="gx-currentplan-col text-center" style={{width: "30%"}}>
                <h2 className="gx-text-primary gx-fs-xlxl gx-font-weight-medium gx-mb-1">{this.state.staffs.length}</h2>

              </div>
              <div className="gx-currentplan-col gx-currentplan-right text-left" style={{width: "70%"}}>
                <div className="gx-currentplan-right-content align-items-start">
                  <p className="gx-mb-1">
                    <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1"/>
                    {intlMessages({en: "Worked", ru: "За работой", uz: "Ishlamoqda"})}
                    <span
                      className="gx-text-success ml-2">{this.state.staffs.filter(item => item.isStatus === true).length}</span>

                  </p>
                  <p>
                    <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1"/>
                    {intlMessages({en: "Out working", ru: "Вне работы", uz: "Ishlamayapti"})}
                    <span
                      className="gx-text-red ml-2">{this.state.staffs.filter(item => item.isStatus === false).length}</span>

                  </p>
                  <span
                    className="gx-text-primary gx-fs-md gx-pointer  gx-oth-plans-up m-0"><Link
                    to={'/hr/staffs'}><IntlMassages id={'goPage'}/></Link> <i
                    className="icon icon-long-arrow-right gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/></span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={8} md={12} sm={12} xs={24}>
          <Card className="gx-card-widget nnb-card-widget">
            <h2 className="h4 gx-text-capitalize gx-mb-0">{intlMessages({
              en: 'Moderators',
              ru: 'Модераторы',
              uz: 'Moderatorlar'
            })}</h2>
            <div className="gx-currentplan-row mt-3">
              <div className="gx-currentplan-col text-center" style={{width: "30%"}}>
                <h2
                  className="gx-text-primary gx-fs-xlxl gx-font-weight-medium gx-mb-1">{this.state.moderators.length}</h2>

              </div>
              <div className="gx-currentplan-col gx-currentplan-right text-left" style={{width: "70%"}}>
                <div className="gx-currentplan-right-content align-items-start">
                  <p className="gx-mb-1">
                    <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1"/>
                    {intlMessages({en: "Worked", ru: "За работой", uz: "Ishlamoqda"})}
                    <span
                      className="gx-text-success ml-2">{this.state.moderators.filter(item => item.isStatus === true).length}</span>

                  </p>
                  <p>
                    <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1"/>
                    {intlMessages({en: "Out working", ru: "Вне работы", uz: "Ishlamayapti"})}
                    <span
                      className="gx-text-red ml-2">{this.state.moderators.filter(item => item.isStatus === false).length}</span>

                  </p>
                  <span
                    className="gx-text-primary gx-fs-md gx-pointer  gx-oth-plans-up m-0"><Link
                    to={'/settings/moderators'}><IntlMassages id={'goPage'}/></Link> <i
                    className="icon icon-long-arrow-right gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/></span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={8} md={12} sm={12} xs={24}>
          <Card className="gx-card-widget nnb-card-widget">
            <h2 className="h4 gx-text-capitalize gx-mb-0">{intlMessages({
              en: 'Services',
              ru: 'Сервисы',
              uz: 'Xizmatlar'
            })}</h2>
            <div className="gx-currentplan-row mt-3">
              <div className="gx-currentplan-col text-center" style={{width: "30%"}}>
                <h2
                  className="gx-text-primary gx-fs-xlxl gx-font-weight-medium gx-mb-1">{this.state.services.length}</h2>

              </div>
              <div className="gx-currentplan-col gx-currentplan-right text-left" style={{width: "70%"}}>
                <div className="gx-currentplan-right-content align-items-start">
                  <p className="gx-mb-1">
                    <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1"/>
                    {intlMessages({en: "Worked", ru: "За работой", uz: "Ishlamoqda"})}
                    <span
                      className="gx-text-success ml-2">{this.state.services.filter(item => item.isStatus === true).length}</span>

                  </p>
                  <p>
                    <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1"/>
                    {intlMessages({en: "Out working", ru: "Вне работы", uz: "Ishlamayapti"})}
                    <span
                      className="gx-text-red ml-2">{this.state.services.filter(item => item.isStatus === false).length}</span>

                  </p>
                  <span
                    className="gx-text-primary gx-fs-md gx-pointer  gx-oth-plans-up m-0"><Link
                    to={'/settings/services'}><IntlMassages id={'goPage'}/></Link> <i
                    className="icon icon-long-arrow-right gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/></span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col lg={8} md={12} sm={12} xs={24}>
          <Card className="gx-card-widget nnb-card-widget">
            <h2 className="h4 gx-text-capitalize gx-mb-0">{intlMessages({
              en: 'Vacancies',
              ru: 'Вакансии',
              uz: 'Bo\'shisho\' rinlari'
            })}</h2>
            <div className="gx-currentplan-row mt-3">
              <div className="gx-currentplan-col text-center" style={{width: "30%"}}>
                <h2
                  className="gx-text-primary gx-fs-xlxl gx-font-weight-medium gx-mb-1">{this.state.vacancy.length}</h2>

              </div>
              <div className="gx-currentplan-col gx-currentplan-right text-left" style={{width: "70%"}}>
                <div className="gx-currentplan-right-content align-items-start">
                  <p className="gx-mb-1">
                    <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1"/>
                    {intlMessages({en: "Is active", ru: "Активен", uz: "Faol"})}
                    <span
                      className="gx-text-success ml-2">{this.state.vacancy.filter(item => item.isView === true).length}</span>

                  </p>
                  <p>
                    <span className="gx-size-8 gx-bg-dark gx-rounded-xs gx-d-inline-block gx-mr-1"/>
                    {intlMessages({en: "No  active", ru: "Нет активных", uz: "Faol emas"})}
                    <span
                      className="gx-text-red ml-2">{this.state.vacancy.filter(item => item.isView === false).length}</span>

                  </p>
                  <span
                    className="gx-text-primary gx-fs-md gx-pointer  gx-oth-plans-up m-0"><Link to={'/settings/vacancy'}><IntlMassages
                    id={'goPage'}/></Link> <i
                    className="icon icon-long-arrow-right gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle"/></span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = ({auth}) => {
  const {resume,suggestionAndQuestion} = auth;
  return {resume,suggestionAndQuestion}
};

export default connect(mapStateToProps, {
  onAuthUser,
  onUpdateMenus
})(Dashboard);
