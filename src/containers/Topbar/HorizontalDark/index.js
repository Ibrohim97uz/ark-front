import React, {Component} from "react";
import {Layout, Popover,Tooltip} from 'antd';
import {connect} from "react-redux";
import CustomScrollbars from "util/CustomScrollbars";

import UserInfo from "components/UserInfo";
import {Link} from "react-router-dom";
import HorizontalNav from "../HorizontalNav";
import {switchLanguage, toggleCollapsedSideNav} from "../../../redux/setting/action";
import config from '../../../util/config'
import {intlMessages} from "../../../util/IntlMessages";

const {locales} = config;
const {Header} = Layout;


class HorizontalDark extends Component {

    state = {
        searchText: '',
    };

    languageMenu = () => (
        <CustomScrollbars className="gx-popover-lang-scroll">
            <ul className="gx-sub-popover">
                {locales.map(language =>
                    <li className="gx-media gx-pointer" key={JSON.stringify(language)} onClick={(e) =>
                        this.props.switchLanguage(language)
                    }>
                        <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`}/>
                        <span className="gx-language-text">{language.name}</span>
                    </li>
                )}
            </ul>
        </CustomScrollbars>);


    render() {
        const {locale, navCollapsed,suggestionAndQuestion} = this.props;

        return (
            <div className="gx-header-horizontal gx-header-horizontal-dark">
                <Header
                    className="gx-header-horizontal-main">
                    <div className="gx-container">
                        <div className="gx-header-horizontal-main-flex">

                            <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3">
                                <i className="gx-icon-btn icon icon-menu"
                                   onClick={() => {
                                       this.props.toggleCollapsedSideNav(!navCollapsed);
                                   }}
                                />

                            </div>
                            <Link to="/main/dashboard" className="gx-d-block gx-d-lg-none gx-pointer gx-w-logo">
                                <img alt="" src={require("assets/images/ark-client/logo-white.png")}
                                     height={50}/></Link>
                            <Link to="/main/dashboard" className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo">
                                <img alt="" src={require("assets/images/ark-client/logo-white.png")}
                                     height={40}/></Link>
                            <ul className="gx-header-notifications gx-ml-auto">
                              <li className="gx-notify">
                                <Tooltip placement="topLeft"
                                         title={intlMessages({en: 'Suggestion and Question', ru: 'Предложение и вопрос', uz: 'Taklif va savol'})}>
                                  <Link to={'/main/suggestion-and-question'}>
                                        <span className="gx-pointer gx-status-pos gx-d-block">
                                            <i className="icon icon-email"/>
                                          {suggestionAndQuestion && suggestionAndQuestion.filter(item => item.isStatus === false).length !== 0 &&
                                          <span className={'gx-status gx-status-rtl gx-small gx-orange'}/>}
                                        </span>
                                  </Link>
                                </Tooltip>
                              </li>
                              <li className="gx-msg">
                                <Tooltip placement="topLeft" title={intlMessages({en: 'Resume', ru: 'Резюме', uz: 'Rezyume'})}>
                                  <Link to={'/hr/resume'}>
                                        <span className="gx-pointer gx-status-pos gx-d-block">
                                            <i className="icon icon-auth-screen"/>
                                            <span className="gx-status gx-status-rtl gx-small gx-orange"/>
                                        </span>
                                  </Link>
                                </Tooltip>
                              </li>
                              <li className="gx-msg">
                                <Tooltip placement="topLeft" title={intlMessages({en: 'News', ru: 'Новости', uz: 'Yangiliklar'})}>
                                  <Link to={'/settings/news'}>
                                        <span className="gx-pointer gx-status-pos gx-d-block">
                                            <i className="icon icon-copy"/>
                                        <span className="gx-status gx-status-rtl gx-small gx-orange"/>
                                        </span>
                                  </Link>
                                </Tooltip>
                              </li>

                                <li className="gx-language">
                                    <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                                             content={this.languageMenu()} trigger="click">
              <span className="gx-pointer gx-flex-row gx-align-items-center"><i
                  className={`flag flag-24 flag-${locale.icon}`}/>
              </span>
                                    </Popover>
                                </li>

                                <li className="gx-user-nav"><UserInfo/></li>
                            </ul>
                        </div>
                    </div>
                </Header>
                <div className="gx-header-horizontal-nav gx-header-horizontal-nav-curve gx-d-none gx-d-lg-block">
                    <div className="gx-container">
                        <div className="gx-header-horizontal-nav-flex">
                            <HorizontalNav/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({settings}) => {
    const {locale, navCollapsed,suggestionAndQuestion} = settings;
    return {locale, navCollapsed,suggestionAndQuestion}
};
export default connect(mapStateToProps, {toggleCollapsedSideNav, switchLanguage})(HorizontalDark);
