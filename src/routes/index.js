import React from "react";
import {Route, Switch} from "react-router-dom";
import Login from "./login";

import Main from "./routesManagers/main";
import Settings from "./routesManagers/settings";
import HR from "./routesManagers/hr";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}login`} component={Login}/>
      <Route path={`${match.url}settings`} component={Settings}/>
      <Route path={`${match.url}main`} component={Main}/>
      <Route path={`${match.url}hr`} component={HR}/>
    </Switch>
  </div>
);

export default App;
