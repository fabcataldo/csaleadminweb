import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';


const StaticTable=(props)=>{
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