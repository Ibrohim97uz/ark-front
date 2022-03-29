import React, {Component} from 'react';
import UserInfo from './components/UserInfo'
import IntlMessages, {intlMessages} from "../../../../../util/IntlMessages";
import {Input, notification} from "antd";
import {MaskedInput} from "antd-mask-input";
import ApiRequest from "../../../../../services";
import api from '../../../../../services/app'
import {connect} from "react-redux";
import {onAuthUser} from "../../../../../redux/auth/action";
import {apiFileUrl} from '../../../../../util/constants'
const {postCurrentUserInfoEdit, userMe} = api;

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentItem: this.props.authUser,
            file: this.props.authUser.photo ? {
                fileUrl: apiFileUrl + this.props.authUser.photo.id,
                file: this.props.authUser.photo,
                fileStatus:"create"
            } : null,
            formItems: [
                {
                    label: <IntlMessages id="firstName"/>,
                    name: 'firstName',
                    rules: [
                        {
                            required: true,
                            message: <IntlMessages id="E_ERROR"/>
                        },
                    ],
                    obj: <Input/>
                },
                {
                    label: <IntlMessages id="lastName"/>,
                    name: 'lastName',
                    rules: [
                        {
                            required: true,
                            message: <IntlMessages id="E_ERROR"/>
                        },
                    ],
                    obj: <Input/>
                },

                {
                    label: <IntlMessages id="phoneNumber"/>,
                    name: 'phoneNumber',
                    rules: [
                        {
                            required: true,
                            message: <IntlMessages id="E_ERROR"/>
                        },
                    ],
                    obj:
                        (<MaskedInput mask="+998111111111" name={'phoneNumber'}/>)
                },
                {
                    label: <IntlMessages id="password"/>,
                    name: 'nowPassword',
                    rules: [
                        {
                            required: true,
                            message: <IntlMessages id="E_ERROR"/>
                        },
                    ],
                    obj: <Input.Password/>
                },
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
        this.onRequestFunc(postCurrentUserInfoEdit, data, message)
    };

    onChangeFile = (file) => {
        this.setState({
            file: file
        })
    };

    render() {
        return (
            <UserInfo file={this.state.file}
                      currentItem={this.state.currentItem}
                      formItems={this.state.formItems}
                      onSubmit={this.onSubmit}
                      onChangeFile={this.onChangeFile}/>
        )
    }
}


const mapStateToProps = ({auth}) => {
    let {authUser}=auth;
    return {authUser};
};

export default connect(mapStateToProps, {onAuthUser})(Info);
