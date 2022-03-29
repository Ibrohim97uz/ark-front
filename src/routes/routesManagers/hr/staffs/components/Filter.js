import React from 'react'
import PropTypes from 'prop-types'
import {Button, Col, Row, Input, Switch} from 'antd'
import IntlMessages from "util/IntlMessages";
import {intlMessages} from "../../../../../util/IntlMessages";


const {Search} = Input;


const Filter = ({
                    onAdd,
                    isActive,
                    onActive,
                    handleResetSearch,
                    handleSubmitSearch,
                    onChangeSearch,
                    searchText
                }) => {
    return (
        <Row gutter={24}>
            <Col xs={24} sm={24}  md={7} xl={7} lg={7}>
                <Search
                    value={searchText}
                    placeholder={intlMessages(
                        {
                            en: "What are we looking for?",
                            ru: "Что мы ищем?",
                            uz: "Nima izlaymiz?"
                        })
                    }
                    onChange={(e)=>onChangeSearch(e.target.value)}/>

            </Col>
            <Col xs={4} sm={2} md={2} xl={2} lg={2} className={'text-center'}>
                <Switch onClick={(e)=>onActive(e)} checked={isActive} className="mt-2"/>
            </Col>
            <Col xs={12} sm={12} md={10} xl={7} lg={7}>
                <div>
                    <Button type="primary"
                            className="margin-right"
                            onClick={handleSubmitSearch}
                            icon="search">
                        <IntlMessages id="search"/>
                    </Button>
                    <Button onClick={handleResetSearch} icon="undo"><IntlMessages id="reset"/>
                    </Button>
                </div>
            </Col>
            <Col xs={8} sm={10} md={5} xl={8} lg={8} className={'text-right'}>
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
