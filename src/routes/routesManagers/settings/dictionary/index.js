import React from "react";
import {Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";

const Directory = ({match}) => (
  <Switch>
    <Route path={`${match.url}/position-type`} component={asyncComponent(() => import('./positionType'))}/>
    <Route path={`${match.url}/country`} component={asyncComponent(() => import('./country'))}/>
    <Route path={`${match.url}/region`} component={asyncComponent(() => import('./region'))}/>
    <Route path={`${match.url}/district`} component={asyncComponent(() => import('./district'))}/>
  </Switch>
);

export default Directory;
