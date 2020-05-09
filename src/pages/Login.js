import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Layout, Row } from 'antd';
import { useHistory } from "react-router-dom";
import 'antd/dist/antd.css';
import '../styles/appStyles.scss';
import background from '../assets/imgs/background.jpg'
import Api from '../api/Api';
import { useDispatch } from 'react-redux'
import { setUser as storeUser } from '../actions/users';
import { setToken as storeToken} from '../actions/token';
const { Header, Footer, Content } = Layout;


const Login = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  let loginData = null;
  const history = useHistory();

  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);
  
  const onFinish = async values => {
    const response = await Api.login(values)
    //GUARDAR CON REDUX
    setUser(response.user);
    setToken(response.token);

    dispatch(storeUser(response.user))
    dispatch(storeToken(response.token))

    if(response.user.role.name=="empleado"){
      history.push("/ehome");
    }
    if(response.user.role.name=="dueño" || response.user.role.name=="socio" ){
      history.push("/ohome");
    }

    
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
        <div className="site-layout-content" style={{ backgroundImage: `url(${background})`, textAlign: "center" }}>
          <h1 style={{ color: "white" }}>
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
            <Row style={{ justifyContent: "center" }}>
              <Form.Item
                label="Email"
                name="email"
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

            <Row style={{ justifyContent: "center" }}>
              <Form.Item
                label="Contraseña"
                name="password"

                style={{ color: "white" }}
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
      <Footer style={{ textAlign: 'center' }} className="footer">CSaleAdminWeb (c) 2020</Footer>
    </Layout>
  );
}

export default Login;
