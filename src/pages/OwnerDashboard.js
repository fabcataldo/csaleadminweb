import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Api from '../api/Api';
import { Modal, Button, Row, Col } from 'antd';
import { FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import LoadingComponent from '../components/LoadingComponent';
import ConfigChart from '../components/ConfigChart';


const OwnerDashboard = () => {
  const tokenInfo = JSON.parse(localStorage.getItem('token'));
  const [tickets, setTickets] = useState([]);
  const [defaultTickets, setDefaultTickets] = useState([]);
  const [showModalConfig, setShowModalConfig] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  let dateParameter = null;

  const configRequest = {
    headers: { Authorization: `${tokenInfo}` }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getTickets();
    }
    fetchData();
  }, []);

  const getTickets = async () => {
    setShowLoading(true);
    let tickets = await Api.getTickets(configRequest);

    if (tickets) {
      let newTickets = tickets.map((ticket) => {
        let newDateOfPurchase = new Date(ticket.date_of_purchase);
        return {
          ...ticket, date_of_purchase: newDateOfPurchase.getDate() + '/' + newDateOfPurchase.getMonth() +
            '/' + newDateOfPurchase.getFullYear() + ' ' + newDateOfPurchase.getHours() + ':' +
            newDateOfPurchase.getMinutes()
        }
      })
      setTickets(newTickets);
      setDefaultTickets(newTickets);
      setShowLoading(false);
    }
    else {
      setShowLoading(false);
    }
  }

  const openModalCfg = () => {
    setShowModalConfig(true);
  }

  const closeModalCfg = () => {
    setShowModalConfig(false)
  };

  const onChangeModalCfg = (data) => {
    dateParameter = data;
    handleOk()
  }

  const getTicketsByDate = async (dateFrom, dateTo) => {
    let response = await Api.getTicketsByDate(configRequest, dateFrom, dateTo)
    return response;
  }

  const handleOk = async () => {
    setShowModalConfig(false);

    let tickets;
    setShowLoading(true);
    if (Array.isArray(dateParameter)) {
      tickets = await getTicketsByDate(dateParameter[0], dateParameter[1])
    }
    else {
      tickets = await getTicketsByDate(dateParameter, null)
    }

    let newTickets = tickets.map((ticket) => {
      let newDateOfPurchase = new Date(ticket.date_of_purchase);
      return {
        ...ticket, date_of_purchase: newDateOfPurchase.getDate() + '/' + (newDateOfPurchase.getMonth().toString().length < 2 ? '0' + newDateOfPurchase.getMonth() : (newDateOfPurchase.getMonth() + 1) ) +
          '/' + newDateOfPurchase.getFullYear() + ' ' + newDateOfPurchase.getHours() + ':' +
          newDateOfPurchase.getMinutes()
      }
    })
    setTickets(newTickets);
    setShowLoading(false);
  };

  return (
    <div>
      <Row>
        <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
          <Button
            onClick={e => { setTickets(defaultTickets) }}
            style={{
              marginBottom: 5,
              background: "white"
            }}
            style={{ marginTop: "4vh" }}>
            <ReloadOutlined />
          </Button>
          <Button
            onClick={openModalCfg}
            style={{
              marginBottom: 5,
              background: "white"
            }}
            style={{ marginLeft: "5vh", marginTop: "4vh" }}>
            <FilterOutlined />
          </Button>
        </Col>
      </Row>
      <div>
        {tickets.length !== 0 ?
          <div >
            <Row className="chartStyle">
              <Col md={{ span: 24 }} lg={{ span: 24 }, { push: 6 }} xl={{ span: 24 }, { push: 7 }} >
                <LineChart
                  width={550}
                  height={300}
                  align='center'
                  data={tickets}
                  margin={{
                    top: 20, right: 50, left: 10, bottom: 10,
                  }}
                  style={{ background: "white", marginTop: "10vh" }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date_of_purchase" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#8884d8" />
                </LineChart>
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
          : <div><br></br><h4 style={{ color: 'white' }}>No hay datos</h4></div>}
      </div>

      {
        showLoading ?
          <div>
            <LoadingComponent delay={2000}></LoadingComponent>
          </div>
          : <div></div>}
    </div>
  );
}

export default OwnerDashboard;