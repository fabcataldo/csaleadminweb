import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Layout, Menu, Dropdown, Row } from 'antd';
import 'antd/dist/antd.css';
import { DownOutlined } from "@ant-design/icons";
import account from '../assets/imgs/account.png'
import logo from '../assets/imgs/logo.png';
import { Avatar } from 'antd';
import background2 from '../assets/imgs/background2.png'
import { useHistory } from "react-router-dom";
import DynamicTable from '../components/DynamicTable';
import Api from '../api/Api';
const { Header, Footer, Content } = Layout;

const UsersAdministrator = () => {
    const history = useHistory();
    const actualToken = JSON.parse(localStorage.getItem('token'))
    const userSaved = JSON.parse(localStorage.getItem('user'))
    const [users, setUsers] = useState(null);

    const userInfo = JSON.parse(localStorage.getItem('user'))
    const tokenInfo = JSON.parse(localStorage.getItem('token'))

    const usersColumns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Apellido',
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Rol',
            dataIndex: 'role.name',
            key: 'role.name',
        },
        {
            title: 'Privileges',
            dataIndex: 'role.name.privileges',
            key: 'role.name.privileges',
        }
    ];

    const mapUsersData = (dataSource) => {
        let a = [];
        console.log('PISE MAPUSERSDATA')
        a = dataSource.map((item, index) => {
            return {
                key: '' + index, name: item.name, surname: item.surname, email: item.email,
                role: item.role
            }
        })
        return a;
    }

    useEffect(() => {
        const getUsers = async () => {
            return await Api.getUsers(configRequest);
        }
        
        return()=>{
            setUsers(mapUsersData(getUsers()))
        }
    })

    const configRequest = {
        headers: { Authorization: `${tokenInfo}` }
    }

    const closeSession = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('ticket');
        localStorage.removeItem('userTicket');
        history.push("")
    }

    const goToFirstPage = () => {
        if (userSaved && actualToken)
            if (userSaved.role.name == "empleado")
                history.push("/ehome")
            else
                history.push("/ohome")
        else {
            history.push("")
        }

    }

    const goToUpdateAccountPage = () => {
        history.push("/ohome/account")
    }


    const menu = (
        <div>
            <Menu style={{ marginTop: 8 }}>
                {userInfo.name + ' ' + userInfo.surname}
                <Menu.Item key="0" onClick={e => goToUpdateAccountPage()}>
                    Actualizar datos
                </Menu.Item>
                <Menu.Item key="1" onClick={e => closeSession()}>
                    Cerrar sesión
                </Menu.Item>
            </Menu>
        </div>
    );

    return (
        <Layout className="layout">
            <Header className="headerStyle">
                <div className="logo" onClick={() => { goToFirstPage() }}>
                    <img src={logo} width="50" height="50" />
                </div>
                <Menu mode="horizontal" style={{ float: "right", background: "#6200EE", color: "white" }}>
                    <Menu.Item key="1">Gestionar usuarios</Menu.Item>
                    <Menu.Item key="2">Ayuda</Menu.Item>
                    <Menu.Item key="3">
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
                <div className="site-layout-content" style={{ backgroundImage: `url(${background2})` }}>
                    <h1 style={{ textAlign: 'center', color: 'white' }}>
                        Gestionar usuarios
        </h1>
                    <DynamicTable
                        columns={usersColumns}
                        data={users}
                    >
                    </DynamicTable>
                </div>
            </Content>
            <Footer className="footer">CSaleAdminWeb (c) 2020</Footer>
        </Layout>
    );
}

export default UsersAdministrator;