import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar, Popover } from "antd";
import { Link } from "react-router-dom";

import user from '../../assets/images/placeholder.jpg'
import IntlMessages from "../../util/IntlMessages";
import { TOKEN_NAME } from "../../util/constants";
import {apiFileUrl} from '../../util/constants'
class UserProfile extends Component {
    onLogout = () => {
        localStorage.removeItem(TOKEN_NAME);
        window.location.reload();
    };

    render() {
        const userMenuOptions = (
            <ul className="gx-user-popover">
                <li><Link to={'/settings/profile/info'} style={{ color: "black" }}><IntlMessages
                    id={'myInfo'} /></Link></li>
                <li>
                    <Link to={'/settings/profile/password'} style={{ color: "black" }}><IntlMessages id={'myPassword'} /></Link>
                </li>
                <li onClick={this.onLogout}><Link to={'/home'}><IntlMessages id={'logOut'} /></Link></li>
            </ul>
        );

        const { authUser } = this.props;
        return (

            <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
                <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
                    <Avatar src={authUser && authUser.photo ?apiFileUrl + authUser.photo.id : user}
                            className="gx-size-40 gx-pointer gx-mr-3" alt="" />
                    <span className="gx-avatar-name">{authUser && authUser.lastName + ' ' + authUser.firstName}<i
                        className="icon icon-chevron-down gx-fs-xxs gx-ml-2" /></span>
                </Popover>
            </div>

        )

    }
}

const mapStateToProps = ({ auth }) => {
    const { authUser } = auth;

    return { authUser }
};
export default connect(mapStateToProps, null)(UserProfile);
