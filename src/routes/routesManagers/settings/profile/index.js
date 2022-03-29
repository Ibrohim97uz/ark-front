import React from "react";
import {Route, Switch} from "react-router-dom";
import asyncComponent from "util/asyncComponent";

const Profile = ({match}) => (
    <Switch>
        <Route path={`${match.url}/info`} component={asyncComponent(() => import('./info'))}/>
        <Route path={`${match.url}/password`} component={asyncComponent(() => import('./password'))}/>
    </Switch>
);

export default Profile;
