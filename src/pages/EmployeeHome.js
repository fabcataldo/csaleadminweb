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
import Api from '../api/Api';
import { setTicket as storeTicket } from '../actions/ticket';
const { Header, Footer, Content } = Layout;



const EmployeeHome = () => {
  const history = useHistory();
  const user = useSelector((user) => {return user.users.payload})
  const token = useSelector((token) => {return token.token.payload})
  const dispatch = useDispatch()


  console.log(token)
  const goToUpdateAccountPage = ()=>{
    history.push("/ehome/account")
  }

  const onFinish = async values => {
    /*
    const response = await Api.login(values)
    //GUARDAR CON REDUX
    setUser(response.user);
    setToken(response.token);

    dispatch(storeUser(response.user))
    dispatch(storeToken(response.token))
    history.push("/ehome");
     */
    const configRequest = {
      headers: { Authorization: `${token}` }
    }
    const response = await Api.getTicket(values.ticketId, configRequest);
    dispatch(storeTicket(response.ticket))
    history.push("/ehome/ticket", {ticket: response});
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const menu = (
    <div>
      
      <Menu style={{marginTop:8}}>
      {user.name + ' '+user.surname}  
        <Menu.Item key="0" onClick={e=> goToUpdateAccountPage()}>
          Actualizar datos
        </Menu.Item>
        <Menu.Item key="1">
          Cerrar sesión
        </Menu.Item>
      </Menu>
    </div>
  );

  return (
    <Layout className="layout">
    <Header style={{background:"#6200EE"}}>
      <div className="logo" onClick={()=>{ history.push(""); }}></div>

      <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{float:"right", background:"#6200EE", color:"white"}}>
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
    <Footer style={{ textAlign: 'center' }}>CSaleAdminWeb (c) 2020</Footer>
  </Layout>
  );
}

export default EmployeeHome;
