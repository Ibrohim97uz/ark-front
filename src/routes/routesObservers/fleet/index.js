import React, { Component } from "react";
import { Link } from "react-router-dom";
import IntlMessages, { intlMessages } from "../../../util/IntlMessages";
import man from "../../../assets/images/ark-client/man.jpg";
import labo from "../../../assets/images/ark-client/labo.jpg";
import ApiRequest from "../../../services";
import api from "../../../services/app";
import { apiFileUrl } from "../../../util/constants";
const { getFleet } = api;
class Fleet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fleet: [],
    };
  }

  componentDidMount() {
    this.getFleet();
  }

  getFleet = () => {
    ApiRequest(getFleet).then((result) => {
      if (result.success) {
        this.setState({
          fleet: result.fleet,
        });
      }
    });
  };

  getFleetList = () => {
    const { fleet } = this.state;
    if (fleet && fleet.length !== 0) {
      return fleet.map((item) => (
        <div className="card-block">
          <div className="card-info">
            <h6 className="card-item-title">
              {intlMessages({
                en: item.titleEn,
                ru: item.titleRu,
                uz: item.titleUz,
              })}
            </h6>
            <div
              className="card-item-description"
              dangerouslySetInnerHTML={{
                __html: intlMessages({
                  en: item.descriptionEn,
                  ru: item.descriptionRu,
                  uz: item.descriptionUz,
                }),
              }}
            />
          </div>
          <div className="card-img">
            <img alt="Img" src={apiFileUrl + item.attachment.id} />
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
      <React.Fragment>
        <div className=" slz-title-command slz-title-command-blog-gallery page-title-area ">
          <div className="container">
            <div className="title-command-wrapper">
              <h1 className="title">
                <IntlMessages id={"fleet"} />
              </h1>
              <div className="breadcrumb-wrapper">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link className="breadcrumb-link" to={"/fleet"}>
                      <IntlMessages id={"fleet"} />
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link className="breadcrumb-active" to={"/fleet"}>
                      <IntlMessages id={"fleet"} />
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="slz-woocommerce-setting" data-show="4" />
        <div className="slz-main-content ">
          <div className="container">
            <div className="slz-blog-detail slz-posts ">
              <div className="row">
                <div
                  id="page-content"
                  className="col-md-12 col-sm-12 col-xs-12 slz-content-column"
                >
                  <div className="page-detail-wrapper">
                    <div className="entry-content">
                      <div className="vc_row wpb_row vc_row-fluid">
                        <div className="wpb_column vc_column_container vc_col-sm-12">
                          <div className="vc_column-inner ">
                            <div className="wpb_wrapper">
                              <div className="fleet">{this.getFleetList()}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <footer className="entry-footer"></footer>
                </div>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Fleet;
