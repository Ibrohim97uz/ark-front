import React from 'react'
import PropTypes from 'prop-types'
import {Button, Col, Form, Row} from 'antd/lib/index'
import IntlMessages from "util/IntlMessages";

const Filter = ({
                  onAdd,
                }) => {
  return (
    <Row gutter={24}>
      <Col span={24} className={'text-right'}>
        <Button type={'primary'} onClick={onAdd} style={{marginLeft: 16}}><IntlMessages id={'create'}/></Button>
      </Col>
    </Row>


  )
};

Filter.propTypes = {
  onAdd: PropTypes.func,
};

export default Form.create()(Filter)
