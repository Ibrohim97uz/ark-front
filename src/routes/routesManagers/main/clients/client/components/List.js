import React from 'react'
import {Icon, Table} from 'antd'
import DropOption from '../../../../../../components/DropOption/DropOption'
import IntlMessages from "../../../../../../util/IntlMessages";

const List = ({
             onEditItem, pagination,location, visibleColumns, ...tableProps
              }) => {

  const columns = [
    ...visibleColumns,
    {
      title: <IntlMessages id="operation" />,
      key: 'operation',
      width: 100,
        align: "center",
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)}
                           menuOptions={
                            [
                              {key: '1', name: <div><Icon className="mr-2" type="edit"/><IntlMessages id="update"/></div>},
                            ]}/>
      },
    }
  ];
  const handleMenuClick = (record, e) => {
      onEditItem(record)
  };

  let locale = {
    emptyText:<div style={{ textAlign: 'center',fontSize:16,marginTop:30 }}>
      <Icon type="inbox" style={{ fontSize: 40 }} />
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
        pagination={pagination}
        className="gx-table-responsive"
        locale={locale}
        rowKey={(record) => record.id}
      />
    </div>
  )
};



export default List
