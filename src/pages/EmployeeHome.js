import React from 'react';
import { Form, Input, Button, Layout, Menu, Dropdown, Row } from 'antd';
import 'antd/dist/antd.css';
import account from '../assets/imgs/account.png'
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'
import { DownOutlined } from "@ant-design/icons";
import { Avatar } from 'antd';
import { useDispatch } from 'react-redux'
import background2 from '../assets/imgs/background2.png'
import logo from '../assets/imgs/logo.png';
import Api from '../api/Api';
import { setTicket as storeTicket } from '../actions/ticket';
const { Header, Footer, Content } = Layout;



const EmployeeHome = () => {
  const history = useHistory();
  const user = useSelector((user) => {return user.users.payload})
  const token = useSelector((token) => {return token.token.payload})
  const dispatch = useDispatch()

  const userInfo = JSON.parse(localStorage.getItem('user'))
  const tokenInfo = JSON.parse(localStorage.getItem('token'))

  console.log(token)
  const goToUpdateAccountPage = ()=>{
    history.push("/ehome/account")
  }

  const onFinish = async values => {
    const configRequest = {
      headers: { Authorization: `${tokenInfo}` }
    }
    const userTicket = await Api.getUserTicket(values.ticketId, configRequest);
    const ticket = await Api.getTicket(values.ticketId, configRequest);

    dispatch(storeTicket(ticket))
    localStorage.setItem('ticket', JSON.stringify(ticket.ticket))
    localStorage.setItem('userTicket', JSON.stringify(userTicket))
    
    history.push("/ehome/ticket");
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const closeSession = ()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('ticket');
    localStorage.removeItem('userTicket');
    history.push("")
  }

  const menu = (
    <div>
      
      <Menu style={{marginTop:8}}>
      {userInfo.name + ' '+userInfo.surname}  
        <Menu.Item key="0" onClick={e=> goToUpdateAccountPage()}>
          Actualizar datos
        </Menu.Item>
        <Menu.Item key="1" onClick={e=> closeSession()}>
          Cerrar sesión
        </Menu.Item>
      </Menu>
    </div>
  );

  return (
    <Layout className="layout">
    <Header className="headerStyle">
      <div className="logo" onClick={()=>{ history.push(""); }}>
        <img src={logo} width="50" height="50" />
      </div>

      <Menu mode="horizontal"  style={{float:"right", background:"#6200EE", color:"white"}}>
        <Menu.Item key="1">Ayuda</Menu.Item>
        <Menu.Item key="2">
          <Dropdown overlay={menu} trigger={["click"]}>
            <a className="ant-dropdown-link" >
            <Avatar style={{ backgroundImage: `url(${account})`}} />
            <DownOutlined />
            </a>
          </Dropdown>
        </Menu.Item>
      </Menu>
    </Header>
    <Content>
      <div className="site-layout-content" style={{ backgroundImage: `url(${background2})`}}>
        <h1 style={{ textAlign: 'center', color: 'white' }}>
          Bienvenido a CSaleAdminWeb! :)
        </h1>
        <h3  style={{ textAlign: 'center', color: 'white' }}>
          ¡Acá vas a poder validar las compras de tus clientes!
        </h3>
        <Form
            layout="vertical"
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row style={{ justifyContent: "center" }}>
              <Form.Item
                label="Código de ticket"
                name="ticketId"
                className="labelStyle"
                rules={[
                  {
                    required: true,
                    message: 'Código inválido!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Row>
        </Form>

      </div>
      
    </Content>
    <Footer className="footer">CSaleAdminWeb (c) 2020</Footer>
  </Layout>
  );
}

export default EmployeeHome;
