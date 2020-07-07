import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';


const StaticTable=(props)=>{
    const {data, columns, tableStyle} = props;
    
    return(
        <Table 
            className={tableStyle ? tableStyle : ''}
            columns={columns} 
            dataSource={data} 
            size="small"
            pagination = {{
                pageSize: 6
            }}
        />
    )
}

export default StaticTable;