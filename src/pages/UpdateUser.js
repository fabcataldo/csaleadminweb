import React, { useState } from 'react';
import { Form, Input, Button, Layout, Row } from 'antd';
import { useHistory } from "react-router-dom";
import 'antd/dist/antd.css';
import '../styles/appStyles.scss';
import background2 from '../assets/imgs/background2.png'
import Api from '../api/Api';
import { RightMenuHeader } from '../components/RightMenuHeader';
import AppLogo from '../components/AppLogo';
import LoadingComponent from '../components/LoadingComponent';
const { Header, Footer, Content } = Layout;


const UpdateUser = () => {
    const [showLoading, setShowLoading] = useState(false);
    const history = useHistory();

    const actualToken = JSON.parse(localStorage.getItem('token'))
    const userSaved = JSON.parse(localStorage.getItem('user'))

    const mapDataToSend = (values) => {
        return {
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
        setShowLoading(true);
        if (values.newPassword !== values.newPassword2) {
            Notification('info', 'Las contraseñas introducidas deben ser iguales');
            return;
        }
        const response = await Api.updateUser(mapDataToSend(values), configRequest)

        if(response){
            localStorage.setItem('user', JSON.stringify(response.user))

            if (response.token) {
                localStorage.setItem('token', JSON.stringify(response.token))
            }

            setShowLoading(false);
            if (response.user.role.name == "empleado") {
                history.push("/ehome");
            }
            if (response.user.role.name == "dueño" || response.user.role.name == "socio") {
                history.push("/ohome");
            }    
        }
        else{
            setShowLoading(false);
        }
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
                    <h1 style={{ color: "white" }}>
                        Actualizar cuenta
                    </h1>
                    <br></br>
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