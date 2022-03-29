import React, {Component} from 'react';
import Link from "react-router-dom/es/Link";
import IntlMessages,{intlMessages} from "../util/IntlMessages";

class Login extends Component {
    render() {
        return (
            <div id="page" className="body-wrapper">
                <div className="slz-wrapper-content">
                    <div className="slz-main-content slz-page-404">
                        <div className="content-wrapper content-wrapper-404">
                            <img className="img-404" src={require("assets/images/404.png")} alt="404"/>
                            <h1 className="title">{intlMessages({en:"SORRY! PAGE NOT FOUND",ru:"ИЗВИНИТЕ! СТРАНИЦА НЕ НАЙДЕНА",uz:"KECHIRASIZ! SAHIFA TOPILMADI"})}</h1>
                            <div className="subtitle"/>
                            <div className="slz-group-btn">
                                <Link to={'/home'} onClick={window.location.reload} className="slz-btn btn-back-to-home">
                                    <IntlMessages id={'home'}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;