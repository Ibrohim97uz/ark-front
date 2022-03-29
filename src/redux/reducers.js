import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./setting/reducer";
import Auth from "./auth/reducer";
const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,

});

export default reducers;
