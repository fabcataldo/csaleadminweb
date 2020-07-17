import React, {useState} from 'react';
import { Form, Input, Button, Layout, Row } from 'antd';
import { useHistory } from "react-router-dom";
import '../styles/appStyles.scss';
import background from '../assets/imgs/background2.png'
import Api from '../api/Api';
import AppLogo from '../components/AppLogo';
import Notification from '../components/Notification';
import LoadingComponent from '../components/LoadingComponent';
const { Header, Footer, Content } = Layout;


const Login = () => {
  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);
  
  const saveSession=(session)=>{
    localStorage.setItem('user', JSON.stringify(session.user))
    localStorage.setItem('token', JSON.stringify(session.token))
  }

  const onFinish = async values => {
    setShowLoading(true);
    const response = await Api.login(values)

    if(response){
      if(response.user.role.name=="empleado"){
        saveSession(response);
        console.log(showLoading)
        history.push("/ehome");
      }
      if(response.user.role.name=="dueño" || response.user.role.name=="socio" ){
        saveSession(response);
        history.push("/ohome");
      }
      if(response.user.role.name=="cliente"){
        Notification('info', 'Inicio de sesión fallido', 'Debe iniciar sesión con un usuario que sea dueño, socio o empleado.');
      }
    }
    setShowLoading(false);
  };


  return (
    <Layout className="layout">
      <Header className="headerStyle">
        <AppLogo></AppLogo>
      </Header>
      <Content>
        <div className="site-layout-content" style={{ backgroundImage: `url(${background})`}}>
          <h1 style={{ color: "white", fontWeight: 'bold'  }}>
            Bienvenido a CSaleAdminWeb! :)
          </h1>
          <br></br>
          <br></br>
          <Form
            layout="vertical"
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}>
            <Row style={{ justifyContent: "center" }}>
              <Form.Item
                label="Email"
                name="email"
                className="labelStyle"
                rules={[
                  {
                    required: true,
                    message: 'Email requerido.',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Row>

            <Row style={{ justifyContent: "center" }}>
              <Form.Item
                label="Contraseña"
                name="password"

                style={{ color: "white" }}
                rules={[
                  {
                    required: true,
                    message: 'Contraseña requerido.',
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
          {
          showLoading ?
          <div>
            <LoadingComponent delay={2000}></LoadingComponent>
          </div>
          :<div></div>}
        </div>
      </Content>
      
      <Footer style={{ textAlign: 'center' }} className="footer">CSaleAdminWeb (c) 2020</Footer>
    </Layout>
  );
}

export default Login;
