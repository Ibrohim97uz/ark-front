import React, { Component, Fragment } from "react";
import { Popover } from "antd";
import CustomScrollbars from "util/CustomScrollbars";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";
import { switchLanguage } from "../../redux/setting/action";
import config from "../../util/config";

const { locales } = config;
const layoutStyle = {
  paddingLeft: "80px",
  paddingRight: "140px",
};

class Header extends Component {
  languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {locales.map((language) => (
          <li
            className="gx-media gx-pointer"
            key={JSON.stringify(language)}
            onClick={(e) => this.props.switchLanguage(language)}
          >
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
            <span className="gx-language-text">{language.name}</span>
          </li>
        ))}
      </ul>
    </CustomScrollbars>
  );

  render() {
    const { locale, location } = this.props;
    return (
      <Fragment>
        <header>
          <div className="slz-header-wrapper header-transparent slz-header-mobile-topbar">
            <div className="slz-header-main slz-header-sticky ">
              <div className="container-fluid" style={layoutStyle}>
                <div className="slz-hamburger-menu">
                  <div className="bar" />
                </div>
                <div className="slz-main-menu-mobile">
                  <div className="slz-mobile-topbar">
                    <div className="slz-topbar-list float-r">
                      <div className="social">
                        <Link to="#" target={"_blank"} className={"link mx-3"}>
                          <span className="nnb-icon icon-facebook" />
                        </Link>
                        <Link to="#" target={"_blank"} className={"link mx-3"}>
                          <span className="nnb-icon icon-google" />
                        </Link>
                        <Link to="#" target={"_blank"} className={"link mx-3"}>
                          <span className="nnb-icon icon-linkedin" />
                        </Link>
                        <Link to="#" target={"_blank"} className={"link mx-3"}>
                          <span className="nnb-icon icon-instagram" />
                        </Link>
                        <Link to="#" target={"_blank"} className={"link mx-3"}>
                          <span className="nnb-icon icon-twitter" />
                        </Link>
                      </div>
                    </div>
                    <div className="clearfix" />
                  </div>
                  <ul
                    id="menu-custom-main-site-menu"
                    className="nav navbar-nav slz-menu-wrapper"
                  >
                    <li
                      id="menu-item-2765"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item current_page_item"
                    >
                      <Link to="/home" onClick={window.location.reload}>
                        <IntlMessages id={"home"} />
                      </Link>
                      <span className="icon-dropdown-mobile fa fa-angle-down" />
                    </li>
                    <li
                      id="menu-item-2942"
                      className="menu-item menu-item-type-post_type menu-item-object-page  page_item page-item-48  menu-item-2942"
                    >
                      <Link to="/about">
                        <IntlMessages id={"about"} />
                      </Link>
                      <span className="icon-dropdown-mobile fa fa-angle-down" />
                    </li>
                    <li
                      id="menu-item-2770"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-2770"
                    >
                      <Link to="/services">
                        <IntlMessages id={"sidebar.services"} />
                      </Link>
                      <span className="icon-dropdown-mobile fa fa-angle-down" />
                    </li>
                    <li
                      id="menu-item-2770"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-2770"
                    >
                      <Link to="/gallery">
                        <IntlMessages id={"gallery"} />
                      </Link>
                      <span className="icon-dropdown-mobile fa fa-angle-down" />
                    </li>
                    <li
                      id="menu-item-2770"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-2770"
                    >
                      <Link to="/fleet">
                        <IntlMessages id={"fleet"} />
                      </Link>
                      <span className="icon-dropdown-mobile fa fa-angle-down" />
                    </li>
                    <li
                      id="menu-item-2767"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2767"
                    >
                      <Link to="/blog">
                        <IntlMessages id={"blog"} />
                      </Link>
                      <span className="icon-dropdown-mobile fa fa-angle-down" />
                    </li>
                    <li
                      id="menu-item-2767"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2767"
                    >
                      <Link to="/tracking">
                        <IntlMessages id={"tracking"} />
                      </Link>
                      <span className="icon-dropdown-mobile fa fa-angle-down" />
                    </li>
                    <li
                      id="menu-item-2769"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2769"
                    >
                      <Link to="/contact">
                        <IntlMessages id={"contact"} />
                      </Link>
                      <span className="icon-dropdown-mobile fa fa-angle-down" />
                    </li>
                    <li
                      id="menu-item-2770"
                      className="gx-language  nnb-language-block-mobile  menu-item menu-item-type-post_type menu-item-object-page menu-item-2769"
                    >
                      <Popover
                        overlayClassName="gx-popover-horizantal"
                        placement="bottomRight"
                        style={{ top: "-20px" }}
                        content={this.languageMenu()}
                        trigger="click"
                      >
                        <span className="gx-pointer gx-flex-row gx-align-items-center">
                          <i
                            className={`flag flag-24 mr-2 flag-${
                              locale && locale.icon
                            }`}
                          />
                          <span className="gx-language-text">
                            {locale && locale.name}
                          </span>
                        </span>
                      </Popover>
                    </li>
                  </ul>
                </div>
                <div className="slz-logo-wrapper float-l">
                  <Link to="/home" className="logo">
                    <img
                      src={require("assets/images/ark-client/logo-black.png")}
                      alt="Ark-Logistics &amp; Logistics"
                      title=""
                      className="img-responsive logo-header-transparent"
                    />
                    <img
                      src={require("assets/images/ark-client/logo-black.png")}
                      alt="Ark-Logistics &amp; Logistics"
                      title=""
                      className="img-responsive"
                    />
                  </Link>
                </div>
                <div className="slz-main-menu float-r">
                  <ul
                    id="menu-custom-main-site-menu"
                    className="nav navbar-nav slz-menu-wrapper"
                  >
                    <li
                      id="menu-item-2765"
                      className={
                        location.pathname === "/home"
                          ? "menu-item menu-item-type-post_type menu-item-object-page  current-menu-item"
                          : "menu-item menu-item-type-post_type menu-item-object-page"
                      }
                    >
                      <Link to="/home" onClick={window.location.reload}>
                        <IntlMessages id={"home"} />
                      </Link>
                      <span className="icon-dropdown-mobile fa fa-angle-down" />
                    </li>
                    <li
                      id="menu-item-2942"
                      className={
                        location.pathname === "/about"
                          ? "menu-item menu-item-type-post_type menu-item-object-page  current-menu-item"
                          : "menu-item menu-item-type-post_type menu-item-object-page"
                      }
                    >
                      <Link to="/about">
                        <IntlMessages id={"about"} />
                      </Link>
                      <span className="icon-dropdown-mobile fa fa-angle-down" />
                    </li>
                    <li
                      id="menu-item-2770"
                      className={
                        location.pathname === "/services"
                          ? "menu-item menu-item-type-post_type menu-item-object-page  current-menu-item"
                          : "menu-item menu-item-type-post_type menu-item-object-page"
                      }
                    >
                      <Link to="/services">
                        <IntlMessages id={"sidebar.services"} />
                      </Link>
                      <span className="icon-dropdown-mobile fa fa-angle-down" />
                    </li>
                    <li
                      id="menu-item-2770"
                      className={
                        location.pathname === "/gallery"
                          ? "menu-item menu-item-type-post_type menu-item-object-page  current-menu-item"
                          : "menu-item menu-item-type-post_type menu-item-object-page"
                      }
                    >
                      <Link to="/gallery">
                        <IntlMessages id={"gallery"} />
                      </Link>
                      <span className="icon-dropdown-mobile fa fa-angle-down" />
                    </li>
                    <li
                      id="menu-item-2770"
                      className={
                        location.pathname === "/fleet"
                          ? "menu-item menu-item-type-post_type menu-item-object-page  current-menu-item"
                          : "menu-item menu-item-type-post_type menu-item-object-page"
                      }
                    >
                      <Link to="/fleet">
                        <IntlMessages id={"fleet"} />
                      </Link>
                      <span className="icon-dropdown-mobile fa fa-angle-down" />
                    </li>
                    <li
                      id="menu-item-2767"
                      className={
                        location.pathname === "/blog"
                          ? "menu-item menu-item-type-post_type menu-item-object-page  current-menu-item"
                          : "menu-item menu-item-type-post_type menu-item-object-page"
                      }
                    >
                      <Link to="/blog">
                        <IntlMessages id={"blog"} />
                      </Link>
                      <span className="icon-dropdown-mobile fa fa-angle-down" />
                    </li>
                    <li
                      id="menu-item-2767"
                      className={
                        location.pathname === "/tracking"
                          ? "menu-item menu-item-type-post_type menu-item-object-page  current-menu-item"
                          : "menu-item menu-item-type-post_type menu-item-object-page"
                      }
                    >
                      <Link to="/tracking">
                        <IntlMessages id={"tracking"} />
                      </Link>
                      <span className="icon-dropdown-mobile fa fa-angle-down" />
                    </li>
                    <li
                      id="menu-item-2769"
                      className={
                        location.pathname === "/contact"
                          ? "menu-item menu-item-type-post_type menu-item-object-page  current-menu-item"
                          : "menu-item menu-item-type-post_type menu-item-object-page"
                      }
                    >
                      <Link to="/contact">
                        <IntlMessages id={"contact"} />
                      </Link>
                      <span className="icon-dropdown-mobile fa fa-angle-down" />
                    </li>
                    <li
                      id="menu-item-2770"
                      className="gx-language nnb-language-block  menu-item menu-item-type-post_type menu-item-object-page "
                    >
                      <Popover
                        overlayClassName="gx-popover-horizantal"
                        placement="bottomRight"
                        content={this.languageMenu()}
                        trigger="click"
                      >
                        <span className="gx-pointer gx-flex-row gx-align-items-center">
                          <i
                            className={`flag flag-24 me-2 flag-${
                              locale && locale.icon
                            }`}
                          />
                          <span className="gx-language-text">
                            {locale && locale.name}
                          </span>
                        </span>
                      </Popover>
                    </li>
                  </ul>
                </div>
                <div className="clearfix" />
              </div>
            </div>
          </div>
        </header>
      </Fragment>
    );
  }
}

export default connect(null, { switchLanguage })(Header);
