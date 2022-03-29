import {UPDATE_STATE,AUTH_USER} from './actionType'

const INIT_STATE = {
  phoneNumber: '',
  password: '',
  checkPhoneProcess: true,
  hasRegistered: false,
  reCaptcha: null,
  intervalId: '',
  confirmationResult: null,
  isVerifyProcess: false,
  code: '',
  lastName: '',
  confirmPassword: '',
  hasPassword: true,
  prePassword: '',
  isLoading: false,
  isAdmin: false,
  authUser:null
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    case AUTH_USER: {
      return {
        ...state,
        authUser:action.payload
      }
    }
    default:
      return state;
  }
}
