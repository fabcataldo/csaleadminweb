import React from 'react';
import { Layout } from 'antd';
import '../styles/appStyles.scss';
import background2 from '../assets/imgs/background2.png'
import OwnerDashboard from './OwnerDashboard';
import { RightMenuHeader } from '../components/RightMenuHeader';
import AppLogo from '../components/AppLogo';
const { Header, Footer, Content } = Layout;

const OwnerHome = () => {
  const userInfo = JSON.parse(localStorage.getItem('user'));

  return (
    <Layout className="layout">
      <Header className="headerStyle">
        <AppLogo></AppLogo>
        <RightMenuHeader>
        </RightMenuHeader>
      </Header>
      <Content>
        <div className="site-layout-content" style={{ backgroundImage: `url(${background2})` }}>
          <h1 style={{ color: 'white', fontWeight: 'bold' }}>
            Bienvenido a CSaleAdminWeb! :)
        </h1>
          <h3 style={{ color: 'white' }}>
            ¡Acá vas a poder gestionar tu negocio de manera fácil, rápida y segura!
        </h3>

          <br></br>
          <br></br>
          <h4 style={{ color: 'white' }}>
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
