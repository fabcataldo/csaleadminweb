import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';


const columns = [
  {
    title: 'Descripcion',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Precio',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Cantidad',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Validez',
    key: 'validity',
    dataIndex: 'validity'
  },
];

function TableProducts(props){
    const [dataSource, setDataSource] = useState(null);
    const data = props.data

    const mapDataSource = (dataSource) =>{
      let a = [];
      a = dataSource.map((item,index)=>{
        let date = new Date(item.product.valid_date_from);
        return {
          key:''+index, description: item.product.description, price: item.product.price, 
          quantity: item.quantity, validity: date.getDay()+'/'+date.getMonth()+date.getYear()
          +' '+date.getHours()+':'+date.getMinutes()
        }
      })
      return a;
    }
    return(
        <Table 
            columns={columns} 
            dataSource={mapDataSource(data)} 
        />
    )
}

export default TableProducts;