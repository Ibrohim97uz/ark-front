import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import IntlMessages, { intlMessages } from "../../util/IntlMessages";
import ApiRequest from "../../services";
import api from "../../services/app";
import logo from "../../assets/images/ark-client/logo-white.png";

const { getService } = api;

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
    };
  }

  getServices = () => {
    ApiRequest(getService).then((result) => {
      if (result.success) {
        this.setState({
          services: result.object,
        });
      }
    });
  };

  componentDidMount() {
    this.getServices();
  }

  serviceList = () => {
    const { services } = this.state;
    if (services && services.length !== 0) {
      return services.map((item) => (
        <Link to={"/service/" + item.id} className="link" key={item.id}>
          <i className="icons fa fa-angle-right" />
          <span className="text">
            {intlMessages({
              en: item.titleEn,
              ru: item.titleRu,
              uz: item.titleUz,
            })}
          </span>
        </Link>
      ));
    } else {
      return (
        <span className="text">
          <IntlMessages id={"empty"} />
        </span>
      );
    }
  };

  render() {
    return (
      <Fragment>
        <footer>
          <div className="slz-wrapper-footer slz-dark slz-widgets">
            <div className="slz-footer-main">
              <div className="container">
                <div className="row">
                  <div className="col-md-3 col-sm-6">
                    <div className="slz-widget slz-widget-about-us  ">
                      <div className="widget-title title-widget logo-title">
                        <Link to="/main/dashboard">
                          <img
                            src={logo}
                            title="10-years-transparent"
                            alt="File"
                            className="slz-logo img-responsive"
                          />
                        </Link>
                      </div>
                      <div className="widget-content">
                        <div className="widget-description text-justify">
                          <IntlMessages id={"page.login.app.title.one_top"} />
                          <IntlMessages id={"footerDesc"} />
                        </div>
                      </div>
                    </div>
                    <div className="box widget_text slz-widget ">
                      <div className="textwidget">
                        <p>
                          <IntlMessages id={"workingHour"} /> <b />
                          <br />
                          <IntlMessages id={"monday-friday"} />

                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="box slz-widget-taxonomy slz-widget ">
                      <div className="slz-widget-categories ml-4">
                        <div className="widget-title title-widget">
                          <IntlMessages id={"ourServices"} />
                        </div>
                        <div className="widget-content ml-2">
                          {this.serviceList()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="box slz-widget-taxonomy slz-widget ">
                      <div className="slz-widget-categories">
                        <div className="widget-title title-widget ml-4">
                          <IntlMessages id={"quicklink"} />
                        </div>
                        <div className="widget-content ml-2">
                          <Link to="/home" className="link">
                            <i className="icons fa fa-angle-right" />
                            <span className="text">
                              <IntlMessages id={"home"} />
                            </span>
                          </Link>
                          <Link to="/about" className="link">
                            <i className="icons fa fa-angle-right" />
                            <span className="text">
                              <IntlMessages id={"about"} />
                            </span>
                          </Link>
                          <Link to="/services" className="link">
                            <i className="icons fa fa-angle-right" />
                            <span className="text">
                              <IntlMessages id={"sidebar.services"} />
                            </span>
                          </Link>
                          <Link to="/gallery" className="link">
                            <i className="icons fa fa-angle-right" />
                            <span className="text">
                              <IntlMessages id={"gallery"} />
                            </span>
                          </Link>
                          <Link to="/fleet" className="link">
                            <i className="icons fa fa-angle-right" />
                            <span className="text">
                              <IntlMessages id={"fleet"} />
                            </span>
                          </Link>
                          <Link to="/blog" className="link">
                            <i className="icons fa fa-angle-right" />
                            <span className="text">
                              <IntlMessages id={"blog"} />
                            </span>
                          </Link>
                          <Link to="/tracking" className="link">
                            <i className="icons fa fa-angle-right" />
                            <span className="text">
                              <IntlMessages id={"tracking"} />
                            </span>
                          </Link>
                          <Link to="/contact" className="link">
                            <i className="icons fa fa-angle-right" />
                            <span className="text">
                              <IntlMessages id={"contact"} />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="box slz-widget-contact slz-widget slz-widget-categories ml-4 ">
                      <div className="slz-widget-contact-info">
                        <div className="widget-title title-widget">
                          <IntlMessages id={"contact"} />
                        </div>
                        <div className="widget-content ml-2">
                          <div className="item">
                            <div className="contact-info">
                              <div className="text p-0">
                                <span className={"nnb-icon icon-map me-2"} />
                                <IntlMessages
                                  id={"page.login.app.title.one_top"}
                                />
                                <br />
                                <IntlMessages id={"addressSt"} /> <br />
                                <IntlMessages id={"addressT"} />
                              </div>
                            </div>
                          </div>
                          <div className="item my-3">
                            <div className="contact-info">
                              <div className="text p-0">
                                <div className="div">
                                  <span
                                    className={"nnb-icon icon-phone me-2"}
                                  />
                                  <a
                                    href="tel:+998 90 355 40 30"
                                    className="d-inline-block link"
                                  >
                                    +998 90 355 40 30
                                  </a>
                                </div>
                                <a
                                  style={{ paddingLeft: "22px" }}
                                  href="tel:+998 90 317 27 57"
                                  className="d-block link"
                                >
                                  +998 90 317 27 57
                                </a>
                                <a
                                  style={{ paddingLeft: "22px" }}
                                  href="tel: +998 78 317 27 57"
                                  className="d-block link"
                                >
                                  +998 78 150 27 57
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="item">
                            <div className="contact-info">
                              <div className="text p-0">
                                <div>
                                  <span className="nnb-icon icon-mail me-2" />
                                  <a
                                    href="mailto:azamat.razzakov@gmail.com"
                                    className="d-inline-block link"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                  >
                                    azamat.razzakov@gmail.com
                                  </a>
                                </div>
                                <a
                                  style={{ paddingLeft: "22px" }}
                                  href="mailto:arklogistics.uz@gmail.com"
                                  className="d-block link"
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  arklogistics.uz@gmail.com
                                </a>

                                <a
                                  style={{ paddingLeft: "22px" }}
                                  href="mailto:operations@universe-transport.com"
                                  className="d-block link"
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  operations@universe-transport.com
                                </a>
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
            <div className="slz-footer-bottom">
              <div className="container">
                <div className="item-wrapper item-left">
                  <div className="item">
                    <div className="slz-name">
                      © <IntlMessages id={"page.login.app.title.one_top"} />
                      <br />
                      Site powered by{" "}
                      <a target="_blank" href="https://albison.tech">
                        albison
                      </a>
                    </div>
                  </div>
                  <div className="item">
                    <div className="social">
                      <a
                        href="https://www.facebook.com/arklogistics.uz/"
                        rel="noopener noreferrer"
                        target="_blank"
                        className={"link mx-3"}
                      >
                        <span className="nnb-icon icon-facebook" />
                      </a>

                      <a
                        href="https://www.linkedin.com/company/ark-logistics"
                        rel="noopener noreferrer"
                        target="_blank"
                        className={"link mx-3"}
                      >
                        <span className="nnb-icon icon-linkedin" />
                      </a>
                      <a
                        href="https://www.instagram.com/ark_logistics/"
                        rel="noopener noreferrer"
                        target="_blank"
                        className={"link mx-3"}
                      >
                        <span className="nnb-icon icon-instagram" />
                      </a>
                      <a
                        href="https://t.me/arklogistics"
                        rel="noopener noreferrer"
                        target="_blank"
                        className={"link mx-3"}
                      >
                        <span className="nnb-icon icon-telegram" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </Fragment>
    );
  }
}

export default Footer;
