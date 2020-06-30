import React from 'react';
import { DownOutlined } from "@ant-design/icons";
import { Avatar } from 'antd';
import account from '../assets/imgs/2113250.png'
import { Menu, Dropdown } from 'antd';
import { useHistory } from "react-router-dom";

export const RightMenuHeader = () => {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('user'));
    let countKey = 0;

    const goToUpdateAccountPage = () => {
        if(user.role.name.includes('empleado'))
            history.push("/ehome/account")
        else
            history.push("/ohome/account")
    }

    const closeSession = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('ticket');
        localStorage.removeItem('userTicket');
        history.push("")
    }

    const menu = (
        <div style={{marginLeft: -46}}>
            <Menu style={{ marginTop: 4, textAlign: 'left' }}>
                <div style={{ textAlign: 'center' }}>
                    <Avatar src={`url(${account})`} />
                    <p style={{ marginTop: 10 }}>
                        {user.name + ' ' + user.surname}
                    </p>
                </div>

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
        <div>
            <Menu mode="horizontal" className="menuHeader">
                <Menu.Item key={1} onClick={()=>{ 
                    if(!(user.role.name == 'empleado'))
                        history.push("/ohome/usersAdmin")
                    else
                        return 
                    }}>{!(user.role.name == 'empleado') ? 'Gestionar Usuarios' :  'Ayuda'}</Menu.Item>
                <Menu.Item key={2}>
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <a className="ant-dropdown-link" >
                            <Avatar src={{ account }} />
                            <DownOutlined />
                        </a>
                    </Dropdown>
                </Menu.Item>
            </Menu>
        </div>
    )
}