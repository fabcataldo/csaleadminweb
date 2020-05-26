import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Api from '../api/Api';

const OwnerDashboard = ()=>{
  const tokenInfo = JSON.parse(localStorage.getItem('token'));
  const [tickets, setTickets] = useState(null);

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

  return(
    <div>
      <LineChart
          width={550}
          height={300}
          align='center'
          data={tickets}
          margin={{
            top: 10, right: 120, left: 10, bottom: 10,
          }}
          style={{background: "white", marginLeft:"60vh", marginTop: "10vh"}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date_of_purchase" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#8884d8" />
        </LineChart>
      </div>
  );
}

export default OwnerDashboard;