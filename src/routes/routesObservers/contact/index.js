import React, { Component } from "react";
import { Link } from "react-router-dom";
import IntlMessages, { intlMessages } from "../../../util/IntlMessages";
import ApiRequest from "../../../services";
import api from "../../../services/app";
import { notification } from "antd";
import * as EmailValidator from "email-validator";
import img from "../.././../assets/images/placeholder.jpg";
import { apiFileUrl } from "../../../util/constants";

const { getStaff, postSuggestionAndQuestion } = api;

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: [],
      isEmailValid: false,
      loading: false,
      currentData: {
        name: "",
        email: "",
        description: "",
      },
    };
  }

  onRequestFunc = (path, data, message) => {
    ApiRequest(path, data)
      .then((result) => {
        if (result.success) {
          this.setState({
            currentData: {
              name: "",
              email: "",
              description: "",
            },
            loading: false,
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
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  getStaffs = () => {
    ApiRequest(getStaff).then((result) => {
      if (result.success) {
        this.setState({
          staffs: result.staffs,
        });
      }
    });
  };

  componentDidMount() {
    this.getStaffs();
  }

  staffList = () => {
    const { staffs } = this.state;
    if (staffs && staffs.length !== 0) {
      let hasAttachmentData = [];
      let noAttachmentData = [];
      staffs.map((item) => {
        if (item?.image?.src !== null) {
          hasAttachmentData.push(
            <div className="col-md-3" key={item?._id}>
              <div className="card contact-card">
                <div className="hexagon">
                  <div className="hexagon-inside">
                    <div
                      className="hexagon-image"
                      style={{
                        backgroundImage: `url(${
                          apiFileUrl + item?.image?.src
                        })`,
                      }}
                    />
                  </div>
                </div>

                <div className="card-body text-center">
                  <h3 className="card-title" title="Nishonboyev Nurlan">
                    {intlMessages({
                      en: item.name,
                      uz: item.name,
                      ru: item.name,
                    }) +
                      " " +
                      intlMessages({
                        en: item.surname,
                        uz: item.surname,
                        ru: item.surname,
                      })}
                  </h3>
                  <h6 className="card-subtitle">
                    {intlMessages({
                      en: item.position.en,
                      ru: item.position.ru,
                      uz: item.position.uz,
                    })}
                  </h6>
                  <div className="description">
                    <p>
                      {intlMessages({
                        en: item.definition.en,
                        ru: item.definition.ru,
                        uz: item.definition.uz,
                      })}
                    </p>
                  </div>
                </div>
                <div className="card-footer">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href={`mailto:${item?.email}`} className="p-1">
                        <span className="nnb-icon icon-mail" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`tel:${item?.phone}`}
                        target={"_blank"}
                        rel="noopener noreferrer"
                        className="p-1"
                      >
                        <span className="nnb-icon icon-phone" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={`https://t.me/${item?.telegram}`}
                        rel="noopener noreferrer"
                        target={"_blank"}
                        className="p-1"
                      >
                        <span className="nnb-icon icon-telegram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        } else {
          noAttachmentData.push(
            <div className="col-md-3" key={item._id}>
              <div className="card contact-card">
                <div className="hexagon">
                  <div className="hexagon-inside">
                    <div
                      className="hexagon-image"
                      style={{ backgroundImage: `url(${img})` }}
                    />
                  </div>
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title" title="Nishonboyev Nurlan">
                    {intlMessages({
                      en: item.name,
                      uz: item.name,
                      ru: item.name,
                    }) +
                      " " +
                      intlMessages({
                        en: item.surname,
                        uz: item.surname,
                        ru: item.surname,
                      })}
                  </h3>
                  <h6 className="card-subtitle">
                    {intlMessages({
                      en: item.position.en,
                      ru: item.position.ru,
                      uz: item.position.uz,
                    })}
                  </h6>
                  <div className="description">
                    <p>
                      {intlMessages({
                        en: item.definition.en,
                        ru: item.definition.ru,
                        uz: item.definition.uz,
                      })}
                    </p>
                  </div>
                </div>
                <div className="card-footer">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <Link to={`mailto:${item?.email}`} className="p-1">
                        <span className="nnb-icon icon-mail" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`tel:${item?.phone}`}
                        target={"_blank"}
                        className="p-1"
                      >
                        <span className="nnb-icon icon-phone" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`tel:${item?.telegram}`}
                        target={"_blank"}
                        className="p-1"
                      >
                        <span className="nnb-icon icon-telegram" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        }
        return item;
      });
      return [...noAttachmentData, ...hasAttachmentData];
    }
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
  onSave = (e) => {
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
      this.state.currentData.name &&
      this.state.currentData.email &&
      this.state.currentData.description &&
      !this.state.isEmailValid
    ) {
      this.setState({ loading: true });
      this.onRequestFunc(
        postSuggestionAndQuestion,
        this.state.currentData,
        message
      );
    } else {
      this.setState((state, props) => ({
        currentData: {
          name:
            state.currentData.name === "" || state.currentData.name === null
              ? null
              : state.currentData.name,
          description:
            state.currentData.description === "" ||
            state.currentData.description === null
              ? null
              : state.currentData.description,
          email:
            state.currentData.email === "" || state.currentData.email === null
              ? null
              : state.currentData.email,
        },
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

  render() {
    const { staffs } = this.state;
    return (
      <div style={{ background: "rgb(248, 248, 248)" }}>
        <div className=" slz-title-command slz-title-command-contact page-title-area ">
          <div className="container">
            <div className="title-command-wrapper">
              <h1 className="title">
                <IntlMessages id={"contact"} />
              </h1>
              <div className="breadcrumb-wrapper">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link className="breadcrumb-link" to={"/home"}>
                      <IntlMessages id={"home"} />
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link className="breadcrumb-active" to={"/contact"}>
                      <IntlMessages id={"contact"} />
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="slz-woocommerce-setting" data-show={4} />
        <div
          className={
            staffs && staffs.length !== 0
              ? "slz-main-content  contact-page-top"
              : "slz-main-content"
          }
        >
          <div className="container">
            <div className="page-contacts">
              <div className="partners">
                <div className="row">{this.staffList()}</div>
              </div>
            </div>
            <div
              className="slz-blog-detail slz-posts "
              style={{
                transform:
                  staffs && staffs.length !== 0
                    ? " translate(0, -130px)"
                    : " translate(0,0)",
              }}
            >
              <div className="row">
                <div className="col-md-12">
                  <h6 className="title font-weight-normal mx-sm-3 mx-3 mx-md-0 mx-xl-0 mx-lg-0 font-weight-bold">
                    <IntlMessages id={"callContact"} />
                  </h6>
                </div>
                <div className="col-md-12">
                  <div className="wpb_column vc_column_container vc_col-sm-4 vc_col-has-fill">
                    <div className="vc_column-inner vc_custom_1477637654389">
                      <div className="wpb_wrapper">
                        <div className="wpb_single_image wpb_content_element vc_align_right">
                          <figure className="wpb_wrapper vc_figure">
                            <div className="vc_single_image-wrapper   vc_box_border_grey">
                              <img
                                alt=""
                                src={require("assets/images/ark-client/images/call-center.png")}
                              />
                            </div>
                          </figure>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="wpb_column vc_column_container vc_col-sm-8 vc_col-has-fill"
                    style={{ marginTop: "100px" }}
                  >
                    <div id="comments" className="comments-area mt-0">
                      <div id="respond" className="comment-respond mt-4">
                        <form id="commentform" className="comment-form">
                          <div className="comment-form-author">
                            <label htmlFor="author">
                              <IntlMessages id={"fullName"} />
                              <span className="required">*</span>
                            </label>
                            <input
                              id="author"
                              name="fullName"
                              type="text"
                              onChange={(e) =>
                                this.onChange({
                                  name: "name",
                                  value: e.target.value,
                                })
                              }
                              value={this.state.currentData.name}
                              aria-required="true"
                              required="required"
                            />
                            <div
                              className={
                                this.state.currentData.name === null
                                  ? "input-error-msg "
                                  : "input-error-msg hide"
                              }
                              id="author-err-required"
                            >
                              <IntlMessages id={"placName"} />
                            </div>
                          </div>
                          <div className="comment-form-email">
                            <label htmlFor="email">
                              <IntlMessages id={"email"} />
                              <span className="required">*</span>
                            </label>
                            <input
                              id="email"
                              name="email"
                              onChange={(e) =>
                                this.onChange({
                                  name: "email",
                                  value: e.target.value,
                                })
                              }
                              value={this.state.currentData.email}
                              type="email"
                              size={30}
                              aria-required="true"
                              required="required"
                            />
                            <div
                              className={
                                this.state.isEmailValid
                                  ? "input-error-msg"
                                  : "input-error-msg hide"
                              }
                              id="email-err-required"
                            >
                              <IntlMessages id={"placEmail"} />
                            </div>
                            <div
                              className={
                                this.state.currentData.email === null
                                  ? "input-error-msg "
                                  : "input-error-msg hide"
                              }
                              id="email-err-valid"
                            >
                              <IntlMessages id={"placValidEmail"} />
                            </div>
                          </div>
                          <div className="comment-form-comment">
                            <label htmlFor="email">
                              <IntlMessages id={"comment"} />
                              <span className="required">*</span>
                            </label>
                            <textarea
                              id="comment"
                              name="comment"
                              required="required"
                              onChange={(e) =>
                                this.onChange({
                                  name: "description",
                                  value: e.target.value,
                                })
                              }
                              value={this.state.currentData.description}
                            />
                            <div
                              className={
                                this.state.currentData.description === null
                                  ? "input-error-msg "
                                  : "input-error-msg hide"
                              }
                              id="comment-err-required"
                            >
                              <IntlMessages id={"placComment"} />
                            </div>
                          </div>
                          <div className="form-submit">
                            <button
                              name="submit"
                              id="submit"
                              type="submit"
                              style={{
                                cursor: this.state.loading
                                  ? "not-allowed"
                                  : "pointer",
                              }}
                              disabled={this.state.loading}
                              onClick={this.onSave}
                              className="submit submit px-5 py-2 "
                            >
                              <IntlMessages id={"send"} />
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="slz-main-title">
                    <h6 className="title">
                      <IntlMessages id={"stayInTouch"} />
                    </h6>
                    <IntlMessages id={"stayDesc"} />
                  </div>
                  <div className="mapouter my-5">
                    <div className="gmap_canvas">
                      <iframe
                        title="Map"
                        width="100%"
                        height={400}
                        id="gmap_canvas"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d749.0271913162327!2d69.2266749292333!3d41.32824819870435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b8f77b4c033%3A0xbee79721eacbdef9!2zNzYg0JvRj9C90LPQsNGAINC60Z7Rh9Cw0YHQuCwg0KLQvtGI0LrQtdC90YIsIFV6YmVraXN0YW4!5e0!3m2!1sen!2sus!4v1624700299974!5m2!1sen!2sus"
                        marginWidth={0}
                        style={{ border: 0 }}
                      />
                      <Link to={"https://www.maps-generator.org"} />
                      "&gt;oogle map
                    </div>
                    <style
                      dangerouslySetInnerHTML={{
                        __html:
                          ".mapouter{position:relative;text-align:right;height:400px;width:100%;}.gmap_canvas {overflow:hidden;background:none!important;height:400px;width:100%;opacity:1}",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
