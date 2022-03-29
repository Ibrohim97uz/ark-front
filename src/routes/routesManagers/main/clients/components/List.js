import React from 'react'
import { Icon, Modal, Table, Tag } from 'antd/lib/index'
import DropOption from '../../../../../components/DropOption'
import IntlMessages, { intlMessages } from "../../../../../util/IntlMessages";

const { confirm } = Modal;

const List = ({
                  onDeleteItem,onFinish, onEditItem, pagination, location, addPoint,visibleColumns, ...tableProps
              }) => {

    const getOptions=(action)=>{
        if (action==="READYTODELEVER"){
            return [
                {
                    key: '1',
                    name: <div>
                        <Icon className="mr-2" type="edit"/>
                        <IntlMessages id="update"/>
                    </div>
                },
                {
                    key: '2',
                    name: <div>
                        <Icon className="mr-2" type="delete"/>
                        <IntlMessages id="delete"/>
                    </div>
                },
                {
                    key: '3',
                    name: <div>
                        <Icon className="mr-2" type="border-inner"/>
                        <IntlMessages id="point"/>
                    </div>
                },
            ]
        }
        if (action==="ONROAD"){
            return [
                {
                    key: '1',
                    name: <div>
                        <Icon className="mr-2" type="edit"/>
                        <IntlMessages id="update"/>
                    </div>
                },
                {
                    key: '2',
                    name: <div>
                        <Icon className="mr-2" type="delete"/>
                        <IntlMessages id="delete"/>
                    </div>
                },
                {
                    key: '3',
                    name: <div>
                        <Icon className="mr-2" type="border-inner"/>
                        <IntlMessages id="point"/>
                    </div>
                },
                {
                    key: '4',
                    name: <div>
                        <Icon className="mr-2" type="check-circle"/>
                        <IntlMessages id="finished"/>
                    </div>
                },
            ]
        }
        if (action ===null){
            return [
                {
                    key: '1',
                    name: <div>
                        <Icon className="mr-2" type="edit"/>
                        <IntlMessages id="edit"/>
                    </div>
                },
                {
                    key: '2',
                    name: <div>
                        <Icon className="mr-2" type="delete"/>
                        <IntlMessages id="delete"/>
                    </div>
                }
            ]
        }

    };
    const columns = [
        ...visibleColumns,
        {
            title: <IntlMessages id="status" />,
            dataIndex: 'actionStatus',
            align: "center",
            key: 'actionStatus',
            fixed: 'right',
            width:150,
            render: (text, record) => {
                if (record.actionStatus === "FINISH") {
                    return <Tag color="#87d068" className="mt-2"><IntlMessages id="finished" /></Tag>
                }
                if (record.actionStatus === "READYTODELEVER") {
                    return <Tag color="#038FDE" className="mt-2"><IntlMessages id="readyToDelever" /></Tag>
                }
                if (record.actionStatus === "ONROAD") {
                    return <Tag color="#f50" className="mt-2"><IntlMessages id="onRoad" /></Tag>
                }
            }
        },
        {
            title: <IntlMessages id="operation" />,
            key: 'operation',
            width: 100,
            align: "center",
            fixed: 'right',
            render: (text, record) => {
                return record.actionStatus !== "FINISH" && <DropOption onMenuClick={e => handleMenuClick(record, e)}
                                             menuOptions={getOptions(record.actionStatus)} />
            },
        }
    ];
    const handleMenuClick = (record, e) => {
        if (e.key === '1') {
            onEditItem(record)
        }
        if (e.key === '2') {
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
        if (e.key === '3') {
            addPoint(record.id)
        }
        if (e.key === '4') {
            confirm({
                title: intlMessages(
                    {
                        en: "You really want to turn it off?",
                        ru: "Вы действительно хотите удалить его?",
                        uz: "Siz chindan ham o'chirmoqchimisiz?"
                    }),
                onOk() {
                    onFinish(record.id);
                },
            });
        }

    };

    let locale = {
        emptyText: <div style={{ textAlign: 'center', fontSize: 16, marginTop: 30 }}>
            <Icon type="inbox" style={{ fontSize: 40 }} />
            <p><IntlMessages id={'NODATA'} /></p>
        </div>
    };
    return (
        <div>
            <Table
                {...tableProps}
                columns={columns}
                bordered
                size="small"
                scroll={{ x: 1500 }}
                pagination={pagination}
                className="gx-table-responsive"
                locale={locale}
                rowKey={(record) => record.id}
            />
        </div>
    )
};

export default List
