import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Button, Icon, Menu } from 'antd'
import IntlMessages from "../../util/IntlMessages";

const DropOption = ({
                      onMenuClick, menuOptions = [],menuStatus, buttonStyle, onAdminMenuClick,adminMenuOptions =[],adminStatus
                    }) => {
  const menu = menuOptions.map(item => <Menu.Item key={item.key} value={item.name}>{item.name}</Menu.Item>);
  const adminMenu = adminMenuOptions.map(item => <Menu.Item key={item.key} value={item.name}>{item.name}</Menu.Item>)


  return   menuStatus===true?
    <Dropdown
      overlay={<Menu onClick={onAdminMenuClick}>{adminMenu}</Menu>}
    >
      <Button className="btn-block mb-0 pb-3">
        <Icon type="user" style={{transform:"translate(-4px,-2px)"}}/>
        <IntlMessages id={'admin'}/>
      </Button>
    </Dropdown>:
    <Dropdown
      overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}
    >
      <Button className={"mb-0 pb-3"}  style={{ border: 'none', ...buttonStyle }}>
        <Icon style={{ marginRight: 2 }} type="bars" />
        <Icon type="down" />
      </Button>
    </Dropdown>
};





DropOption.propTypes = {
  onMenuClick: PropTypes.func,
  onAdminMenuClick: PropTypes.func,
  buttonStyle: PropTypes.object,
  dropdownProps: PropTypes.object,
};

export default DropOption
