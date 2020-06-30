import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import background2 from '../assets/imgs/background2.png'
import  Accessories  from '../utils/Accessories'
import StaticTable from '../components/StaticTable';
import AppLogo from '../components/AppLogo';
import { RightMenuHeader } from '../components/RightMenuHeader';
import '../styles/ticketDetail.scss'

const { Header, Footer, Content } = Layout;


const TicketDetail = () => {
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

    const mapPurchasedProductsData = (dataSource) => {
        return dataSource.map((item, index) => {
            return {
                key: '' + index, description: item.product.description, price: item.product.price,
                quantity: item.quantity, validity: Accessories.formatDate(item.product.valid_date_from)
                    +' - '+Accessories.formatDate(item.product.valid_date_to)
            }
        })
    }

    return (
        <Layout className="layout">
            <Header className="headerStyle">
                <AppLogo></AppLogo>
                <RightMenuHeader>
                </RightMenuHeader>
            </Header>
            <Content>
                <div className="site-layout-content" style={{ backgroundImage: `url(${background2})` }}>
                    <h1 style={{ color: "white", textAlign: 'center' }}>
                        Validar compra
                    </h1>
                    <br></br>
                    <Row>
                        <Col md={{span: 12, push: 1}} lg={{ span: 12, push: 3 }} xl={{ span: 12, push: 3 }}>
                            <Card className="cardStyle" bordered={false}>
                                <h2>
                                    CSaleApp
                                </h2>
                                <h3>
                                    Recibo
                                </h3>
                                <h3>
                                    Codigo único: {ticket.unique_code}
                                </h3>
                                <p>
                                    Fecha: {Accessories.formatDate(ticket.date_of_purchase)}
                                    <br></br>
                                    Productos:
                                    <StaticTable
                                        data={mapPurchasedProductsData(ticket.purchased_products)}
                                        columns={purchasedProductsColumns}
                                        tableStyle={'productsTable'}
                                        ></StaticTable>
                                    <br></br>
                                    Total: ${ticket.total}
                                    <br></br> 
                                    Pagó con {ticket.payment_methods.payment_method.name}
                                </p>
                            </Card>
                        </Col>
                        <Col md={{span: 12, push: 2}} lg={{ span: 12, push: 3 }} xl={{ span: 12, push: 3 }}>
                            <Card className="userCard" bordered={false}>
                                <h2>
                                    Cliente
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