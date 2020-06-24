import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import background2 from '../assets/imgs/background2.png'
import StaticTable from '../components/StaticTable';
import AppLogo from '../components/AppLogo';
import { RightMenuHeader } from '../components/RightMenuHeader';
import '../styles/ticketDetail.scss'

const { Header, Footer, Content } = Layout;


const TicketDetail = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = JSON.parse(localStorage.getItem('token'))
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
                                    Total: ${ticket.total} en {ticket.payment_methods.payment_method.name}
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