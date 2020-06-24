import React from 'react';
import { Form, Input, Layout, Row } from 'antd';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import background2 from '../assets/imgs/background2.png'
import AppLogo from '../components/AppLogo';
import Api from '../api/Api';
import { setTicket as storeTicket } from '../actions/ticket';
import { RightMenuHeader } from '../components/RightMenuHeader';
const { Header, Footer, Content } = Layout;


const EmployeeHome = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const user = JSON.parse(localStorage.getItem('user'));
  const token = JSON.parse(localStorage.getItem('token'));

  const onFinish = async values => {
    const configRequest = {
      headers: { Authorization: `${token}` }
    }
    
    const ticket = await Api.getTicket(values.uniqueCode, configRequest);
    const userTicket = await Api.getUserTicket(ticket._id, configRequest);
    dispatch(storeTicket(ticket))
    localStorage.setItem('ticket', JSON.stringify(ticket))
    localStorage.setItem('userTicket', JSON.stringify(userTicket))
    history.push("/ehome/ticket");
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
        </div>
      </Content>
      <Footer className="footer">CSaleAdminWeb (c) 2020</Footer>
    </Layout>
  );
}

export default EmployeeHome;
