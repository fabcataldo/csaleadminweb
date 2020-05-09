import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Layout, Menu, Dropdown, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { useHistory } from "react-router-dom";
import background2 from '../assets/imgs/background2.png';
import account from '../assets/imgs/account.png'
import { useSelector } from 'react-redux'
import Api from '../api/Api';
import { DownOutlined } from "@ant-design/icons";
import { Avatar } from 'antd';
import  TableProducts  from '../components/TableProducts';
const { Header, Footer, Content } = Layout;


const TicketDetail = () => {
    const history = useHistory();
    const location = useLocation();
    const user = useSelector((user) => {return user.users.payload})
    const ticket = useSelector((ticket) => {return ticket.ticket.payload})
    
    const goToUpdateAccountPage = ()=>{
        history.push("/ehome/account")
    }

    const menu = (
        <div>
          
          <Menu style={{marginTop:8}}>
          {user.name + ' '+user.surname}  
            <Menu.Item key="0" onClick={e=> goToUpdateAccountPage()}>
              Actualizar datos
            </Menu.Item>
            <Menu.Item key="1">
              Cerrar sesión
            </Menu.Item>
          </Menu>
        </div>
      );
    return (
        <Layout className="layout">
        <Header style={{background:"#6200EE"}}>
          <div className="logo" onClick={()=>{ history.push(""); }}></div>
    
          <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{float:"right", background:"#6200EE", color:"white"}}>
            <Menu.Item key="1">Ayuda</Menu.Item>
            <Menu.Item key="2">
              <Dropdown overlay={menu} trigger={["click"]}>
                <a className="ant-dropdown-link" >
                <Avatar style={{ backgroundImage: `url(${account})`}} />
                <DownOutlined />
                </a>
              </Dropdown>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <div className="site-layout-content" style={{ backgroundImage: `url(${background2})`}}>
            <h1 style={{ textAlign: 'center', color: 'white' }}>
                Ticket válido
            </h1>
            <br>
            </br>
                <div className="ticketDetail">
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
                        <TableProducts 
                            data={ticket.purchased_products}
                        ></TableProducts>
                    </p>
                </div>
            {/*

                                    <div *ngFor="let purchaseProduct of ticket.purchased_products">
                                        <ion-row>
                                            <ion-col class="cell-class">
                                                {{purchaseProduct.product.description}}
                                            </ion-col>
                                            <ion-col class="cell-class">
                                                {{purchaseProduct.product.price}}
                                            </ion-col>
                                            <ion-col class="cell-class">
                                                {{purchaseProduct.quantity}}
                                            </ion-col>
                                            <ion-col class="cell-class">
                                                {{purchaseProduct.product.valid_date_from}}-{{purchaseProduct.product.valid_date_to}}
                                            </ion-col>
                                        </ion-row>
                                    </div>
                                </ion-grid>
                            </ion-item>
                        </ion-list>
                    </p>
                </div>

            <div id="Html2Pdf">
        <ion-card>
            <ion-item no-lines>
                
            </ion-item>

            <ion-card-content>
                <ion-list>
                    <ion-item no-lines>
                        
                    </ion-item>

                    <ion-item>
                        Productos:
                        <ion-list>
                            <ion-item text-wrap>
                                <ion-grid>
                                    <ion-row>
                                        <ion-col class="cell-class">
                                            DescripciÃ³n
                                        </ion-col>
                                        <ion-col class="cell-class">
                                            Precio
                                        </ion-col>
                                        <ion-col class="cell-class">
                                            Cantidad
                                        </ion-col>
                                        <ion-col class="cell-class">
                                            Validez
                                        </ion-col>
                                    </ion-row>
                                    <div *ngFor="let purchaseProduct of ticket.purchased_products">
                                        <ion-row>
                                            <ion-col class="cell-class">
                                                {{purchaseProduct.product.description}}
                                            </ion-col>
                                            <ion-col class="cell-class">
                                                {{purchaseProduct.product.price}}
                                            </ion-col>
                                            <ion-col class="cell-class">
                                                {{purchaseProduct.quantity}}
                                            </ion-col>
                                            <ion-col class="cell-class">
                                                {{purchaseProduct.product.valid_date_from}}-{{purchaseProduct.product.valid_date_to}}
                                            </ion-col>
                                        </ion-row>
                                    </div>
                                </ion-grid>
                            </ion-item>
                        </ion-list>
                    </ion-item>

                    <ion-item no lines>
                        Total: ${{ticket.total}}
                    </ion-item>
                    <ion-item no lines>
                        Pagaste con:
                        <ion-grid *ngFor="let paymentMethod of ticket.payment_methods">
                            <ion-row>
                                - {{toCapitalize(paymentMethod.paymentMethod.name)}}
                            </ion-row>
                            <div *ngIf="paymentMethod.paymentMethod.name == tarjeta">
                                <ion-row>
                                    NÃºmero: paymentMethod.creditCard
                                </ion-row>
                            </div>
                            <ion-row>
                                Abonaste: ${{paymentMethod.amountPaid}}
                            </ion-row>
                        </ion-grid>
                    </ion-item>
                    <div>
                        Nota: cuando lleguÃ©s a la entrada, mostrale al boletero/a o barman/barwoman este ticket, asi aprovechÃ¡s tu compra!.
                    </div>
                </ion-list>
            </ion-card-content>
        </ion-card>
    </div>

 */}
          </div>
          
        </Content>
        <Footer style={{ textAlign: 'center' }}>CSaleAdminWeb (c) 2020</Footer>
      </Layout>
      );
    

}

export default TicketDetail;