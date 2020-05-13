import React from 'react';
import { Layout, Menu, Dropdown, Row, Col, Card, Avatar } from 'antd';
import 'antd/dist/antd.css';
import { useHistory } from "react-router-dom";
import account from '../assets/imgs/account.png'
import { useSelector } from 'react-redux'
import Api from '../api/Api';
import { DownOutlined } from "@ant-design/icons";
import StaticTable from '../components/StaticTable';
import logo from '../assets/imgs/logo.png';
import '../styles/ticketDetail.scss'

const { Header, Footer, Content } = Layout;


const TicketDetail = () => {
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem('user'))
    const tokenInfo = JSON.parse(localStorage.getItem('token'))
    const userTicket = JSON.parse(localStorage.getItem('userTicket'))
    const ticket = JSON.parse(localStorage.getItem('ticket'))

    const purchasedProductsColumns = [
        {
            title: 'Descripcion',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Precio',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Cantidad',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Validez',
            key: 'validity',
            dataIndex: 'validity'
        },
    ];

    const paymentMethodsColumns = [
        {
            title: 'Método',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Monto',
            dataIndex: 'amount',
            key: 'amount',
        }
    ];

    const mapPurchasedProductsData = (dataSource) => {
        console.log(dataSource.purchased_products)
        let a = [];
        a = dataSource.map((item, index) => {
            let date = new Date(item.product.valid_date_from);
            return {
                key: '' + index, description: item.product.description, price: item.product.price,
                quantity: item.quantity, validity: date.getDay() + '/' + date.getMonth() + '/' + date.getYear()
                    + ' ' + date.getHours() + ':' + date.getMinutes()
            }
        })
        return a;
    }

    const mapPaymentMethodsData = (dataSource) => {
        let result = [];
        result = dataSource.map((item, index) => {
            return {
                key: '' + index, name: item.payment_method.name, amount: item.amount_paid
            }
        })
        return result;
    }

    const goToUpdateAccountPage = () => {
        history.push("/ehome/account")
    }


    const closeSession = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('ticket');
        localStorage.removeItem('userTicket');
        history.push("")
    }


    const goToFirstPage = () => {
        if (user && tokenInfo)
            if (user.role.name == "empleado")
                history.push("/ehome")
            else
                history.push("/ohome")
        else {
            history.push("")
        }

    }

    const menu = (
        <div>

            <Menu style={{ marginTop: 8 }}>
                {user.name + ' ' + user.surname}
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
                <div className="site-layout-content" style={{ background: "#382456", color: "white" }}>
                    <h1 style={{ color: "white", textAlign: 'center' }}>
                        Validar ticket
                    </h1>
                    <Row>
                        <Col lg={{ span: 12, push: 3 }}>
                            <Card className="cardStyle" bordered={false}>
                                <h2>
                                    CSaleApp
                                </h2>
                                <h3>
                                    Recibo
                                </h3>
                                <h3>
                                    Codigo de compra: <br></br>{ticket._id}
                                </h3>
                                <p>
                                    Fecha: {ticket.date_of_purchase}
                                    <br></br>
                                    Productos:
                                    <br></br>
                                    <StaticTable
                                        data={mapPurchasedProductsData(ticket.purchased_products)}
                                        columns={purchasedProductsColumns}></StaticTable>
                                    <br></br>
                                    Total: ${ticket.total}
                                    <br></br>
                                    Pagos realizados:
                                    <StaticTable
                                        data={mapPaymentMethodsData(ticket.payment_methods)}
                                        columns={paymentMethodsColumns}></StaticTable>
                                    <br></br>
                                    Nota: cuando llegués a la entrada, mostrale al
                                    boletero/a o barman/barwoman este ticket, asi aprovechás tu compra!.
                                </p>
                            </Card>
                        </Col>
                        <Col lg={{ span: 12, push: 3 }}>
                            <Card className="userCard" bordered={false}>
                                <h2>
                                    Detalle del cliente
                                </h2>
                                <p>
                                    Cliente: {userTicket.name + ' ' + userTicket.surname}
                                    <br></br>
                                    Email: {userTicket.email}
                                </p>
                            </Card>

                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer className="footer">CSaleAdminWeb (c) 2020</Footer>
        </Layout>
    );


}

export default TicketDetail;