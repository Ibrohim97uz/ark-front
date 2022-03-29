import React from 'react'
import {Icon, Modal, Table} from 'antd'
import DropOption from '../../../../../components/DropOption/DropOption'
import IntlMessages, {intlMessages} from "../../../../../util/IntlMessages";

const {confirm} = Modal;
const List = ({
                  onDeleteItem, onEditItem, pagination, location, visibleColumns, ...tableProps
              }) => {

    const columns = [
        ...visibleColumns,
        {
            title: <IntlMessages id="operation"/>,
            key: 'operation',
            align: "center",
            width: 100,
            fixed: 'right',
            render: (text, record) => {
                return <DropOption onMenuClick={e => handleMenuClick(record, e)}
                                   menuOptions={
                                       [
                                           {key: '1',
                                               name: <div><Icon className="mr-2" type="edit"/><IntlMessages
                                                   id="update"/></div>
                                           },
                                           {key: '2',
                                               name: <div><Icon className="mr-2" type="delete"/><IntlMessages
                                                   id="delete"/></div>
                                           },
                                       ]}/>
            },
        }
    ];
    const handleMenuClick = (record, e) => {
        if (e.key === '1') {
            onEditItem(record)
        } else if (e.key === '2') {
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
        }
    };

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
                scroll={{x: 2000}}
                pagination={pagination}
                className="gx-table-responsive"
                locale={locale}
                rowKey={(record) => record.id}
            />
        </div>
    )
};


export default List
