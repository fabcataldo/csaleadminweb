import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, withRouter, useLocation } from "react-router-dom";
import Login from '../pages/Login';
import OwnerHome from '../pages/OwnerHome';
import EmployeeHome from '../pages/EmployeeHome';

const RouteWrapper=({
  component: Component,
  isPrivate,
  ...rest
})=> {
  const token = JSON.parse(localStorage.getItem('token'));
  const user = JSON.parse(localStorage.getItem('user'));
  let location = useLocation().pathname;

  var expresionToCompare = /ohome/;

  if (isPrivate && !user && !token) {
    return <Route exact path=""> <Login></Login> <Redirect to=""></Redirect></Route>
  }
  else{
    if (isPrivate && user.role.name.includes('empleado') && expresionToCompare.test(location) ){
      return <Route exact path=""> <EmployeeHome></EmployeeHome> <Redirect to="/ehome"></Redirect></Route>
    }
    else{
      if (isPrivate && user.role.name.includes('dueño') && !expresionToCompare.test(location) ){
        return <Route exact path=""> <OwnerHome></OwnerHome> <Redirect to="/ohome"></Redirect></Route>
      }
    }        
  }

  return <Route {...rest} component={withRouter(Component)} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

RouteWrapper.defaultProps = {
  isPrivate: false
};

export default RouteWrapper