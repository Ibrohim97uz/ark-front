import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import * as EmailValidator from "email-validator";
import IntlMessages, { intlMessages } from "../../../util/IntlMessages";
import ApiRequest from "../../../services";
import api from "../../../services/app";

// import video from "../../../assets/images/video.mp4";

// import slideTwo from "../../../assets/images/ark-client/images/slide-two.jpg";
// import slideThree from "../../../assets/images/ark-client/images/slide-three.jpg";
// import slideFour from "../../../assets/images/ark-client/images/slide-four.jpg";

import homeCarouselSlideOne from "../../../assets/images/ark-client/images/home-carousel-slide-one.png";
import homeCarouselSlideTwo from "../../../assets/images/ark-client/images/home-carousel-slide-two.png";
import homeCarouselSlideThree from "../../../assets/images/ark-client/images/home-carousel-slide-three.png";
import homeCarouselSlideFour from "../../../assets/images/ark-client/images/home-carousel-slide-four.png";
import aboutHomeService from "../../../assets/images/ark-client/images/about-home-service.jpg";
import { apiFileUrl } from "../../../util/constants";
import Resume from "./Resume";
import { notification } from "antd";
import { loadScript } from "../../../util/LoadFunc";
import Carousel from "./Carousel";

const { getService, getNews, getVacancy, postResume } = api;
const imgWidthAndHeight = {
  width: "800px",
  height: "400px",
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      currentData: {
        fullName: "",
        email: "",
        phoneNumber: "",
        vacancy: "",
        isStatus: false,
      },
      news: [],
      vacancy: [],
      modalVisible: false,
      isEmailValid: false,
      file: null,
      fileStatus: false,
    };
  }

  onRequestFunc = (path, data, message) => {
    ApiRequest(path, data).then((result) => {
      if (result.success) {
        this.setState({
          currentData: {
            fullName: "",
            email: "",
            phoneNumber: "",
            vacancy: "",
          },
          modalVisible: false,
          file: null,
          fileStatus: false,
        });
        this.getVacancy();
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
    });
  };

  getServices = () => {
    ApiRequest(getService, { page: 1, size: 4 }).then((result) => {
      if (result.services) {
        this.setState({
          services: result.services,
        });
      }
    });
  };

  getNews = () => {
    ApiRequest(getNews, { page: 1, size: 2 }).then((result) => {
      if (result.news) {
        this.setState({
          news: result.news,
        });
      }
    });
  };

  getVacancy = () => {
    ApiRequest(getVacancy).then((result) => {
      if (result.success) {
        let vacancy = result.vacancies.filter((item) => item.isActive === true);
        this.setState((state, props) => ({
          vacancy: vacancy,
          currentData: {
            ...state.currentData,
            vacancy: vacancy[0] && vacancy[0].title.en,
          },
        }));
      }
    });
  };

  componentDidMount() {
    loadScript();
    this.getServices();
    this.getNews();
    this.getVacancy();
  }

  serviceList = () => {
    const { services } = this.state;

    if (services && services.length !== 0) {
      let list = [];
      services.map((item) => {
        list.push(
          <div className="item" key={item._id}>
            <div className="slz-icon-box-2 theme-style-1 ">
              <div className="icon-cell ">
                <div className="wrapper-icon-image">
                  <img
                    src={apiFileUrl + item.images[0].src}
                    className="slz-icon-img"
                    alt={intlMessages({
                      en: item.title.en,
                      ru: item.title.ru,
                      uz: item.title.uz,
                    })}
                  />
                </div>
              </div>
              <div className="content-cell">
                <Link className="title" to={"/service/" + item._id}>
                  {intlMessages({
                    en: item.title.en,
                    ru: item.title.ru,
                    uz: item.title.uz,
                  })}
                </Link>
                <div className="wrapper-info">
                  <div
                    className="description overflow-hidden mb-5"
                    style={{ height: 120 }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: intlMessages({
                          en: item.text.en,
                          ru: item.text.ru,
                          uz: item.text.uz,
                        }),
                      }}
                    />
                  </div>
                  <Link to={"/service/" + item._id} className="slz-btn">
                    <span className="text">
                      <IntlMessages id={"readMore"} />
                    </span>
                    <span className="icons fa fa-angle-double-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
        return item;
      });
      return list;
    } else {
      return (
        <div className="vc_row wpb_row vc_row-fluid">
          <div className="vc_col-sm-12 text-center">
            <h1>
              <IntlMessages id={"empty"} />
            </h1>
          </div>
        </div>
      );
    }
  };

  newsList = () => {
    const { news } = this.state;
    if (news && news.length !== 0) {
      return (
        <div className="slz-shortcode sc_block_posts  posts-block-8848096395e6926b427023">
          <div className="slz-template-03  layout-3 list-layout-1">
            <div className="vc_row wpb_row vc_row-fluid">
              {news.map((item) => {
                let date = new Date(item.date);

                return (
                  <div className="item vc_col-sm-12 vc_col-md-6" key={item._id}>
                    <div className="slz-block-item-01 style-1">
                      <div className="slz-block-item-02">
                        <div className="block-image">
                          <Link to={"/news/" + item._id} className="link">
                            <img
                              style={imgWidthAndHeight}
                              src={apiFileUrl + item.images[0].src}
                              className="img-responsive img-full"
                              alt={intlMessages({
                                en: item.title.en,
                                ru: item.title.ru,
                                uz: item.title.uz,
                              })}
                            />
                          </Link>
                        </div>
                        <div className="block-content">
                          <div className="sub-content">
                            <div className="date-time">
                              <Link to={"/news/" + item._id}>
                                <span className="day">{date.getDate()} </span>
                                <span className="month">
                                  {date.toLocaleString("en", {
                                    month: "short",
                                  })}{" "}
                                </span>
                                <span className="year">
                                  {date.getFullYear()}{" "}
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className="main-content">
                            <Link
                              to={"/news/" + item._id}
                              className="block-title d-block font-weight-500"
                            >
                              {intlMessages({
                                en: item.title.en,
                                ru: item.title.ru,
                                uz: item.title.uz,
                              })}
                            </Link>
                            <Link
                              to={"/news/" + item._id}
                              className="read-more d-block"
                            >
                              <IntlMessages id={"readMore"} />{" "}
                              <i className="fa fa-long-arrow-right" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="vc_row wpb_row vc_row-fluid">
          <div className="vc_col-sm-12 text-center">
            <h1>
              <IntlMessages id={"empty"} />
            </h1>
          </div>
        </div>
      );
    }
  };

  onSend = () => {
    this.setState({
      modalVisible: true,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let message = {
      key: "create",
      messageError: intlMessages({
        en: "There was an error creating",
        ru: "Произошла ошибка при создании",
        uz: "Yaratishda xatolik yuz berdi",
      }),
      messageSuccess: intlMessages({
        en: "Successfully created",
        ru: "Успешно создан",
        uz: "Muvaffaqqiyatli yaratildi",
      }),
    };
    console.log(this.state.currentData);
    if (
      this.state.currentData.fullName &&
      this.state.currentData.vacancy &&
      this.state.currentData.email &&
      this.state.currentData.phoneNumber &&
      this.state.file &&
      !this.state.isEmailValid
    ) {
      this.onRequestFunc(
        postResume,
        {
          ...this.state.currentData,
          fileUpload: true,
          file: this.state.file.file,
          type: true,
        },
        message
      );
    } else {
      this.setState((state, props) => ({
        currentData: {
          fullName:
            state.currentData.fullName === "" ||
            state.currentData.fullName === null
              ? null
              : state.currentData.fullName,
          phoneNumber:
            state.currentData.phoneNumber === "" ||
            state.currentData.phoneNumber === null
              ? null
              : state.currentData.phoneNumber,
          email:
            state.currentData.email === "" || state.currentData.email === null
              ? null
              : state.currentData.email,
          vacancy:
            state.currentData.vacancy === "" ||
            state.currentData.vacancy === null
              ? null
              : state.currentData.vacancy,
        },
        fileStatus: state.file === null,
      }));
      notification.warning({
        key: "warning",
        message: intlMessages({
          en: "The information is not complete",
          ru: "Информация не полная",
          uz: "Ma'lumot to'liq emas",
        }),
      });
    }
  };

  onCancel = () => {
    this.setState({
      currentData: {
        fullName: "",
        email: "",
        phoneNumber: "",
        vacancy: "",
      },
      file: null,
      fileStatus: false,
      modalVisible: false,
    });
  };

  onChange = (param) => {
    let isEmailValid = this.state.isEmailValid;
    let currentData = this.state.currentData;
    currentData[param.name] = param.value;
    if (param.name === "email") {
      isEmailValid = !EmailValidator.validate(param.value);
    }
    this.setState({
      currentData: currentData,
      isEmailValid: isEmailValid,
    });
  };

  onChangeFile = (file) => {
    this.setState({
      file: file.fileStatus === "delete" ? null : file,
      fileStatus: false,
    });
  };

  render() {
    const { vacancy } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <Fragment>
        <Carousel />
        {vacancy && vacancy.length !== 0 ? (
          <div
            className="nnb-send-resume-bock "
            onClick={this.onSend}
            style={{ cursor: "pointer", zIndex: "9999999" }}
          >
            <button className="nnb-btn-danger  " style={{ cursor: "pointer" }}>
              {intlMessages({
                en: "Submit your resume",
                ru: "Отправить свое резюме",
                uz: "Rezyumeingizni yuboring",
              })}
            </button>
          </div>
        ) : null}
        {/* 
        
        <div style={{background:"white"}} className="wpb_revslider_element wpb_content_element nnb-home-block">
        <div id="rev_slider_11_1_wrapper"
         className="rev_slider_wrapper fullscreen-container"
         data-source="gallery"
         style={{background: "transparent", padding: 0}}
         >
          <div
          id="rev_slider_11_1"
          className="rev_slider fullscreenbanner"
          style={{display: "none"}}
          data-version="5.4.3.1"
        >
    <ul>
      <li
        data-index="rs-29"
        data-transition="fade"
        data-slotamount="default"
        data-hideafterloop={0}
        data-hideslideonmobile="off"
        data-easein="default"
        data-easeout="default"
        data-masterspeed={300}
        data-rotate={0}
        data-saveperformance="off"
        data-title="Slide"
      >
        <video muted={true} autoPlay={true} loop={true} className="nnb-play-video">
          <source src={video} type="video/mp4"/>
        </video>

      // <img
      //                         src={slideOne}
      //                         alt="Ark-Logistics Singapore"
      //                         title="Ark-Logistics"
      //                         width={1200}
      //                         height={798}
      //                         data-bgposition="center center"
      //                         data-bgfit="cover"
      //                         data-bgrepeat="no-repeat"
      //                         className="rev-slidebg"
      //                     />
        <div
          className="tp-caption black   tp-resizeme  tp-caption-header nnb-caption-block"
          id="slide-29-layer-1"
          data-x="['center','center','center','center']"
          data-hoffset="['17','13','0','0']"
          data-y="['top','top','middle','middle']"
          data-voffset="['256','248','-77','-70']"
          data-fontsize="['50','50','50','50']"
          data-lineheight="['22','22','22','20']"
          data-width="['526','526','520','330']"
          data-height="['71','71','42','none']"
          data-whitespace="nowrap"
          data-responsive_offset="on"
          data-frames='[{"delay":500,"speed":1500,"frame":"0","from":"z:0;rX:0;rY:0;rZ:0;sX:0.9;sY:0.9;skX:0;skY:0;opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","ease":"nothing"}]'
          data-textalign="['center','center','center','center']"
          data-paddingtop="[0,0,0,0]"
          data-paddingright="[0,0,0,0]"
          data-paddingbottom="[0,0,0,0]"
          data-paddingleft="[0,0,0,0]"

        >
          <span className="text-red"><IntlMessages id={'ark'}/><IntlMessages
          id={'logistics'}/></span>
        </div>
        <div
          className="tp-caption   tp-resizeme"
          id="slide-29-layer-5"
          data-x="['center','center','center','center']"
          data-hoffset="['12','24','0','0']"
          data-y="['top','top','middle','middle']"
          data-voffset="['345','313','0','0']"
          data-fontsize="['36','36','20','22']"
          data-width="['639','639','none','none']"
          data-height="['48','48','none','none']"
          data-whitespace="nowrap"
          data-responsive_offset="on"
          data-frames='[{"delay":750,"speed":1500,"frame":"0","from":"y:[-100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","ease":"nothing"}]'
          data-textalign="['left','left','left','left']"
          data-paddingtop="[0,0,0,0]"
          data-paddingright="[0,0,0,0]"
          data-paddingbottom="[0,0,0,0]"
          data-paddingleft="[0,0,0,0]"
          style={{
            zIndex: 6,
            minWidth: 700,
            maxWidth: 700,
            whiteSpace: "nowrap",
            fontSize: 25,
            lineHeight: "22px",
            fontWeight: 400,
            color: "rgba(255,255,255,1)",
            letterSpacing: "px",
            fontFamily: "'Roboto', sans-serif"
          }}
        >

        </div>
        <div
          className="tp-caption  "
          id="slide-29-layer-6"
          data-x="['center','center','center','center']"
          data-hoffset="['-19','-2','7','-4']"
          data-y="['top','top','middle','middle']"
          data-voffset="['409','362','53','59']"
          data-fontsize="['36','30','25','13']"
          data-lineheight="['30','30','30','22']"
          data-width="none"
          data-height="none"
          data-whitespace="nowrap"
          data-responsive_offset="off"
          data-responsive="off"
          data-frames='[{"delay":600,"speed":1500,"frame":"0","from":"z:0;rX:0;rY:0;rZ:0;sX:0.9;sY:0.9;skX:0;skY:0;opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","ease":"Power2.easeInOut"}]'
          data-textalign="['left','left','left','left']"
          data-paddingtop="[0,0,0,0]"
          data-paddingright="[0,0,0,0]"
          data-paddingbottom="[0,0,0,0]"
          data-paddingleft="[0,0,0,0]"
          style={{
            zIndex: 7,
            whiteSpace: "nowrap",
            fontSize: 16,
            lineHeight: 30,
            fontWeight: 700,
            color: "rgba(255,255,255,1)",
            letterSpacing: "px",
            fontFamily: "'Roboto', sans-serif"
          }}>

        </div>
        <Link to={'/services'}>
          <div
            className="tp-caption rev-btn  tp-resizeme"
            id="slide-29-layer-9"
            data-x="['center','center','center','center']"
            data-hoffset="['6','6','0','14']"
            data-y="['top','top','top','middle']"
            data-voffset="['581','435','602','142']"
            data-width="none"
            data-height="none"
            // data-actions='[{"event":"click","action":"simplelink","target":"_self","url":"http://\/\/localhost:3000\/services\/","delay":""}]'

            data-whitespace="nowrap"
            data-responsive_offset="on"
            data-frames='[{"delay":500,"speed":1500,"frame":"0","from":"z:0;rX:0;rY:0;rZ:0;sX:0.9;sY:0.9;skX:0;skY:0;opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","ease":"nothing"},{"frame":"hover","speed":"0","ease":"Linear.easeNone","to":"o:1;rX:0;rY:0;rZ:0;z:0;","style":"c:rgba(255, 255, 255, 1);bg:rgba(24, 54, 74, 1);bc:rgba(24, 54, 74, 1);bs:solid;bw:0 0 0 0;"}]'
            data-textalign="['center','center','center','center']"
            data-paddingtop="[20,20,20,20]"
            data-paddingright="[50,50,50,50]"
            data-paddingbottom="[20,20,20,20]"
            data-paddingleft="[50,50,50,50]"
            style={{
              zIndex: 8,
              whiteSpace: "nowrap",
              fontSize: 17,
              lineHeight: "17px",
              fontWeight: 400,
              color: "rgba(255,255,255,1)",
              letterSpacing: "px",
              fontFamily: "'Roboto', sans-serif",
              backgroundColor: "rgba(219, 15, 49, 1)",
              borderColor: "rgba(219, 15, 50, 1)",
              borderRadius: "30px 30px 30px 30px",
              outline: "none",
              boxShadow: "none",
              boxSizing: "border-box",
              MozBoxSizing: "border-box",
              WebkitBoxSizing: "border-box",
              cursor: "pointer"
            }}
          >
            <IntlMessages id={'ourService'}/>
          </div>
        </Link>
      </li>
      <li
        data-index="rs-41"
        data-transition="fade"
        data-slotamount="default"
        data-hideafterloop={0}
        data-hideslideonmobile="off"
        data-easein="default"
        data-easeout="default"
        data-masterspeed={300}
        data-rotate={0}
        data-saveperformance="off"
        data-title="Slide"
      >
        <img
          src={slideTwo}
          alt="Ark-Logistics Global Network"
          title="Global Network"
          width={1920}
          height={971}
          data-bgposition="center center"
          data-bgfit="cover"
          data-bgrepeat="no-repeat"
          className="rev-slidebg"
        />
        <div
          className="tp-caption black   tp-resizeme  tp-caption-header"
          id="slide-41-layer-1"
          data-x="['center','center','center','center']"
          data-hoffset="['-158','-158','0','0']"
          data-y="['top','top','middle','middle']"
          data-voffset="['301','301','-77','-70']"
          data-fontsize="['60','35','35','35']"
          data-lineheight="['22','22','22','20']"
          data-width="['520','520','520','330']"
          data-height="['42','42','42','none']"
          data-whitespace="nowrap"
          data-responsive_offset="on"
          data-frames='[{"delay":500,"speed":1500,"frame":"0","from":"z:0;rX:0;rY:0;rZ:0;sX:0.9;sY:0.9;skX:0;skY:0;opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","ease":"nothing"}]'
          data-textalign="['center','center','center','center']"
          data-paddingtop="[0,0,0,0]"
          data-paddingright="[0,0,0,0]"
          data-paddingbottom="[0,0,0,0]"
          data-paddingleft="[0,0,0,0]"
          style={{
            zIndex: 5,
            minWidth: 520,
            maxWidth: 42,
            whiteSpace: "nowrap",
            fontSize: 85,
            lineHeight: 22,
            fontWeight: 900,
            color: "rgba(247,247,247,1)",
            letterSpacing: "px",
            fontFamily: "'Roboto', sans-serif",
            textTransform: "uppercase"
          }}>
          <IntlMessages id={'logistics'}/><span className="text-red ml-2"><IntlMessages
          id={'sidebar.services'}/></span>
        </div>
        <div
          className="tp-caption   tp-resizeme"
          id="slide-41-layer-5"
          data-x="['center','center','center','center']"
          data-hoffset="['0','0','0','0']"
          data-y="['top','top','middle','middle']"
          data-voffset="['375','375','0','0']"
          data-fontsize="['20','20','20','22']"
          data-width="none"
          data-height="none"
          data-whitespace="nowrap"
          data-responsive_offset="on"
          data-frames='[{"delay":750,"speed":1500,"frame":"0","from":"y:[-100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","ease":"nothing"}]'
          data-textalign="['left','left','left','left']"
          data-paddingtop="[0,0,0,0]"
          data-paddingright="[0,0,0,0]"
          data-paddingbottom="[0,0,0,0]"
          data-paddingleft="[0,0,0,0]"
          style={{
            zIndex: 6,
            whiteSpace: "nowrap",
            fontSize: 20,
            lineHeight: 22,
            fontWeight: 400,
            color: "rgba(255,255,255,1)",
            letterSpacing: "px",
            fontFamily: "'Roboto', sans-serif"
          }}
        />
        <div
          className="tp-caption   tp-resizeme"
          id="slide-41-layer-6"
          data-x="['center','center','center','center']"
          data-hoffset="['-44','-44','14','0']"
          data-y="['top','top','middle','middle']"
          data-voffset="['393','393','57','57']"
          data-fontsize="['36','36','36','30']"
          data-width="none"
          data-height="none"
          data-whitespace="nowrap"
          data-responsive_offset="on"
          data-frames='[{"delay":600,"speed":1500,"frame":"0","from":"z:0;rX:0;rY:0;rZ:0;sX:0.9;sY:0.9;skX:0;skY:0;opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","ease":"Power2.easeInOut"}]'
          data-textalign="['left','left','left','left']"
          data-paddingtop="[0,0,0,0]"
          data-paddingright="[0,0,0,0]"
          data-paddingbottom="[0,0,0,0]"
          data-paddingleft="[0,0,0,0]"
          style={{
            zIndex: 7,
            whiteSpace: "nowrap",
            fontSize: 25,
            lineHeight: "30px",
            fontWeight: 700,
            color: "rgba(255,255,255,1)",
            letterSpacing: "px",
            fontFamily: "'Roboto', sans-serif"
          }}>
          <IntlMessages id={'partners'}/>
        </div>
        <div
          className="tp-caption rev-btn  tp-resizeme"
          id="slide-41-layer-9"
          data-x="['center','center','center','center']"
          data-hoffset="['-2','-2','0','0']"
          data-y="['top','top','top','middle']"
          data-voffset="['464','464','602','150']"
          data-width="none"
          data-height="none"
          data-whitespace="nowrap"
          data-responsive_offset="on"
          data-frames='[{"delay":500,"speed":1500,"frame":"0","from":"z:0;rX:0;rY:0;rZ:0;sX:0.9;sY:0.9;skX:0;skY:0;opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","ease":"nothing"},{"frame":"hover","speed":"0","ease":"Linear.easeNone","to":"o:1;rX:0;rY:0;rZ:0;z:0;","style":"c:rgba(255, 255, 255, 1);bg:rgba(24, 54, 74, 1);bc:rgba(24, 54, 74, 1);bs:solid;bw:0 0 0 0;"}]'
          data-textalign="['center','center','center','center']"
          data-paddingtop="[20,20,20,20]"
          data-paddingright="[50,50,50,50]"
          data-paddingbottom="[20,20,20,20]"
          data-paddingleft="[50,50,50,50]"
          style={{
            zIndex: 8,
            whiteSpace: "nowrap",
            fontSize: 17,
            lineHeight: "17px",
            fontWeight: 400,
            color: "rgba(255,255,255,1)",
            letterSpacing: "px",
            fontFamily: "'Roboto', sans-serif",
            backgroundColor: "rgba(219, 15, 49, 1)",
            borderColor: "rgba(219, 15, 50, 1)",
            borderRadius: "30px 30px 30px 30px",
            outline: "none",
            boxShadow: "none",
            boxSizing: "border-box",
            MozBoxSizing: "border-box",
            WebkitBoxSizing: "border-box",
            cursor: "pointer"
          }}
        >
          <IntlMessages id={'ourService'}/>
        </div>
      </li>
      <li
        data-index="rs-40"
        data-transition="fadethroughtransparent"
        data-slotamount="default"
        data-hideafterloop={0}
        data-hideslideonmobile="off"
        data-easein="default"
        data-easeout="default"
        data-masterspeed="default"
        data-rotate={0}
        data-saveperformance="off"
        data-title="Slide"
      >
        <img
          src={slideThree}
          alt="Liner Agency Services Ark-Logistics"
          title="Liner Agency Services"
          width={1200}
          height={798}
          data-bgposition="center center"
          data-bgfit="cover"
          data-bgrepeat="no-repeat"
          className="rev-slidebg"
        />
        <div
          className="tp-caption black   tp-resizeme  tp-caption-header"
          id="slide-40-layer-1"
          data-x="['center','center','center','center']"
          data-hoffset="['-232','100','-18','0']"
          data-y="['top','top','middle','middle']"
          data-voffset="['298','290','-241','-123']"
          data-fontsize="['65','35','35','35']"
          data-lineheight="['22','22','22','20']"
          data-width="['520','1025','520','858']"
          data-height="['42','none','42','85']"
          data-whitespace="nowrap"
          data-responsive_offset="on"
          data-frames='[{"delay":500,"speed":1500,"frame":"0","from":"z:0;rX:0;rY:0;rZ:0;sX:0.9;sY:0.9;skX:0;skY:0;opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","ease":"nothing"}]'
          data-textalign="['center','center','center','center']"
          data-paddingtop="[0,0,0,0]"
          data-paddingright="[0,0,0,0]"
          data-paddingbottom="[0,0,0,0]"
          data-paddingleft="[0,0,0,0]"
          style={{
            zIndex: 5,
            minWidth: 520,
            maxWidth: 42,
            whiteSpace: "nowrap",
            fontSize: 85,
            lineHeight: 22,
            fontWeight: 900,
            color: "rgba(247,247,247,1)",
            letterSpacing: "px",
            fontFamily: "'Roboto', sans-serif",
            textTransform: "uppercase"
          }}
        >
          <span
          className="text-red"><IntlMessages id={'contract'}/> </span>
        </div>
        <div
          className="tp-caption   tp-resizeme"
          id="slide-40-layer-5"
          data-x="['center','center','center','center']"
          data-hoffset="['66','12','0','4']"
          data-y="['top','top','middle','middle']"
          data-voffset="['373','360','-161','-111']"
          data-fontsize="['35','35','20','20']"
          data-lineheight="['22','30','22','22']"
          data-color="['rgb(0,0,0)','rgb(0,0,0)','rgb(255,255,255)','rgba(255, 255, 255, 1)']"
          data-letterspacing="['','','','2']"
          data-width="['628','644','none','445']"
          data-height="['36','49','none','26']"
          data-whitespace="nowrap"
          data-responsive_offset="on"
          data-frames='[{"delay":750,"speed":1500,"frame":"0","from":"y:[-100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","ease":"nothing"}]'
          data-textalign="['left','left','left','left']"
          data-paddingtop="[0,0,0,0]"
          data-paddingright="[0,0,0,0]"
          data-paddingbottom="[0,0,0,0]"
          data-paddingleft="[0,0,0,0]"
          style={{
            zIndex: 6,
            minWidth: 628,
            maxWidth: 25,
            whiteSpace: "nowrap",
            fontSize: 35,
            lineHeight: 22,
            fontWeight: 400,
            color: "#000000",
            letterSpacing: "px",
            fontFamily: "'Roboto', sans-serif"
          }}>

        </div>
        <div
          className="tp-caption   tp-resizeme"
          id="slide-40-layer-6"
          data-x="['center','center','center','center']"
          data-hoffset="['9','8','4','0']"
          data-y="['top','top','middle','middle']"
          data-voffset="['441','417','-75','81']"
          data-fontsize="['30','25','20','14']"
          data-width="['none','842','none','none']"
          data-height="['none','42','none','none']"
          data-whitespace="nowrap"
          data-responsive_offset="on"
          data-frames='[{"delay":600,"speed":1500,"frame":"0","from":"z:0;rX:0;rY:0;rZ:0;sX:0.9;sY:0.9;skX:0;skY:0;opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","ease":"Power2.easeInOut"}]'
          data-textalign="['left','left','left','left']"
          data-paddingtop="[0,0,0,0]"
          data-paddingright="[0,0,0,0]"
          data-paddingbottom="[0,0,0,0]"
          data-paddingleft="[0,0,0,0]"
          style={{
            zIndex: 7,
            whiteSpace: "nowrap",
            fontSize: 30,
            lineHeight: "30px",
            fontWeight: 700,
            color: "rgba(255,255,255,1)",
            letterSpacing: "px",
            fontFamily: "'Roboto', sans-serif"
          }}>
          <IntlMessages id={'carouselTitle3'}/>
        </div>
        <div
          className="tp-caption rev-btn  tp-resizeme"
          id="slide-40-layer-9"
          data-x="['center','center','center','center']"
          data-hoffset="['11','8','-2','0']"
          data-y="['top','top','top','middle']"
          data-voffset="['530','489','486','150']"
          data-width="none"
          data-height="none"
          data-whitespace="nowrap"
          data-responsive_offset="on"
          data-frames='[{"delay":500,"speed":1500,"frame":"0","from":"z:0;rX:0;rY:0;rZ:0;sX:0.9;sY:0.9;skX:0;skY:0;opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","ease":"nothing"},{"frame":"hover","speed":"0","ease":"Linear.easeNone","to":"o:1;rX:0;rY:0;rZ:0;z:0;","style":"c:rgba(255, 255, 255, 1);bg:rgba(24, 54, 74, 1);bc:rgba(24, 54, 74, 1);bs:solid;bw:0 0 0 0;"}]'
          data-textalign="['center','center','center','center']"
          data-paddingtop="[20,20,20,20]"
          data-paddingright="[50,50,50,50]"
          data-paddingbottom="[20,20,20,20]"
          data-paddingleft="[50,50,50,50]"
          style={{
            zIndex: 8,
            whiteSpace: "nowrap",
            fontSize: 17,
            lineHeight: "17px",
            fontWeight: 400,
            color: "rgba(255,255,255,1)",
            letterSpacing: "px",
            fontFamily: "'Roboto', sans-serif",
            backgroundColor: "rgba(219, 15, 49, 1)",
            borderColor: "rgba(219, 15, 50, 1)",
            borderRadius: "30px 30px 30px 30px",
            outline: "none",
            boxShadow: "none",
            boxSizing: "border-box",
            MozBoxSizing: "border-box",
            WebkitBoxSizing: "border-box",
            cursor: "pointer"
          }}
        >
          <IntlMessages id={'ourService'}/>
        </div>
      </li>
      <li
        data-index="rs-42"
        data-transition="fade"
        data-slotamount="default"
        data-hideafterloop={0}
        data-hideslideonmobile="off"
        data-easein="default"
        data-easeout="default"
        data-masterspeed={300}
        data-rotate={0}
        data-saveperformance="off"
        data-title="Slide"
      >
        <img
          src={slideFour}
          alt="Warehouse Management  Service"
          title="Warehouse Management Service"
          width={1200}
          height={798}
          data-bgposition="center center"
          data-bgfit="cover"
          data-bgrepeat="no-repeat"
          className="rev-slidebg"
        />
        <div
          className="tp-caption black   tp-resizeme  tp-caption-header"
          id="slide-42-layer-1"
          data-x="['center','center','center','center']"
          data-hoffset="['71','3','2','0']"
          data-y="['top','top','middle','middle']"
          data-voffset="['319','89','-364','-228']"
          data-fontsize="['55','35','35','35']"
          data-lineheight="['22','22','22','20']"
          data-width="['876','520','647','478']"
          data-height="['none','42','23','none']"
          data-whitespace="nowrap"
          data-responsive_offset="on"
          data-frames='[{"delay":500,"speed":1500,"frame":"0","from":"z:0;rX:0;rY:0;rZ:0;sX:0.9;sY:0.9;skX:0;skY:0;opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","ease":"nothing"}]'
          data-textalign="['center','center','center','center']"
          data-paddingtop="[0,0,0,0]"
          data-paddingright="[0,0,0,0]"
          data-paddingbottom="[0,0,0,0]"
          data-paddingleft="[0,0,0,0]"
          style={{
            zIndex: 5,
            minWidth: 876,
            maxWidth: 876,
            whiteSpace: "nowrap",
            fontSize: 65,
            lineHeight: 22,
            fontWeight: 900,
            letterSpacing: "px",
            fontFamily: "'Roboto', sans-serif",
            textTransform: "uppercase"
          }}>
          <IntlMessages id={'warehouse'}/> <span className="text-red"> <IntlMessages
          id={'management'}/></span>
        </div>
        <div
          className="tp-caption   tp-resizeme"
          id="slide-42-layer-5"
          data-x="['center','center','center','center']"
          data-hoffset="['-6','9','-13','-8']"
          data-y="['top','top','middle','middle']"
          data-voffset="['411','162','-307','-177']"
          data-fontsize="['30','20','20','22']"
          data-width="['382','none','none','none']"
          data-height="['24','none','none','none']"
          data-whitespace="nowrap"
          data-responsive_offset="on"
          data-frames='[{"delay":750,"speed":1500,"frame":"0","from":"y:[-100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;","mask":"x:0px;y:0px;s:inherit;e:inherit;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","ease":"nothing"}]'
          data-textalign="['left','left','left','left']"
          data-paddingtop="[0,0,0,0]"
          data-paddingright="[0,0,0,0]"
          data-paddingbottom="[0,0,0,0]"
          data-paddingleft="[0,0,0,0]"
          style={{
            zIndex: 6,
            minWidth: 382,
            maxWidth: 24,
            whiteSpace: "nowrap",
            fontSize: 30,
            lineHeight: 22,
            fontWeight: 400,
            color: "#000000",
            letterSpacing: "px",
            fontFamily: "'Roboto', sans-serif"
          }}
        >
          <IntlMessages id={'distrubitionTitle'}/>
        </div>
        <div
          className="tp-caption   tp-resizeme"
          id="slide-42-layer-6"
          data-x="['center','center','center','center']"
          data-hoffset="['50','1','7','0']"
          data-y="['top','top','middle','middle']"
          data-voffset="['486','424','76','80']"
          data-fontsize="['30','30','25','15']"
          data-color="['rgb(0,0,0)','rgba(255, 255, 255, 1)','rgb(0,0,0)','rgb(0,0,0)']"
          data-width="['none','none','743','none']"
          data-height="['none','none','31','none']"
          data-whitespace="nowrap"
          data-responsive_offset="on"
          data-frames='[{"delay":600,"speed":1500,"frame":"0","from":"z:0;rX:0;rY:0;rZ:0;sX:0.9;sY:0.9;skX:0;skY:0;opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","ease":"Power2.easeInOut"}]'
          data-textalign="['left','left','left','left']"
          data-paddingtop="[0,0,0,0]"
          data-paddingright="[0,0,0,0]"
          data-paddingbottom="[0,0,0,0]"
          data-paddingleft="[0,0,0,0]"
          style={{
            zIndex: 7,
            whiteSpace: "nowrap",
            fontSize: 30,
            lineHeight: "30px",
            fontWeight: 700,
            color: "#000000",
            letterSpacing: "px",
            fontFamily: "'Roboto', sans-serif"
          }}
        >
          <IntlMessages id={'carouselTitle2'}/>
        </div>
        <div
          className="tp-caption rev-btn  tp-resizeme"
          id="slide-42-layer-9"
          data-x="['center','center','center','center']"
          data-hoffset="['48','48','0','0']"
          data-y="['top','top','top','middle']"
          data-voffset="['559','559','602','150']"
          data-width="none"
          data-height="none"
          data-whitespace="nowrap"
          data-responsive_offset="on"
          data-frames='[{"delay":500,"speed":1500,"frame":"0","from":"z:0;rX:0;rY:0;rZ:0;sX:0.9;sY:0.9;skX:0;skY:0;opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":1000,"frame":"999","ease":"nothing"},{"frame":"hover","speed":"0","ease":"Linear.easeNone","to":"o:1;rX:0;rY:0;rZ:0;z:0;","style":"c:rgba(255, 255, 255, 1);bg:rgba(24, 54, 74, 1);bc:rgba(24, 54, 74, 1);bs:solid;bw:0 0 0 0;"}]'
          data-textalign="['center','center','center','center']"
          data-paddingtop="[20,20,20,20]"
          data-paddingright="[50,50,50,50]"
          data-paddingbottom="[20,20,20,20]"
          data-paddingleft="[50,50,50,50]"
          style={{
            zIndex: 8,
            whiteSpace: "nowrap",
            fontSize: 17,
            lineHeight: "17px",
            fontWeight: 400,
            color: "rgba(255,255,255,1)",
            letterSpacing: "px",
            fontFamily: "'Roboto', sans-serif",
            backgroundColor: "rgba(219, 15, 49, 1)",
            borderColor: "rgba(219, 15, 50, 1)",
            borderRadius: "30px 30px 30px 30px",
            outline: "none",
            boxShadow: "none",
            boxSizing: "border-box",
            MozBoxSizing: "border-box",
            WebkitBoxSizing: "border-box",
            cursor: "pointer"
          }}>
          <IntlMessages id={'otherService'}/>
        </div>
      </li>
    </ul>
    <div
      className="tp-bannertimer tp-bottom"
      style={{visibility: "hidden !important"}}
    />
  </div>
</div>
{vacancy && vacancy.length !== 0 ?
  <div
    className="nnb-send-resume-bock "
    onClick={this.onSend} style={{cursor: "pointer"}}>
    <button className="nnb-btn-danger  " style={{cursor: "pointer"}}>
      {intlMessages({
        en: "Submit your resume",
        ru: "Отправить свое резюме",
        uz: "Rezyumeingizni yuboring"
      })}
    </button>
  </div>
  :
  null}

</div>

        */}

        <div>
          <div className="slz-woocommerce-setting" data-show={4} />
          <div className="slz-main-content padding-top-100 padding-bottom-100 ">
            <div className="container">
              <div className="slz-blog-detail slz-posts ">
                <div className="row">
                  <div
                    id="page-content"
                    className="col-md-12 col-sm-12 col-xs-12 slz-content-column"
                  >
                    <div className="page-detail-wrapper">
                      <div className="entry-content">
                        <div className="vc_row wpb_row vc_row-fluid vc_row-o-content-top vc_row-flex">
                          <div className="wpb_column vc_column_container vc_col-sm-12">
                            <div className="vc_column-inner ">
                              <div className="wpb_wrapper">
                                <div className="wpb_text_column wpb_content_element ">
                                  <div className="wpb_wrapper">
                                    <div className="slz-shortcode sc_main_title main-title-20276988715e6926ac052b8   style-1  text-c ">
                                      <div className="slz-main-title">
                                        <h2 className="title">
                                          <IntlMessages id={"coreService"} />{" "}
                                          <strong className="main-color">
                                            <IntlMessages id={"welcomeToArk"} />
                                          </strong>
                                        </h2>
                                        <div className="subtitle">
                                          <span className="subtitle-inner">
                                            <IntlMessages id={"aboutTitle"} />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="vc_empty_space"
                                  style={{ height: 32 }}
                                >
                                  <span className="vc_empty_space_inner" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*{this.serviceList()}*/}
                        <div className="slz-main-content padding-bottom-100 ">
                          <div className="container">
                            <div className="slz-blog-detail slz-posts ">
                              <div className="row">
                                <div
                                  id="page-content"
                                  className="col-md-12 col-sm-12 col-xs-12 slz-content-column"
                                >
                                  <div className="page-detail-wrapper">
                                    <div className="entry-content">
                                      <div className="vc_row wpb_row vc_row-fluid vc_custom_1479868646919">
                                        <div className="wpb_column vc_column_container vc_col-sm-12">
                                          <div className="vc_column-inner ">
                                            <div className="wpb_wrapper">
                                              <div className="slz-shortcode sc-service-list slz-list-block  slz-service-8973402225e6926fd45a11 seperator-style-1 slz-column-4 mt-3">
                                                {this.serviceList()}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="vc_row wpb_row vc_row-fluid vc_custom_1479954683166">
                          <div className="wpb_column vc_column_container vc_col-sm-12">
                            <div className="vc_column-inner ">
                              <div className="wpb_wrapper">
                                <div className="wpb_text_column wpb_content_element ">
                                  <div className="wpb_wrapper">
                                    <div className="slz-shortcode sc_main_title main-title-17867261595e6926ad15d0f   style-1  text-c ">
                                      <div className="slz-main-title">
                                        <h2 className="title">
                                          <IntlMessages id={"about"} />{" "}
                                          <strong className="main-color">
                                            <IntlMessages id={"welcomeToArk"} />
                                          </strong>
                                        </h2>
                                        <div className="subtitle">
                                          <span className="subtitle-inner">
                                            <IntlMessages id={"aboutTitle"} />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="vc_empty_space"
                                  style={{ height: 32 }}
                                >
                                  <span className="vc_empty_space_inner" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <section className="vc_section">
                          <div className="vc_row wpb_row vc_row-fluid row">
                            <div className="wpb_column vc_column_container col-12 col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                              <div className="vc_column-inner ">
                                <div className="wpb_wrapper">
                                  <div className="wpb_text_column wpb_content_element ">
                                    <div className="wpb_wrapper">
                                      <p className="mb-0">
                                        <strong>
                                          <IntlMessages id={"ourTitles1"} />
                                        </strong>
                                        <IntlMessages id={"ourTitle1"} />
                                      </p>
                                      <p>
                                        <strong>
                                          <IntlMessages id={"ourTitles2"} />
                                        </strong>
                                        <IntlMessages id={"ourTitle2"} />
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="wpb_column vc_column_container d-none   d-lg-block d-xl-block  col-lg-6 col-xl-6">
                              <div className="vc_column-inner ">
                                <div className="wpb_wrapper">
                                  <div className="wpb_single_image wpb_content_element vc_align_left">
                                    <figure className="wpb_wrapper vc_figure">
                                      <div className="vc_single_image-wrapper   vc_box_border_grey">
                                        <img
                                          width={840}
                                          height={423}
                                          src={aboutHomeService}
                                          className="vc_single_image-img attachment-large"
                                          alt="File"
                                          sizes="(max-width: 840px) 100vw, 840px"
                                        />
                                      </div>
                                    </figure>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="vc_row wpb_row vc_row-fluid">
                            <div className="wpb_column vc_column_container vc_col-sm-12">
                              <div className="vc_column-inner ">
                                <div className="wpb_wrapper">
                                  <div
                                    className="vc_empty_space"
                                    style={{ height: 40 }}
                                  >
                                    <span className="vc_empty_space_inner" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>

                        <div className="vc_row wpb_row vc_row-fluid">
                          <div className="wpb_column vc_column_container vc_col-sm-12">
                            <div className="vc_column-inner ">
                              <div className="wpb_wrapper">
                                <div
                                  className="vc_empty_space"
                                  style={{ height: 40 }}
                                >
                                  <span className="vc_empty_space_inner" />
                                </div>
                                <div
                                  className="slz-service-carousel slz-shortcode slz-gallery-feature  slz-gallery-5653528555e6926ad1f63a"
                                  data-block-class=".slz-gallery-5653528555e6926ad1f63a"
                                >
                                  <div className="row align-items-center">
                                    <div className="col-md-12 col-lg-4 col-xl-4  col-sm-12 col-xs-12 col-md-push-4 ">
                                      <div className="service-slider-wrapper">
                                        <div className="slide-carousel">
                                          <div className="item">
                                            <img
                                              width={360}
                                              height={450}
                                              src={homeCarouselSlideOne}
                                              className="img-responsive img-full"
                                              alt="File "
                                              sizes="(max-width: 360px) 100vw, 360px"
                                            />
                                          </div>
                                          <div className="item">
                                            <img
                                              width={360}
                                              height={450}
                                              src={homeCarouselSlideTwo}
                                              className="img-responsive img-full"
                                              alt="File"
                                              sizes="(max-width: 360px) 100vw, 360px"
                                            />
                                          </div>
                                          <div className="item">
                                            <img
                                              width={360}
                                              height={450}
                                              src={homeCarouselSlideThree}
                                              className="img-responsive img-full"
                                              alt="global network"
                                              sizes="(max-width: 450px) 100vw, 450px"
                                            />
                                          </div>
                                          <div className="item">
                                            <img
                                              width={360}
                                              height={450}
                                              src={homeCarouselSlideFour}
                                              className="img-responsive img-full"
                                              alt="Safe Delivery"
                                              sizes="(max-width: 360px) 100vw, 360px"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-4 col-sm-12  col-xs-12 col-md-pull-4 left-side">
                                      <div className="slz-tab-list">
                                        <div
                                          className="slz-sv-item"
                                          data-count={0}
                                        >
                                          <div className="direction-line">
                                            <div className="point" />
                                          </div>
                                          <div className="slz-icon-box-1 style-4">
                                            <div className="icon-cell">
                                              <div className="wrapper-icon">
                                                <i className="icon nnb-icon icon-clock" />
                                                <div className="icon-circle" />
                                              </div>
                                            </div>
                                            <div className="content-cell">
                                              <div className="wrapper-info">
                                                <div className="title">
                                                  <span className="block-title">
                                                    <IntlMessages
                                                      id={"bespoke"}
                                                    />
                                                  </span>
                                                </div>
                                                <div className="block-text">
                                                  <IntlMessages
                                                    id={"efficient"}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className="slz-sv-item"
                                          data-count={2}
                                        >
                                          <div className="direction-line">
                                            <div className="point" />
                                          </div>
                                          <div className="slz-icon-box-1 style-4">
                                            <div className="icon-cell">
                                              <div className="wrapper-icon">
                                                <i className="icon nnb-icon icon-group" />
                                                <div className="icon-circle" />
                                              </div>
                                            </div>
                                            <div className="content-cell">
                                              <div className="wrapper-info">
                                                <div className="title">
                                                  <span className="block-title">
                                                    <IntlMessages
                                                      id={"overNetwork"}
                                                    />
                                                  </span>
                                                </div>
                                                <div className="block-text">
                                                  <IntlMessages
                                                    id={"networkTitle"}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-lg-4 col-xl-4 col-sm-12 mt-0 col-xs-12 right-side">
                                      <div className="slz-tab-list">
                                        <div
                                          className="slz-sv-item"
                                          data-count={1}
                                        >
                                          <div className="direction-line">
                                            <div className="point" />
                                          </div>
                                          <div className="slz-icon-box-1 style-4">
                                            <div className="icon-cell">
                                              <div className="wrapper-icon">
                                                <i className="icon nnb-icon icon-check" />
                                                <div className="icon-circle" />
                                              </div>
                                            </div>
                                            <div className="content-cell">
                                              <div className="wrapper-info">
                                                <div className="title">
                                                  <span className="block-title">
                                                    <IntlMessages
                                                      id={"service_driven"}
                                                    />
                                                  </span>
                                                </div>
                                                <div className="block-text">
                                                  <IntlMessages
                                                    id={"driven_title"}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className="slz-sv-item"
                                          data-count={3}
                                        >
                                          <div className="direction-line">
                                            <div className="point" />
                                          </div>
                                          <div className="slz-icon-box-1 style-4">
                                            <div className="icon-cell">
                                              <div className="wrapper-icon">
                                                <span className="icon nnb-icon nnn-icon-notification" />
                                                <div className="icon-circle" />
                                              </div>
                                            </div>
                                            <div className="content-cell">
                                              <div className="wrapper-info">
                                                <div className="title">
                                                  <span className="block-title">
                                                    <IntlMessages
                                                      id={"deliver"}
                                                    />
                                                  </span>
                                                </div>
                                                <div className="block-text">
                                                  <IntlMessages
                                                    id={"deliverTitle"}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="clearfix" />
                                  </div>
                                </div>
                                <div
                                  className="vc_empty_space"
                                  style={{ height: 40 }}
                                >
                                  <span className="vc_empty_space_inner" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="vc_row wpb_row vc_row-fluid vc_custom_1479783944099">
                          <div className="wpb_column vc_column_container vc_col-sm-12">
                            <div className="vc_column-inner ">
                              <div className="wpb_wrapper">
                                <div className="wpb_text_column wpb_content_element ">
                                  <div className="wpb_wrapper">
                                    <div className="slz-shortcode sc_main_title main-title-9513044615e6926b4268af   style-1  text-c ">
                                      <div className="slz-main-title">
                                        <h2 className="title">
                                          <IntlMessages id={"ourNews"} />
                                        </h2>
                                        <div className="subtitle">
                                          <span className="subtitle-inner">
                                            <IntlMessages id={"newsTitle"} />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    {this.newsList()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="vc_row-full-width vc_clearfix" />
                      </div>
                      <footer className="entry-footer" />
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Resume
          modalVisible={this.state.modalVisible}
          currentData={this.state.currentData}
          vacancy={this.state.vacancy}
          file={this.state.file}
          isEmailValid={this.state.isEmailValid}
          fileStatus={this.state.fileStatus}
          onChangeFile={this.onChangeFile}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          onCancel={this.onCancel}
        />
      </Fragment>
    );
  }
}

export default Home;
