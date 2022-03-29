import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import {Link} from "react-router-dom";
import {TOKEN_NAME} from '../../util/constants'
import IntlMessages from "../../util/IntlMessages";
import user from '../../assets/images/placeholder.jpg'
import {apiFileUrl} from '../../util/constants'

class UserInfo extends Component {
    onLogout=()=>{
      localStorage.removeItem(TOKEN_NAME);
      window.location.reload();
    }
    render() {
        const userMenuOptions = (
            <ul className="gx-user-popover">
                <li><Link to={'/settings/profile/info'} style={{color: "black"}}><IntlMessages
                    id={'myInfo'}/></Link></li>
                <li><Link to={'/settings/profile/password'} style={{color: "black"}}><IntlMessages id={'myPassword'}/></Link>
                </li>
                <li onClick={this.onLogout}><Link to={'/home'}><IntlMessages id={'logOut'}/></Link></li>
            </ul>
        );

        return (
            <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions}
                     trigger="click">
                <Avatar src={this.props.authUser && this.props.authUser.photo?apiFileUrl+this.props.authUser.photo.id:user}
                        className="gx-avatar gx-pointer" alt=""/>
            </Popover>
        )

    }
}
const mapStateToProps = ({ auth}) => {
  const {authUser} = auth;
  return {authUser }
};

export default connect(mapStateToProps, null)(UserInfo);
