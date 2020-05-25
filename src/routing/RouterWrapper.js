import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, withRouter  } from "react-router-dom";
import Login from '../pages/Login';

const RouteWrapper=({
  component: Component,
  isPrivate,
  ...rest
})=> {
  const token = JSON.parse(localStorage.getItem('token'));
  const user = JSON.parse(localStorage.getItem('user'));
  /**
   * Redirect user to SignIn page if he tries to access a private route
   * without authentication.
   */
  if (isPrivate && !user || !token) {
    
    return <Route exact path=""> <Login></Login> <Redirect to=""></Redirect></Route>
  }

  /**
   * If not included on both previous cases, redirect user to the desired route.
   */
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