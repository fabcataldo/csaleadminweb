import React from 'react';
import EmployeeHome from '../pages/EmployeeHome';
import TicketDetail from '../pages/TicketDetail';
import OwnerHome from '../pages/OwnerHome';
import { BrowserRouter as Router,Switch } from 'react-router-dom';
import UpdateUser from '../pages/UpdateUser';
import Login from '../pages/Login';
import RouterWrapper from './RouterWrapper';
import History from './History';

const Routing = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <Router history={History}>
        <Switch>
            <RouterWrapper path="/ehome" exact component={(EmployeeHome)} isPrivate></RouterWrapper>
            <RouterWrapper path="/ohome" exact component={(OwnerHome)} ></RouterWrapper>
            <RouterWrapper path="/ohome/account" exact component={(UpdateUser)} ></RouterWrapper>
            <RouterWrapper path="/ehome/account" exact component={(UpdateUser)} ></RouterWrapper>
            <RouterWrapper path="/ehome/ticket" exact component={(TicketDetail)} isPrivate></RouterWrapper>
            <RouterWrapper path="" strict exact component={Login}></RouterWrapper> 
        </Switch>
        </Router>      
    )

}

export default Routing;
