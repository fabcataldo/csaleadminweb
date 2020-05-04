import React from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
const { Header, Footer, Content } = Layout;

function EmployeeHome() {
  return (
    <Layout className="layout">
    <Header style={{background:"#6200EE"}}>
      <div className="logo" />
      <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{float:"right", background:"#6200EE", color:"white"}}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div className="site-layout-content">Content</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  );
}

export default EmployeeHome;
