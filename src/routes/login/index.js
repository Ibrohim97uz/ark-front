import React from "react";
import { Link, Redirect } from "react-router-dom";
import {connect} from "react-redux";
import firebase from 'firebase/app';
import {parsePhoneNumber} from 'libphonenumber-js'
import {MaskedInput} from "antd-mask-input";
import {TOKEN_NAME} from "util/constants"
import {Button, Col, Form, Input, Row, notification} from "antd";
import ApiRequest from '../../services/index';
import api from '../../services/app';
import loginBack from '../../assets/images/ark-client/login-back.jpg'
import {firebaseAuth} from '../../firebase/firebase';
import IntlMessages, {intlMessages} from "../../util/IntlMessages";
import {onAuthUser} from "../../redux/auth/action"

const {userCheckPhone, checkUser, setPassword, signIn, userMe} = api;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    }
  }


  recaptchaVerifier = null;

  componentDidMount() {
    let cont = document.getElementById('reCaptcha');
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(cont, {
      'size': 'invisible',
      'callback': (res) => {
      },
      'expired-callback': () => {
      },
      'error-callback': () => {
        this.setState({
          isNotify: true,
          isLoading: false,
          toasterProps: {
            message: 'Xatolik yuz berdi qaytadan urunib ko\'ring'
          }
        });
        notification.warning({
          key: 'warning',
          message: intlMessages({
            en: "An error occurred. Please try again",
            ru: "Произошла ошибка. Пожалуйста, попробуйте еще раз",
            uz: "Xatolik yuz berdi qaytadan urunib ko'ring"
          }),
        });
      }
    });
    this.recaptchaVerifier.render();
    this.setState({
      reCaptcha: this.recaptchaVerifier
    })

  }

  checkPhone = (payload) => {
    ApiRequest(userCheckPhone, {phoneNumber: payload}).then(result => {
      if (result.success) {
        this.setState({
          checkPhoneProcess: false,
          hasRegistered: result.hasRegistered,
          hasPassword: result.hasPassword,
          isAdmin: result.isAdmin,
          isLoading: false
        });
      } else {
        return <Redirect to={'/login'}/>
      }
    });

  };
  checkState = (phoneNumber) => {
    try {
      if (parsePhoneNumber(phoneNumber).isValid()) {
        this.setState({isLoading: true});
        this.checkPhone(phoneNumber);
      } else {
        this.setState({checkPhoneProcess: true, hasRegistered: false})
      }
    } catch (e) {
      this.setState({checkPhoneProcess: true, hasRegistered: false})
    }
  };
  checkUser = () => {
    let {password, phoneNumber} = this.state;
    return ApiRequest(checkUser, {password, phoneNumber})
  };
  sign = (payload) => {
    this.setState({isLoading: true});
    if (!payload.hasPassword) {
      let setPasswordBody = {
        phoneNumber: payload.phoneNumber,
        password: payload.password,
        prePassword: payload.prePassword
      };
      ApiRequest(setPassword, setPasswordBody).then(res => {
        if (res.success) {
          this.setState({hasPassword: true})
        }
      });
      this.signInOrSignUp(payload)
    } else {
      this.signInOrSignUp(payload)
    }
  };
  signInOrSignUp = (payload) => {
    let reqBody = {};
    if (payload.hasRegistered) {
      reqBody = {phoneNumber: payload.phoneNumber, password: payload.password}
    } else {
      reqBody = payload
    }
    ApiRequest(signIn, reqBody).then((data) => {
      this.setState({verificationCode: ''});
      if (data.body && data.body.accessToken !== undefined) {
        localStorage.setItem(TOKEN_NAME, data.body.tokenType + " " + data.body.accessToken);
        ApiRequest(userMe).then((result) => {
          if (result.success) {
            this.props.onAuthUser(result.object);
            this.forceUpdate();
          } else {
            localStorage.removeItem(TOKEN_NAME);
            this.props.onAuthUser(null);
          }
        })
      }
    }).finally(() => {
      this.setState({
        isLoading: false
      })
    });
  };

  render() {
    // const {authUser} = this.props;
    // if (authUser){
    //   return <Redirect to={'/main/dashboard'}/>
    // }
    const {
      checkPhoneProcess, hasRegistered, phoneNumber, password, isLoading,
      reCaptcha, intervalId, isVerifyProcess, confirmationResult,
      code, firstName, lastName, codeTime, hasPassword, prePassword, isAdmin,
    } = this.state;


    const updatePhone = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
        isLoading: false
      });
      this.checkState(e.target.value)
    };
    const updateState = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
        isLoading: false
      });
    };

    const login = (e) => {
      e.preventDefault();
      if (hasRegistered && hasPassword && isAdmin) {
        this.checkUser().then(res => {
          if (res.success) {
            // sendCode();

            this.signInOrSignUp({
              password,
              phoneNumber
            })
          } else {
            notification.warning({
              key: 'phoneNumber',
              message: "Password",
              description: "Password warning",
            });
          }
        })
      } else if (hasRegistered && hasPassword && !isAdmin) {
        this.checkUser().then(res => {
          if (res.success) {
            this.signInOrSignUp({
              password,
              phoneNumber
            })
            // this.sign({
            //     phoneNumber,
            //     password,
            //     hasRegistered,
            //     hasPassword,
            // })
          } else {
            notification.warning({
              key: 'phoneNumber',
              message: intlMessages({en: "Password", ru: "Пароль", uz: "Parol"}),
              description: intlMessages({
                en: "The password is incorrect",
                ru: "Пароль неправильный",
                uz: "Parol noto'g'ri"
              }),
            });
          }
        })
      } else {
        notification.warning({
          key: 'phoneNumber',
          message: intlMessages({en: "Phone number!", ru: "Номер телефона!", uz: "Telefon raqam!"}),
          description: intlMessages({
            en: "The phone number is incorrect",
            ru: "Номер телефона неверный",
            uz: "Telefon raqam noto'g'ri"
          }),
        });
      }
    };
    const sendCode = () => {
      this.setState({
        codeTime: 60,
        isLoading: true
      });
      if (intervalId !== '')
        clearInterval(intervalId);
      firebaseAuth.signInWithPhoneNumber(phoneNumber, reCaptcha)
        .then((result) => {
          let timeCount = 60;
          this.setState({
            phoneNumber,
            codeTime: timeCount,
            isVerifyProcess: true,
            confirmationResult: result,
            isLoading: false
          });
          let intervalId = setInterval(() => {
            timeCount--;
            this.setState({codeTime: timeCount >= 0 ? timeCount : 0})
          }, 1000);
          this.setState({
            intervalId
          })

        })
        .catch((error) => {
          this.setState({
            isLoading: false,
          })
        })
        .finally(() => {
          this.setState({
            isLoading: false
          })
        });
    };
    const checkVerificationCode = (e) => {
      e.preventDefault();
      confirmationResult.confirm(code)
        .then((res) => {
          this.sign({
            password,
            firstName,
            lastName,
            hasRegistered,
            phoneNumber: phoneNumber,
            hasPassword,
            prePassword
          });

        }).catch((error) => {
        notification.warning({
          key: 'incorrect',
          message: intlMessages({en: "Phone number!", ru: "Номер телефона!", uz: "Telefon raqam!"}),
          description: intlMessages({
            en: "The confirmation code is incorrect",
            ru: "Неверный код подтверждения",
            uz: "Tasdiqlash kodi noto'g'ri"
          }),
        });
        this.setState({
          isLoading: false,
        });
      });
    };

    const cancelPhoneNubber = () => {
      this.setState({
        phoneNumber: '',
        isVerifyProcess: false,
        checkPhoneProcess: true
      })
    };

    if (!hasPassword) {
      notification.error({
        key: 'phoneNumber',
        message: intlMessages({en: "Phone number!", ru: "Номер телефона!", uz: "Telefon raqam!"}),
        description: intlMessages({
          en: "Phone number not found this system",
          ru: "Номер телефона не найден этой системой",
          uz: "Tizimda bunday raqam topilmadi"
        }),
      });
    }

    return (
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-login-content">
              <div className="p-5 row">
                <div className="col-md-12">
                  <Link to={'/home'}>
                    <img src={require("assets/images/ark-client/logo-black.png")} alt="Logo" height={100}/>
                  </Link>
                </div>
                <div className="col-md-12">
                  <h4 className="font-weight-light title">
                    "<IntlMessages id="page.login.app.title.one_top"/>"<br/>
                    <IntlMessages id="page.login.app.title.one_bottom"/>
                  </h4>
                  {!isVerifyProcess ?
                    <Form onSubmit={login} className="mt-5">
                      <div className="form-block">
                        <h6 className="mb-5 sub-welcome">
                          <IntlMessages id="welcome"/>
                        </h6>
                        <Row>
                          <Col span={4}>
                            <div className="icon-block">
                              <span className="img-icon-phone"/>
                            </div>
                          </Col>
                          <Col span={20} className="effect">
                            <MaskedInput
                              mask="+998111111111"
                              placeholder={intlMessages({
                                en: "Enter your phone number",
                                ru: "Введите номер телефона",
                                uz: "Telefon raqamingizni kiriting"
                              })}
                              className="form-control"
                              id="login"
                              name="phoneNumber"
                              onChange={updatePhone}
                            />
                          </Col>
                        </Row>
                      </div>

                      {!checkPhoneProcess && hasRegistered && hasPassword ?

                        <div className="form-block mb-0">
                          <Row>
                            <Col span={4}>
                              <div className="icon-block">
                                <span className="img-icon-key"/>
                              </div>
                            </Col>
                            <Col span={20}>
                              <Input.Password
                                placeholder={intlMessages({
                                  en: "Enter your password",
                                  ru: "Введите пароль",
                                  uz: "Parolni kiriting"
                                })}
                                name="password"
                                id="password"
                                onChange={updateState}

                              />
                            </Col>
                          </Row>
                          {isLoading ?
                            <div style={{margin: "0 auto", width: "35px"}}>
                              <div className="my-loader"/>
                            </div> :
                            <Button type="default" htmlType="submit"
                                    className="btn-block"><IntlMessages
                              id="enter"/></Button>
                          }
                        </div>
                        : ''}
                    </Form>
                    :
                    <Form onSubmit={checkVerificationCode} className="mt-5">
                      <h5 className="mb-4"><IntlMessages id="confirm_code"/></h5>
                      <div className="form-block">
                        <Row>
                          <Col span={4}>
                            <div className="icon-block text-center pt-2"
                                 style={{fontSize: "25px"}}>
                              <p style={{margion: "8px"}} className="mb-0">
                                {codeTime}
                              </p>
                            </div>
                          </Col>
                          <Col span={20}>
                            <Input id="code"
                                   placeholder="------"
                                   name="code"
                                   onChange={updateState}
                                   className="form-control" value={code} required
                            />
                          </Col>
                        </Row>
                      </div>
                      <h6 className="text-center font-change mb-0">
                        <IntlMessages id="send.sms"/>
                      </h6>
                      <h5 className="text-center font-change">+998 ** ***
                        **{phoneNumber.substring(11)}</h5>
                      {codeTime === 0 ?
                        <Button onClick={sendCode}
                                className="m-auto d-block bg-transparent border-0">
                          <IntlMessages id="resend.code"/>
                        </Button> : ''}

                      {isLoading ?
                        <div style={{margin: "0 auto", width: "35px"}}>
                          <div className="my-loader"/>
                        </div> :
                        <Row className="mt-4 back-next">
                          <Col span={12}>
                            <Button htmlType="button" type="default"
                                    onClick={cancelPhoneNubber}
                                    className="pl-xl-5 pr-xl-5 pl-md-2 pr-md-2 pl-sm-1 pr-sm-1">
                              <IntlMessages id="cancel_code_btn"/>
                            </Button>

                          </Col>
                          <Col span={12}>
                            <Button type="primary" htmlType="submit"
                                    className="float-right pl-xl-5 pr-xl-5 pl-md-2 pr-md-2 pl-sm-1 pr-sm-1">
                              <IntlMessages id="confirm_code_btn"/></Button>
                          </Col>
                        </Row>
                      }
                    </Form>}
                </div>
                <div id="reCaptcha" render="explicit" style={{display: 'none'}}/>
              </div>
            </div>
            <div className="gx-app-logo-content">
              <div className="gx-app-logo">
                <img alt="example" src={loginBack}/>
              </div>
            </div>
          </div>
        </div>
        <div id="reCaptcha" render="explicit" style={{display: 'none'}}/>
      </div>
    );
  }
}


const mapStateToProps = ({ auth}) => {
  const {authUser} = auth;
  return { authUser}
};
export default connect(mapStateToProps, {onAuthUser})(Login);



