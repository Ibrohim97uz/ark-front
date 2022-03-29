import React from "react";
import {Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";

const Directory = ({match}) => (
    <Switch>
        <Route path={`${match.url}/staffs`} component={asyncComponent(() => import('./staffs'))}/>
        <Route path={`${match.url}/resume`} component={asyncComponent(() => import('./resume'))}/>
    </Switch>
);

export default Directory;
