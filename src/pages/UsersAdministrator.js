import React, { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown,  Input, Button, Space} from 'antd';
import 'antd/dist/antd.css';
import { DownOutlined } from "@ant-design/icons";
import account from '../assets/imgs/account.png'
import logo from '../assets/imgs/logo.png';
import { Avatar } from 'antd';
import background2 from '../assets/imgs/background2.png'
import { useHistory } from "react-router-dom";
import DynamicTableHook from '../components/DynamicTableHook';
import Api from '../api/Api';
import { SearchOutlined } from '@ant-design/icons';
const { Header, Footer, Content } = Layout;

const UsersAdministrator = () => {
    const history = useHistory();
    const actualToken = JSON.parse(localStorage.getItem('token'))
    const userSaved = JSON.parse(localStorage.getItem('user'))

    const [users, setUsers] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const userInfo = JSON.parse(localStorage.getItem('user'))
    const tokenInfo = JSON.parse(localStorage.getItem('token'))
    const configRequest = {
        headers: { Authorization: `${tokenInfo}` }
    }

  
    const mapUsersData = (dataSource) => {
        let a = [];
        a = dataSource.map((item, index) => {
            let itemPrivileges= '';
            item.role.privileges.forEach((privilege)=>{
                itemPrivileges+= privilege.description+ '. '
            })
            return {
                key: '' + index, name: item.name, surname: item.surname, email: item.email,
                role: item.role.name, _id: item._id, privileges: itemPrivileges, password: item.password,
                tickets: item.tickets, comments: item.comments
            }
        })
        console.log(a)
        return a;
      }

    useEffect(()=>{
        const getUsers = async()=>{
            try{
                let response = await Api.getUsers(configRequest)
                response=mapUsersData(response.users)
                setUsers(response);
            }catch(err){
                console.log(err);
            }
        }
        getUsers();
      },[]);

    const getColumnSearchProps = (dataIndex, title) => ({
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Buscar ${title}`}
              value={selectedKeys[0]}
              onChange={e =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              onPressEnter={() =>
                handleSearch(selectedKeys, confirm, dataIndex)
              }
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Buscar
              </Button>
              <Button
                onClick={() => handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
              >
                Limpiar
              </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => (
          <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),

      });

      const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchedColumn(dataIndex)
        setSearchText(selectedKeys[0])
      };
    
      const handleReset = clearFilters => {
        clearFilters()
        setSearchText('')
      };
    
    const usersColumns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            sorter: (a, b) => {a.name.localeCompare(b.name)},
            ...getColumnSearchProps('name', 'Nombre')
        },
        {
            title: 'Apellido',
            dataIndex: 'surname',
            sorter: (a, b) => {a.surname.localeCompare(b.surname)},
            ...getColumnSearchProps('surname', 'Apellido')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            ...getColumnSearchProps('email', 'Email')
        },
        {
            title: 'Rol',
            dataIndex: 'role',
            sorter: (a, b) => a.role.localeCompare(b.role),
            ...getColumnSearchProps('role', 'Rol')
        },
        {
            title: 'Privilegios',
            dataIndex: 'privileges'
        }
    ];




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
                    <DynamicTableHook
                        columns={usersColumns}
                        data={users}
                    >
                    </DynamicTableHook>
                </div>
            </Content>
            <Footer className="footer">CSaleAdminWeb (c) 2020</Footer>
        </Layout>
    );
}

export default UsersAdministrator;
