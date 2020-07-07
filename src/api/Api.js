import axios from 'axios';
import Global from '../utils/Global';
import Notification from '../components/Notification';

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
        }).catch(err=>{
            Notification('error', 'Inicio de sesión fallido\n', 'Error técnico: '+err);
        });
        return response;
    }

    static getUsers = async(conf)=>{
        let response;
        await axios.get(Global.URL_SRV+Global.URL_API+'/users', conf)
        .then(res=>{
            response = res.data;
        })
        .catch(err=>{
            Notification('error', 'No se pudo obtener los usuarios\n', 'Error técnico: '+err);
        });
        return response;
    }

    static getTicket = async (uniqueCode, conf)=>{
        let response;
        await axios.get(Global.URL_SRV+Global.URL_API+'/tickets/?unique_code='+uniqueCode, conf)
        .then(res=>{
            response = res.data[0];
        })
        .catch(err=>{
            Notification('error', 'No se pudo obtener el ticket\n', 'Error técnico: '+err);
        });
        return response;
    }

    static getTickets = async (conf)=>{
        let response;
        await axios.get(Global.URL_SRV+Global.URL_API+'/tickets', conf)
        .then(res=>{
            response = res.data;
        })
        .catch(err=>{
            Notification('error', 'No se pudieron obtener los tickets\n', 'Error técnico: '+err);
        });
        return response;
    }

    static getTicketsByDate = async (conf, date_from, date_to)=>{
        let response;
        await axios.get(Global.URL_SRV+Global.URL_API+'/tickets/?date_from='+date_from+'&date_to='+date_to, conf)
        .then(res=>{
            response = res.data;
        })
        .catch(err=>{
            Notification('error', 'No se pudo obtener el ticket\n', 'Error técnico: '+err);
        });
        return response;
    }


    static getUserTicket = async (ticketId, conf)=>{
        let response;
        await axios.get(Global.URL_SRV+Global.URL_API+'/users/ticket/'+ticketId, conf)
        .then(res=>{
            response = res.data;
        })
        .catch(err=>{
            Notification('error', 'No se pudo obtener el usuario del ticket\n', 'Error técnico: '+err);
        });
        return response;
    }
    
    static updateUser = async(user, conf)=>{
        let response;
        await axios.put(Global.URL_SRV+Global.URL_API+'/users/'+user._id, user, conf)
        .then(res=>{
            response = res.data;
            Notification('success', 'Usuario actualizado.\n');
        })
        .catch(err=>{
            Notification('error', 'Actualización fallida.\n', 'Error técnico: '+err);
        });
        return response;
    }

    static getRoles = async(conf)=>{
        let response;
        await axios.get(Global.URL_SRV+Global.URL_API+'/roles', conf)
        .then(res=>{
            response = res.data;
        })
        .catch(err=>{
            Notification('error', 'No se pudieron obtener los roles.\n', 'Error técnico: '+err);
        });
        return response;
    }

    static getRole = async(roleId, conf)=>{
        let response;
        await axios.get(Global.URL_SRV+Global.URL_API+'/roles/'+roleId, conf)
        .then(res=>{
            response = res.data;
        })
        .catch(err=>{
            Notification('error', 'No se pudo obtener el rol.\n', 'Error técnico: '+err);
        });
        return response;
    }

    static removeUser = async(userId, conf)=>{
        let response;
        await axios.delete(Global.URL_SRV+Global.URL_API+'/users/'+userId, conf)
        .then(res=>{
            response = res.data;
            Notification('success', 'Usuario eliminado.\n');
        })
        .catch(err=>{
            Notification('error', 'No se pudo eliminar el usuario.\n', 'Error técnico: '+err);
        });
        return response;
    }

    static addUser = async(user, conf)=>{
        let response;
        await axios.post(Global.URL_SRV+Global.URL_API+'/users/',user, conf)
        .then(res=>{
            response = res.data;
            Notification('success', 'Usuario guardado.\n');
        })
        .catch(err=>{
            Notification('error', 'No se pudo guardar el usuario.\n', 'Error técnico: '+err);
        });
        return response;
    }
}