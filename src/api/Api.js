import axios from 'axios';
import Global from '../utils/Global';

export default class Api{
    static login = async (user)=>{
        let response;
        await axios({
            method: 'post',
            url: Global.URL_SRV+Global.URL_API+'/users',
            data: {
                email: user.email,
                password: user.password
            }
        }).then(res=>{
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
}