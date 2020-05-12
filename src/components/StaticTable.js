import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';


function StaticTable(props){
    const {data, columns} = props;
    
    return(
        <Table 
            columns={columns} 
            dataSource={data} 
            size="small"
        />
    )
}

export default StaticTable;