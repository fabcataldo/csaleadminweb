import React from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import '../styles/appStyles.scss';
import background from '../assets/imgs/background.jpg'
const { Header, Footer, Content } = Layout;

function Login() {
  return (
      <Layout className="layout">
        <Header className="headerStyle">
          <div className="logo" />
        </Header>
        <Content>
            <div className="site-layout-content" styles={{ backgroundImage:`url(${background})` }}>
                Usuario
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
  );
}

export default Login;
