import React, { Component, Fragment } from "react";
import IntlMessages, { intlMessages } from "../../../util/IntlMessages";
import { Link } from "react-router-dom";
import ApiRequest from "../../../services";
import api from "../../../services/app";
import { apiFileUrl } from "../../../util/constants";

const { getService } = api;

class Services extends Component {
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
          services: result.services,
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
      ));
    } else {
      return (
        <div className="item text-center -vertical-align-middle w-100 text-center">
          <h1>
            <IntlMessages id={"empty"} />
          </h1>
        </div>
      );
    }
  };

  render() {
    return (
      <Fragment>
        <div className="slz-title-command slz-title-command-services page-title-area ">
          <div className="container">
            <div className="title-command-wrapper">
              <h1 className="title font-weight">
                <IntlMessages id={"sidebar.services"} />
              </h1>
              <div className="breadcrumb-wrapper">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link to={"/home"} className="breadcrumb-link">
                      <IntlMessages id={"home"} />
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to={"/services"} className="breadcrumb-active">
                      {" "}
                      <IntlMessages id={"sidebar.services"} />{" "}
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="slz-woocommerce-setting" data-show={4} />
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
      </Fragment>
    );
  }
}

export default Services;
