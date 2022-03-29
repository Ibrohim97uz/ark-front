import React, {Component} from "react";
import {connect} from "react-redux";
import {Menu} from "antd";
import {arrayToTree} from "util/CustomFunc";
import {Link} from "react-router-dom";

import {
    NAV_STYLE_ABOVE_HEADER,
    NAV_STYLE_BELOW_HEADER,
    NAV_STYLE_DEFAULT_HORIZONTAL,
    NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../constants/ThemeSetting";
import menus from './../../networking/index'

const SubMenu = Menu.SubMenu;

class HorizontalNav extends Component {

  getNavStyleSubMenuClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve";
      default:
        return "gx-menu-horizontal";
    }
  };

  render() {
    const {pathname, navStyle,locale} = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];

      const menuTree = arrayToTree(menus, 'id', 'parentId', 'children');
      const getMenus = (menus)=>{

          if (menus.length!==0){
              return menus.map((item) => {
                  if (item.type === 'group') {
                      return (<SubMenu className={this.getNavStyleSubMenuClass(navStyle)} key={item.id}
                                       title={item[locale.languageId]}>
                          {item.children && item.children.length !== 0 ? getMenus(item.children) : null}
                      </SubMenu>)
                  }
                  if (item.type === 'collapse') {
                      return (<SubMenu key={item.id} className="gx-menu-horizontal"
                                       title={<span> <i className={"icon icon-" + item.icon}/>
                    <span>{item[locale.languageId]}</span></span>}>
                          {item.children && item.children.length !== 0 ? getMenus(item.children) : null}
                      </SubMenu>)
                  }
                  if (item.type === 'item') {
                      return (<Menu.Item key={item.id}>
                          <Link to={item.route}>
                              <i className={"icon icon-" + item.icon}/>
                              <span>{item[locale.languageId]}</span>
                          </Link>
                      </Menu.Item>)
                  }
                  return  item;
              });
          }
      };
      const menuItems =getMenus(menuTree);


    return (
      <Menu defaultOpenKeys={[defaultOpenKeys]} selectedKeys={[selectedKeys]} mode="horizontal">
          {menuItems}
      </Menu>

    );
  }
}

HorizontalNav.propTypes = {};
const mapStateToProps = ({settings}) => {
  const {themeType, navStyle, pathname, locale} = settings;
  return {themeType, navStyle, pathname, locale}
};
export default connect(mapStateToProps)(HorizontalNav);

