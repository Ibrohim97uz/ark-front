import React, {Component} from 'react';
import {connect} from "react-redux";
import {Input, notification} from "antd";
import IntlMessages, {intlMessages} from "../../../../../util/IntlMessages";
import ApiRequest from "../../../../../services";
import UserPassword from './components/UserPassword'
import api from '../../../../../services/app'
import {onAuthUser} from "../../../../../redux/auth/action";

const {editPassword, userMe} = api;

class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formItems: [

                {
                    label: <IntlMessages id="oldPassword"/>,
                    name: 'oldPassword',
                    rules: [
                        {
                            required: true,
                            message: <IntlMessages id="E_ERROR"/>
                        },
                    ],
                    obj: <Input.Password/>
                },
              {
                label: <IntlMessages id="newPassword"/>,
                name: 'newPassword',
                rules: [
                  {
                    required: true,
                    message: <IntlMessages id="E_ERROR"/>
                  },
                ],
                obj: <Input.Password/>
              }
            ]
        }
    }

    getCurrentUser = () => {
        ApiRequest(userMe).then((result) => {
            if (result.success) {
                this.props.onAuthUser(result.object);
            }
        });
    };

    onRequestFunc = (path, data, message) => {
        ApiRequest(path, data).then((result => {
            if (result.success) {
                this.getCurrentUser();
                notification.success({
                    key: message.key,
                    message: message.messageSuccess,
                    description: message.descriptionSuccess,
                });
            } else {
                notification.error({
                    key: message.key,
                    message: message.messageError,
                    description: message.descriptionError,
                });
            }
        }))
    };

    onSubmit = (data) => {
        let message = {
            key: "update",
            messageError: intlMessages({
                en: "There was an error updating",
                ru: "Произошла ошибка при изменение",
                uz: "Tahrirlashda xatolik yuz berdi"
            }),
            messageSuccess: intlMessages({
                en: "Successfully updated",
                ru: "Успешно изменено",
                uz: "Muvaffaqqiyatli tahrirlandi"
            }),
        };
        this.onRequestFunc(editPassword, data, message)
    };


    render() {
        return (
            <UserPassword formItems={this.state.formItems} onSubmit={this.onSubmit}/>
        )
    }
}
export default connect(null, {onAuthUser})(Password);
