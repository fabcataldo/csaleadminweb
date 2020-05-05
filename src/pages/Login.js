import React from 'react';
import { Form, Input, Button, Checkbox, Layout, Menu, Row } from 'antd';
import 'antd/dist/antd.css';
import '../styles/appStyles.scss';
import background from '../assets/imgs/background.jpg'
const { Header, Footer, Content } = Layout;

function Login() {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Layout className="layout">
      <Header className="headerStyle">
        <div className="logo" />
      </Header>
      <Content>
        <div className="site-layout-content" style={{ backgroundImage: `url(${background})`, textAlign: "center"}}>
          <h1 style={{color: "white"}}>
            Bienvenido a CSaleAdminWeb! :)
          </h1>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          
          >
            <Row   style={{justifyContent: "center"}}>
              <Form.Item
                label="Usuario"
                name="username"
                className="labelStyle"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Row>
            
            <Row  style={{justifyContent: "center"}}> 
            <Form.Item
              label="Contraseña"
              name="password"
                
              style={{color:"white"}}
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            </Row>
            <Form.Item>
              <Button className="button" type="primary" htmlType="submit">
                Iniciar sesión
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}  className="footer">CSaleAdminWeb (c) 2020</Footer>
    </Layout>
  );
}

export default Login;
