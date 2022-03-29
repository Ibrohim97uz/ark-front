import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";

const Directory = ({match}) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/news`}/>
    <Route path={`${match.url}/news`} component={asyncComponent(() => import('./news'))}/>
    <Route path={`${match.url}/profile`} component={asyncComponent(() => import('./profile'))}/>
    <Route path={`${match.url}/services`} component={asyncComponent(() => import('./services'))}/>
    <Route path={`${match.url}/certificate`} component={asyncComponent(() => import('./certificate'))}/>
    <Route path={`${match.url}/gallery`} component={asyncComponent(() => import('./gallery'))}/>
    <Route path={`${match.url}/fleet`} component={asyncComponent(() => import('./fleet'))}/>
    <Route path={`${match.url}/vacancy`} component={asyncComponent(() => import('./vacancy'))}/>
    <Route path={`${match.url}/moderators`} component={asyncComponent(() => import('./moderators'))}/>
    <Route path={`${match.url}/dictionary`} component={asyncComponent(() => import('./dictionary'))}/>>
  </Switch>
);

export default Directory;
