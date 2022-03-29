import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "../Layout/Navigation";
import Home from "../../routes/routesObservers/home";
import About from "../../routes/routesObservers/about";
import Services from "../../routes/routesObservers/services";
import Gallery from "../../routes/routesObservers/gallery";
import Fleet from "../../routes/routesObservers/fleet";
import ServiceInfo from "../../routes/routesObservers/service";
import Blog from "../../routes/routesObservers/blog";
import Tracking from "../../routes/routesObservers/tracking";
import NewsInfo from "../../routes/routesObservers/news-info";
import Contact from "../../routes/routesObservers/contact";
import Footer from "../Layout/Footer";
import NotFound404 from "../../routes/404";

class ClientApp extends Component {
  render() {
    const { location, locale } = this.props;
    return (
      <Switch>
        <div id="page" className="body-wrapper">
          <div className="slz-wrapper-content">
            <Navigation location={location} locale={locale} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/fleet" component={Fleet} />
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/services" component={Services} />
            <Route exact path="/service/:id" component={ServiceInfo} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/tracking" component={Tracking} />
            <Route exact path="/blog/:page" component={Blog} />
            <Route exact path="/news/:id" component={NewsInfo} />
            <Route exact path="/contact" component={Contact} />
            <Footer />
          </div>
        </div>
        <div className="btn-wrapper back-to-top">
          <Link to="#top" className="btn btn-transparent">
            <i className="icon-chevron-up" />
          </Link>
        </div>
        <Route exact component={NotFound404} />
      </Switch>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => {
  const { locale, navStyle, layoutType } = settings;
  const { authUser, initURL } = auth;
  return { locale, navStyle, layoutType, authUser, initURL };
};
export default connect(mapStateToProps, null)(ClientApp);
