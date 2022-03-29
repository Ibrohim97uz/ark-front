import React, {Component} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import {arrayToTree} from "util/CustomFunc";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import {connect} from "react-redux";
import menus from './../../networking/index'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class SidebarContent extends Component {
  render() {
    const {themeType, navStyle, pathname,locale} = this.props;
    const getNoHeaderClass = (navStyle) => {
      if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
        return "gx-no-header-notifications";
      }
      return "";
    };
    const getNavStyleSubMenuClass = (navStyle) => {
      if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
        return "gx-no-header-submenu-popup";
      }
      return "";
    };
    const menuTree = arrayToTree(menus, 'id', 'parentId', 'children');
    const getMenus = (menus)=>{

      if (menus && menus.length!==0){
        return  menus.map((item,index)=> {
          if (item.type === 'group') {
            return <MenuItemGroup key={item.id} className="gx-menu-group" title={item[locale.languageId]}>
              {item.children && item.children.length !== 0 ? getMenus(item.children) : null}
            </MenuItemGroup>;
          }
          if (item.type === 'collapse') {
            return <SubMenu key={item.id} className={getNavStyleSubMenuClass(navStyle)}
                            title={<span> <i className={"icon mt-2 icon-"+item.icon}/>
                    <span>{item[locale.languageId]}</span></span>}>
              {item.children && item.children.length !== 0 ? getMenus(item.children) : null}
            </SubMenu>
          }
          if (item.type === 'item') {
            return <Menu.Item key={item.id}>
              <Link to={item.route}>
                <i className={"icon icon-"+item.icon}/>
                <span>{item[locale.languageId]}</span>
              </Link>
            </Menu.Item>
          }
          return item;
        });
      }
    };
    const menuItems =getMenus(menuTree);
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (
      <Auxiliary>
        <SidebarLogo/>
        <div className="gx-sidebar-content">
          <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
            <UserProfile/>
            <AppsNavigation/>
          </div>
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
              mode="inline">
                  {menuItems}
            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({settings}) => {
  const {navStyle, themeType, locale, pathname} = settings;
  return {navStyle, themeType, locale, pathname}
};
export default connect(mapStateToProps)(SidebarContent);

