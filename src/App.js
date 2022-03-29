import React from "react";
import {Provider} from "react-redux";

import {
  BrowserRouter, Switch,
  Route,
} from "react-router-dom";

import "assets/vendors/style";
import "styles/wieldy.less";
import configureStore  from "./redux/stor";
import "./firebase/firebase";
import app from "./containers/App/index";



export const store = configureStore();
const App = () =>
  <Provider store={store}>
      <BrowserRouter>
          <Switch>
            <Route path="/" component={app}/>
          </Switch>
      </BrowserRouter>
  </Provider>;


export default App;
