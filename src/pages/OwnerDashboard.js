import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Api from '../api/Api';
import { Modal, Button, Row, Col, Grid } from'antd';
import { FilterOutlined } from '@ant-design/icons';
import ConfigChart from '../components/ConfigChart';


const OwnerDashboard = ()=>{
  const tokenInfo = JSON.parse(localStorage.getItem('token'));
  const [tickets, setTickets] = useState([]);
  const [showModalConfig, setShowModalConfig] = useState(false);
  let dateParameter=null;

  const configRequest = {
    headers: { Authorization: `${tokenInfo}` }
  };

  useEffect(()=>{
    const fetchData = async()=>{
        await getTickets();
    }
    fetchData();
  },[]);
  
  const getTickets=async()=>{
    let tickets = await Api.getTickets(configRequest);
    setTickets(tickets);
  }

  const openModalCfg=()=>{
    setShowModalConfig(true);
  }

  const closeModalCfg = () => {
    setShowModalConfig(false)
  };

  const onChangeModalCfg=(data)=>{
    dateParameter=data;
    handleOk()
  }

  const getTicketsByDate = async(dateFrom, dateTo) => {
    let response = await Api.getTicketsByDate(configRequest, dateFrom, dateTo)
    return response;
  }

  const handleOk = async() => {
    setShowModalConfig(false);

    let tickets;

    if(Array.isArray(dateParameter)){
      tickets = await getTicketsByDate(dateParameter[0], dateParameter[1])
    }
    else{
      tickets = await getTicketsByDate(dateParameter, null)
    }
    setTickets(tickets);

    console.log(tickets)
  };

  return(
    <div>
      {tickets.length!==0 ? <div>
      <Row>
        <Col span={18} push={7}>
          <LineChart
            width={550}
            height={300}
            align='center'
            data={tickets}
            margin={{
              top: 10, right: 120, left: 10, bottom: 10,
            }}
            style={{background: "white", marginTop: "10vh"}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date_of_purchase" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#8884d8" />
          </LineChart>
        </Col>
        <Col span={5} pull={13}>  
          <Button
            onClick={openModalCfg}
            style={{
              marginBottom: 16,
              background: "white"
            }}
            style={{ marginLeft:"95vh", marginTop: "4vh"}}>
              <FilterOutlined />
            </Button>
        </Col>
      </Row>
          {
            showModalConfig &&
            <Modal
              title="Configurar gráfico"
              visible={showModalConfig}
              footer={null}
              onCancel={closeModalCfg}
            >
            <ConfigChart onChange={onChangeModalCfg}></ConfigChart>
            </Modal>
          }
      </div> 
       : <div><br></br><h4 style={{color:'white'}}>No hay datos</h4></div>}
    </div>

  );
}

export default OwnerDashboard;