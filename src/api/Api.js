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
}