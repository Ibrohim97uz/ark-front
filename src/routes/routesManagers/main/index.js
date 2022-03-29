import React from "react";
import {Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";

const Directory = ({match}) => (
    <Switch>
        <Route path={`${match.url}/dashboard`} component={asyncComponent(() => import('./dashboard'))}/>
        <Route path={`${match.url}/suggestion-and-question`} component={asyncComponent(() => import('./suggestion-and-question'))}/>
        <Route path={`${match.url}/clients`} component={asyncComponent(() => import('./clients'))}/>
        <Route path={`${match.url}/client/:id`} component={asyncComponent(() => import('./clients/client'))}/>
    </Switch>
);

export default Directory;
