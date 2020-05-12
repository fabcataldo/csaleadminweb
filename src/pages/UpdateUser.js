import React from 'react';
import { Form, Input, Button, Layout, Row, Menu, Dropdown,Avatar } from 'antd';
import { useHistory } from "react-router-dom";
import 'antd/dist/antd.css';
import '../styles/appStyles.scss';
import background from '../assets/imgs/background.jpg'
import Api from '../api/Api';
import { useDispatch } from 'react-redux'
import { setUser as storeUser } from '../actions/users';
import { setToken as storeToken } from '../actions/token';
import account from '../assets/imgs/account.png'
import { DownOutlined } from "@ant-design/icons";
import logo from '../assets/imgs/logo.png';
const { Header, Footer, Content } = Layout;


const UpdateUser = () => {
    const history = useHistory();
    const dispatch = useDispatch()

    const actualToken = JSON.parse(localStorage.getItem('token'))
    const userSaved = JSON.parse(localStorage.getItem('user'))

    const mapDataToSend=(values)=>{
        console.log(values);
        return{
            name: values.name,
            surname: values.surname,
            email: values.email,
            password: values.password ? values.password : userSaved.password,
            _id: userSaved._id,
            role: userSaved.role,
            loggedWithOAuth2: userSaved.loggedWithOAuth2,
            tickets: userSaved.tickets,
            comments: userSaved.comments
        }
    }

    const onFinish = async values => {
        const configRequest = {
            headers: { Authorization: `${actualToken}` }
        }
        if(values.newPassword !== values.newPassword2){
            //generar notificacion
            return;
        }
        const response = await Api.updateUser(mapDataToSend(values), configRequest)
        dispatch(storeUser(response.user))


        localStorage.setItem('user', JSON.stringify(response.user))

        if (response.token) {
            dispatch(storeToken(response.token))
            localStorage.setItem('token', JSON.stringify(response.token))
        }
        if (response.user.role.name == "empleado") {
            history.push("/ehome");
        }
        if (response.user.role.name == "dueño" || response.user.role.name == "socio") {
            history.push("/ohome");
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const goToFirstPage = () => {
        if(userSaved && actualToken)
            if(userSaved.role.name == "empleado")
                history.push("/ehome")
            else
                history.push("/ohome")
        else{
            history.push("")
        }
            
    }

    const menu = (
        <div>

            <Menu style={{ marginTop: 8 }}>
                {userSaved.name + ' ' + userSaved.surname}
                <Menu.Item key="0" onClick={e => goToUpdateAccountPage()}>
                    Actualizar datos
            </Menu.Item>
                <Menu.Item key="1">
                    Cerrar sesión
            </Menu.Item>
            </Menu>
        </div>
    );

    const goToUpdateAccountPage = () => {
        history.push("/ehome/account")
    }


    return (
        <Layout className="layout">
        <Header className="headerStyle">
          <div className="logo" onClick={()=>{goToFirstPage()}}>
            <img src={logo} width="50" height="50" />
          </div>

                <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{ float: "right", background: "#6200EE", color: "white" }}>
                    <Menu.Item key="1">Ayuda</Menu.Item>
                    <Menu.Item key="2">
                        <Dropdown overlay={menu} trigger={["click"]}>
                            <a className="ant-dropdown-link" >
                                <Avatar style={{ backgroundImage: `url(${account})` }} />
                                <DownOutlined />
                            </a>
                        </Dropdown>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content>
                <div className="site-layout-content" style={{ backgroundColor: "#382456", textAlign: "center" }}>
                    <h1 style={{ color: "white" }}>
                        Actualizar cuenta
                    </h1>
                    <Form
                        layout="vertical"
                        name="basic"
                        initialValues={{
                            remember: true,
                            name: userSaved.name,
                            surname: userSaved.surname,
                            email: userSaved.email
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Row style={{ justifyContent: "center" }}>
                            <Form.Item
                                label="Nombre"
                                name="name"
                                className="labelStyle"
                                initial
                            >
                                <Input />
                            </Form.Item>
                        </Row>

                        <Row style={{ justifyContent: "center" }}>
                            <Form.Item
                                label="Apellido"
                                name="surname"
                                className="labelStyle"
                            >
                                <Input />
                            </Form.Item>
                        </Row>
                        <Row style={{ justifyContent: "center" }}>
                            <Form.Item
                                label="Email"
                                name="email"
                                className="labelStyle"
                            >
                                <Input />
                            </Form.Item>
                        </Row>
                        <Row style={{ justifyContent: "center" }}>
                            <Form.Item
                                label="Nueva contraseña"
                                name="newPassword"
                                className="labelStyle"
                            >
                                <Input />
                            </Form.Item>
                        </Row>
                        <Row style={{ justifyContent: "center" }}>
                            <Form.Item
                                label="Repetir contraseña"
                                name="newPassword2"
                                className="labelStyle"
                            >
                                <Input />
                            </Form.Item>
                        </Row>
                        <Form.Item>
                            <Button className="button" type="primary" htmlType="submit">
                                Actualizar
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }} className="footer">CSaleAdminWeb (c) 2020</Footer>
        </Layout>
    )
}

export default UpdateUser