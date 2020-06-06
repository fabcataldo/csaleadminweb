import axios from 'axios';
import Global from '../utils/Global';

export default class Api{
    static login = async (user)=>{
        let response;
        await axios({
            method: 'post',
            url: Global.URL_SRV+Global.URL_API+'/login',
            data: {
                email: user.email,
                password: user.password
            }
        }).then(res=>{
            response = res.data;
        });
        return response;
    }

    static getUsers = async(conf)=>{
        let response;
        await axios.get(Global.URL_SRV+Global.URL_API+'/users', conf)
        .then(res=>{
            response = res.data;
        });
        return response;
    }

    static getTicket = async (ticketId, conf)=>{
        let response;
        await axios.get(Global.URL_SRV+Global.URL_API+'/tickets/'+ticketId, conf)
        .then(res=>{
            response = res.data;
        });
        return response;
    }

    static getTickets = async (conf)=>{
        let response;
        await axios.get(Global.URL_SRV+Global.URL_API+'/tickets', conf)
        .then(res=>{
            response = res.data;
        });
        return response;
    }

    static getTicketsByDate = async (conf, date_from, date_to)=>{
        let response;
        await axios.get(Global.URL_SRV+Global.URL_API+'/tickets/?date_from='+date_from+'&date_to='+date_to, conf)
        .then(res=>{
            response = res.data;
        });
        return response;
    }


    static getUserTicket = async (ticketId, conf)=>{
        let response;
        await axios.get(Global.URL_SRV+Global.URL_API+'/users/ticket/'+ticketId, conf)
        .then(res=>{
            response = res.data;
        });
        return response;
    }
    
    static updateUser = async(user, conf)=>{
        let response;
        await axios.put(Global.URL_SRV+Global.URL_API+'/users/'+user._id, user, conf)
        .then(res=>{
            response = res.data;
        });
        return response;
    }

    static getRoles = async(conf)=>{
        let response;
        await axios.get(Global.URL_SRV+Global.URL_API+'/roles/', conf)
        .then(res=>{
            response = res.data;
        });
        return response;
    }

    static getRole = async(roleId, conf)=>{
        let response;
        await axios.get(Global.URL_SRV+Global.URL_API+'/roles/'+roleId, conf)
        .then(res=>{
            response = res.data;
        });
        return response;
    }

    static removeUser = async(userId, conf)=>{
        let response;
        await axios.delete(Global.URL_SRV+Global.URL_API+'/users/'+userId, conf)
        .then(res=>{
            response = res.data;
        });
        return response;
    }

    static addUser = async(user, conf)=>{
        let response;
        await axios.post(Global.URL_SRV+Global.URL_API+'/users/',user, conf)
        .then(res=>{
            response = res.data;
        });
        return response;
    }
}