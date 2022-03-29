import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/app";
import IntlMessages, { intlMessages } from "../../../util/IntlMessages";
import ApiRequest from "../../../services";
import { connect } from "react-redux";
import { Player } from "video-react";
import "../../../../node_modules/video-react/dist/video-react.css"; // import css
import { apiFileUrl } from "../../../util/constants";

const { getNews } = api;
const imgWidthAndHeight = {
  width: "100%",
  height: "100%",
};

class ServiceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      currentNews: {},
    };
  }

  getNews = () => {
    ApiRequest(getNews, { page: 1, size: 5 }).then((result) => {
      if (result.success) {
        this.setState({
          news: result.news,
        });
      }
    });
  };

  getCurrentNewsById = (pathId) => {
    ApiRequest(getNews, { path: pathId }).then((result) => {
      if (result.success) {
        this.setState({
          currentNews: result,
        });
      }
    });
  };

  componentDidMount() {
    this.getNews();
    if (this.props.match && this.props.match.params) {
      this.getCurrentNewsById(this.props.match.params.id);
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
            <div className="media-right">
              <Link
                to={"/news/" + item._id}
                onClick={() => this.getCurrentNewsById(item._id)}
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
                  <Link
                    onClick={() => this.getCurrentNewsById(item._id)}
                    to={"/news/" + item._id}
                    className="link date"
                  >
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

  currentNewsAttachmentList = () => {
    const { currentNews } = this.state;
    if (
      currentNews &&
      currentNews["images"] &&
      currentNews["images"].length !== 0
    ) {
      return currentNews["images"].map((item, n) => {
        if (n === 0) {
          return;
        }
        return (
          <div
            className="col-12 col-sm-6 col-md-12 col-lg-4 col-xl-4"
            key={item.id}
          >
            <div className="block-info mb-0">
              <img
                src={apiFileUrl + item.src}
                style={{ width: "100%", height: "150" }}
                alt="File"
              />
            </div>
          </div>
        );
      });
    }
  };

  currentNewsVideos = () => {
    const { currentNews } = this.state;
    if (
      currentNews &&
      currentNews["videos"] &&
      currentNews["videos"].length !== 0
    ) {
      return currentNews["videos"].map((item) => (
        <div className="video-play mt-4" key={item.src}>
          <Player
            playsInline
            poster="/assets/poster.png"
            src={apiFileUrl + item.src}
          ></Player>
        </div>
      ));
    }
  };

  getDate = (itemDate) => {
    let date = new Date(itemDate);
    return (
      <Fragment>
        <span className="day">{date.getDate().toString()}</span>
        <span className="month">
          {date.toLocaleString("en", { month: "short" }).toString()}{" "}
        </span>
        <span className="year">{date.getFullYear().toString()} </span>
      </Fragment>
    );
  };

  render() {
    const { currentNews } = this.state;
    return (
      <Fragment>
        <div className="slz-title-command  slz-title-command-new page-title-area ">
          <div className="container">
            <div className="title-command-wrapper">
              <h1 className="title">
                <IntlMessages id={"news"} />
              </h1>
              <div className="breadcrumb-wrapper">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link className="breadcrumb-link" to={"/home"}>
                      <IntlMessages id={"home"} />
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link className="breadcrumb-link" to={"/blog"}>
                      <IntlMessages id={"blog"} />
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link
                      className="breadcrumb-active"
                      to={"/news/" + currentNews?._id}
                    >
                      {intlMessages({
                        en: currentNews?.title?.en,
                        ru: currentNews?.title?.ru,
                        uz: currentNews?.title?.uz,
                      })}
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="slz-woocommerce-setting" data-show={4} />
        <div className="slz-main-content pt-0">
          <div className="container padding-top-100 padding-bottom-100">
            <div className="slz-blog-detail slz-sidebar-right">
              <div className="row">
                <div className="col-md-8 slz-posts col-sm-12 slz-content-column blog-detail-wrapper">
                  <div className="block-content">
                    <div className="blog-detail-info">
                      <div className="sub-content">
                        <div className="date-time">
                          {this.getDate(currentNews?.date)}
                        </div>
                      </div>
                      <div className="main-content">
                        <Link
                          to={"/news/" + currentNews?._id}
                          className="title mt-0"
                        >
                          {intlMessages({
                            en: currentNews?.title?.en,
                            ru: currentNews?.title?.ru,
                            uz: currentNews?.title?.uz,
                          })}
                        </Link>
                      </div>
                    </div>
                    <div className="block-image">
                      <Link to={"/news/" + currentNews?.id} className="link">
                        <img
                          width={643}
                          height={321}
                          src={
                            currentNews?.images?.length
                              ? apiFileUrl + currentNews?.images[0].src
                              : ""
                          }
                          className="img-responsive img-full"
                          alt={intlMessages({
                            en: currentNews?.title?.en,
                            ru: currentNews?.title?.ru,
                            uz: currentNews?.title?.uz,
                          })}
                        />
                      </Link>
                    </div>
                    {currentNews?.length !== 0 && (
                      <div className="slz-postsslz-content-column blog-detail-wrapper">
                        <div className="page-contacts my-5">
                          <div className="partners">
                            <div className="row">
                              {this.currentNewsAttachmentList()}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="entry-content">
                      <p className="block-text" />
                      <span data-preserver-spaces="true">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: intlMessages({
                              en: currentNews?.text?.en,
                              ru: currentNews?.text?.ru,
                              uz: currentNews?.text?.uz,
                            }),
                          }}
                        />
                      </span>
                    </div>
                    {this.currentNewsVideos()}
                  </div>
                </div>
                <div className="col-md-4 col-sm-12 slz-sidebar-column slz-widgets">
                  <div className="box slz-widget-recent-post slz-widget ">
                    <div className="widget-title title-widget">
                      <IntlMessages id={"recent_post"} />
                    </div>
                    <div className="widget-content">
                      {this.newsSidebarList()}
                    </div>
                  </div>
                </div>
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
