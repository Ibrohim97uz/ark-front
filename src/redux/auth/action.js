import { UPDATE_STATE, AUTH_USER} from "./actionType"



export const updateState = (data) => {
  return {
    type: UPDATE_STATE,
    payload: data
  }
};

export const onAuthUser = (data) => {
  return {
    type: AUTH_USER,
    payload:data
  }

};



