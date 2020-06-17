import React from 'react';
import { Layout, Menu, Dropdown} from 'antd';
import 'antd/dist/antd.css';
import { DownOutlined } from "@ant-design/icons";
import account from '../assets/imgs/account.png'
import logo from '../assets/imgs/logo.png';
import { Avatar } from 'antd';
import background2 from '../assets/imgs/background2.png'
import { useHistory } from "react-router-dom";
import OwnerDashboard from './OwnerDashboard';
const { Header, Footer, Content } = Layout;

const OwnerHome = () =>{
  const history = useHistory();
  
  const userInfo = JSON.parse(localStorage.getItem('user'))
  const tokenInfo = JSON.parse(localStorage.getItem('token'))



  const closeSession = ()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('ticket');
    localStorage.removeItem('userTicket');
    history.push("")
  }

  const goToUpdateAccountPage = ()=>{
    history.push("/ohome/account")
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

      <Menu mode="horizontal" style={{float:"right", background:"#6200EE", color:"white"}}>
        <Menu.Item key="1"  onClick={()=>{ history.push("/ohome/usersAdmin"); }}>Gestionar usuarios</Menu.Item>
        <Menu.Item key="2">Ayuda</Menu.Item>
        <Menu.Item key="3">
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
      <div className="site-layout-content" style={{ backgroundImage: `url(${background2})`, textAlign: "center"}}>
        <h1 style={{ color: 'white',fontWeight: 'bold' }}>
          Bienvenido a CSaleAdminWeb! :)
        </h1>
        <h3  style={{color: 'white' }}>
        ¡Acá vas a poder gestionar tu negocio de manera fácil, rápida y segura!
        </h3>
        
        <br></br>
        <br></br>
        <h4  style={{color: 'white' }}>
          Gráfico de ganancias
        </h4>
          <OwnerDashboard>
          </OwnerDashboard>

      </div>
    </Content>
    <Footer className="footer">CSaleAdminWeb (c) 2020</Footer>
  </Layout>
  );
}

export default OwnerHome;
