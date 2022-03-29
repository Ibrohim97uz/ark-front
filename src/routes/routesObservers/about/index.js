import React, { Component } from "react";
import { Link } from "react-router-dom";
import railWayService from "../../../assets/images/ark-client/images/about.png";
import IntlMessages from "../../../util/IntlMessages";
import ApiRequest from "../../../services";
import api from "../../../services/app";
import Slider from "react-slick";
import "../../../../node_modules/slick-carousel/slick/slick.css";
import "../../../../node_modules/slick-carousel/slick/slick-theme.css";
import { apiFileUrl } from "../../../util/constants";
import Founder from "./Founder";

const { getCertificate } = api;

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificates: [],
    };
  }

  componentDidMount() {
    this.getCertificate();
  }

  getCertificate = () => {
    ApiRequest(getCertificate).then((result) => {
      if (result.success) {
        this.setState({
          certificates: result.certificates,
        });
      }
    });
  };

  ourStaffCertificate = () => {
    const { certificates } = this.state;
    return certificates.map((item) => {
      if (item?.type === "staff") {
        return (
          <div key={item._id}>
            <img src={apiFileUrl + item.image.src} alt="" />
          </div>
        );
      }
    });
  };

  certificateList = () => {
    const { certificates } = this.state;
    return certificates.map((item) => {
      if (item?.type === "firm") {
        return (
          <div key={item._id}>
            <img src={apiFileUrl + item.image.src} alt="" />
          </div>
        );
      }
    });
  };

  render() {
    const { certificates } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow:
        certificates && (certificates.length === 1 || certificates.length === 2)
          ? 5
          : 3,
      // slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2500,
      cssEase: "linear",
    };
    return (
      <React.Fragment>
        <div className=" slz-title-command slz-title-command-blog-about page-title-area ">
          <div className="container">
            <div className="title-command-wrapper">
              <h1 className="title">
                <IntlMessages id={"about"} />
              </h1>
              <div className="breadcrumb-wrapper">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link className="breadcrumb-link" to={"/home"}>
                      <IntlMessages id={"home"} />
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link className="breadcrumb-active" to={"/about_us"}>
                      <IntlMessages id={"about"} />
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
                      {/*<div className="vc_row wpb_row vc_row-fluid">*/}
                      {/*  <div className="wpb_column vc_column_container vc_col-sm-12">*/}
                      {/*    <div className="vc_column-inner ">*/}
                      {/*      <div className="wpb_wrapper">*/}
                      {/*        <div className="slz-shortcode sc_main_title main-title-1470879385e6926f70728e   style-1   vc_custom_1528274543159">*/}
                      {/*          <div className="slz-main-title text-center">*/}
                      {/*            <h2 className="title">*/}
                      {/*              <IntlMessages id={"about"} />*/}
                      {/*            </h2>*/}
                      {/*            <div className="subtitle">*/}
                      {/*              <span className="subtitle-inner">*/}
                      {/*                <IntlMessages id={"aboutTitles"} />*/}
                      {/*              </span>*/}
                      {/*            </div>*/}
                      {/*          </div>*/}
                      {/*        </div>*/}
                      {/*      </div>*/}
                      {/*    </div>*/}
                      {/*  </div>*/}
                      {/*</div>*/}

                      <Founder />

                      <h1
                        style={{
                          textAlign: "center",
                          color: "#000",
                          fontWeight: "700",
                          marginBottom: "50px",
                        }}
                      >
                        <IntlMessages id={"ourTeam"} />
                      </h1>
                      <div className="vc_row wpb_row vc_row-fluid">
                        <div className="wpb_column vc_column_container vc_col-sm-12">
                          <div className="vc_column-inner ">
                            <div className="wpb_wrapper">
                              <div className="vc_row wpb_row vc_inner vc_row-fluid">
                                <div className="wpb_column vc_column_container col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-5">
                                  <div className="vc_column-inner ">
                                    <div className="wpb_wrapper">
                                      <div className="wpb_single_image wpb_content_element vc_align_center">
                                        <figure className="wpb_wrapper vc_figure">
                                          <div className="vc_single_image-wrapper   vc_box_border_grey">
                                            <img
                                              width="682"
                                              height="564"
                                              src={railWayService}
                                              className="vc_single_image-img attachment-full"
                                              alt=""
                                              sizes="(max-width: 682px) 100vw, 682px"
                                              style={{ borderRadius: "50px" }}
                                            />
                                          </div>
                                        </figure>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="wpb_column vc_column_container col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="vc_column-inner ">
                                    <div className="wpb_wrapper">
                                      <h4 className="media-heading font-weight  text-center">
                                        <IntlMessages id={"about"} />
                                      </h4>
                                      <div className="wpb_text_column wpb_content_element text-justify">
                                        <div className="wpb_wrapper">
                                          <p>
                                            <IntlMessages id={"aboutUsText1"} />
                                          </p>
                                          <p>
                                            <IntlMessages id={"aboutUsText2"} />
                                          </p>
                                          <p>
                                            <IntlMessages id={"aboutUsText3"} />
                                          </p>
                                          <p>
                                            <IntlMessages id={"aboutUsText4"} />
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="wpb_column vc_column_container col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                  <div className="vc_column-inner ">
                                    <div className="wpb_wrapper">
                                      <h4 className="media-heading font-weight  text-center">
                                        <IntlMessages id={"ourMission"} />
                                      </h4>
                                      <div className="wpb_text_column wpb_content_element text-center">
                                        <div className="wpb_wrapper">
                                          <p>
                                            <IntlMessages id={"aboutDesc1"} />
                                          </p>
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
                    <footer className="entry-footer"></footer>
                  </div>
                </div>
                <div className="clearfix" />
              </div>
            </div>
          </div>
        </div>

        <div className="slz-woocommerce-setting" data-show="4" />
        {/*<div className="slz-main-content ">*/}
        {/*  <div className="container">*/}
        {/*    <div className="row justify-content-center">*/}
        {/*      <div className="col-12 col-sm-12 col-xs-12 col-md-4 col-lg-4 col-xl-4">*/}
        {/*        <h1 className="media-heading font-weight">*/}
        {/*          <IntlMessages id={"why_us"} />*/}
        {/*        </h1>*/}
        {/*        <p className="mb-0">*/}
        {/*          <strong>*/}
        {/*            <IntlMessages id={"page.login.app.title.one_top"} />*/}
        {/*          </strong>*/}
        {/*          <IntlMessages id={"whyTitle1"} />*/}
        {/*        </p>*/}
        {/*        <p className="mb-0">*/}
        {/*          <IntlMessages id={"whyTitle2"} />*/}
        {/*        </p>*/}
        {/*        <p className="mb-0">*/}
        {/*          <IntlMessages id={"whyTitle3"} />*/}
        {/*        </p>*/}
        {/*        <p className="mb-0">*/}
        {/*          <IntlMessages id={"whyTitle4"} />*/}
        {/*        </p>*/}
        {/*        <p className="mb-0">*/}
        {/*          <IntlMessages id={"whyTitle5"} />*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*      <div className="col-12 col-sm-12 col-xs-12 col-md-8 col-lg-8 col-xl-8">*/}
        {/*        <h1 className="media-heading font-weight">*/}
        {/*          <IntlMessages id={"interesting"} />*/}
        {/*        </h1>*/}
        {/*        <div className="row">*/}
        {/*          <div className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-6 ">*/}
        {/*            <i className="mb-5">*/}
        {/*              <IntlMessages id={"interDesc1"} />*/}
        {/*            </i>*/}

        {/*            <h5 className="media-heading font-weight my-3">*/}
        {/*              <i>*/}
        {/*                <IntlMessages id={"author1"} />{" "}*/}
        {/*              </i>*/}
        {/*            </h5>*/}

        {/*            <i>*/}
        {/*              <IntlMessages id={"interDesc2"} />*/}
        {/*            </i>*/}

        {/*            <h5 className="media-heading font-weight mt-3">*/}
        {/*              <i>*/}
        {/*                <IntlMessages id={"author2"} />*/}
        {/*              </i>*/}
        {/*            </h5>*/}
        {/*          </div>*/}
        {/*          <div className="col-12 col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-6">*/}
        {/*            <div className="-font-italic">*/}
        {/*              <i>*/}
        {/*                <IntlMessages id={"interDesc3"} />*/}
        {/*              </i>*/}
        {/*            </div>*/}
        {/*            <h5 className="media-heading font-weight mt-3">*/}
        {/*              <i>*/}
        {/*                <IntlMessages id={"author3"} />*/}
        {/*              </i>*/}
        {/*            </h5>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="pb-5">
          <div className="container">
            <div className="sc_main_title style-1">
              <div className="slz-main-title">
                <h2 className="title text-center">
                  <IntlMessages id={"ourCertificate"} />
                </h2>
                {/* <div className="subtitle text-center">
                  <span className="subtitle-inner">
                    <IntlMessages id={"aboutFooter"} />
                  </span>
                </div> */}
              </div>
              <div className="row justify-content-center my-5">
                {certificates && certificates.length !== 0 ? (
                  <div className="container">
                    <style>{cssstyle}</style>
                    <Slider {...settings}>{this.certificateList()}</Slider>
                  </div>
                ) : (
                  <div className="col-md-12 text-center">
                    <div className="slz-main-title font-weight">
                      <h1>
                        <IntlMessages id={"empty"} />
                      </h1>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pb-5">
          <div className="container">
            <div className="sc_main_title style-1">
              <div className="slz-main-title">
                <h2 className="title text-center">
                  <IntlMessages id={"ourStaffCertificate"} />
                </h2>
                <div className="subtitle text-center">
                  <span className="subtitle-inner">
                    <IntlMessages id={"aboutFooter"} />
                  </span>
                </div>
              </div>
              <div className="row justify-content-center my-5">
                {certificates && certificates.length !== 0 ? (
                  <div className="container">
                    <style>{cssstyle}</style>
                    <Slider {...settings}>{this.ourStaffCertificate()}</Slider>
                  </div>
                ) : (
                  <div className="col-md-12 text-center">
                    <div className="slz-main-title font-weight">
                      <h1>
                        <IntlMessages id={"empty"} />
                      </h1>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const cssstyle = `
	h3 {
			background: #5f9ea0;
			color: #fff;
			font-size: 36px;
			line-height: 100px;
			margin: 10px;
			padding: 2%;
			position: relative;
			text-align: center;
	}
	.slick-next:before, .slick-prev:before {
			color: #000;
	}`;

export default About;
