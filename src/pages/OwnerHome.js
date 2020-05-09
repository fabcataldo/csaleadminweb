import React from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import { useHistory } from "react-router-dom";
const { Header, Footer, Content } = Layout;

const OwnerHome = () =>{
  const history = useHistory();

  return (
    <Layout className="layout">
    <Header style={{background:"#6200EE"}}>
      <div className="logo"  onClick={()=>{ history.push(""); }}/>
      <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{float:"right", background:"#6200EE", color:"white"}}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div className="site-layout-content">
      <h1 style={{ textAlign: 'center' }}>
        Bienvenido a CSaleAdminWeb! :)
      </h1>
      <h3  style={{ textAlign: 'center' }}>
      ¡Acá vas a poder gestionar tu negocio de manera fácil, rápida y segura!
      </h3>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  );
}

export default OwnerHome;
