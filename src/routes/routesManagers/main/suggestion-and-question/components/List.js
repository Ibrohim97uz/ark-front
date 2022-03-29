import React from 'react'
import {Card, Icon, Modal, Table} from 'antd'
import DropOption from '../../../../../components/DropOption/DropOption'
import IntlMessages, {intlMessages} from "../../../../../util/IntlMessages";

const {confirm} = Modal;
const styleCard = {
    zIndex: 1
};
const List = ({
                  onExpand,  onDeleteItem, pagination, location, visibleColumns, ...tableProps
              }) => {

    const columns = [
        ...visibleColumns,
        {
            title: <IntlMessages id="operation"/>,
            key: 'operation',
            width: 100,
            align:"center",
            render: (text, record) => (
                 <DropOption onMenuClick={e => handleMenuClick(record, e)}
                                   menuOptions={
                                       [
                                           {
                                               key: '1',
                                               name: <div>
                                                   <Icon className="mr-2" type="delete"/>
                                                   <IntlMessages id="delete"/>
                                               </div>
                                           },
                                       ]}/>
            ),
        }
    ];

    const handleMenuClick = (record) => (
        confirm({
            title: intlMessages(
                {
                    en: "You really want to turn it off?",
                    ru: "Вы действительно хотите удалить его?",
                    uz: "Siz chindan ham o'chirmoqchimisiz?"
                }),
            onOk() {
                onDeleteItem(record.id);
            },
        })
    );

    let locale = {
        emptyText: <div style={{textAlign: 'center', fontSize: 16, marginTop: 30}}>
            <Icon type="inbox" style={{fontSize: 40}}/>
            <p><IntlMessages id={'NODATA'}/></p>
        </div>
    };
    return (
        <div>
            <Table
                {...tableProps}
                columns={columns}
                bordered
                size='small'
                scroll={{x: false, y: false}}
                pagination={pagination}
                onExpand={onExpand}
                expandable
                expandedRowRender={record => (<Card className="my-3" style={styleCard} key={record.id}>
                    <div className="d-block"><h3 className="d-inline-block"><IntlMessages id={'fullName'}/>
                    </h3>{":  " + record.fullName}</div>
                    <div className="d-block"><h3 className="d-inline-block"><IntlMessages id={'email'}/>
                    </h3>{":  " + record.email}</div>
                    <br/>
                    <div dangerouslySetInnerHTML={{
                        __html: (record.text)
                    }}/>
                </Card>)}
                className="gx-table-responsive"
                locale={locale}
                rowKey={(record) => record.id}
            />
        </div>
    )
};


export default List
