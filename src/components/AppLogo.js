import React from 'react';
import { useHistory } from "react-router-dom";
import logo from '../assets/imgs/party.png';

const AppLogo = () => {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    
    const goToFirstPage = () => {
        if (user && token)
            if (user.role.name == "empleado")
                history.push("/ehome")
            else
                history.push("/ohome")
        else {
            history.push("")
        }
    }
    return (
        <div className="logo" onClick={() => { goToFirstPage() }}>
            <img src={logo} width="50" height="50" />
        </div>
    )
}

export default AppLogo;