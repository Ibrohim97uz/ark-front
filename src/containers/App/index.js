import React, {Component} from "react";
import {connect} from "react-redux";
import URLSearchParams from 'url-search-params'
import { Redirect, Route, Switch} from "react-router-dom";
import {ConfigProvider} from "antd";
import {IntlProvider} from "react-intl";
import AppLocale from "locales";
import config from "../../util/config"
import MainApp from "./MainApp";
import Login from "../../routes/login";
import NotFound404 from "../../routes/404";
import ClientApp from "./ClientApp";
import {onLayoutTypeChange, onNavStyleChange, setThemeType,updateState} from "../../redux/setting/action";
import {onAuthUser} from "../../redux/auth/action";

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../constants/ThemeSetting";
import ApiRequest from "../../services";

import api from "../../services/app"
import {TOKEN_NAME} from "../../util/constants";
const { getResume, getSuggestionAndQuestion,userMe} = api;

const {openPages, adminPages, moderatorPages} = config;
const RestrictedRoute = ({component: Component, authUser, ...rest}) => (
  <Route{...rest} render={props => <Component {...props} />}/>);


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      auth:false
    };
    this.getInitPage = this.getInitPage.bind(this);
  }

  setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('full-layout');
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove('full-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('boxed-layout');
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('full-layout');
      document.body.classList.add('framed-layout');
    }
  };

  setNavStyle = (navStyle) => {
    if (navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER) {
      document.body.classList.add('full-scroll');
      document.body.classList.add('horizontal-layout');
    } else {
      document.body.classList.remove('full-scroll');
      document.body.classList.remove('horizontal-layout');
    }
  };

  componentDidMount() {
    if (this.props.location.pathname==="/login" || adminPages.includes(this.props.location.pathname) || moderatorPages.includes(this.props.location.pathname) || this.props.location.pathname.includes("/main/client/") ){
      this.getUserMe();
    }
    if (this.props.location.pathname!=="/login" || adminPages.includes(this.props.location.pathname) || moderatorPages.includes(this.props.location.pathname) || this.props.location.pathname.includes("/main/client/") ){
      this.getData();
    }
    const params = new URLSearchParams(this.props.location.search);

    if (params.has("theme")) {
      this.props.setThemeType(params.get('theme'));
    }
    if (params.has("nav-style")) {
      this.props.onNavStyleChange(params.get('nav-style'));
    }
    if (params.has("layout-type")) {
      this.props.onLayoutTypeChange(params.get('layout-type'));
    }

  }

  getData=()=>{
      this.getInit()
  }



  getUserMe = () => {
    ApiRequest(userMe).then((result) => {
      if (result.success) {
        this.props.onAuthUser(result.object);
      } else {
        this.setState({
          auth:true
        });
        localStorage.removeItem(TOKEN_NAME);
        this.props.onAuthUser(null);
      }
    })
  };


  getInit = () => {
    ApiRequest(getResume).then((result) => {
      if (result.success) {
        this.props.updateState({resume:result.object});
      }
    });
    ApiRequest(getSuggestionAndQuestion).then((result) => {
      if (result.success) {
        this.props.updateState({suggestionAndQuestion:result.object});
      }
    });
  }

  getInitPage = (path) => {
    // if (path.includes('/login') && this.state.auth){
    //   return  <Route exact path={'/login'} component={Login}/>
    // }
    if (openPages.includes(path) || path.includes('/service/') || path.includes('/news/') || path.includes('/blog/')) {
      return   <Route exact path={'/**'} component={ClientApp}/>
    }

    if (this.props.authUser !== null && this.props.authUser.roles[0].name === "ROLE_ADMIN" &&  adminPages.includes(path) + '||'+  path.includes("/main/client/")) {
      return <RestrictedRoute path={`${this.props.match.url}`} authUser={this.props.authUser}
                              component={MainApp}/>
    }
    if (this.props.authUser !== null &&  this.props.authUser.roles[0].name === "ROLE_MODERATOR" &&  moderatorPages.includes(path) + '||'+  path.includes("/main/client/")) {
      return <RestrictedRoute path={`${this.props.match.url}`} authUser={this.props.authUser}
                              component={MainApp}/>
    }

    if (this.props.authUser === null && path==="/login" &&  !openPages.includes(path) + '&&'+  (!path.includes('/service/') + '||'+  !path.includes('/news/') + '||'+  !path.includes('/blog/'))) {
      return <Route exact path={path} component={NotFound404}/>
    }

    if (this.props.authUser +'!=='+ null && !openPages.includes(path) + '&&'+  (!path.includes('/service/') + '||'+  !path.includes('/news/') + '||'+  !path.includes('/blog/'))) {
      return <Route exact path={path} component={NotFound404}/>
    }

  };


  render() {
    const {location, layoutType, navStyle, locale,authUser} = this.props;
    if (authUser && location.pathname==='/login'){
      return <Redirect to={'/main/dashboard'}/>
    }
    if (location.pathname === '/' ||  location.pathname === '') {
      return (<Redirect to={'/home'}/>);
    }

    this.setLayoutType(layoutType);

    this.setNavStyle(navStyle);
    const currentAppLocale = AppLocale[locale.locale];
    return (
      <ConfigProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}>
          <Switch>
            <Route exact path={'/login'} component={Login}/>
            {this.getInitPage(location.pathname)}
          </Switch>
        </IntlProvider>
      </ConfigProvider>
    )
  }
}

const mapStateToProps = ({settings, auth}) => {
  const {locale, navStyle, layoutType} = settings;
  const {authUser, initURL} = auth;
  return {locale, navStyle, layoutType, authUser, initURL}
};
export default connect(mapStateToProps, {
  setThemeType,
  onNavStyleChange,
  onLayoutTypeChange,
  onAuthUser,
  updateState
})(App);
