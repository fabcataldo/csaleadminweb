import React, { useState } from 'react';
import { Form, Input, Layout, Row } from 'antd';
import { useHistory } from "react-router-dom";
import background2 from '../assets/imgs/background2.png'
import AppLogo from '../components/AppLogo';
import Api from '../api/Api';
import { RightMenuHeader } from '../components/RightMenuHeader';
import LoadingComponent from '../components/LoadingComponent';
const { Header, Footer, Content } = Layout;


const EmployeeHome = () => {
  const [showLoading, setShowLoading] = useState(false);
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem('token'));

  const onFinish = async values => {
    const configRequest = {
      headers: { Authorization: `${token}` }
    }

    setShowLoading(true);
    const ticket = await Api.getTicket(parseInt(values.uniqueCode), configRequest);
    if (ticket) {
      const userTicket = await Api.getUserTicket(ticket._id, configRequest);
      if(userTicket){
        localStorage.setItem('ticket', JSON.stringify(ticket))
        localStorage.setItem('userTicket', JSON.stringify(userTicket))

        setShowLoading(false);
        history.push("/ehome/ticket");  
      }
    }
    setShowLoading(false);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout className="layout">
      <Header className="headerStyle">
        <AppLogo></AppLogo>
        <RightMenuHeader>
        </RightMenuHeader>
      </Header>
      <Content>
        <div className="site-layout-content" style={{ backgroundImage: `url(${background2})` }}>
          <h1 style={{ textAlign: 'center', color: 'white' }}>
            Bienvenido a CSaleAdminWeb! :)
          </h1>
          <h3 style={{ textAlign: 'center', color: 'white' }}>
            ¡Acá vas a poder validar las compras de tus clientes!
          </h3>
          <br></br>
          <br></br>
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
                label="Código unico de compra"
                name="uniqueCode"
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

          {
          showLoading ?
          <div>
            <LoadingComponent delay={2000}></LoadingComponent>
          </div>
          :<div></div>}
        </div>
      </Content>
      <Footer className="footer">CSaleAdminWeb (c) 2020</Footer>
    </Layout>
  );
}

export default EmployeeHome;
