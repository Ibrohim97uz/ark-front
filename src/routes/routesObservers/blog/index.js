import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import IntlMessages, { intlMessages } from "../../../util/IntlMessages";
import ApiRequest from "../../../services";
import api from "../../../services/app";
import { apiFileUrl } from "../../../util/constants";

const { getNews } = api;
const imgWidthAndHeight = {
  width: "800px",
  height: "400px",
};
const imgWidthAndHeight2 = {
  width: "100%",
  height: "100%",
};

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      pagination: null,
    };
  }

  getNews = (page) => {
    ApiRequest(getNews, { page: page, size: 4 }).then((result) => {
      if (result.success) {
        this.setState({
          pagination: {
            totalPages: result.totalPages,
            totalElements: result.totalElements,
            currentPage: result.currentPage,
          },
          news: result.news,
        });
      }
    });
  };

  componentDidMount() {
    this.getNews();
  }

  newsContentList = () => {
    const { news } = this.state;
    if (news && news.length !== 0) {
      return news.map((item) => {
        let date = new Date(item?.date);
        return (
          <div className="item" key={item?._id}>
            <div className="slz-block-item-01 style-1">
              <div className="slz-block-item-02">
                <div className="block-image">
                  <Link to={"/news/" + item?._id} className="link">
                    <img
                      style={imgWidthAndHeight}
                      src={apiFileUrl + item?.images[0].src}
                      className="img-responsive img-full"
                      alt={intlMessages({
                        en: item.title.en,
                        ru: item.title.ru,
                        uz: item.title.ru,
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
                          {date.toLocaleString("en", { month: "short" })}{" "}
                        </span>
                        <span className="year">{date.getFullYear()} </span>
                      </Link>
                    </div>
                  </div>
                  <div className="main-content">
                    <Link to={"/news/" + item._id} className="block-title">
                      {intlMessages({
                        en: item.title.en,
                        ru: item.title.ru,
                        uz: item.title.ru,
                      })}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div className="item text-center -vertical-align-middle">
          <h1>
            <IntlMessages id={"empty"} />
          </h1>
        </div>
      );
    }
  };
  newsSiderList = () => {
    const { news } = this.state;
    if (news && news.length !== 0) {
      return news.map((item) => {
        let date = new Date(item?.date);
        return (
          <div className="media" key={item?._id}>
            <div className="media-left">
              <Link to={"/news/" + item?._id} className="wrapper-image">
                <img
                  style={imgWidthAndHeight2}
                  src={apiFileUrl + item?.images[0]?.src}
                  className="img-responsive img-full"
                  alt={intlMessages({
                    en: item.title.en,
                    ru: item.title.ru,
                    uz: item.title.ru,
                  })}
                />
              </Link>
            </div>
            <div className="media-right">
              <Link
                to={"/news/" + item._id}
                className="media-heading font-weight"
              >
                {intlMessages({
                  en: item.title.en,
                  ru: item.title.ru,
                  uz: item.title.ru,
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
  paginationList = () => {
    if (
      this.state.pagination !== null &&
      this.state.pagination.totalPages > 1
    ) {
      let page = [];
      for (let i = 1; i <= this.state.pagination.totalPages; i++) {
        page.push(
          <Link
            to={"/blog/" + i}
            onClick={() => this.getNews(i - 1)}
            className={
              i - 1 === this.state.pagination.currentPage
                ? "page-numbers current"
                : "page-numbers"
            }
            key={i}
          >
            {i}
          </Link>
        );
      }
      return page;
    } else {
      return null;
    }
  };

  render() {
    return (
      <Fragment>
        <div className="slz-title-command slz-title-command-blog page-title-area ">
          <div className="container">
            <div className="title-command-wrapper">
              <h1 className="title font-weight">
                <IntlMessages id={"news"} />
              </h1>
              <div className="breadcrumb-wrapper ">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link className="breadcrumb-link" to={"/home"}>
                      <IntlMessages id={"home"} />
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to={"/blog"} className="breadcrumb-active">
                      <IntlMessages id={"blog"} />
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="slz-main-content padding-top-100 padding-bottom-100 ">
          <div className="container">
            <div className="slz-blog-detail slz-posts slz-sidebar-right">
              <div className="row">
                <div
                  id="page-content"
                  className="col-md-8 col-sm-12 col-xs-12 slz-content-column"
                >
                  <div className="page-detail-wrapper">
                    <div className="entry-content">
                      <div className="vc_row wpb_row vc_row-fluid">
                        <div className="wpb_column vc_column_container vc_col-sm-12">
                          <div className="vc_column-inner ">
                            <div className="wpb_wrapper">
                              <div className="slz-shortcode sc_block_posts  posts-block-1836438615e6927159c34c">
                                <div className="slz-template-03  layout-3 list-layout-1">
                                  <div className="slz-list-block slz-column-1">
                                    {this.newsContentList()}
                                  </div>
                                </div>
                                <div className="slz-pagination">
                                  <nav className="navigation pagination">
                                    <div className="nav-links">
                                      {this.paginationList()}
                                    </div>
                                  </nav>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="page-sidebar"
                  className="col-md-4 col-sm-12 col-xs-12 slz-sidebar-column  slz-widgets"
                >
                  <div
                    id="slz_recent_post-3"
                    className="box slz-widget-recent-post slz-widget"
                  >
                    <div className="widget-title title-widget">
                      <IntlMessages id={"recent_post"} />
                    </div>
                    <div className="widget-content">{this.newsSiderList()}</div>
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

export default Blog;
