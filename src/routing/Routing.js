import React from 'react';
import EmployeeHome from '../pages/EmployeeHome';
import TicketDetail from '../pages/TicketDetail';
import OwnerHome from '../pages/OwnerHome';
import { BrowserRouter as Router,Switch, Route, withRouter } from 'react-router-dom';
import UpdateEmployee from '../pages/UpdateEmployee';
import Login from '../pages/Login';

const Routing = () => {
    return (
        <Router>
        <Switch>
            <Route path="/ehome" exact component={withRouter(EmployeeHome)}></Route>
            <Route path="/ohome" exact component={withRouter(OwnerHome)}></Route>
            <Route path="/ehome/account" exact component={withRouter(UpdateEmployee)}></Route>
            <Route path="/ehome/ticket" exact component={withRouter(TicketDetail)}></Route>
            <Route path="" strict exact component={withRouter(Login)}></Route>      

        </Switch>
        </Router>
    )
}

export default Routing;
