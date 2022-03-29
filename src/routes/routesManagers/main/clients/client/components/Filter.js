import React from 'react'
import PropTypes from 'prop-types'
import {Button, Col, Row} from 'antd'
import IntlMessages from "util/IntlMessages";
import { Link } from "react-router-dom";




const Filter = ({
                    onAdd,
                }) => {
    return (
        <Row gutter={24}>
            <Col xs={6} sm={6} md={6} xl={6} lg={6} className={'pl-0'}>
               <Link to={'/main/clients'}>
                   <Button type={'primary'}
                           onClick={onAdd} style={{marginLeft: 16}}><IntlMessages id={'prev'}/></Button>
               </Link>
            </Col>
            <Col xs={18} sm={18} md={18} xl={18} lg={18} className={'text-right'}>
                <Button type={'primary'}
                        onClick={onAdd} style={{marginLeft: 16}}><IntlMessages id={'create'}/></Button>
            </Col>
        </Row>
    )
};

Filter.propTypes = {
    onAdd: PropTypes.func,
};

export default Filter
