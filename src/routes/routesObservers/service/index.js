import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Player } from "video-react";
import api from "../../../services/app";
import IntlMessages, { intlMessages } from "../../../util/IntlMessages";
import ApiRequest from "../../../services";
import { connect } from "react-redux";
import "../../../../node_modules/video-react/dist/video-react.css"; // import css
import { apiFileUrl } from "../../../util/constants";

const { getNews, getService } = api;
const imgWidthAndHeight = {
  width: "100%",
  height: "100%",
  cursor: "default",
};

class ServiceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      service: {},
    };
  }

  getNews = () => {
    ApiRequest(getNews, { page: 1, size: 4 }).then((result) => {
      if (result.success) {
        this.setState({
          news: result.news,
        });
      }
    });
  };

  getServiceById = (pathId) => {
    ApiRequest(getService, { path: pathId }).then((result) => {
      if (result.success) {
        this.setState({
          service: result.service,
        });
      }
    });
  };

  componentDidMount() {
    this.getNews();

    if (this.props.match && this.props.match.params) {
      this.getServiceById(this.props.match.params.id);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.location !== prevProps.location) {
      if (this.props.match && this.props.match.params) {
        this.getServiceById(this.props.match.params.id);
      }
    }
  }

  newsSidebarList = () => {
    const { news } = this.state;
    if (news && news.length !== 0) {
      return news.map((item) => {
        let date = new Date(item.date);
        return (
          <div className="media" key={item._id}>
            <div className="media-left">
              <span className="wrapper-image">
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
              </span>
            </div>
            <div className="media-right ">
              <Link
                to={"/news/" + item._id}
                className="media-heading font-weight"
              >
                {intlMessages({
                  en: item.title.en,
                  ru: item.title.ru,
                  uz: item.title.uz,
                })}
              </Link>
              <div className="meta">
                <div className="meta-info time">
                  <Link to={"/news/" + item._id} className="link date">
                    {date.toLocaleString("en", { month: "long" })}{" "}
                    {date.getDate()} , {date.getFullYear()}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="item -vertical-align-middle">
          <h6>
            <IntlMessages id={"empty"} />
          </h6>
        </div>
      );
    }
  };

  serviceAttachmentList = () => {
    const { service } = this.state;
    if (service && service.images && service.images.length > 1) {
      return this.state.service.images.map((item, n) => {
        if (n === 0) {
          return;
        }
        return (
          <Fragment>
            <div className="wpb_single_image wpb_content_element vc_align_center">
              <figure className="wpb_wrapper vc_figure">
                <div className="vc_single_image-wrapper   vc_box_border_grey">
                  <img
                    width={440}
                    height={390}
                    src={apiFileUrl + item.src}
                    className="vc_single_image-img attachment-full"
                    alt={"File"}
                    sizes="(max-width: 440px) 100vw, 440px"
                  />
                </div>
              </figure>
            </div>
            <div className="vc_empty_space" style={{ height: 15 }}>
              <span className="vc_empty_space_inner" />
            </div>
          </Fragment>
        );
      });
    }
  };
  serviceVideos = () => {
    const { service } = this.state;
    if (service && service["videos"] && service["videos"].length !== 0) {
      return this.state.service["videos"].map((item) => (
        <div className="video-play my-2" key={item._id}>
          <Player
            playsInline
            poster="/assets/poster.png"
            src={apiFileUrl + item.src}
          ></Player>
        </div>
      ));
    }
  };

  render() {
    const { service } = this.state;

    return (
      <Fragment>
        <div className="slz-title-command slz-title-command-import page-title-area ">
          <div className="container">
            <div className="title-command-wrapper">
              <h1 className="title">
                <IntlMessages id={"sidebar.services"} />
              </h1>
              <div className="breadcrumb-wrapper">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link className="breadcrumb-link" to={"/home"}>
                      <IntlMessages id={"home"} />
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link className="breadcrumb-link" to={"/services"}>
                      <IntlMessages id={"sidebar.services"} />
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link
                      to={"/service/" + service._id}
                      className="breadcrumb-active"
                    >
                      {intlMessages({
                        en: service?.title?.en,
                        ru: service?.title?.ru,
                        uz: service?.title?.uz,
                      })}
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="slz-woocommerce-setting" data-show={4} />
        <div className="slz-main-content  padding-bottom-100">
          <div className="container">
            <div className="slz-blog-detail slz-services slz-sidebar-left">
              <div className="row">
                <div
                  id="page-sidebar"
                  className="slz-sidebar-column slz-widgets col-md-4 col-sm-12"
                >
                  <div
                    id="slz_recent_post-3"
                    className="box slz-widget-recent-post slz-widget"
                  >
                    <div className="widget-title title-widget">
                      <IntlMessages id={"recent_post"} />
                    </div>
                    <div className="widget-content">
                      {this.newsSidebarList()}
                    </div>
                  </div>
                </div>

                <div
                  id="page-content"
                  className="slz-content-column col-md-8 col-sm-12"
                >
                  <div className="service-detail-wrapper">
                    <span className="title">
                      {intlMessages({
                        en: service?.title?.en,
                        ru: service?.title?.ru,
                        uz: service?.title?.uz,
                      })}
                    </span>
                    <div className="entry-content">
                      <div className="vc_row wpb_row vc_row-fluid vc_custom_1480058179254">
                        <div className="wpb_column vc_column_container vc_col-sm-12">
                          <div className="vc_column-inner ">
                            <div className="wpb_wrapper">
                              <div className="vc_row wpb_row vc_inner vc_row-fluid">
                                <div className="wpb_column vc_column_container vc_col-sm-9">
                                  <div className="vc_column-inner vc_custom_1479782761842">
                                    <div className="wpb_wrapper">
                                      <div className="wpb_single_image wpb_content_element vc_align_left">
                                        <figure className="wpb_wrapper vc_figure">
                                          <div className="vc_single_image-wrapper   vc_box_border_grey">
                                            {service?.images?.length ? (
                                              <img
                                                width={585}
                                                height={330}
                                                src={
                                                  apiFileUrl +
                                                  service.images[0].src
                                                }
                                                className="vc_single_image-img attachment-full"
                                                alt={"File"}
                                                sizes="(max-width: 585px) 100vw, 585px"
                                              />
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        </figure>
                                      </div>
                                      <div
                                        className="vc_empty_space"
                                        style={{ height: 15 }}
                                      >
                                        <span className="vc_empty_space_inner" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="wpb_column vc_column_container vc_col-sm-3">
                                  <div className="vc_column-inner ">
                                    <div className="wpb_wrapper">
                                      {this.serviceAttachmentList()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="vc_row wpb_row vc_row-fluid">
                        <div className="wpb_column vc_column_container vc_col-sm-12">
                          <div className="vc_column-inner ">
                            <div className="wpb_wrapper">
                              <div className="wpb_text_column wpb_content_element ">
                                <div className="wpb_wrapper">
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: intlMessages({
                                        en: service?.text?.en,
                                        ru: service?.text?.ru,
                                        uz: service?.text?.uz,
                                      }),
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {this.serviceVideos()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="clearfix" />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ routing }) => {
  const { location } = routing;
  return { location };
};
export default connect(mapStateToProps, null)(ServiceInfo);
